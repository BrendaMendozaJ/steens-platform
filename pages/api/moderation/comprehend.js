import comprehendService from '../../../lib/comprehendModerationService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { text, userId, context } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Texto requerido' });
    }

    // Validar longitud del mensaje
    if (text.length > 1000) {
      return res.status(400).json({ 
        blocked: true,
        message: 'Mensaje demasiado largo',
        suggestion: 'Reduce el tamaño de tu mensaje a menos de 1000 caracteres.'
      });
    }

    // Moderar con Comprehend
    const result = await comprehendService.moderateMessage(text, userId, context);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en API de moderación:', error);
    
    // Fallback seguro
    res.status(200).json({
      blocked: false,
      flagged: true,
      message: 'Error en moderación, mensaje permitido con precaución',
      suggestion: 'Mantén un tono respetuoso.',
      confidence: 0.5,
      reasons: [{ type: 'api_error', confidence: 0.5 }],
      sources: ['api_fallback']
    });
  }
}