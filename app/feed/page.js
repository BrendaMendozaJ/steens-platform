'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Base de datos completa de posts STEM
const allFeedPosts = [
  {
    id: 1,
    author: "NASA Perú",
    avatar: "🚀",
    time: "hace 2 horas",
    content: "🌟 ¡Increíble! Una estudiante peruana de 17 años diseñó un sistema de purificación de agua usando nanotecnología. Su proyecto podría ayudar a comunidades rurales del Perú.",
    likes: 234,
    comments: 45,
    shares: 12,
    type: "achievement"
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
    type: "inspiration"
  },
  {
    id: 3,
    author: "Científicas del Futuro",
    avatar: "🔬",
    time: "hace 6 horas",
    content: "🧬 Nuevo descubrimiento: Investigadoras peruanas identificaron una bacteria que puede degradar plásticos en solo 48 horas. ¡La biotecnología salvando el planeta! 🌍",
    likes: 456,
    comments: 89,
    shares: 34,
    type: "science"
  },
  {
    id: 4,
    author: "Mujeres en IA",
    avatar: "🤖",
    time: "hace 8 horas",
    content: "🎯 Tip del día: Aprende Python con 15 minutos diarios. En 3 meses podrás crear tu primera IA. ¡Empieza hoy mismo! 💪",
    likes: 312,
    comments: 156,
    shares: 78,
    type: "tip"
  },
  {
    id: 5,
    author: "Ingenieras Peruanas",
    avatar: "⚙️",
    time: "hace 12 horas",
    content: "🏗️ ¡Orgullo nacional! El puente diseñado por un equipo 100% femenino de ingenieras peruanas fue inaugurado en Cusco. Conecta 5 comunidades rurales. 👏",
    likes: 678,
    comments: 234,
    shares: 145,
    type: "achievement"
  },
  {
    id: 6,
    author: "Matemáticas Divertidas",
    avatar: "📊",
    time: "hace 1 día",
    content: "🧮 Reto matemático: Si una bacteria se duplica cada 20 minutos, ¿cuántas bacterias habrá después de 2 horas si empezamos con 1? ¡Responde en los comentarios! 🤔",
    likes: 145,
    comments: 89,
    shares: 23,
    type: "challenge"
  },
  {
    id: 7,
    author: "Astronomía Perú",
    avatar: "🌟",
    time: "hace 1 día",
    content: "🔭 Esta noche podrás ver Júpiter a simple vista desde Lima. ¡La astronomía nos conecta con el universo! Comparte tus fotos usando #AstronomíaPerú ✨",
    likes: 289,
    comments: 67,
    shares: 45,
    type: "event"
  },
  {
    id: 8,
    author: "Emprendedoras Tech",
    avatar: "💼",
    time: "hace 2 días",
    content: "🚀 Startup peruana creada por 3 chicas de 19 años recibe inversión de $500K para desarrollar app de educación STEM. ¡Los sueños sí se cumplen! 💫",
    likes: 567,
    comments: 123,
    shares: 89,
    type: "success",
    tags: ["emprendimiento", "tecnología", "startup"],
    ageGroup: ["Pioneras", "Innovadoras"]
  },
  {
    id: 9,
    author: "Programadoras Peruanas",
    avatar: "💻",
    time: "hace 3 horas",
    content: "🐍 Tutorial: Crea tu primer chatbot con Python en 30 minutos. ¡Perfecto para principiantes! Incluye código completo y explicación paso a paso. 🤖",
    likes: 156,
    comments: 78,
    shares: 34,
    type: "tutorial",
    tags: ["programación", "python", "inteligencia artificial"],
    ageGroup: ["Exploradoras", "Pioneras"]
  },
  {
    id: 10,
    author: "Matemáticas Creativas",
    avatar: "🧮",
    time: "hace 5 horas",
    content: "✨ ¿Sabías que los fractales están en todas partes? Desde los copos de nieve hasta el brócoli. Las matemáticas son el arte de la naturaleza 🌿",
    likes: 203,
    comments: 45,
    shares: 67,
    type: "curiosity",
    tags: ["matemáticas", "naturaleza", "fractales"],
    ageGroup: ["Exploradoras", "Pioneras", "Innovadoras"]
  },
  {
    id: 11,
    author: "Química Divertida",
    avatar: "⚗️",
    time: "hace 7 horas",
    content: "🧪 Experimento casero: Crea tu propio volcán químico con bicarbonato y vinagre. ¡Aprende sobre reacciones ácido-base mientras te diviertes! 🌋",
    likes: 289,
    comments: 112,
    shares: 45,
    type: "experiment",
    tags: ["química", "experimentos", "educación"],
    ageGroup: ["Exploradoras"]
  },
  {
    id: 12,
    author: "Física Cuántica Fácil",
    avatar: "⚛️",
    time: "hace 10 horas",
    content: "🌌 La mecánica cuántica no es tan complicada como parece. Imagina que los electrones son como bailarinas que pueden estar en varios lugares a la vez ✨",
    likes: 178,
    comments: 89,
    shares: 23,
    type: "education",
    tags: ["física", "cuántica", "ciencia"],
    ageGroup: ["Pioneras", "Innovadoras"]
  },
  {
    id: 13,
    author: "Ingenieras del Futuro",
    avatar: "🏗️",
    time: "hace 12 horas",
    content: "🌉 Proyecto increíble: Estudiantes de ingeniería diseñaron un puente que se auto-repara usando materiales inteligentes. ¡El futuro es ahora! 🚀",
    likes: 445,
    comments: 156,
    shares: 78,
    type: "innovation",
    tags: ["ingeniería", "materiales", "innovación"],
    ageGroup: ["Pioneras", "Innovadoras"]
  },
  {
    id: 14,
    author: "Biología Marina Perú",
    avatar: "🐠",
    time: "hace 15 horas",
    content: "🌊 Descubrimiento: Nueva especie de pez bioluminiscente encontrada en las costas peruanas. Su luz podría revolucionar la biotecnología 💡",
    likes: 334,
    comments: 67,
    shares: 89,
    type: "discovery",
    tags: ["biología", "marina", "biotecnología"],
    ageGroup: ["Exploradoras", "Pioneras", "Innovadoras"]
  },
  {
    id: 15,
    author: "Robótica Educativa",
    avatar: "🤖",
    time: "hace 18 horas",
    content: "🔧 Construye tu primer robot con materiales reciclados. Tutorial completo para crear un robot que evita obstáculos. ¡Tecnología sostenible! ♻️",
    likes: 267,
    comments: 134,
    shares: 56,
    type: "diy",
    tags: ["robótica", "reciclaje", "sostenibilidad"],
    ageGroup: ["Exploradoras", "Pioneras"]
  }
]

