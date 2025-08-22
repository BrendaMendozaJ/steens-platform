'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simulación de login - en producción validarías contra DynamoDB
    const userData = localStorage.getItem('steensUser')
    
    if (userData) {
      const user = JSON.parse(userData)
      if (user.email === formData.email) {
        router.push('/dashboard')
        return
      }
    }
    
    setError('Usuario no encontrado. ¿Ya tienes una cuenta?')
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-8 max-w-md w-full text-white">
        <h1 className="text-3xl font-bold mb-6 text-center steens-gradient-text">
          Iniciar Sesión
        </h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 mb-4 text-red-200 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60"
              placeholder="tu@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60"
              placeholder="Tu contraseña"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-steens-purple hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm opacity-75">
            ¿No tienes cuenta?{' '}
            <Link href="/registro" className="text-steens-pink hover:text-pink-300 font-semibold">
              Regístrate aquí
            </Link>
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-white/60 hover:text-white text-sm">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}