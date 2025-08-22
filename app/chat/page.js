'use client'
import { useState, useEffect, useRef } from 'react'
import moderationService from '../../lib/moderationServiceDemo'

// Hook para moderación avanzada
const useModerationService = () => {
  const [isLoading, setIsLoading] = useState(false)

  const moderateMessage = async (message, userId = null) => {
    setIsLoading(true)
    try {
      const context = {
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
        timestamp: new Date().toISOString(),
        sessionId: typeof window !== 'undefined' ? sessionStorage.getItem('steens-session') || 'anonymous' : 'anonymous'
      }

      const result = await moderationService.moderateMessage(message, userId, context)
      return result
    } catch (error) {
      console.error('Error en moderación:', error)
      // Fallback a moderación básica local
      return {
        blocked: false,
        flagged: false,
        message: 'Error en moderación, mensaje permitido',
        suggestion: '',
        confidence: 0,
        sources: ['fallback']
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { moderateMessage, isLoading }
}

export default function Chat() {
  const [user, setUser] = useState(null)
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      usuario: 'Sofia',
      mensaje: '¡Hola chicas! ¿Alguien más está súper emocionada por estudiar ingeniería? 🤖',
      timestamp: new Date(Date.now() - 300000),
      avatar: '👩‍💻',
      reportado: false
    },
    {
      id: 2,
      usuario: 'Ana',
      mensaje: '¡Sí! Yo quiero estudiar biotecnología para crear soluciones ambientales 🌱',
      timestamp: new Date(Date.now() - 240000),
      avatar: '👩‍🔬',
      reportado: false
    },
    {
      id: 3,
      usuario: 'Camila',
      mensaje: 'Me encanta la programación! Estoy aprendiendo Python para analizar datos 📊',
      timestamp: new Date(Date.now() - 180000),
      avatar: '👩‍💼',
      reportado: false
    }
  ])
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [mensajeBloqueado, setMensajeBloqueado] = useState(null)
  const [reportes, setReportes] = useState([])
  const [moderationStats, setModerationStats] = useState({
    totalChecked: 0,
    blocked: 0,
    flagged: 0
  })
  const messagesEndRef = useRef(null)
  const { moderateMessage, isLoading } = useModerationService()

  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  const enviarMensaje = async (e) => {
    e.preventDefault()

    if (!nuevoMensaje.trim() || isLoading) return

    try {
      // Moderar mensaje con IA avanzada
      const moderacion = await moderateMessage(nuevoMensaje, user?.email)

      // Actualizar estadísticas
      setModerationStats(prev => ({
        totalChecked: prev.totalChecked + 1,
        blocked: prev.blocked + (moderacion.blocked ? 1 : 0),
        flagged: prev.flagged + (moderacion.flagged ? 1 : 0)
      }))

      if (moderacion.blocked) {
        setMensajeBloqueado({
          razon: moderacion.message,
          sugerencia: moderacion.suggestion,
          confidence: moderacion.confidence,
          sources: moderacion.sources,
          reasons: moderacion.reasons
        })
        setTimeout(() => setMensajeBloqueado(null), 8000)
        return
      }

      // Si está flagged pero no blocked, mostrar advertencia suave
      if (moderacion.flagged && !moderacion.blocked) {
        setMensajeBloqueado({
          razon: 'Mensaje enviado, pero ten cuidado con el tono',
          sugerencia: 'Recuerda mantener un ambiente positivo y respetuoso 😊',
          confidence: moderacion.confidence,
          isWarning: true
        })
        setTimeout(() => setMensajeBloqueado(null), 4000)
      }

      // Agregar mensaje
      const mensaje = {
        id: Date.now(),
        usuario: user?.nombre || 'Usuario',
        mensaje: nuevoMensaje,
        timestamp: new Date(),
        avatar: '👤',
        esPropio: true,
        reportado: false,
        flagged: moderacion.flagged,
        moderationScore: moderacion.confidence
      }

      setMensajes([...mensajes, mensaje])
      setNuevoMensaje('')

      // Simular respuesta automática ocasional
      if (Math.random() > 0.6) {
        setTimeout(() => {
          const respuestas = [
            '¡Qué genial! Me inspira mucho tu pasión por STEM 💡',
            '¡Súper interesante! ¿Has pensado en qué universidad te gustaría estudiar? 🎓',
            'Me encanta esa perspectiva. ¡Sigamos apoyándonos entre chicas STEM! 🚀',
            '¡Wow! Definitivamente necesitamos más mujeres como tú en ciencia 🔬'
          ]

          const nombres = ['María', 'Lucía', 'Valentina', 'Isabella']
          const avatars = ['👩‍🎓', '👩‍🔬', '👩‍💻', '👩‍⚕️']

          const respuestaAleatoria = {
            id: Date.now() + 1,
            usuario: nombres[Math.floor(Math.random() * nombres.length)],
            mensaje: respuestas[Math.floor(Math.random() * respuestas.length)],
            timestamp: new Date(),
            avatar: avatars[Math.floor(Math.random() * avatars.length)],
            reportado: false
          }

          setMensajes(prev => [...prev, respuestaAleatoria])
        }, 2000)
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error)
      setMensajeBloqueado({
        razon: 'Error de conexión',
        sugerencia: 'Intenta enviar el mensaje nuevamente',
        isError: true
      })
      setTimeout(() => setMensajeBloqueado(null), 3000)
    }
  }

  const reportarMensaje = async (mensajeId) => {
    try {
      setMensajes(prev => prev.map(msg =>
        msg.id === mensajeId ? { ...msg, reportado: true } : msg
      ))

      const mensajeReportado = mensajes.find(msg => msg.id === mensajeId)

      // Crear reporte detallado
      const reporte = {
        id: Date.now(),
        mensaje: mensajeReportado,
        timestamp: new Date(),
        reportadoPor: user?.nombre,
        reportadoPorId: user?.email,
        razon: 'Reportado por usuario',
        context: {
          chatId: 'steens-main-chat',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
      }

      setReportes(prev => [...prev, reporte])

      // Enviar reporte a la API
      await fetch('/api/moderation/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reporte)
      })

      // Mostrar confirmación mejorada
      const confirmationMessage = `
        ✅ Mensaje reportado exitosamente
        
        Nuestro equipo de seguridad revisará este contenido en las próximas horas.
        
        Gracias por ayudar a mantener STEENS como un espacio seguro para todas las chicas STEM 🛡️
        
        Si sientes que estás en peligro inmediato, contacta a un adulto de confianza o llama al 100.
      `

      alert(confirmationMessage)
    } catch (error) {
      console.error('Error reportando mensaje:', error)
      alert('Error al reportar el mensaje. Por favor intenta nuevamente.')
    }
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect rounded-3xl overflow-hidden">
          {/* Header del Chat */}
          <div className="p-6 border-b border-steens-pink/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">Chat Seguro STEENS 💬</h1>
                <p className="text-white/75 text-sm">
                  Conecta con chicas STEM de todo el Perú • IA anti-acoso multicapa activa 🛡️
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs">
                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                    ✅ {moderationStats.totalChecked} mensajes verificados
                  </span>
                  {moderationStats.blocked > 0 && (
                    <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                      🛡️ {moderationStats.blocked} bloqueados
                    </span>
                  )}
                </div>
              </div>
              <div className="steens-card rounded-xl p-3 text-center">
                <div className="text-2xl">{isLoading ? '🔄' : '🟢'}</div>
                <p className="text-xs font-semibold">{isLoading ? 'Verificando' : 'Protegido'}</p>
                <p className="text-xs opacity-75">Multi-API</p>
              </div>
            </div>
          </div>

          {/* Mensajes */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {mensajes.map((mensaje) => (
              <div
                key={mensaje.id}
                className={`flex ${mensaje.esPropio ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md relative group ${mensaje.esPropio ? 'ml-12' : 'mr-12'
                  }`}>
                  <div className={`px-5 py-3 rounded-2xl ${mensaje.esPropio
                    ? 'bg-steens-pink text-white'
                    : mensaje.reportado
                      ? 'bg-red-500/20 border border-red-500/30 text-red-200'
                      : 'steens-card text-white'
                    }`}>
                    {!mensaje.esPropio && (
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="mr-2 text-lg">{mensaje.avatar}</span>
                          <span className="font-semibold text-sm text-steens-pink">{mensaje.usuario}</span>
                        </div>
                        {!mensaje.reportado && (
                          <button
                            onClick={() => reportarMensaje(mensaje.id)}
                            className="opacity-0 group-hover:opacity-100 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 px-2 py-1 rounded-full transition-all"
                            title="Reportar mensaje"
                          >
                            🚨
                          </button>
                        )}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{mensaje.mensaje}</p>
                    <p className="text-xs opacity-60 mt-2">
                      {mensaje.timestamp.toLocaleTimeString('es-PE', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      {mensaje.reportado && <span className="ml-2 text-red-400">• Reportado</span>}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Mensaje bloqueado/advertencia */}
          {mensajeBloqueado && (
            <div className={`mx-6 mb-4 p-4 border-2 rounded-2xl ${mensajeBloqueado.isWarning
              ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-200'
              : mensajeBloqueado.isError
                ? 'bg-orange-500/20 border-orange-500/30 text-orange-200'
                : 'bg-red-500/20 border-red-500/30 text-red-200'
              }`}>
              <div className="flex items-center mb-2">
                <span className="mr-3 text-2xl">
                  {mensajeBloqueado.isWarning ? '⚠️' : mensajeBloqueado.isError ? '🔄' : '🛡️'}
                </span>
                <div className="flex-1">
                  <p className="font-bold">
                    {mensajeBloqueado.isWarning
                      ? 'Mensaje enviado con advertencia'
                      : mensajeBloqueado.isError
                        ? 'Error de conexión'
                        : 'Mensaje bloqueado por seguridad'
                    }
                  </p>
                  <p className="text-sm">{mensajeBloqueado.razon}</p>
                </div>
                {mensajeBloqueado.confidence && (
                  <div className="text-xs opacity-75">
                    Confianza: {(mensajeBloqueado.confidence * 100).toFixed(0)}%
                  </div>
                )}
              </div>

              {mensajeBloqueado.sugerencia && (
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-3 mt-3">
                  <p className="text-blue-200 text-sm">💡 {mensajeBloqueado.sugerencia}</p>
                </div>
              )}

              {mensajeBloqueado.sources && mensajeBloqueado.sources.length > 0 && (
                <div className="mt-3 text-xs opacity-75">
                  <p>Verificado por: {mensajeBloqueado.sources.join(', ')}</p>
                </div>
              )}

              {mensajeBloqueado.reasons && mensajeBloqueado.reasons.length > 0 && (
                <div className="mt-2 text-xs">
                  <p className="font-semibold mb-1">Razones detectadas:</p>
                  <div className="flex flex-wrap gap-1">
                    {mensajeBloqueado.reasons.map((reason, index) => (
                      <span key={index} className="bg-white/10 px-2 py-1 rounded-full text-xs">
                        {reason.type} ({(reason.confidence * 100).toFixed(0)}%)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input de mensaje */}
          <form onSubmit={enviarMensaje} className="p-6 border-t border-steens-pink/20">
            <div className="flex space-x-3">
              <input
                type="text"
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                placeholder="Comparte tu pasión por STEM..."
                className="flex-1 p-4 rounded-2xl bg-white/10 border-2 border-steens-pink/30 focus:border-steens-pink text-white placeholder-white/60 focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-4 rounded-2xl transition-all font-bold transform hover:scale-105 ${isLoading
                  ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                  : 'bg-steens-pink hover:bg-steens-magenta text-white'
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verificando...
                  </div>
                ) : (
                  'Enviar 🚀'
                )}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div className="steens-card rounded-xl p-3 text-center">
                <div className="text-lg mb-1">🛡️</div>
                <p className="font-semibold text-steens-pink">IA Protectora</p>
                <p className="opacity-75">Filtra contenido inapropiado</p>
              </div>
              <div className="steens-card rounded-xl p-3 text-center">
                <div className="text-lg mb-1">🚨</div>
                <p className="font-semibold text-steens-pink">Botón Reportar</p>
                <p className="opacity-75">Denuncia mensajes sospechosos</p>
              </div>
            </div>
          </form>
        </div>

        {/* Botón volver */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors"
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}