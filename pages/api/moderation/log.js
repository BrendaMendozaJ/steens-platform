// API para registrar eventos de moderación de forma segura
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

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
    const logEntry = req.body

    // Validar datos requeridos
    if (!logEntry.id || !logEntry.timestamp || !logEntry.messageHash) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Agregar metadatos adicionales
    const enhancedLogEntry = {
      ...logEntry,
      ttl: Math.floor(Date.now() / 1000) + (90 * 24 * 60 * 60), // TTL de 90 días
      version: '1.0',
      environment: process.env.NODE_ENV || 'development'
    }

    // Guardar en DynamoDB
    const command = new PutCommand({
      TableName: process.env.MODERATION_LOGS_TABLE || 'steens-moderation-logs',
      Item: enhancedLogEntry
    })

    await docClient.send(command)

    // También guardar en CloudWatch para análisis en tiempo real
    if (logEntry.blocked || logEntry.flagged) {
      console.log('MODERATION_EVENT', JSON.stringify({
        blocked: logEntry.blocked,
        flagged: logEntry.flagged,
        confidence: logEntry.confidence,
        reasons: logEntry.reasons.map(r => r.type),
        timestamp: logEntry.timestamp
      }))
    }

    res.status(200).json({ success: true, id: logEntry.id })
  } catch (error) {
    console.error('Error logging moderation event:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Configuración para Next.js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}