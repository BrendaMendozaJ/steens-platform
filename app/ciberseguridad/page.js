'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const modulosCiberseguridad = [
  {
    id: 1,
    titulo: '🚨 Reconoce el Ciberacoso',
    descripcion: 'Aprende a identificar señales de acoso online',
    completado: false,
    preguntas: [
      {
        pregunta: '¿Cuál de estas situaciones es una señal de ciberacoso?',
        opciones: [
          'Alguien te felicita por tu proyecto de ciencias',
          'Recibir mensajes insultantes repetidamente',
          'Un compañero te pregunta sobre la tarea',
          'Tu profesora te da feedback constructivo'
        ],
        correcta: 1,
        explicacion: 'Los mensajes insultantes repetidos son una clara señal de ciberacoso. Nunca debes tolerarlo.'
      },
      {
        pregunta: 'Si alguien te dice "eres muy bonita, no le digas a nadie que hablamos", ¿qué deberías hacer?',
        opciones: [
          'Sentirme halagada y seguir hablando',
          'Bloquear inmediatamente y contarle a un adulto de confianza',
          'Preguntarle por qué es secreto',
          'Darle mi número de teléfono'
        ],
        correcta: 1,
        explicacion: 'Los secretos sobre conversaciones son una señal de alerta. Siempre cuéntale a un adulto de confianza.'
      }
    ]
  },
  {
    id: 2,
    titulo: '🔒 Protege tu Información Personal',
    descripcion: 'Mantén tus datos seguros en internet',
    completado: false,
    preguntas: [
      {
        pregunta: '¿Qué información NUNCA debes compartir en redes sociales?',
        opciones: [
          'Tu comida favorita',
          'Tu dirección de casa y número de teléfono',
          'Tu materia favorita en el colegio',
          'Fotos de tu mascota'
        ],
        correcta: 1,
        explicacion: 'Tu dirección y teléfono son información privada que puede ponerte en peligro.'
      },
      {
        pregunta: '¿Cuál es una contraseña segura?',
        opciones: [
          '123456',
          'tu nombre + tu edad',
          'MiGat0Azul#2024!',
          'password'
        ],
        correcta: 2,
        explicacion: 'Una contraseña segura combina letras, números y símbolos, y no es fácil de adivinar.'
      }
    ]
  },
  {
    id: 3,
    titulo: '🤝 Busca Ayuda Cuando la Necesites',
    descripcion: 'Conoce a quién acudir y cómo pedir ayuda',
    completado: false,
    preguntas: [
      {
        pregunta: 'Si alguien te hace sentir incómoda online, ¿qué debes hacer PRIMERO?',
        opciones: [
          'Ignorarlo y esperar que pare',
          'Responder con insultos',
          'Bloquear a la persona y guardar evidencia',
          'Borrar tu cuenta'
        ],
        correcta: 2,
        explicacion: 'Bloquear y guardar evidencia te protege y ayuda a que otros puedan ayudarte.'
      },
      {
        pregunta: '¿A quién puedes contarle si te sientes acosada online?',
        opciones: [
          'Solo a tus amigas',
          'A padres, profesores o adultos de confianza',
          'A nadie, es mejor guardarlo en secreto',
          'Solo a personas en internet'
        ],
        correcta: 1,
        explicacion: 'Los adultos de confianza están ahí para protegerte. Nunca tengas miedo de pedir ayuda.'
      }
    ]
  }
]

const consejosCiberseguridad = [
  {
    icono: '🔐',
    titulo: 'Contraseñas Fuertes',
    consejo: 'Usa contraseñas únicas para cada cuenta. Combina letras, números y símbolos.',
    ejemplo: 'Ejemplo: MiPerr0Luna#2024!'
  },
  {
    icono: '👥',
    titulo: 'Privacidad en Redes',
    consejo: 'Configura tus perfiles como privados y solo acepta solicitudes de personas que conoces.',
    ejemplo: 'Revisa quién puede ver tus fotos y posts'
  },
  {
    icono: '🚫',
    titulo: 'Información Personal',
    consejo: 'NUNCA compartas tu dirección, teléfono, colegio o ubicación en tiempo real.',
    ejemplo: 'Evita fotos con uniformes o lugares reconocibles'
  },
  {
    icono: '🤔',
    titulo: 'Desconfía de Extraños',
    consejo: 'Si alguien que no conoces te contacta, especialmente adultos, ten mucho cuidado.',
    ejemplo: 'No aceptes regalos ni propuestas de encuentros'
  }
]

