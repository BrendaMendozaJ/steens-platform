'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Base de datos de mentoras por área STEM
const mentorasPorArea = {
  'Ingeniería de Datos': [
    {
      id: 1,
      nombre: 'Sofia Martinez',
      universidad: 'UNI',
      año: '5to año',
      ciudad: 'Lima',
      especialidad: 'Data Science & Analytics',
      avatar: '👩‍💻',
      estado: 'disponible',
      experiencia: 'Practicante en Banco de Crédito del Perú, especializada en análisis predictivo',
      intereses: ['Python', 'Machine Learning', 'Visualización de datos'],
      testimonial: 'Elegí esta carrera porque me fascina encontrar patrones en los datos que pueden resolver problemas reales del Perú.',
      disponibilidad: 'Lunes a Viernes 7-9pm',
      rating: 4.9
    },
    {
      id: 2,
      nombre: 'Camila Rodriguez',
      universidad: 'UNSA',
      año: '4to año',
      ciudad: 'Arequipa',
      especialidad: 'Business Intelligence',
      avatar: '👩‍🔬',
      estado: 'ocupada',
      experiencia: 'Desarrollando sistema de análisis para empresa minera local',
      intereses: ['SQL', 'Tableau', 'Estadística'],
      testimonial: 'Desde provincia también se puede destacar en tech. Te ayudo a navegar los desafíos únicos.',
      disponibilidad: 'Fines de semana',
      rating: 4.8
    }
  ],
  'Desarrollo de Software': [
    {
      id: 3,
      nombre: 'Andrea Vega',
      universidad: 'UTEC',
      año: '3er año',
      ciudad: 'Lima',
      especialidad: 'Desarrollo Full Stack',
      avatar: '👩‍💻',
      estado: 'disponible',
      experiencia: 'Freelancer desarrollando apps para startups peruanas',
      intereses: ['React', 'Node.js', 'Mobile Apps'],
      testimonial: 'La programación me permitió crear soluciones que impactan miles de usuarios. ¡Es increíble!',
      disponibilidad: 'Martes y Jueves 6-8pm',
      rating: 5.0
    },
    {
      id: 4,
      nombre: 'Lucia Fernandez',
      universidad: 'PUCP',
      año: '5to año',
      ciudad: 'Lima',
      especialidad: 'Ingeniería de Software',
      avatar: '👩‍🚀',
      estado: 'disponible',
      experiencia: 'Líder técnica en startup de fintech, próxima a graduarse',
      intereses: ['Arquitectura de software', 'DevOps', 'Liderazgo técnico'],
      testimonial: 'Te enseño no solo a programar, sino a liderar equipos técnicos y tomar decisiones de arquitectura.',
      disponibilidad: 'Sábados 10am-12pm',
      rating: 4.9
    }
  ],
  'Biotecnología': [
    {
      id: 5,
      nombre: 'Valeria Castro',
      universidad: 'UNALM',
      año: '4to año',
      ciudad: 'Lima',
      especialidad: 'Biotecnología Agrícola',
      avatar: '👩‍🔬',
      estado: 'disponible',
      experiencia: 'Investigando mejoramiento genético de cultivos andinos',
      intereses: ['Genética', 'Agricultura sostenible', 'Investigación'],
      testimonial: 'Uso la biotecnología para potenciar la agricultura peruana. Es fascinante combinar ciencia y tradición.',
      disponibilidad: 'Miércoles 5-7pm',
      rating: 4.7
    }
  ]
}

