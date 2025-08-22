// Servicio de moderación robusto con múltiples APIs
import crypto from 'crypto'

class ModerationService {
  constructor() {
    this.perspectiveApiKey = process.env.NEXT_PUBLIC_PERSPECTIVE_API_KEY
    this.openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    this.awsRegion = process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'
  }

  // Función principal de moderación que combina múltiples métodos
  async moderateMessage(message, userId = null, context = {}) {
    try {
      const results = await Promise.allSettled([
        this.checkWithPerspectiveAPI(message),
        this.checkWithOpenAI(message),
        this.checkWithLocalPatterns(message),
        this.checkGroomingPatterns(message)
      ])

      const moderationResult = this.combineResults(results, message)
      
      // Registrar en base de datos si es necesario
      if (moderationResult.blocked || moderationResult.flagged) {
        await this.logModerationEvent(message, userId, moderationResult, context)
      }

      return moderationResult
    } catch (error) {
      console.error('Error en moderación:', error)
      // Fallback a moderación local si las APIs fallan
      return this.checkWithLocalPatterns(message)
    }
  }

  // Integración con Perspective API de Google
  async checkWithPerspectiveAPI(message) {
    if (!this.perspectiveApiKey) {
      return { available: false }
    }

    try {
      const response = await fetch(
        `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${this.perspectiveApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestedAttributes: {
              TOXICITY: {},
              SEVERE_TOXICITY: {},
              IDENTITY_ATTACK: {},
              INSULT: {},
              PROFANITY: {},
              THREAT: {},
              SEXUALLY_EXPLICIT: {},
              FLIRTATION: {}
            },
            languages: ['es', 'en'],
            doNotStore: true,
            comment: {
              text: message
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Perspective API error: ${response.status}`)
      }

      const data = await response.json()
      const scores = data.attributeScores

      // Umbrales de detección
      const thresholds = {
        TOXICITY: 0.7,
        SEVERE_TOXICITY: 0.5,
        IDENTITY_ATTACK: 0.6,
        INSULT: 0.7,
        PROFANITY: 0.8,
        THREAT: 0.5,
        SEXUALLY_EXPLICIT: 0.6,
        FLIRTATION: 0.8
      }

      let blocked = false
      let reasons = []
      let maxScore = 0

      Object.entries(scores).forEach(([attribute, data]) => {
        const score = data.summaryScore.value
        maxScore = Math.max(maxScore, score)
        
        if (score > thresholds[attribute]) {
          blocked = true
          reasons.push({
            type: attribute.toLowerCase(),
            confidence: score,
            source: 'perspective_api'
          })
        }
      })

      return {
        available: true,
        blocked,
        reasons,
        confidence: maxScore,
        source: 'perspective_api'
      }
    } catch (error) {
      console.error('Error con Perspective API:', error)
      return { available: false, error: error.message }
    }
  }

  // Integración con OpenAI Moderation API
  async checkWithOpenAI(message) {
    if (!this.openaiApiKey) {
      return { available: false }
    }

    try {
      const response = await fetch('https://api.openai.com/v1/moderations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: message
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      const result = data.results[0]

      let reasons = []
      if (result.flagged) {
        Object.entries(result.categories).forEach(([category, flagged]) => {
          if (flagged) {
            reasons.push({
              type: category,
              confidence: result.category_scores[category],
              source: 'openai'
            })
          }
        })
      }

      return {
        available: true,
        blocked: result.flagged,
        reasons,
        confidence: Math.max(...Object.values(result.category_scores)),
        source: 'openai'
      }
    } catch (error) {
      console.error('Error con OpenAI API:', error)
      return { available: false, error: error.message }
    }
  }

  // Patrones locales mejorados con normalización de texto
  checkWithLocalPatterns(message) {
    const normalizedMessage = this.normalizeText(message)
    
    const offensivePatterns = [
      // Insultos básicos con variaciones
      /\b(tont[ao@]s?|est[uú]pid[ao@]s?|in[uú]til(es)?|idi[o0]t[ao@]s?)\b/gi,
      /\b(b[o0]b[ao@]s?|tarad[ao@]s?|ret[ao]rd[ao@]d[ao@]s?)\b/gi,
      
      // Sesgos de género
      /\b(dif[ií]cil para (una )?chica|no es para mujeres|mejor ded[ií]cate a)\b/gi,
      /\b(las chicas no pueden|muy complicado para ti|no es para ni[ñn]as)\b/gi,
      /\b(eso es de hombres|las mujeres no saben|regresa a la cocina)\b/gi,
      
      // Discriminación
      /\b(no sirves|eres inferior|no vales nada|fracasad[ao@])\b/gi,
      /\b(no tienes cerebro|eres una perdedora|no puedes)\b/gi
    ]

    const groomingPatterns = [
      /\b(eres muy (bonita|linda|hermosa)|qu[ée] (bonita|linda) eres)\b/gi,
      /\b(quiero conocerte|dame tu n[uú]mero|encontr[eé]monos)\b/gi,
      /\b(no le digas a nadie|ser[aá] nuestro secreto|eres especial)\b/gi,
      /\b(cu[aá]ntos a[ñn]os tienes|d[oó]nde vives|estudias sola)\b/gi,
      /\b(manda foto|env[ií]a foto|quiero verte)\b/gi
    ]

    let blocked = false
    let reasons = []

    // Verificar patrones ofensivos
    offensivePatterns.forEach((pattern, index) => {
      if (pattern.test(normalizedMessage)) {
        blocked = true
        reasons.push({
          type: 'offensive_language',
          pattern: index,
          confidence: 0.9,
          source: 'local_patterns'
        })
      }
    })

    // Verificar patrones de grooming
    groomingPatterns.forEach((pattern, index) => {
      if (pattern.test(normalizedMessage)) {
        blocked = true
        reasons.push({
          type: 'grooming_attempt',
          pattern: index,
          confidence: 0.95,
          source: 'local_patterns'
        })
      }
    })

    return {
      available: true,
      blocked,
      reasons,
      confidence: blocked ? 0.9 : 0.1,
      source: 'local_patterns'
    }
  }

  // Detección específica de grooming con patrones avanzados
  checkGroomingPatterns(message) {
    const normalizedMessage = this.normalizeText(message)
    
    const groomingIndicators = [
      // Solicitudes de información personal
      { pattern: /\b(cu[aá]l es tu direcci[oó]n|d[oó]nde queda tu casa)\b/gi, risk: 'high' },
      { pattern: /\b(a qu[eé] colegio vas|en qu[eé] distrito vives)\b/gi, risk: 'medium' },
      
      // Intentos de aislamiento
      { pattern: /\b(no le cuentes a (nadie|tus padres)|esto queda entre nosotros)\b/gi, risk: 'high' },
      { pattern: /\b(tus padres no entender[ií]an|mejor no les digas)\b/gi, risk: 'high' },
      
      // Halagos excesivos o inapropiados
      { pattern: /\b(eres muy madura para tu edad|no pareces de \d+ a[ñn]os)\b/gi, risk: 'high' },
      { pattern: /\b(eres diferente a las dem[aá]s|eres muy especial)\b/gi, risk: 'medium' },
      
      // Solicitudes de encuentros
      { pattern: /\b(podemos vernos|te invito a|vamos a encontrarnos)\b/gi, risk: 'high' },
      { pattern: /\b(te recojo|paso por ti|nos vemos en)\b/gi, risk: 'high' }
    ]

    let blocked = false
    let reasons = []
    let riskLevel = 'low'

    groomingIndicators.forEach((indicator, index) => {
      if (indicator.pattern.test(normalizedMessage)) {
        blocked = true
        riskLevel = indicator.risk
        reasons.push({
          type: 'grooming_indicator',
          risk: indicator.risk,
          pattern: index,
          confidence: indicator.risk === 'high' ? 0.95 : 0.8,
          source: 'grooming_detection'
        })
      }
    })

    return {
      available: true,
      blocked,
      reasons,
      riskLevel,
      confidence: blocked ? (riskLevel === 'high' ? 0.95 : 0.8) : 0.1,
      source: 'grooming_detection'
    }
  }

  // Normalizar texto para mejor detección
  normalizeText(text) {
    return text
      .toLowerCase()
      .replace(/[0@]/g, 'o')
      .replace(/[3]/g, 'e')
      .replace(/[1!]/g, 'i')
      .replace(/[4]/g, 'a')
      .replace(/[5$]/g, 's')
      .replace(/[7]/g, 't')
      .replace(/\s+/g, ' ')
      .trim()
  }

  // Combinar resultados de múltiples fuentes
  combineResults(results, originalMessage) {
    let blocked = false
    let flagged = false
    let reasons = []
    let maxConfidence = 0
    let sources = []

    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.available) {
        const data = result.value
        sources.push(data.source)
        
        if (data.blocked) {
          blocked = true
          reasons.push(...(data.reasons || []))
        }
        
        if (data.confidence > 0.5) {
          flagged = true
        }
        
        maxConfidence = Math.max(maxConfidence, data.confidence || 0)
      }
    })

    // Determinar mensaje de respuesta
    let responseMessage = ''
    let suggestion = ''

    if (blocked) {
      const hasGrooming = reasons.some(r => r.type.includes('grooming'))
      const hasOffensive = reasons.some(r => r.type.includes('offensive') || r.type.includes('insult'))
      
      if (hasGrooming) {
        responseMessage = 'Mensaje bloqueado: contenido potencialmente peligroso detectado'
        suggestion = 'Por tu seguridad, evita compartir información personal. Si alguien te hace sentir incómoda, cuéntale a un adulto de confianza 🛡️'
      } else if (hasOffensive) {
        responseMessage = 'Mensaje bloqueado: lenguaje ofensivo o discriminatorio detectado'
        suggestion = 'Intenta expresar tu idea de forma más respetuosa. En STEENS promovemos un ambiente positivo 😊'
      } else {
        responseMessage = 'Mensaje bloqueado: contenido inapropiado detectado'
        suggestion = 'Mantengamos las conversaciones enfocadas en STEM y aprendizaje 🚀'
      }
    }

    return {
      blocked,
      flagged,
      reasons,
      confidence: maxConfidence,
      sources,
      message: responseMessage,
      suggestion,
      originalMessage: this.hashMessage(originalMessage) // Hash para logging sin exponer contenido
    }
  }

  // Registrar eventos de moderación de forma segura
  async logModerationEvent(message, userId, moderationResult, context) {
    try {
      const logEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        messageHash: this.hashMessage(message), // Solo hash, no mensaje original
        messageLength: message.length,
        userId: userId ? this.hashUserId(userId) : null, // Hash del usuario
        blocked: moderationResult.blocked,
        flagged: moderationResult.flagged,
        confidence: moderationResult.confidence,
        reasons: moderationResult.reasons.map(r => ({
          type: r.type,
          confidence: r.confidence,
          source: r.source
        })),
        sources: moderationResult.sources,
        context: {
          userAgent: context.userAgent || 'unknown',
          timestamp: context.timestamp || new Date().toISOString(),
          sessionId: context.sessionId ? this.hashMessage(context.sessionId) : null
        }
      }

      // En producción, enviar a DynamoDB o MongoDB
      if (typeof window !== 'undefined') {
        // Cliente: enviar a API
        await fetch('/api/moderation/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(logEntry)
        })
      } else {
        // Servidor: guardar directamente
        console.log('Moderation log:', logEntry)
        // Aquí integrarías con DynamoDB/MongoDB
      }
    } catch (error) {
      console.error('Error logging moderation event:', error)
    }
  }

  // Crear hash seguro del mensaje para logging
  hashMessage(message) {
    return crypto
      .createHash('sha256')
      .update(message + process.env.NEXT_PUBLIC_HASH_SALT || 'steens-salt')
      .digest('hex')
      .substring(0, 16) // Solo primeros 16 caracteres
  }

  // Crear hash seguro del usuario
  hashUserId(userId) {
    return crypto
      .createHash('sha256')
      .update(userId + process.env.NEXT_PUBLIC_USER_SALT || 'steens-user-salt')
      .digest('hex')
      .substring(0, 12)
  }
}

export default new ModerationService()