'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Colección de avatares de personas diversas
const avatares = [
  { id: 1, emoji: '👩🏻‍💻', name: 'Desarrolladora Clara' },
  { id: 2, emoji: '👩🏽‍🔬', name: 'Científica Maya' },
  { id: 3, emoji: '👩🏿‍🚀', name: 'Astronauta Zara' },
  { id: 4, emoji: '👩🏼‍⚕️', name: 'Doctora Emma' },
  { id: 5, emoji: '👩🏾‍🏫', name: 'Profesora Ava' },
  { id: 6, emoji: '👩🏻‍🔧', name: 'Ingeniera Luna' },
  { id: 7, emoji: '👩🏽‍💼', name: 'CEO Sofia' },
  { id: 8, emoji: '👩🏿‍🎓', name: 'Estudiante Mia' },
  { id: 9, emoji: '👩🏼‍🌾', name: 'Bióloga Noa' },
  { id: 10, emoji: '👩🏾‍🎨', name: 'Diseñadora Chloe' },
  { id: 11, emoji: '👩🏻‍⚖️', name: 'Abogada Tech Iris' },
  { id: 12, emoji: '👩🏽‍🍳', name: 'Chef Innovadora Vera' }
]

export default function Perfil() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [mostrarAvatares, setMostrarAvatares] = useState(false)
  
  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])
  
  const cerrarSesion = () => {
    localStorage.removeItem('steensUser')
    router.push('/')
  }
  
  const cambiarAvatar = (avatar) => {
    const updatedUser = { ...user, avatar: avatar }
    setUser(updatedUser)
    localStorage.setItem('steensUser', JSON.stringify(updatedUser))
    setMostrarAvatares(false)
  }
  
  const avatarActual = user?.avatar || avatares[0]
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>
  }
  
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header del Perfil */}
        <div className="glass-effect rounded-3xl p-8 mb-6 text-white text-center relative">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div 
              className="text-6xl cursor-pointer hover:scale-110 transition-transform duration-200 
                         bg-white/10 rounded-full p-4 border-2 border-steens-purple/30 hover:border-steens-purple"
              onClick={() => setMostrarAvatares(true)}
            >
              {avatarActual.emoji}
            </div>
            <button
              onClick={() => setMostrarAvatares(true)}
              className="absolute -bottom-1 -right-1 bg-steens-purple hover:bg-purple-600 
                         text-white rounded-full w-8 h-8 flex items-center justify-center 
                         text-sm transition-colors shadow-lg"
              title="Cambiar avatar"
            >
              ✏️
            </button>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{user.nombre}</h1>
          <p className="text-steens-pink font-semibold text-lg">{user.segmento}</p>
          <p className="opacity-75 text-sm mt-2">{user.email}</p>
          <p className="text-xs text-white/60 mt-1">{avatarActual.name}</p>
        </div>
        
        {/* Modal de Selección de Avatar */}
        {mostrarAvatares && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Elige tu Avatar</h3>
                <button
                  onClick={() => setMostrarAvatares(false)}
                  className="text-white/60 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {avatares.map((avatar) => (
                  <div
                    key={avatar.id}
                    onClick={() => cambiarAvatar(avatar)}
                    className={`cursor-pointer p-4 rounded-xl text-center transition-all duration-200
                               hover:scale-105 hover:shadow-lg ${
                                 avatarActual.id === avatar.id
                                   ? 'bg-steens-purple/30 border-2 border-steens-purple'
                                   : 'bg-white/10 hover:bg-white/20 border-2 border-transparent'
                               }`}
                  >
                    <div className="text-4xl mb-2">{avatar.emoji}</div>
                    <p className="text-xs text-white/80 font-medium">{avatar.name}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-white/60">
                  Selecciona el avatar que más te represente ✨
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Estadísticas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass-effect rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold text-steens-purple">{user.puntos}</div>
            <p className="text-sm opacity-75">Puntos STEM</p>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold text-steens-pink">{user.medallas?.length || 0}</div>
            <p className="text-sm opacity-75">Medallas</p>
          </div>
        </div>
        
        {/* Medallas */}
        {user.medallas && user.medallas.length > 0 && (
          <div className="glass-effect rounded-3xl p-6 mb-6 text-white">
            <h2 className="text-xl font-bold mb-4">🏅 Mis Medallas</h2>
            <div className="grid grid-cols-1 gap-3">
              {user.medallas.map((medalla, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-4 flex items-center">
                  <div className="text-2xl mr-3">🏅</div>
                  <div>
                    <p className="font-semibold">{medalla}</p>
                    <p className="text-xs opacity-75">Desbloqueada recientemente</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Intereses */}
        <div className="glass-effect rounded-3xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">🎯 Mis Intereses STEM</h2>
          <div className="flex flex-wrap gap-3">
            {user.intereses?.map((interes, index) => (
              <div key={index} className="group relative">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                               bg-gradient-to-r from-steens-purple to-steens-pink 
                               text-white shadow-lg hover:shadow-xl transform hover:scale-105 
                               transition-all duration-200 cursor-default">
                  <span className="mr-2">✨</span>
                  {interes}
                </span>
              </div>
            ))}
          </div>
          {(!user.intereses || user.intereses.length === 0) && (
            <p className="text-center text-white/60 py-4">
              Completa tu test vocacional para descubrir tus intereses STEM
            </p>
          )}
        </div>
        

        
        {/* Acciones */}
        <div className="space-y-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-steens-purple hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Volver al Dashboard
          </button>
          
          <button
            onClick={cerrarSesion}
            className="w-full border-2 border-red-400/50 hover:border-red-400 text-red-300 hover:text-red-200 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}