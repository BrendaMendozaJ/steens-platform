import { ComprehendClient, DetectSentimentCommand, DetectToxicContentCommand } from "@aws-sdk/client-comprehend";

class ComprehendModerationService {
  constructor() {
    this.client = new ComprehendClient({
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      }
    });
    
    // Palabras clave específicas para grooming y ciberacoso
    this.groomingPatterns = [
      /\b(encuentro|reunirse|secreto|no digas|entre nosotros|privado|solo tu y yo)\b/i,
      /\b(edad|años tienes|cuantos años|donde vives|direccion|telefono)\b/i,
      /\b(foto|imagen|selfie|camara|video|videollamada)\b/i,
      /\b(regalo|dinero|comprar|pagar|ayuda economica)\b/i
    ];
    
    this.cyberbullyingPatterns = [
      /\b(fea|gorda|tonta|estupida|inutil|fracasada|perdedora)\b/i,
      /\b(nadie te quiere|matate|suicidate|no sirves|eres basura)\b/i,
      /\b(callate|cierra la boca|no hables|no opines)\b/i
    ];
  }

  async moderateMessage(text, userId = null, context = {}) {
    try {
      // Análisis paralelo con Comprehend
      const [sentimentResult, toxicityResult, localAnalysis] = await Promise.all([
        this.detectSentiment(text),
        this.detectToxicContent(text),
        this.localPatternAnalysis(text)
      ]);

      // Combinar resultados
      const analysis = this.combineAnalysis(sentimentResult, toxicityResult, localAnalysis);
      
      // Determinar acción
      const decision = this.makeDecision(analysis, text);
      
      // Log para monitoreo
      await this.logModerationEvent(text, userId, analysis, decision, context);
      
      return decision;
    } catch (error) {
      console.error('Error en moderación Comprehend:', error);
      // Fallback a análisis local
      return this.localFallback(text);
    }
  }

  async detectSentiment(text) {
    try {
      const command = new DetectSentimentCommand({
        Text: text,
        LanguageCode: 'es'
      });
      
      const response = await this.client.send(command);
      return {
        sentiment: response.Sentiment,
        confidence: response.SentimentScore[response.Sentiment],
        scores: response.SentimentScore
      };
    } catch (error) {
      console.error('Error detectando sentimiento:', error);
      return { sentiment: 'NEUTRAL', confidence: 0.5, scores: {} };
    }
  }

  async detectToxicContent(text) {
    try {
      const command = new DetectToxicContentCommand({
        TextSegments: [{ Text: text }],
        LanguageCode: 'es'
      });
      
      const response = await this.client.send(command);
      const result = response.ResultList[0];
      
      return {
        toxicity: result.Toxicity,
        labels: result.Labels || [],
        confidence: Math.max(...(result.Labels?.map(l => l.Score) || [0]))
      };
    } catch (error) {
      console.error('Error detectando toxicidad:', error);
      return { toxicity: 0, labels: [], confidence: 0 };
    }
  }

  localPatternAnalysis(text) {
    const results = {
      grooming: { detected: false, patterns: [], confidence: 0 },
      cyberbullying: { detected: false, patterns: [], confidence: 0 },
      inappropriate: { detected: false, patterns: [], confidence: 0 }
    };

    // Detectar grooming
    this.groomingPatterns.forEach((pattern, index) => {
      if (pattern.test(text)) {
        results.grooming.detected = true;
        results.grooming.patterns.push(`grooming_pattern_${index + 1}`);
        results.grooming.confidence = Math.min(results.grooming.confidence + 0.3, 1.0);
      }
    });

    // Detectar cyberbullying
    this.cyberbullyingPatterns.forEach((pattern, index) => {
      if (pattern.test(text)) {
        results.cyberbullying.detected = true;
        results.cyberbullying.patterns.push(`cyberbullying_pattern_${index + 1}`);
        results.cyberbullying.confidence = Math.min(results.cyberbullying.confidence + 0.4, 1.0);
      }
    });

    return results;
  }

  combineAnalysis(sentiment, toxicity, local) {
    return {
      sentiment,
      toxicity,
      local,
      overallRisk: this.calculateOverallRisk(sentiment, toxicity, local)
    };
  }

  calculateOverallRisk(sentiment, toxicity, local) {
    let risk = 0;
    
    // Sentimiento negativo
    if (sentiment.sentiment === 'NEGATIVE' && sentiment.confidence > 0.7) {
      risk += 0.3;
    }
    
    // Contenido tóxico
    if (toxicity.confidence > 0.6) {
      risk += 0.4;
    }
    
    // Patrones locales
    if (local.grooming.detected) risk += 0.8;
    if (local.cyberbullying.detected) risk += 0.7;
    
    return Math.min(risk, 1.0);
  }

  makeDecision(analysis, originalText) {
    const { overallRisk, local, toxicity, sentiment } = analysis;
    
    // Bloqueo inmediato para grooming
    if (local.grooming.detected && local.grooming.confidence > 0.5) {
      return {
        blocked: true,
        flagged: true,
        message: 'Mensaje bloqueado: Contenido potencialmente peligroso detectado',
        suggestion: 'Recuerda que STEENS es un espacio seguro. Evita compartir información personal.',
        confidence: local.grooming.confidence,
        reasons: [{ type: 'grooming', confidence: local.grooming.confidence }],
        sources: ['comprehend', 'local_patterns']
      };
    }
    
    // Bloqueo para cyberbullying severo
    if (local.cyberbullying.detected && local.cyberbullying.confidence > 0.6) {
      return {
        blocked: true,
        flagged: true,
        message: 'Mensaje bloqueado: Lenguaje ofensivo o intimidante',
        suggestion: 'Reformula tu mensaje de manera más positiva y constructiva.',
        confidence: local.cyberbullying.confidence,
        reasons: [{ type: 'cyberbullying', confidence: local.cyberbullying.confidence }],
        sources: ['comprehend', 'local_patterns']
      };
    }
    
    // Bloqueo por alta toxicidad
    if (toxicity.confidence > 0.8) {
      return {
        blocked: true,
        flagged: true,
        message: 'Mensaje bloqueado: Contenido tóxico detectado',
        suggestion: 'Intenta expresar tu idea de manera más respetuosa.',
        confidence: toxicity.confidence,
        reasons: [{ type: 'toxicity', confidence: toxicity.confidence }],
        sources: ['comprehend']
      };
    }
    
    // Advertencia para riesgo medio
    if (overallRisk > 0.4) {
      return {
        blocked: false,
        flagged: true,
        message: 'Mensaje enviado con advertencia',
        suggestion: 'Ten cuidado con el tono de tu mensaje.',
        confidence: overallRisk,
        reasons: this.extractReasons(analysis),
        sources: ['comprehend', 'local_patterns']
      };
    }
    
    // Mensaje seguro
    return {
      blocked: false,
      flagged: false,
      message: 'Mensaje seguro',
      suggestion: '',
      confidence: 1 - overallRisk,
      reasons: [],
      sources: ['comprehend']
    };
  }

  extractReasons(analysis) {
    const reasons = [];
    
    if (analysis.sentiment.sentiment === 'NEGATIVE' && analysis.sentiment.confidence > 0.6) {
      reasons.push({ type: 'negative_sentiment', confidence: analysis.sentiment.confidence });
    }
    
    if (analysis.toxicity.confidence > 0.4) {
      reasons.push({ type: 'toxicity', confidence: analysis.toxicity.confidence });
    }
    
    if (analysis.local.cyberbullying.detected) {
      reasons.push({ type: 'cyberbullying_patterns', confidence: analysis.local.cyberbullying.confidence });
    }
    
    return reasons;
  }

  async logModerationEvent(text, userId, analysis, decision, context) {
    try {
      const logData = {
        timestamp: new Date().toISOString(),
        userId,
        textLength: text.length,
        analysis: {
          sentiment: analysis.sentiment.sentiment,
          sentimentConfidence: analysis.sentiment.confidence,
          toxicityScore: analysis.toxicity.confidence,
          overallRisk: analysis.overallRisk
        },
        decision: {
          blocked: decision.blocked,
          flagged: decision.flagged,
          confidence: decision.confidence
        },
        context
      };
      
      // En producción, enviar a CloudWatch o DynamoDB
      console.log('Moderación log:', logData);
      
    } catch (error) {
      console.error('Error logging moderación:', error);
    }
  }

  localFallback(text) {
    const local = this.localPatternAnalysis(text);
    
    if (local.grooming.detected || local.cyberbullying.detected) {
      return {
        blocked: true,
        flagged: true,
        message: 'Mensaje bloqueado por seguridad (modo offline)',
        suggestion: 'Revisa el contenido de tu mensaje.',
        confidence: 0.8,
        reasons: [{ type: 'local_fallback', confidence: 0.8 }],
        sources: ['local_fallback']
      };
    }
    
    return {
      blocked: false,
      flagged: false,
      message: 'Mensaje permitido (modo offline)',
      suggestion: '',
      confidence: 0.7,
      reasons: [],
      sources: ['local_fallback']
    };
  }
}

export default new ComprehendModerationService();