export default function Ciberseguridad() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [moduloActual, setModuloActual] = useState(null)
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [modulos, setModulos] = useState(modulosCiberseguridad)
  
  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])
  
  const iniciarModulo = (modulo) => {
    setModuloActual(modulo)
    setPreguntaActual(0)
    setRespuestas([])
    setMostrarResultado(false)
  }
  
  const responder = (opcionIndex) => {
    const pregunta = moduloActual.preguntas[preguntaActual]
    const esCorrecta = opcionIndex === pregunta.correcta
    
    const nuevaRespuesta = {
      pregunta: preguntaActual,
      respuesta: opcionIndex,
      correcta: esCorrecta,
      explicacion: pregunta.explicacion
    }
    
    const nuevasRespuestas = [...respuestas, nuevaRespuesta]
    setRespuestas(nuevasRespuestas)
    
    if (preguntaActual < moduloActual.preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      completarModulo(nuevasRespuestas)
    }
  }
  
  const completarModulo = (respuestasFinales) => {
    const correctas = respuestasFinales.filter(r => r.correcta).length
    const porcentaje = (correctas / respuestasFinales.length) * 100
    
    // Marcar módulo como completado
    setModulos(prev => prev.map(m => 
      m.id === moduloActual.id ? { ...m, completado: true } : m
    ))
    
    // Actualizar usuario con puntos
    if (user && porcentaje >= 70) {
      const updatedUser = {
        ...user,
        puntos: user.puntos + 50,
        medallas: [...(user.medallas || []), `🛡️ Guardiana Digital - ${moduloActual.titulo}`]
      }
      localStorage.setItem('steensUser', JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
    
    setMostrarResultado(true)
  }
  
  const volverAlMenu = () => {
    setModuloActual(null)
    setMostrarResultado(false)
  }
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>
  }
  
  // Vista de resultado del módulo
  if (mostrarResultado) {
    const correctas = respuestas.filter(r => r.correcta).length
    const porcentaje = (correctas / respuestas.length) * 100
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-effect rounded-3xl p-8 max-w-2xl w-full text-white">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {porcentaje >= 70 ? '🎉' : '💪'}
            </div>
            <h1 className="text-2xl font-bold mb-2 text-steens-pink">
              {porcentaje >= 70 ? '¡Módulo Completado!' : '¡Sigue Practicando!'}
            </h1>
            <p className="text-lg">
              {correctas}/{respuestas.length} respuestas correctas ({porcentaje.toFixed(0)}%)
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            {respuestas.map((respuesta, index) => (
              <div key={index} className={`steens-card rounded-2xl p-4 ${
                respuesta.correcta ? 'border-green-500/30' : 'border-red-500/30'
              }`}>
                <div className="flex items-center mb-2">
                  <span className={`text-2xl mr-3 ${
                    respuesta.correcta ? '✅' : '❌'
                  }`}></span>
                  <span className="font-semibold">Pregunta {index + 1}</span>
                </div>
                <p className="text-sm opacity-90">{respuesta.explicacion}</p>
              </div>
            ))}
          </div>
          
          {porcentaje >= 70 && (
            <div className="steens-card rounded-2xl p-4 mb-6 text-center">
              <div className="text-3xl mb-2">🏅</div>
              <p className="font-bold text-steens-pink">¡Nueva medalla desbloqueada!</p>
              <p className="text-sm">🛡️ Guardiana Digital - {moduloActual.titulo}</p>
              <p className="text-xs opacity-75 mt-2">+50 puntos ganados</p>
            </div>
          )}
          
          <div className="text-center space-y-3">
            <button
              onClick={volverAlMenu}
              className="w-full bg-steens-pink hover:bg-steens-magenta text-white font-bold py-3 px-6 rounded-2xl transition-all"
            >
              Continuar Aprendiendo
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  // Vista de pregunta del módulo
  if (moduloActual) {
    const pregunta = moduloActual.preguntas[preguntaActual]
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-effect rounded-3xl p-8 max-w-2xl w-full text-white">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-steens-pink">{moduloActual.titulo}</h1>
              <span className="steens-card px-3 py-1 rounded-xl text-sm">
                {preguntaActual + 1} de {moduloActual.preguntas.length}
              </span>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-2 mb-4">
              <div 
                className="bg-steens-pink h-2 rounded-full transition-all duration-300"
                style={{ width: `${((preguntaActual + 1) / moduloActual.preguntas.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-6">{pregunta.pregunta}</h2>
            
            <div className="space-y-3">
              {pregunta.opciones.map((opcion, index) => (
                <button
                  key={index}
                  onClick={() => responder(index)}
                  className="w-full p-4 text-left steens-card rounded-2xl transition-all hover:scale-105"
                >
                  <div className="flex items-center">
                    <span className="bg-steens-pink/20 text-steens-pink font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{opcion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Vista principal de ciberseguridad
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-3xl p-8 mb-8 text-white text-center">
          <div className="text-5xl mb-4">🛡️</div>
          <h1 className="text-3xl font-bold mb-3 text-steens-pink">Ciberseguridad para Chicas STEM</h1>
          <p className="text-lg opacity-90">Aprende a navegar segura en el mundo digital</p>
        </div>
        
        {/* Módulos Interactivos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📚 Módulos Interactivos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {modulos.map((modulo) => (
              <div key={modulo.id} className="steens-card rounded-3xl p-6 text-white">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{modulo.titulo.split(' ')[0]}</div>
                  <h3 className="text-lg font-bold text-steens-pink mb-2">
                    {modulo.titulo.substring(2)}
                  </h3>
                  <p className="text-sm opacity-90 mb-4">{modulo.descripcion}</p>
                </div>
                
                <button
                  onClick={() => iniciarModulo(modulo)}
                  className={`w-full py-3 px-4 rounded-2xl font-semibold transition-all ${
                    modulo.completado
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : 'bg-steens-pink/20 text-steens-pink hover:bg-steens-pink/30'
                  }`}
                >
                  {modulo.completado ? '✅ Completado' : 'Comenzar'}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Consejos Rápidos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">💡 Consejos Rápidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consejosCiberseguridad.map((consejo, index) => (
              <div key={index} className="steens-card rounded-2xl p-6 text-white hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl flex-shrink-0">{consejo.icono}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-steens-pink mb-2 text-lg">{consejo.titulo}</h3>
                    <p className="text-sm opacity-90 mb-3 leading-relaxed">{consejo.consejo}</p>
                    <div className="bg-steens-pink/20 text-steens-pink px-3 py-2 rounded-xl text-xs font-medium border border-steens-pink/30">
                      💡 {consejo.ejemplo}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recursos de Ayuda */}
        <div className="glass-effect rounded-3xl p-8 text-white text-center">
          <div className="text-4xl mb-4">🆘</div>
          <h2 className="text-2xl font-bold text-steens-pink mb-4">¿Necesitas Ayuda?</h2>
          <p className="mb-6 opacity-90">
            Si te sientes acosada o en peligro online, no estás sola. Siempre hay adultos dispuestos a ayudarte.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="steens-card rounded-xl p-4">
              <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
              <p className="font-semibold">Padres/Familia</p>
              <p className="text-xs opacity-75">Tu primera línea de apoyo</p>
            </div>
            <div className="steens-card rounded-xl p-4">
              <div className="text-2xl mb-2">👩‍🏫</div>
              <p className="font-semibold">Profesores</p>
              <p className="text-xs opacity-75">Están entrenados para ayudar</p>
            </div>
            <div className="steens-card rounded-xl p-4">
              <div className="text-2xl mb-2">📞</div>
              <p className="font-semibold">Línea de Ayuda</p>
              <p className="text-xs opacity-75">100 - Línea gratuita</p>
            </div>
          </div>
          
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-steens-pink hover:bg-steens-magenta text-white font-bold py-3 px-8 rounded-2xl transition-all"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}