// Algoritmo de personalización del feed
const personalizeFeeds = (user, allPosts) => {
  const userInterests = user.intereses || []
  const userSegment = user.segmento
  const userAge = user.edad
  
  // Puntuación base para cada post
  const scoredPosts = allPosts.map(post => {
    let score = 0
    
    // 1. Relevancia por intereses (peso: 40%)
    if (userInterests.length > 0) {
      const interestMatches = post.tags?.filter(tag => 
        userInterests.some(interest => 
          interest.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(interest.toLowerCase())
        )
      ).length || 0
      score += (interestMatches / Math.max(userInterests.length, 1)) * 40
    }
    
    // 2. Relevancia por segmento de edad (peso: 25%)
    if (post.ageGroup?.includes(userSegment)) {
      score += 25
    }
    
    // 3. Popularidad del post (peso: 20%)
    const popularity = (post.likes + post.comments * 2 + post.shares * 3) / 100
    score += Math.min(popularity, 20)
    
    // 4. Frescura del contenido (peso: 15%)
    const timeValue = post.time.includes('hora') ? 15 : 
                     post.time.includes('día') && parseInt(post.time) <= 2 ? 10 : 5
    score += timeValue
    
    // Bonus por tipo de contenido según segmento
    if (userSegment === 'Exploradoras' && ['experiment', 'diy', 'curiosity'].includes(post.type)) {
      score += 10
    } else if (userSegment === 'Pioneras' && ['tutorial', 'education', 'achievement'].includes(post.type)) {
      score += 10
    } else if (userSegment === 'Innovadoras' && ['innovation', 'success', 'discovery'].includes(post.type)) {
      score += 10
    }
    
    return { ...post, score }
  })
  
  // Ordenar por puntuación y agregar algo de aleatoriedad para variedad
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .map((post, index) => ({
      ...post,
      // Pequeña variación aleatoria para evitar feeds demasiado predecibles
      finalScore: post.score + (Math.random() * 5) - (index * 0.5)
    }))
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 8) // Mostrar los 8 posts más relevantes
}

