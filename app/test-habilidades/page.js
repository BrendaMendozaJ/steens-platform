'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const preguntas = [
  {
    id: 1,
    tipo: 'logica',
    pregunta: '¿Cuál es el siguiente número en la secuencia: 2, 4, 8, 16, ?',
    opciones: ['24', '32', '20', '18'],
    respuestaCorrecta: 1,
    explicacion: 'Cada número se multiplica por 2'
  },
  {
    id: 2,
    tipo: 'patrones',
    pregunta: 'Si CÓDIGO = 123456 y DIGO = 4756, ¿cuánto es DICE?',
    opciones: ['4721', '4712', '4127', '4172'],
    respuestaCorrecta: 0,
    explicacion: 'Cada letra tiene un valor numérico asignado'
  },
  {
    id: 3,
    tipo: 'computacional',
    pregunta: 'Para ordenar una lista de 100 elementos, ¿cuál algoritmo sería más eficiente?',
    opciones: ['Buscar uno por uno', 'Dividir y conquistar', 'Probar todas las combinaciones', 'Ordenar al azar'],
    respuestaCorrecta: 1,
    explicacion: 'Divide y vencerás es más eficiente para grandes conjuntos'
  }
]

const referentesPeruanas = [
  {
    nombre: 'Mariana Costa',
    area: 'Tecnología',
    logro: 'Fundadora de Laboratoria',
    frase: 'La tecnología puede transformar vidas cuando es inclusiva'
  },
  {
    nombre: 'Fabiola León-Velarde',
    area: 'Medicina',
    logro: 'Primera mujer rectora de la UPCH',
    frase: 'La ciencia no tiene género, solo requiere pasión y dedicación'
  },
  {
    nombre: 'Antonieta Alva',
    area: 'Economía',
    logro: 'Ex Ministra de Economía',
    frase: 'Los números cuentan historias que pueden cambiar el mundo'
  }
]

export default function TestHabilidades() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [feedback, setFeedback] = useState('')
  
  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])
  
  const responder = (opcionIndex) => {
    const nuevasRespuestas = [...respuestas, {
      pregunta: preguntaActual,
      respuesta: opcionIndex,
      correcta: opcionIndex === preguntas[preguntaActual].respuestaCorrecta
    }]
    
    setRespuestas(nuevasRespuestas)
    
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      generarFeedback(nuevasRespuestas)
    }
  }
  
  const generarFeedback = (respuestasFinales) => {
    const correctas = respuestasFinales.filter(r => r.correcta).length
    const porcentaje = (correctas / preguntas.length) * 100
    
    let recomendacion = ''
    let referente = referentesPeruanas[0]
    let medalla = ''
    
    if (porcentaje >= 80) {
      recomendacion = 'Excelente! Tienes habilidades sobresalientes en lógica y pensamiento computacional. Te sugerimos explorar Ingeniería de Software o Ciencias de la Computación.'
      referente = referentesPeruanas[0]
      medalla = '🏅 Genia en Lógica'
    } else if (porcentaje >= 60) {
      recomendacion = 'Muy bien! Muestras buen razonamiento analítico. Podrías destacar en Ingeniería Industrial o Matemáticas Aplicadas.'
      referente = referentesPeruanas[2]
      medalla = '🔢 Pensadora Analítica'
    } else {
      recomendacion = 'Buen inicio! Tienes potencial para desarrollar. Te recomendamos explorar áreas como Biología o Medicina donde puedes aplicar la lógica de manera práctica.'
      referente = referentesPeruanas[1]
      medalla = '🌱 Curiosidad Infinita'
    }
    
    const feedbackPersonalizado = `${recomendacion}\n\nAl igual que ${referente.nombre}, ${referente.logro}, quien dice: "${referente.frase}". ¡Tú también puedes lograr grandes cosas en STEM!`
    
    setFeedback(feedbackPersonalizado)
    setMostrarResultado(true)
    
    // Actualizar usuario con medalla y puntos
    if (user) {
      const updatedUser = {
        ...user,
        medallas: [...(user.medallas || []), medalla],
        puntos: user.puntos + (correctas * 10)
      }
      localStorage.setItem('steensUser', JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
  }
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>
  }
  
  if (mostrarResultado) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-effect rounded-3xl p-8 max-w-2xl w-full text-white">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-4">¡Resultados de tu Test! 🎉</h1>
            <div className="text-6xl mb-4">🏅</div>
            <p className="text-xl font-semibold text-steens-pink">
              {respuestas.filter(r => r.correcta).length}/{preguntas.length} correctas
            </p>
          </div>
          
          <div className="bg-white/10 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-3">Tu Feedback Personalizado:</h2>
            <p className="leading-relaxed whitespace-pre-line">{feedback}</p>
          </div>
          
          <div className="text-center space-y-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-steens-purple hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Volver al Dashboard
            </button>
            
            <button
              onClick={() => {
                setPreguntaActual(0)
                setRespuestas([])
                setMostrarResultado(false)
              }}
              className="w-full border-2 border-white/30 hover:border-white/50 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Repetir Test
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  const pregunta = preguntas[preguntaActual]
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-8 max-w-2xl w-full text-white">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Test de Habilidades STEM</h1>
            <span className="text-sm opacity-75">
              {preguntaActual + 1} de {preguntas.length}
            </span>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-2 mb-4">
            <div 
              className="bg-steens-purple h-2 rounded-full transition-all duration-300"
              style={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">{pregunta.pregunta}</h2>
          
          <div className="space-y-3">
            {pregunta.opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => responder(index)}
                className="w-full p-4 text-left bg-white/10 hover:bg-white/20 rounded-xl transition-colors border border-white/20 hover:border-white/40"
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {opcion}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm opacity-75">
            Tipo: <span className="capitalize font-medium">{pregunta.tipo}</span>
          </p>
        </div>
      </div>
    </div>
  )
}