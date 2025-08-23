'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Icon } from './components/Icons'

export default function Home() {

  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState([])
  
  const iconNames = ['Rocket', 'Brain', 'Scientist', 'Energy', 'Achievement', 'Butterfly', 'SmartCity', 'Medical']
  
  const testimonios = [
    { nombre: 'María', edad: 16, mensaje: 'STeens me ayudó a descubrir mi pasión por la programación', icon: 'Brain' },
    { nombre: 'Ana', edad: 17, mensaje: 'Ahora sé que quiero estudiar biotecnología gracias al test', icon: 'Butterfly' },
    { nombre: 'Lucía', edad: 15, mensaje: 'Las referentes peruanas me inspiran mucho', icon: 'Achievement' }
  ]
  const [testimonioActual, setTestimonioActual] = useState(0)
  


  useEffect(() => {
    setIsVisible(true)
    
    
    
    // Cambiar testimonio cada 4 segundos
    const testimonioInterval = setInterval(() => {
      setTestimonioActual((prev) => (prev + 1) % testimonios.length)
    }, 4000)
    
    // Crear partículas flotantes
    const createParticles = () => {
      const newParticles = []
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 15,
          speed: Math.random() * 2 + 1,
          icon: iconNames[Math.floor(Math.random() * iconNames.length)]
        })
      }
      setParticles(newParticles)
    }
    
    createParticles()
    
    return () => {
      clearInterval(testimonioInterval)
    }
  }, [])
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute opacity-20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.id * 0.2}s`,
              animationDuration: `${particle.speed + 3}s`
            }}
          >
            <Icon name={particle.icon} className="w-6 h-6" />
          </div>
        ))}
      </div>
      
      {/* Partículas de conocimiento flotantes */}
      <div className="knowledge-particles">
        <div className="knowledge-particle"></div>
        <div className="knowledge-particle"></div>
        <div className="knowledge-particle"></div>
        <div className="knowledge-particle"></div>
        <div className="knowledge-particle"></div>
        <div className="knowledge-particle"></div>
        <div className="knowledge-particle"></div>
        <div className="knowledge-particle"></div>
      </div>
      
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className={`ultra-modern-container p-6 sm:p-8 lg:p-16 max-w-5xl w-full text-center text-white transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100 animate-bounce-in' : 'translate-y-20 opacity-0'
        }`}>
          
          {/* Header principal con animación */}
          <div className="mb-8">

            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 sm:mb-8 steens-gradient-text animate-gradient tracking-tight">
              STeens
            </h1>
            <div className="relative">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-6 space-y-4 sm:space-y-0">
                <div className="thinking-girl-animation sm:mr-4"></div>
                <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-neon font-bold animate-text-glow text-center">
                  Tu futuro STEM empieza aquí
                </p>
                <div className="dna-helix-animation sm:ml-4"></div>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 font-semibold text-shimmer animate-shimmer">
                STEM + Teens
              </p>
            </div>
          </div>
          
          {/* Estadísticas animadas con Scroll Stack */}
          <div className="scroll-stack grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="scroll-stack-item steens-card p-4 sm:p-6 lg:p-8 ultra-3d-card animate-fade-in-up">
              <div className="mb-4 flex justify-center">
                <div className="microscope-animation"></div>
              </div>
              <p className="font-black steens-gradient-text text-2xl sm:text-3xl mb-2">+500</p>
              <p className="text-sm sm:text-base font-semibold text-white">Chicas empoderadas</p>
            </div>
            <div className="scroll-stack-item steens-card p-4 sm:p-6 lg:p-8 ultra-3d-card animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="mb-4 flex justify-center">
                <div className="trophy-animation"></div>
              </div>
              <p className="font-black steens-gradient-text text-2xl sm:text-3xl mb-2">+1000</p>
              <p className="text-sm sm:text-base font-semibold text-white">Medallas ganadas</p>
            </div>
            <div className="scroll-stack-item steens-card p-4 sm:p-6 lg:p-8 ultra-3d-card animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="mb-4 flex justify-center">
                <div className="shield-animation"></div>
              </div>
              <p className="font-black steens-gradient-text text-2xl sm:text-3xl mb-2">100%</p>
              <p className="text-sm sm:text-base font-semibold text-white">Ambiente seguro</p>
            </div>
          </div>
          
          {/* Botones principales con efectos */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 mb-8 sm:mb-12">
            <Link href="/registro" className="group block w-full btn-steens text-white font-bold py-4 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-12 rounded-2xl sm:rounded-3xl transition-all transform relative overflow-hidden text-base sm:text-lg lg:text-xl animate-pulse-glow">
              <span className="relative flex items-center justify-center">
                <Icon name="Rocket" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-4 animate-bounce-gentle" />
                <span className="px-2">¡Regístrate para comenzar tu aventura STEM!</span>
                <Icon name="Achievement" className="w-6 h-6 sm:w-8 sm:h-8 ml-2 sm:ml-4 animate-bounce-gentle" />
              </span>
            </Link>
            
            <Link href="/login" className="flex items-center justify-center w-full steens-card hover-glow-extreme font-bold py-4 sm:py-6 px-6 sm:px-10 rounded-2xl sm:rounded-3xl transition-all text-base sm:text-lg" style={{color: '#ffffff'}}>
              <span className="text-white">Iniciar sesión</span>
              <Icon name="Chat" className="w-5 h-5 sm:w-7 sm:h-7 ml-2 sm:ml-4" />
            </Link>
          </div>
          
          {/* Testimonio rotativo */}
          <div className="steens-card rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 animate-pulse"></div>
            <div className="mb-3 flex justify-center">
              <Icon name={testimonios[testimonioActual].icon} className="w-8 h-8 sm:w-12 sm:h-12" />
            </div>
            <p className="font-semibold text-indigo-400 mb-2">
              {testimonios[testimonioActual].nombre}, {testimonios[testimonioActual].edad} años
            </p>
            <p className="text-sm italic opacity-90">
              "{testimonios[testimonioActual].mensaje}"
            </p>
            <div className="flex justify-center mt-3 space-x-2">
              {testimonios.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === testimonioActual ? 'bg-indigo-500' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Características principales con Scroll Stack */}
          <div className="scroll-stack grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="scroll-stack-item steens-card rounded-lg sm:rounded-xl p-3 sm:p-4 ultra-3d-card transition-all group">
              <div className="mb-2 flex justify-center">
                <div className="brain-ai-animation" style={{transform: 'scale(0.7)'}}></div>
              </div>
              <p className="font-semibold text-xs sm:text-sm">Test Vocacional IA</p>
            </div>
            <div className="scroll-stack-item steens-card rounded-lg sm:rounded-xl p-3 sm:p-4 ultra-3d-card transition-all group">
              <div className="mb-2 flex justify-center">
                <div className="shield-animation" style={{transform: 'scale(0.7)'}}></div>
              </div>
              <p className="font-semibold text-xs sm:text-sm">Chat Súper Seguro</p>
            </div>
            <div className="scroll-stack-item steens-card rounded-lg sm:rounded-xl p-3 sm:p-4 ultra-3d-card transition-all group">
              <div className="mb-2 flex justify-center group-hover:animate-pulse">
                <Icon name="Scientist" className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <p className="font-semibold text-xs sm:text-sm">Referentes Peruanas</p>
            </div>
            <div className="scroll-stack-item steens-card rounded-lg sm:rounded-xl p-3 sm:p-4 ultra-3d-card transition-all group">
              <div className="mb-2 flex justify-center">
                <div className="rocket-innovation" style={{transform: 'scale(0.7)'}}></div>
              </div>
              <p className="font-semibold text-xs sm:text-sm">Retos STEM</p>
            </div>
          </div>
          
          {/* Footer con seguridad */}
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-green-500/30">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-sm font-semibold text-green-300">Plataforma 100% Segura</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs opacity-75">
              <div className="flex items-center">
                <Icon name="Shield" className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span>Moderación IA multicapa</span>
              </div>
              <div className="flex items-center">
                <Icon name="Chat" className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span>Anti-ciberacoso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}