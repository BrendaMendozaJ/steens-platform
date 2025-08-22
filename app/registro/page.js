'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Registro() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    edad: '',
    grado: '',
    intereses: []
  })
  
  const [step, setStep] = useState(1)
  
  const interesesSTEM = [
    '💻 Programación', '🔢 Matemáticas', '⚛️ Física', '🧪 Química', 
    '🧬 Biología', '🏗️ Ingeniería', '🤖 Robótica', '🌟 Astronomía',
    '⚕️ Medicina', '🏛️ Arquitectura', '🎨 Diseño UX/UI', '🔒 Ciberseguridad'
  ]
  
  const grados = ['3ro de Secundaria', '4to de Secundaria', '5to de Secundaria', 'Ya acabé la escuela']
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const userData = {
      ...formData,
      fechaRegistro: new Date().toISOString(),
      medallas: [],
      puntos: 0,
      testCompletado: false
    }
    
    localStorage.setItem('steensUser', JSON.stringify(userData))
    router.push('/dashboard')
  }
  
  const toggleInteres = (interes) => {
    setFormData(prev => ({
      ...prev,
      intereses: prev.intereses.includes(interes)
        ? prev.intereses.filter(i => i !== interes)
        : [...prev.intereses, interes]
    }))
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="modern-container p-10 max-w-2xl w-full text-white animate-scale-in">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-4xl font-bold steens-gradient-text mb-3">
            ¡Bienvenida a STEENS!
          </h1>
          <p className="text-lg opacity-80 mt-3">Tu aventura STEM comienza aquí</p>
        </div>
        
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2) }} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-steens-pink">¿Cómo te llamas?</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="modern-input w-full p-4 text-white placeholder-white/60"
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-steens-pink">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="modern-input w-full p-4 text-white placeholder-white/60"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-steens-pink">Contraseña segura</label>
              <input
                type="password"
                required
                minLength="8"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="modern-input w-full p-4 text-white placeholder-white/60"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-steens-pink">Edad</label>
                <input
                  type="number"
                  required
                  min="14"
                  max="22"
                  value={formData.edad}
                  onChange={(e) => setFormData({...formData, edad: e.target.value})}
                  className="modern-input w-full p-4 text-white placeholder-white/60"
                  placeholder="Tu edad"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-steens-pink">Grado</label>
                <select
                  required
                  value={formData.grado}
                  onChange={(e) => setFormData({...formData, grado: e.target.value})}
                  className="modern-input w-full p-4 text-white"
                >
                  <option value="" className="bg-steens-purple text-white">Selecciona</option>
                  {grados.map(grado => (
                    <option key={grado} value={grado} className="bg-steens-purple text-white">{grado}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full btn-steens text-white font-bold py-5 px-8 rounded-2xl text-lg"
            >
              Continuar ✨
            </button>
          </form>
        )}
        
        {step === 2 && (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">¿Qué te emociona más? 🚀</h2>
              <p className="text-sm opacity-90">Selecciona todas las áreas STEM que te interesen</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {interesesSTEM.map(interes => (
                <button
                  key={interes}
                  type="button"
                  onClick={() => toggleInteres(interes)}
                  className={`p-4 rounded-2xl text-sm font-semibold transition-all transform hover:scale-105 ${
                    formData.intereses.includes(interes)
                      ? 'bg-steens-pink text-white shadow-lg'
                      : 'steens-card text-white/90 hover:bg-steens-pink/20'
                  }`}
                >
                  {interes}
                </button>
              ))}
            </div>
            
            <div className="steens-card rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="font-semibold text-steens-pink">¡Perfecto!</p>
              <p className="text-sm opacity-90 mt-1">
                Has seleccionado {formData.intereses.length} áreas de interés
              </p>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={formData.intereses.length === 0}
              className="w-full btn-steens disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 px-8 rounded-2xl text-lg"
            >
              🚀 ¡Crear mi cuenta STEENS!
            </button>
          </div>
        )}
      </div>
    </div>
  )
}