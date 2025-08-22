// API para manejar reportes de usuarios
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import crypto from 'crypto'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const docClient = DynamoDBDocumentClient.from(client)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const reporte = req.body

    // Validar datos requeridos
    if (!reporte.mensaje || !reporte.reportadoPor) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Crear hash seguro del contenido reportado
    const hashMessage = (text) => {
      return crypto
        .createHash('sha256')
        .update(text + (process.env.HASH_SALT || 'steens-report-salt'))
        .digest('hex')
        .substring(0, 16)
    }

    // Preparar entrada para la base de datos
    const reportEntry = {
      id: reporte.id || crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      
      // Información del mensaje reportado (hasheada por seguridad)
      messageId: reporte.mensaje.id,
      messageHash: hashMessage(reporte.mensaje.mensaje),
      messageLength: reporte.mensaje.mensaje.length,
      messageTimestamp: reporte.mensaje.timestamp,
      messageAuthor: hashMessage(reporte.mensaje.usuario || 'anonymous'),
      
      // Información del reportador (hasheada)
      reportedBy: hashMessage(reporte.reportadoPor),
      reportedById: reporte.reportadoPorId ? hashMessage(reporte.reportadoPorId) : null,
      
      // Metadatos del reporte
      reason: reporte.razon || 'Contenido inapropiado',
      status: 'pending_review',
      priority: determinePriority(reporte.mensaje.mensaje),
      
      // Contexto técnico
      context: {
        chatId: reporte.context?.chatId || 'unknown',
        userAgent: reporte.context?.userAgent || 'unknown',
        reportTimestamp: reporte.context?.timestamp || new Date().toISOString()
      },
      
      // TTL para limpieza automática (180 días)
      ttl: Math.floor(Date.now() / 1000) + (180 * 24 * 60 * 60),
      version: '1.0',
      environment: process.env.NODE_ENV || 'development'
    }

    // Guardar en DynamoDB
    const command = new PutCommand({
      TableName: process.env.REPORTS_TABLE || 'steens-user-reports',
      Item: reportEntry
    })

    await docClient.send(command)

    // Log para monitoreo en tiempo real
    console.log('USER_REPORT', JSON.stringify({
      reportId: reportEntry.id,
      priority: reportEntry.priority,
      timestamp: reportEntry.timestamp,
      messageLength: reportEntry.messageLength
    }))

    // Si es alta prioridad, enviar alerta inmediata
    if (reportEntry.priority === 'high') {
      await sendHighPriorityAlert(reportEntry)
    }

    res.status(200).json({ 
      success: true, 
      reportId: reportEntry.id,
      message: 'Reporte recibido y procesado correctamente'
    })
  } catch (error) {
    console.error('Error processing report:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Determinar prioridad del reporte basado en contenido
function determinePriority(messageContent) {
  const highPriorityPatterns = [
    // Grooming y solicitudes de información personal
    /\b(cuántos años tienes|dónde vives|dame tu número|encontrémonos)\b/gi,
    /\b(no le digas a nadie|será nuestro secreto|eres especial)\b/gi,
    /\b(manda foto|envía foto|quiero verte)\b/gi,
    
    // Amenazas directas
    /\b(te voy a|voy a hacerte|te haré daño)\b/gi,
    /\b(sé dónde vives|te voy a encontrar)\b/gi,
    
    // Contenido sexual explícito
    /\b(sexo|desnuda|sin ropa)\b/gi
  ]

  const mediumPriorityPatterns = [
    // Insultos severos
    /\b(estúpida|inútil|no sirves)\b/gi,
    /\b(eres una|no vales nada)\b/gi,
    
    // Discriminación de género
    /\b(no es para mujeres|regresa a la cocina)\b/gi,
    /\b(las chicas no pueden|muy complicado para ti)\b/gi
  ]

  // Verificar patrones de alta prioridad
  for (let pattern of highPriorityPatterns) {
    if (pattern.test(messageContent)) {
      return 'high'
    }
  }

  // Verificar patrones de prioridad media
  for (let pattern of mediumPriorityPatterns) {
    if (pattern.test(messageContent)) {
      return 'medium'
    }
  }

  return 'low'
}

// Enviar alerta para reportes de alta prioridad
async function sendHighPriorityAlert(reportEntry) {
  try {
    // En producción, esto enviaría notificaciones a moderadores
    console.log('HIGH_PRIORITY_REPORT', JSON.stringify({
      reportId: reportEntry.id,
      timestamp: reportEntry.timestamp,
      priority: reportEntry.priority,
      alert: 'Reporte de alta prioridad requiere revisión inmediata'
    }))

    // Aquí podrías integrar con:
    // - AWS SNS para notificaciones
    // - Slack/Discord webhooks
    // - Email alerts
    // - SMS alerts para casos críticos
    
  } catch (error) {
    console.error('Error sending high priority alert:', error)
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}