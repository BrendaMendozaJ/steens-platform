'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Deshabilitar generación estática
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Retos() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [filtroCategoria, setFiltroCategoria] = useState('Todos')
  const [filtroDificultad, setFiltroDificultad] = useState('Todos')
  const [retoSeleccionado, setRetoSeleccionado] = useState(null)
  
  // Datos de retos simplificados
  const retosSTEM = [
    {
      id: 1,
      titulo: 'Desafío Agua Segura',
      descripcion: 'Diseña un sistema de purificación de agua usando materiales locales peruanos.',
      dificultad: 'Intermedio',
      categoria: 'Ingeniería Ambiental',
      puntos: 150,
      icono: '💧',
      tiempo: '2-3 horas',
      participantes: 47
    },
    {
      id: 2,
      titulo: 'Energía Renovable Andina',
      descripcion: 'Calcula el potencial solar y eólico de una comunidad en los Andes peruanos.',
      dificultad: 'Avanzado',
      categoria: 'Energías Renovables',
      puntos: 200,
      icono: '⚡',
      tiempo: '3-4 horas',
      participantes: 23
    },
    {
      id: 3,
      titulo: 'App para Agricultura',
      descripcion: 'Prototipa una app que ayude a agricultores peruanos con predicciones climáticas.',
      dificultad: 'Básico',
      categoria: 'Tecnología',
      puntos: 100,
      icono: '🌱',
      tiempo: '1-2 horas',
      participantes: 89
    }
  ]
  
  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])
  
  const categorias = ['Todos', 'Ingeniería Ambiental', 'Energías Renovables', 'Tecnología']
  const dificultades = ['Todos', 'Básico', 'Intermedio', 'Avanzado']
  
  const retosFiltrados = retosSTEM.filter(reto => {
    const categoriaMatch = filtroCategoria === 'Todos' || reto.categoria === filtroCategoria
    const dificultadMatch = filtroDificultad === 'Todos' || reto.dificultad === filtroDificultad
    return categoriaMatch && dificultadMatch
  })
  
  const iniciarReto = (reto) => {
    setRetoSeleccionado(reto)
  }
  
  const completarReto = () => {
    if (retoSeleccionado) {
      if (user) {
        const updatedUser = {
          ...user,
          puntos: user.puntos + retoSeleccionado.puntos,
          medallas: [...(user.medallas || []), `${retoSeleccionado.titulo}`]
        }
        localStorage.setItem('steensUser', JSON.stringify(updatedUser))
        setUser(updatedUser)
        alert(`¡Felicidades! Has completado el reto "${retoSeleccionado.titulo}" y ganado ${retoSeleccionado.puntos} puntos 🎉`)
      } else {
        alert(`¡Excelente trabajo! Para guardar tu progreso y ganar ${retoSeleccionado.puntos} puntos, regístrate en STEENS 🚀`)
      }
      setRetoSeleccionado(null)
    }
  }
  
  // Vista detallada del reto
  if (retoSeleccionado) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setRetoSeleccionado(null)}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all"
              >
                ← Volver a retos
              </button>
              <div className="steens-card px-4 py-2 rounded-xl">
                <span className="text-sm font-semibold">{retoSeleccionado.puntos} puntos</span>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{retoSeleccionado.icono}</div>
              <h1 className="text-3xl font-bold mb-3 text-steens-pink">{retoSeleccionado.titulo}</h1>
              <p className="text-lg opacity-90 mb-4">{retoSeleccionado.descripcion}</p>
              
              <div className="flex justify-center space-x-4 text-sm">
                <span className={`px-3 py-1 rounded-full ${
                  retoSeleccionado.dificultad === 'Básico' ? 'bg-green-500/20 text-green-300' :
                  retoSeleccionado.dificultad === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {retoSeleccionado.dificultad}
                </span>
                <span className="bg-steens-purple/20 text-steens-purple px-3 py-1 rounded-full">
                  {retoSeleccionado.categoria}
                </span>
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                  ⏱️ {retoSeleccionado.tiempo}
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={completarReto}
                className="bg-steens-pink hover:bg-steens-magenta text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
              >
                ✅ Marcar como Completado
              </button>
              <p className="text-xs opacity-75 mt-3">
                {user 
                  ? `Al completar ganarás ${retoSeleccionado.puntos} puntos y una nueva medalla`
                  : `Regístrate para guardar tu progreso y ganar ${retoSeleccionado.puntos} puntos`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Vista principal de retos
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-3xl p-8 mb-8 text-white text-center">
          <div className="text-5xl mb-4 animate-bounce-gentle">🚀</div>
          <h1 className="text-4xl font-bold mb-3 steens-gradient bg-clip-text text-transparent">
            Retos STEM del Perú
          </h1>
          <p className="text-lg opacity-90 mb-4">
            Resuelve problemas reales de nuestro país y gana puntos
          </p>
          
          {!user && (
            <div className="bg-steens-pink/20 border border-steens-pink/30 rounded-2xl p-4 mt-4">
              <p className="text-sm font-semibold text-steens-pink mb-2">👋 ¡Hola, visitante!</p>
              <p className="text-xs opacity-90">
                Puedes explorar todos los retos. Para guardar tu progreso y ganar puntos, 
                <a href="/registro" className="text-steens-pink font-semibold hover:underline ml-1">regístrate aquí</a>
              </p>
            </div>
          )}
        </div>
        
        {/* Filtros */}
        <div className="glass-effect rounded-2xl p-6 mb-8 text-white">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-3 text-steens-pink">Filtrar por Categoría:</label>
              <div className="flex flex-wrap gap-2">
                {categorias.map(categoria => (
                  <button
                    key={categoria}
                    onClick={() => setFiltroCategoria(categoria)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      filtroCategoria === categoria
                        ? 'bg-steens-pink text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-3 text-steens-pink">Filtrar por Dificultad:</label>
              <div className="flex flex-wrap gap-2">
                {dificultades.map(dificultad => (
                  <button
                    key={dificultad}
                    onClick={() => setFiltroDificultad(dificultad)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      filtroDificultad === dificultad
                        ? 'bg-steens-magenta text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {dificultad}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid de Retos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {retosFiltrados.map((reto) => (
            <div key={reto.id} className="steens-card rounded-3xl p-6 text-white hover:scale-105 transition-all cursor-pointer">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{reto.icono}</div>
                <h3 className="text-xl font-bold mb-2 text-steens-pink">{reto.titulo}</h3>
                <p className="text-sm opacity-90 mb-4 leading-relaxed">{reto.descripcion}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold">Categoría:</span>
                  <span className="bg-steens-purple/20 text-steens-purple px-2 py-1 rounded-full">
                    {reto.categoria}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold">Dificultad:</span>
                  <span className={`px-2 py-1 rounded-full ${
                    reto.dificultad === 'Básico' ? 'bg-green-500/20 text-green-300' :
                    reto.dificultad === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {reto.dificultad}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold">Tiempo:</span>
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                    ⏱️ {reto.tiempo}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold">Participantes:</span>
                  <span className="bg-steens-magenta/20 text-steens-magenta px-2 py-1 rounded-full">
                    👥 {reto.participantes}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => iniciarReto(reto)}
                className="w-full bg-steens-pink/20 hover:bg-steens-pink/40 text-steens-pink font-bold py-3 px-4 rounded-2xl transition-all"
              >
                Comenzar Reto • {reto.puntos} pts
              </button>
            </div>
          ))}
        </div>
        
        {/* Botón volver */}
        <div className="text-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-2xl transition-all font-semibold"
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}