export default function Feed() {
  const [user, setUser] = useState(null)
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [feedPosts, setFeedPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // Generar feed personalizado
      const personalizedFeed = personalizeFeeds(parsedUser, allFeedPosts)
      setFeedPosts(personalizedFeed)
      setIsLoading(false)
    }
  }, [])
  
  const toggleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts)
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId)
    } else {
      newLikedPosts.add(postId)
    }
    setLikedPosts(newLikedPosts)
  }
  
  const getPostTypeColor = (type) => {
    switch (type) {
      case 'achievement': return 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30'
      case 'science': return 'from-green-500/20 to-emerald-500/20 border-green-400/30'
      case 'inspiration': return 'from-purple-500/20 to-pink-500/20 border-purple-400/30'
      case 'tip': return 'from-blue-500/20 to-cyan-500/20 border-blue-400/30'
      case 'challenge': return 'from-red-500/20 to-pink-500/20 border-red-400/30'
      case 'event': return 'from-indigo-500/20 to-purple-500/20 border-indigo-400/30'
      case 'success': return 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30'
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-400/30'
    }
  }
  
  if (!user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🧠</div>
          <p className="text-xl">Personalizando tu feed STEM...</p>
          <p className="text-sm text-white/60 mt-2">Analizando tus intereses</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">📱 Tu Feed STEM Personalizado</h1>
              <p className="text-white/80">
                Contenido seleccionado para {user.segmento} 
                {user.intereses && user.intereses.length > 0 && (
                  <span> • Basado en tus intereses: {user.intereses.slice(0, 2).join(', ')}</span>
                )}
              </p>
            </div>
            <Link 
              href="/dashboard"
              className="bg-steens-purple hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              ← Volver
            </Link>
          </div>
        </div>
        
        {/* Crear Post */}
        <div className="glass-effect rounded-3xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-steens-purple to-steens-pink rounded-full flex items-center justify-center text-2xl">
              {user.avatar?.emoji || '👤'}
            </div>
            <div className="flex-1 bg-white/10 rounded-full px-6 py-3 cursor-pointer hover:bg-white/20 transition-colors">
              <p className="text-white/70">¿Qué descubrimiento STEM quieres compartir hoy?</p>
            </div>
          </div>
        </div>
        
        {/* Posts del Feed */}
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <div key={post.id} className={`glass-effect rounded-3xl p-6 text-white hover:scale-[1.02] transition-transform duration-200`}>
              {/* Header del Post */}
              <div className="flex items-center mb-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${getPostTypeColor(post.type)} rounded-full flex items-center justify-center text-2xl mr-4 border`}>
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">{post.author}</p>
                  <p className="text-sm text-white/60">{post.time}</p>
                </div>
                <div className="text-white/40 hover:text-white cursor-pointer">
                  ⋯
                </div>
              </div>
              
              {/* Contenido */}
              <p className="text-white mb-6 leading-relaxed text-lg">
                {post.content}
              </p>
              
              {/* Acciones */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    likedPosts.has(post.id)
                      ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                      : 'hover:bg-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{likedPosts.has(post.id) ? '❤️' : '🤍'}</span>
                  <span className="font-medium">
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                  <span className="text-lg">💬</span>
                  <span className="font-medium">{post.comments}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                  <span className="text-lg">🔄</span>
                  <span className="font-medium">{post.shares}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                  <span className="text-lg">📤</span>
                  <span className="font-medium">Compartir</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Cargar más */}
        <div className="text-center mt-8">
          <button className="bg-steens-purple hover:bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
            Cargar más publicaciones
          </button>
        </div>
      </div>
    </div>
  )
}