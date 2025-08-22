// Servicio de moderación simplificado para demo
// Funciona sin APIs externas, pero con lógica robusta

class ModerationServiceDemo {
  constructor() {
    this.hasExternalAPIs = !!(
      process.env.NEXT_PUBLIC_PERSPECTIVE_API_KEY || 
      process.env.NEXT_PUBLIC_OPENAI_API_KEY
    )
  }

  // Función principal de moderación
  async moderateMessage(message, userId = null, context = {}) {
    try {
      // Si tenemos APIs externas, usarlas
      if (this.hasExternalAPIs) {
        return await this.moderateWithAPIs(message, userId, context)
      }
      
      // Si no, usar moderación local robusta
      return this.moderateLocally(message, userId, context)
    } catch (error) {
      console.error('Error en moderación:', error)
      return this.moderateLocally(message, userId, context)
    }
  }

  // Moderación con APIs externas (cuando estén configuradas)
  async moderateWithAPIs(message, userId, context) {
    const results = []
    
    // Intentar Perspective API
    if (process.env.NEXT_PUBLIC_PERSPECTIVE_API_KEY) {
      try {
        const perspectiveResult = await this.checkWithPerspectiveAPI(message)
        results.push(perspectiveResult)
      } catch (error) {
        console.log('Perspective API no disponible, usando fallback')
      }
    }
    
    // Intentar OpenAI API
    if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      try {
        const openaiResult = await this.checkWithOpenAI(message)
        results.push(openaiResult)
      } catch (error) {
        console.log('OpenAI API no disponible, usando fallback')
      }
    }
    
    // Siempre incluir moderación local
    const localResult = this.checkWithLocalPatterns(message)
    results.push(localResult)
    
    return this.combineResults(results, message, userId, context)
  }

  // Moderación solo local (para demo sin APIs)
  moderateLocally(message, userId, context) {
    const localResult = this.checkWithLocalPatterns(message)
    const groomingResult = this.checkGroomingPatterns(message)
    
    const results = [localResult, groomingResult]
    return this.combineResults(results, message, userId, context)
  }

  // Integración con Perspective API
  async checkWithPerspectiveAPI(message) {
    const response = await fetch(
      `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.NEXT_PUBLIC_PERSPECTIVE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
          comment: { text: message }
        })
      }
    )

    if (!response.ok) throw new Error(`Perspective API error: ${response.status}`)

    const data = await response.json()
    const scores = data.attributeScores

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
  }

  // Integración con OpenAI
  async checkWithOpenAI(message) {
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: message })
    })

    if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`)

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
  }

  // Patrones locales robustos
  checkWithLocalPatterns(message) {
    const normalizedMessage = this.normalizeText(message)
    
    const offensivePatterns = [
      // Insultos con variaciones
      { pattern: /\b(tont[ao@0]s?|est[uú]pid[ao@0]s?|in[uú]til(es)?|idi[o0]t[ao@0]s?)\b/gi, severity: 'high' },
      { pattern: /\b(b[o0]b[ao@0]s?|tarad[ao@0]s?|ret[ao]rd[ao@0]d[ao@0]s?)\b/gi, severity: 'high' },
      
      // Sesgos de género
      { pattern: /\b(dif[ií]cil para (una )?chica|no es para mujeres|mejor ded[ií]cate a)\b/gi, severity: 'high' },
      { pattern: /\b(las chicas no pueden|muy complicado para ti|no es para ni[ñn]as)\b/gi, severity: 'high' },
      { pattern: /\b(eso es de hombres|las mujeres no saben|regresa a la cocina)\b/gi, severity: 'high' },
      
      // Discriminación
      { pattern: /\b(no sirves|eres inferior|no vales nada|fracasad[ao@0])\b/gi, severity: 'medium' },
      { pattern: /\b(no tienes cerebro|eres una perdedora|no puedes)\b/gi, severity: 'medium' }
    ]

    let blocked = false
    let reasons = []
    let maxSeverity = 'low'

    offensivePatterns.forEach((item, index) => {
      if (item.pattern.test(normalizedMessage)) {
        blocked = true
        maxSeverity = item.severity
        reasons.push({
          type: 'offensive_language',
          pattern: index,
          confidence: item.severity === 'high' ? 0.9 : 0.7,
          source: 'local_patterns',
          severity: item.severity
        })
      }
    })

    return {
      available: true,
      blocked,
      reasons,
      confidence: blocked ? (maxSeverity === 'high' ? 0.9 : 0.7) : 0.1,
      source: 'local_patterns'
    }
  }

  // Detección específica de grooming
  checkGroomingPatterns(message) {
    const normalizedMessage = this.normalizeText(message)
    
    const groomingIndicators = [
      // Solicitudes de información personal
      { pattern: /\b(cu[aá]ntos a[ñn]os tienes|qu[eé] edad tienes)\b/gi, risk: 'high' },
      { pattern: /\b(d[oó]nde vives|cu[aá]l es tu direcci[oó]n)\b/gi, risk: 'high' },
      { pattern: /\b(a qu[eé] colegio vas|en qu[eé] distrito est[aá]s)\b/gi, risk: 'medium' },
      
      // Intentos de aislamiento
      { pattern: /\b(no le cuentes a (nadie|tus padres)|esto queda entre nosotros)\b/gi, risk: 'high' },
      { pattern: /\b(ser[aá] nuestro secreto|no le digas a nadie)\b/gi, risk: 'high' },
      
      // Halagos inapropiados
      { pattern: /\b(eres muy (bonita|linda|hermosa)|qu[eé] (bonita|linda) eres)\b/gi, risk: 'high' },
      { pattern: /\b(eres muy madura para tu edad|no pareces de \d+ a[ñn]os)\b/gi, risk: 'high' },
      
      // Solicitudes de encuentros
      { pattern: /\b(podemos vernos|te invito a|vamos a encontrarnos)\b/gi, risk: 'high' },
      { pattern: /\b(te recojo|paso por ti|nos vemos en)\b/gi, risk: 'high' },
      
      // Solicitudes de fotos
      { pattern: /\b(manda foto|env[ií]a foto|quiero verte)\b/gi, risk: 'high' },
      { pattern: /\b(una foto tuya|c[oó]mo te ves|eres linda)\b/gi, risk: 'medium' }
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

  // Combinar resultados
  combineResults(results, originalMessage, userId, context) {
    let blocked = false
    let flagged = false
    let reasons = []
    let maxConfidence = 0
    let sources = []

    results.forEach((result) => {
      if (result.available) {
        sources.push(result.source)
        
        if (result.blocked) {
          blocked = true
          reasons.push(...(result.reasons || []))
        }
        
        if (result.confidence > 0.5) {
          flagged = true
        }
        
        maxConfidence = Math.max(maxConfidence, result.confidence || 0)
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

    // Log básico (sin APIs externas)
    if (blocked || flagged) {
      console.log('MODERATION_EVENT', {
        blocked,
        flagged,
        confidence: maxConfidence,
        sources,
        timestamp: new Date().toISOString()
      })
    }

    return {
      blocked,
      flagged,
      reasons,
      confidence: maxConfidence,
      sources,
      message: responseMessage,
      suggestion,
      hasExternalAPIs: this.hasExternalAPIs
    }
  }
}

export default new ModerationServiceDemo()