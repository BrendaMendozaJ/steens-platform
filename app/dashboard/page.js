'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Icon } from '../components/Icons'

// Avatares disponibles (mismo array del perfil)
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

// Posts del feed para vista previa (versión ampliada)
const feedPreviewPosts = [
  {
    id: 1,
    author: "NASA Perú",
    avatar: "🚀",
    time: "hace 2 horas",
    content: "🌟 ¡Increíble! Una estudiante peruana de 17 años diseñó un sistema de purificación de agua usando nanotecnología. Su proyecto podría ayudar a comunidades rurales del Perú.",
    likes: 234,
    comments: 45,
    shares: 12,
    tags: ["nanotecnología", "agua", "innovación"],
    ageGroup: ["Pioneras", "Innovadoras"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 2,
    author: "Tech Girls Lima",
    avatar: "👩‍💻",
    time: "hace 4 horas",
    content: "💡 ¿Sabías que el 40% de las desarrolladoras de apps exitosas en Latinoamérica son menores de 25 años? ¡Tu edad es tu superpoder! 🦸‍♀️",
    likes: 189,
    comments: 67,
    shares: 23,
    tags: ["programación", "apps", "emprendimiento"],
    ageGroup: ["Pioneras", "Innovadoras"],
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 3,
    author: "Química Divertida",
    avatar: "⚗️",
    time: "hace 6 horas",
    content: "🧪 Experimento casero: Crea tu propio volcán químico con bicarbonato y vinagre. ¡Aprende sobre reacciones ácido-base mientras te diviertes! 🌋",
    likes: 289,
    comments: 112,
    shares: 45,
    tags: ["química", "experimentos", "educación"],
    ageGroup: ["Exploradoras"],
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 4,
    author: "Matemáticas Creativas",
    avatar: "🧮",
    time: "hace 8 horas",
    content: "✨ ¿Sabías que los fractales están en todas partes? Desde los copos de nieve hasta el brócoli. Las matemáticas son el arte de la naturaleza 🌿",
    likes: 203,
    comments: 45,
    shares: 67,
    tags: ["matemáticas", "naturaleza", "fractales"],
    ageGroup: ["Exploradoras", "Pioneras", "Innovadoras"],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 5,
    author: "Ingenieras del Futuro",
    avatar: "🏗️",
    time: "hace 10 horas",
    content: "🌉 ¡Orgullo peruano! Un equipo 100% femenino de ingenieras diseñó un puente sostenible en Cusco que conecta 3 comunidades rurales. La ingeniería cambia vidas 💪",
    likes: 456,
    comments: 89,
    shares: 78,
    tags: ["ingeniería", "sostenibilidad", "Perú"],
    ageGroup: ["Pioneras", "Innovadoras"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 6,
    author: "Biología Marina Perú",
    avatar: "🐠",
    time: "hace 12 horas",
    content: "🌊 Descubrimiento increíble: Nueva especie de alga bioluminiscente en nuestras costas peruanas. Su proteína podría revolucionar la medicina regenerativa 🧬",
    likes: 334,
    comments: 67,
    shares: 89,
    tags: ["biología", "marina", "descubrimiento"],
    ageGroup: ["Exploradoras", "Pioneras", "Innovadoras"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 7,
    author: "Robótica Educativa",
    avatar: "🤖",
    time: "hace 14 horas",
    content: "🔧 Tutorial viral: Cómo construir un robot que clasifica residuos usando Arduino y materiales reciclados. ¡Tecnología + sostenibilidad! ♻️",
    likes: 267,
    comments: 134,
    shares: 56,
    tags: ["robótica", "reciclaje", "Arduino"],
    ageGroup: ["Exploradoras", "Pioneras"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 8,
    author: "Emprendedoras Tech",
    avatar: "💼",
    time: "hace 16 horas",
    content: "🚀 Startup peruana creada por 3 chicas de 19 años recibe inversión de $500K para desarrollar app de educación STEM. ¡Los sueños sí se cumplen! 💫",
    likes: 567,
    comments: 123,
    shares: 89,
    tags: ["startup", "inversión", "educación"],
    ageGroup: ["Pioneras", "Innovadoras"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 9,
    author: "Física Cuántica Fácil",
    avatar: "⚛️",
    time: "hace 18 horas",
    content: "🌌 Experimento mental: Si pudieras teletransportarte usando física cuántica, ¿a qué laboratorio del mundo irías primero? Yo elegiría el CERN 🔬",
    likes: 178,
    comments: 89,
    shares: 23,
    tags: ["física", "cuántica", "experimento"],
    ageGroup: ["Pioneras", "Innovadoras"],
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 10,
    author: "Mujeres en IA",
    avatar: "🧠",
    time: "hace 20 horas",
    content: "🎯 Dato curioso: El primer algoritmo de la historia fue escrito por Ada Lovelace en 1843. Las mujeres siempre hemos sido pioneras en tech 👩‍💻",
    likes: 312,
    comments: 156,
    shares: 78,
    tags: ["IA", "historia", "mujeres"],
    ageGroup: ["Exploradoras", "Pioneras", "Innovadoras"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 11,
    author: "Astronomía Perú",
    avatar: "🌟",
    time: "hace 22 horas",
    content: "🔭 Esta noche podrás ver Júpiter desde Lima sin telescopio. ¡La astronomía nos conecta con el universo! Comparte tus fotos con #AstronomíaPerú ✨",
    likes: 289,
    comments: 67,
    shares: 45,
    tags: ["astronomía", "Júpiter", "observación"],
    ageGroup: ["Exploradoras", "Pioneras", "Innovadoras"],
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 12,
    author: "Científicas del Futuro",
    avatar: "🔬",
    time: "hace 1 día",
    content: "🧬 Investigadoras peruanas identificaron una bacteria que degrada plásticos en 48 horas. ¡La biotecnología salvando el planeta! 🌍",
    likes: 456,
    comments: 89,
    shares: 134,
    tags: ["biotecnología", "plásticos", "ambiente"],
    ageGroup: ["Pioneras", "Innovadoras"],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop&crop=center"
  }
]

// Algoritmo simplificado para vista previa - GARANTIZA 2 POSTS
const getPersonalizedPreview = (user) => {
  const userInterests = user.intereses || []
  const userSegment = user.segmento
  
  // Puntuación para cada post
  const scoredPosts = feedPreviewPosts.map(post => {
    let score = 0
    
    // Puntos por segmento de edad
    if (post.ageGroup.includes(userSegment)) {
      score += 50
    }
    
    // Puntos por intereses
    if (userInterests.length > 0) {
      const interestMatches = post.tags.filter(tag => 
        userInterests.some(interest => 
          interest.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(interest.toLowerCase())
        )
      ).length
      score += interestMatches * 20
    }
    
    // Puntos base para todos los posts (garantiza que siempre haya contenido)
    score += 10
    
    return { ...post, score }
  })
  
  // Ordenar por puntuación y tomar los 2 mejores
  const sortedPosts = scoredPosts.sort((a, b) => b.score - a.score)
  
  // GARANTIZAR SIEMPRE 6 POSTS
  return sortedPosts.slice(0, 6)
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [previewPosts, setPreviewPosts] = useState([])
  
  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // Generar vista previa personalizada
      const personalizedPreview = getPersonalizedPreview(parsedUser)
      setPreviewPosts(personalizedPreview)
    }
  }, [])
  
  const avatarActual = user?.avatar || avatares[0]
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>
  }
  
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* COLUMNA IZQUIERDA - FEED (50% del ancho en desktop, 100% en móvil) */}
      <div className="w-full lg:w-1/2 min-h-screen overflow-y-auto bg-gradient-to-b from-gray-900/50 to-black/50 lg:border-r border-white/10">
        <div className="p-4 sm:p-6">
          {/* Header del Feed */}
          <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-steens-purple to-steens-pink rounded-full 
                               flex items-center justify-center text-xl sm:text-2xl border-2 border-white/20">
                  {avatarActual.emoji}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold steens-gradient-text">Tu Feed STEM</h2>
                  <p className="text-xs sm:text-sm text-white/70">Personalizado para {user.segmento}</p>
                </div>
              </div>
              <Link href="/feed" className="ultra-modern-badge hover:scale-105 transition-transform text-xs px-3 py-1">
                Ver todo
              </Link>
            </div>
          </div>

          {/* Posts del Feed */}
          <div className="space-y-4 sm:space-y-6">
            {previewPosts.length >= 6 ? (
              previewPosts.map((post) => (
                <div key={post.id} className="steens-card p-4 sm:p-6 hover-lift cursor-pointer">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-lg sm:text-xl mr-2 sm:mr-3">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white text-xs sm:text-sm">{post.author}</p>
                      <p className="text-xs text-white/60">{post.time}</p>
                    </div>
                    <div className="bg-gradient-to-r from-steens-pink to-steens-magenta text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20">
                      Para ti
                    </div>
                  </div>
                  <p className="text-white mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                    {post.content}
                  </p>
                  {post.image && (
                    <div className="mb-3 sm:mb-4 rounded-xl overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.author}
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-white/70 mb-2 sm:mb-3">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>🔄 {post.shares}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              feedPreviewPosts.slice(0, 8).map((post) => (
                <div key={post.id} className="steens-card p-4 sm:p-6 hover-lift cursor-pointer">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-lg sm:text-xl mr-2 sm:mr-3">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white text-xs sm:text-sm">{post.author}</p>
                      <p className="text-xs text-white/60">{post.time}</p>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20">
                      Destacado
                    </div>
                  </div>
                  <p className="text-white mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                    {post.content}
                  </p>
                  {post.image && (
                    <div className="mb-3 sm:mb-4 rounded-xl overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.author}
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-white/70 mb-2 sm:mb-3">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>🔄 {post.shares}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Botón para ver más */}
          <div className="text-center mt-6">
            <Link href="/feed" className="bg-steens-purple hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Ver más posts
            </Link>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA - DASHBOARD CONTENT (50% del ancho en desktop, 100% en móvil) */}
      <div className="w-full lg:w-1/2 min-h-screen overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header personalizado compacto */}
          <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Link href="/perfil" className="group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-steens-purple to-steens-pink rounded-full 
                                 flex items-center justify-center text-xl sm:text-2xl border-2 border-white/20 
                                 hover:border-steens-purple transition-all duration-200 hover:scale-105">
                    {avatarActual.emoji}
                  </div>
                </Link>
                <div>
                  <h1 className="text-lg sm:text-xl font-black steens-gradient-text">
                    ¡Hola, {user.nombre}! 🌟
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-white/80">{user.grado} • {user.edad} años</p>
                </div>
              </div>
              
              {/* Estadísticas */}
              <div className="flex space-x-2 sm:space-x-3">
                <div className="steens-card p-2 sm:p-3 text-center hover-lift">
                  <p className="text-xs font-semibold text-white/80 mb-1">Puntos</p>
                  <p className="text-sm sm:text-lg font-black steens-gradient-text">{user.puntos}</p>
                </div>
                <div className="steens-card p-2 sm:p-3 text-center hover-lift">
                  <p className="text-xs font-semibold text-white/80 mb-1">Medallas</p>
                  <p className="text-sm sm:text-lg font-black text-steens-pink">{user.medallas?.length || 0}</p>
                </div>
              </div>
            </div>
            
            {/* Perfil separado */}
            <div className="flex justify-end">
              <Link href="/perfil" className="steens-card p-3 hover-lift group flex items-center space-x-2">
                <div className="text-lg">👤</div>
                <div>
                  <p className="text-xs font-semibold text-white/80">Mi Perfil</p>
                  <p className="text-xs text-steens-pink">{avatarActual.name}</p>
                </div>
              </Link>
            </div>
            
            {/* Medallas compactas */}
            {user.medallas && user.medallas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.medallas.slice(0, 2).map((medalla, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 text-yellow-200 px-2 py-1 rounded-full text-xs font-semibold">
                    {medalla}
                  </div>
                ))}
                {user.medallas.length > 2 && (
                  <Link href="/perfil" className="bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-full text-xs font-semibold transition-colors">
                    +{user.medallas.length - 2} más
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-3">
                <div className="text-2xl">🎯</div>
                <div className="flex-1">
                  <p className="font-semibold text-steens-pink text-sm">¡Completa tu primer test!</p>
                  <p className="text-xs opacity-90">Descubre tu potencial STEM</p>
                </div>
                <Link href="/test-vocacional" className="ultra-modern-badge hover:scale-105 transition-transform text-xs">
                  Empezar
                </Link>
              </div>
            )}
          </div>

          {/* Módulos principales en grid compacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Test Vocacional */}
            <Link href="/test-vocacional" className="steens-card p-4 sm:p-6 text-white hover-lift group">
              <div className="text-center">
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <Icon name="Brain" className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <h2 className="text-base sm:text-lg font-black mb-2 steens-gradient-text">Test Vocacional</h2>
                <p className="text-white text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">Descubre tu camino STEM ideal</p>
                <div className="ultra-modern-badge group-hover:scale-110 transition-transform text-xs">
                  {user.testCompletado ? 'Ver resultados' : 'Comenzar'}
                </div>
              </div>
            </Link>
            
            {/* Chat Seguro */}
            <Link href="/chat" className="steens-card p-4 sm:p-6 text-white hover-lift group">
              <div className="text-center">
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <Icon name="Chat" className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <h2 className="text-base sm:text-lg font-black mb-2 steens-gradient-text">Chat Seguro</h2>
                <p className="text-white text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">Conecta con chicas STEM</p>
                <div className="ultra-modern-badge group-hover:scale-110 transition-transform text-xs">
                  Ir al chat
                </div>
              </div>
            </Link>
            
            {/* Comunidad */}
            <Link href="/comunidad" className="steens-card p-4 sm:p-6 text-white hover-lift group">
              <div className="text-center">
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <Icon name="Scientist" className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <h2 className="text-base sm:text-lg font-black mb-2 steens-gradient-text">Comunidad</h2>
                <p className="text-white text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">Referentes peruanas</p>
                <div className="ultra-modern-badge group-hover:scale-110 transition-transform text-xs">
                  Explorar
                </div>
              </div>
            </Link>
            
            {/* Ciberseguridad */}
            <Link href="/ciberseguridad" className="steens-card p-4 sm:p-6 text-white hover-lift group">
              <div className="text-center">
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <Icon name="Shield" className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <h2 className="text-base sm:text-lg font-black mb-2 steens-gradient-text">Ciberseguridad</h2>
                <p className="text-white text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">Navega segura en internet</p>
                <div className="ultra-modern-badge group-hover:scale-110 transition-transform text-xs">
                  Aprender
                </div>
              </div>
            </Link>
            
            {/* Mentorías */}
            <Link href="/mentorias" className="steens-card p-4 sm:p-6 text-white hover-lift group">
              <div className="text-center">
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <Icon name="Achievement" className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <h2 className="text-base sm:text-lg font-black mb-2 steens-gradient-text">Mentorías</h2>
                <p className="text-white text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">Conecta con universitarias</p>
                <div className="ultra-modern-badge group-hover:scale-110 transition-transform text-xs">
                  {user.areaPrincipal ? 'Ver mentoras' : 'Descubrir'}
                </div>
              </div>
            </Link>

            {/* Retos STEM */}
            <Link href="/retos-demo" className="steens-card p-4 sm:p-6 text-white hover-lift group">
              <div className="text-center">
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <Icon name="Rocket" className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <h2 className="text-base sm:text-lg font-black mb-2 steens-gradient-text">Retos STEM</h2>
                <p className="text-white text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">Desafíos del Perú</p>
                <div className="ultra-modern-badge group-hover:scale-110 transition-transform text-xs">
                  Ver retos
                </div>
              </div>
            </Link>
          </div>
          
          {/* Mensaje motivacional */}
          <div className="glass-effect rounded-3xl p-6 text-center text-white">
            <div className="mb-4 flex justify-center">
              <Icon name="Achievement" className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-black mb-2 steens-gradient-text">¡Tu futuro STEM te espera!</h3>
            <p className="text-white text-sm">Cada paso que das te acerca más a tus sueños.</p>
          </div>
        </div>
      </div>
    </div>
  )
}