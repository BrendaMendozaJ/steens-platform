'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '../components/Icons'

const retosDemo = [
  {
    id: 1,
    titulo: 'Desafío Agua Segura',
    descripcion: 'Diseña un sistema de purificación de agua para comunidades rurales peruanas',
    dificultad: 'Intermedio',
    puntos: 150,
    completado: false,
    icon: 'Water'
  },
  {
    id: 2,
    titulo: 'Energía Renovable Andina',
    descripcion: 'Calcula el potencial solar y eólico en los Andes peruanos',
    dificultad: 'Avanzado',
    puntos: 200,
    completado: false,
    icon: 'Energy'
  },
  {
    id: 3,
    titulo: 'App para Agricultura',
    descripcion: 'Crea una app que ayude a agricultores con predicciones climáticas',
    dificultad: 'Básico',
    puntos: 100,
    completado: false,
    icon: 'Plant'
  },
  {
    id: 4,
    titulo: 'Biodiversidad Amazónica',
    descripcion: 'Analiza datos de especies amazónicas usando Python',
    dificultad: 'Intermedio',
    puntos: 175,
    completado: false,
    icon: 'Butterfly'
  }
]

export default function RetosDemo() {
  const [retos, setRetos] = useState(retosDemo)
  const [retoSeleccionado, setRetoSeleccionado] = useState(null)
  
  const completarReto = (retoId) => {
    setRetos(prev => prev.map(reto => 
      reto.id === retoId ? { ...reto, completado: true } : reto
    ))
    alert('¡Reto completado! 🎉 Regístrate para guardar tu progreso')
  }
  
  if (retoSeleccionado) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 text-white">
            <button
              onClick={() => setRetoSeleccionado(null)}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all mb-6"
            >
              ← Volver a retos
            </button>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 text-steens-pink">
                {retoSeleccionado.titulo}
              </h1>
              <p className="text-lg opacity-90 mb-6">{retoSeleccionado.descripcion}</p>
              
              <div className="bg-white/10 rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-steens-pink">Pasos del Reto:</h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-center">
                    <span className="bg-steens-pink text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                    <span>Investiga el problema específico</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-steens-pink text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                    <span>Diseña tu solución innovadora</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-steens-pink text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                    <span>Calcula costos y viabilidad</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-steens-pink text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                    <span>Presenta tu propuesta final</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => completarReto(retoSeleccionado.id)}
                className="bg-steens-pink hover:bg-steens-magenta text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105"
              >
                ✅ Completar Reto ({retoSeleccionado.puntos} pts)
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-3xl p-8 mb-8 text-white text-center">
          <div className="mb-4 flex justify-center">
            <Icon name="Rocket" className="w-20 h-20" />
          </div>
          <h1 className="text-4xl font-bold mb-3 steens-gradient bg-clip-text text-transparent">
            Retos STEM del Perú
          </h1>
          <p className="text-lg opacity-90">
            Resuelve problemas reales de nuestro país
          </p>
        </div>
        
        {/* Grid de Retos */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {retos.map((reto) => (
            <div 
              key={reto.id} 
              className={`steens-card rounded-3xl p-6 text-white hover:scale-105 transition-all cursor-pointer ${
                reto.completado ? 'border-2 border-green-500/50' : ''
              }`}
              onClick={() => setRetoSeleccionado(reto)}
            >
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <Icon name={reto.icon} className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-steens-pink">
                  {reto.titulo}
                  {reto.completado && (
                    <div className="inline-block ml-2">
                      <Icon name="Achievement" className="w-5 h-5" />
                    </div>
                  )}
                </h3>
                <p className="text-sm opacity-90 mb-4">{reto.descripcion}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    reto.dificultad === 'Básico' ? 'bg-green-500/20 text-green-300' :
                    reto.dificultad === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {reto.dificultad}
                  </span>
                  <span className="bg-steens-purple/20 text-steens-purple px-3 py-1 rounded-full text-xs font-bold">
                    {reto.puntos} pts
                  </span>
                </div>
                
                <div className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                  reto.completado 
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-steens-pink/20 text-steens-pink hover:bg-steens-pink/30'
                }`}>
                  {reto.completado ? 'Completado ✅' : 'Comenzar Reto'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mensaje motivacional */}
        <div className="glass-effect rounded-2xl p-6 text-white text-center mb-6">
          <div className="mb-3 flex justify-center">
            <Icon name="Achievement" className="w-12 h-12" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-steens-pink">¡Cada reto cuenta!</h2>
          <p className="opacity-90">
            Estos desafíos están basados en problemas reales del Perú. Tu creatividad puede hacer la diferencia.
          </p>
        </div>
        
        {/* Botones de navegación */}
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all font-semibold">
            ← Dashboard
          </Link>
          <Link href="/registro" className="bg-steens-pink hover:bg-steens-magenta text-white px-6 py-3 rounded-2xl transition-all font-semibold">
            Registrarme para guardar progreso
          </Link>
        </div>
      </div>
    </div>
  )
}