export default function Mentorias() {
  const [user, setUser] = useState(null)
  const [mentoras, setMentoras] = useState([])
  const [filtroEstado, setFiltroEstado] = useState('todas')
  const [mentoriasSolicitadas, setMentoriasSolicitadas] = useState([])
  
  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // Obtener mentoras según el área principal del test vocacional
      const areaPrincipal = parsedUser.areaPrincipal || 'Desarrollo de Software'
      const mentorasRelevantes = mentorasPorArea[areaPrincipal] || mentorasPorArea['Desarrollo de Software']
      setMentoras(mentorasRelevantes)
      
      // Cargar mentorías solicitadas
      const mentoriasGuardadas = localStorage.getItem('mentoriasSolicitadas')
      if (mentoriasGuardadas) {
        setMentoriasSolicitadas(JSON.parse(mentoriasGuardadas))
      }
    }
  }, [])
  
  const solicitarMentoria = (mentoraId) => {
    const nuevaMentoria = {
      id: Date.now(),
      mentoraId,
      fechaSolicitud: new Date().toISOString(),
      estado: 'pendiente',
      tema: 'Orientación vocacional y experiencia universitaria'
    }
    
    const nuevasMentorias = [...mentoriasSolicitadas, nuevaMentoria]
    setMentoriasSolicitadas(nuevasMentorias)
    localStorage.setItem('mentoriasSolicitadas', JSON.stringify(nuevasMentorias))
  }
  
  const mentorasFiltradas = mentoras.filter(mentora => {
    if (filtroEstado === 'todas') return true
    return mentora.estado === filtroEstado
  })
  
  const yaSolicito = (mentoraId) => {
    return mentoriasSolicitadas.some(m => m.mentoraId === mentoraId)
  }
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>
  }
  
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold steens-gradient-text mb-2">
                Mentorías Personalizadas
              </h1>
              <p className="text-lg text-white/80">
                Conecta con universitarias de {user.areaPrincipal || 'tu área de interés'}
              </p>
            </div>
            <Link 
              href="/dashboard"
              className="bg-steens-purple hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              ← Dashboard
            </Link>
          </div>
          
          {/* Estadísticas personalizadas */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="steens-card rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-steens-pink">{mentoras.length}</div>
              <p className="text-sm text-white/80">Mentoras disponibles</p>
            </div>
            <div className="steens-card rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-steens-purple">{mentoriasSolicitadas.length}</div>
              <p className="text-sm text-white/80">Mentorías solicitadas</p>
            </div>
            <div className="steens-card rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-steens-magenta">
                {user.areaPrincipal ? '✓' : '?'}
              </div>
              <p className="text-sm text-white/80">
                {user.areaPrincipal ? 'Test completado' : 'Completa tu test'}
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="glass-effect rounded-3xl p-6 mb-8 text-white">
          <h2 className="text-xl font-bold text-steens-pink mb-4">Filtrar Mentoras</h2>
          <div className="flex flex-wrap gap-3">
            {['todas', 'disponible', 'ocupada'].map(estado => (
              <button
                key={estado}
                onClick={() => setFiltroEstado(estado)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all capitalize ${
                  filtroEstado === estado
                    ? 'bg-steens-pink text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {estado === 'todas' ? 'Todas' : estado}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Mentoras */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {mentorasFiltradas.map(mentora => (
            <div key={mentora.id} className="glass-effect rounded-3xl p-8 text-white">
              {/* Header de la mentora */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-steens-purple to-steens-pink rounded-full flex items-center justify-center text-3xl">
                    {mentora.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-steens-pink">{mentora.nombre}</h3>
                    <p className="text-sm text-white/80">{mentora.año} • {mentora.universidad}</p>
                    <p className="text-xs text-white/60">{mentora.ciudad}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    mentora.estado === 'disponible' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {mentora.estado === 'disponible' ? '🟢 Disponible' : '🟡 Ocupada'}
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm ml-1">{mentora.rating}</span>
                  </div>
                </div>
              </div>

              {/* Especialidad y experiencia */}
              <div className="mb-6">
                <h4 className="font-semibold text-steens-pink mb-2">Especialidad</h4>
                <p className="text-sm bg-steens-purple/20 rounded-xl p-3 mb-3">{mentora.especialidad}</p>
                <p className="text-sm text-white/90">{mentora.experiencia}</p>
              </div>

              {/* Testimonial */}
              <div className="mb-6">
                <blockquote className="italic text-steens-pink border-l-4 border-steens-pink pl-4 text-sm">
                  "{mentora.testimonial}"
                </blockquote>
              </div>

              {/* Intereses */}
              <div className="mb-6">
                <h4 className="font-semibold text-steens-pink mb-2">Áreas de expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {mentora.intereses.map((interes, index) => (
                    <span key={index} className="bg-white/10 text-white/80 px-2 py-1 rounded-full text-xs">
                      {interes}
                    </span>
                  ))}
                </div>
              </div>

              {/* Disponibilidad */}
              <div className="mb-6">
                <h4 className="font-semibold text-steens-pink mb-2">Disponibilidad</h4>
                <p className="text-sm text-white/80">{mentora.disponibilidad}</p>
              </div>

              {/* Botón de acción */}
              <div className="text-center">
                {yaSolicito(mentora.id) ? (
                  <div className="bg-green-500/20 text-green-400 py-3 px-6 rounded-xl font-semibold">
                    ✓ Mentoría solicitada
                  </div>
                ) : (
                  <button
                    onClick={() => solicitarMentoria(mentora.id)}
                    disabled={mentora.estado === 'ocupada'}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                      mentora.estado === 'disponible'
                        ? 'bg-steens-pink hover:bg-steens-magenta text-white'
                        : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {mentora.estado === 'disponible' ? '💬 Solicitar Mentoría' : 'No disponible'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mis Mentorías Solicitadas */}
        {mentoriasSolicitadas.length > 0 && (
          <div className="glass-effect rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-bold text-steens-pink mb-6">Mis Mentorías Solicitadas</h2>
            <div className="space-y-4">
              {mentoriasSolicitadas.map(mentoria => {
                const mentora = mentoras.find(m => m.id === mentoria.mentoraId)
                if (!mentora) return null
                
                return (
                  <div key={mentoria.id} className="steens-card rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{mentora.avatar}</div>
                      <div>
                        <h4 className="font-semibold">{mentora.nombre}</h4>
                        <p className="text-sm text-white/80">
                          Solicitada el {new Date(mentoria.fechaSolicitud).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                        Pendiente
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Mensaje si no completó el test */}
        {!user.areaPrincipal && (
          <div className="glass-effect rounded-3xl p-8 text-white text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-steens-pink mb-4">¡Completa tu Test Vocacional!</h2>
            <p className="text-lg mb-6">
              Para conectarte con las mentoras más relevantes para ti, necesitamos conocer tu perfil STEM.
            </p>
            <Link 
              href="/test-vocacional"
              className="bg-steens-pink hover:bg-steens-magenta text-white font-bold py-4 px-8 rounded-2xl transition-all inline-block"
            >
              Hacer Test Vocacional 🚀
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}