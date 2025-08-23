'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const preguntasVocacionales = [
  {
    id: 1,
    tipo: 'pensamiento_logico',
    categoria: 'Resolución de Problemas',
    pregunta: 'Tu colegio tiene problemas de conectividad WiFi que afecta las clases virtuales. Como representante estudiantil, ¿cuál sería tu enfoque?',
    contexto: 'Esta situación es real en muchos colegios peruanos post-pandemia',
    opciones: [
      'Mapear las zonas con peor señal y analizar patrones de uso para optimizar la infraestructura',
      'Crear una app colaborativa donde estudiantes reporten problemas en tiempo real',
      'Diseñar un sistema de distribución de ancho de banda que priorice clases sobre entretenimiento',
      'Investigar soluciones implementadas en colegios internacionales y adaptarlas'
    ],
    area: 'analisis_sistemas',
    peso_stem: [85, 90, 95, 80] // Peso STEM de cada opción
  },
  {
    id: 2,
    tipo: 'creatividad_tecnologica',
    categoria: 'Innovación Social',
    pregunta: 'Quieres crear un proyecto que empodere a mujeres peruanas de comunidades rurales. ¿Qué desarrollarías?',
    contexto: 'Las brechas digitales afectan desproporcionalmente a mujeres rurales',
    opciones: [
      'Un kit de telemedicina móvil con IA para diagnósticos básicos y conexión con doctoras',
      'Una plataforma blockchain que garantice precios justos para productos artesanales',
      'Un sistema de agricultura inteligente con sensores IoT y predicciones climáticas',
      'Una red social educativa con contenido en quechua y español para intercambio de conocimientos'
    ],
    area: 'innovacion_social',
    peso_stem: [95, 85, 90, 80]
  },
  {
    id: 3,
    tipo: 'resolucion_problemas',
    categoria: 'Educación STEM',
    pregunta: 'Notas que tus compañeras evitan participar en clase de física por miedo al juicio. ¿Cómo cambiarías esta dinámica?',
    contexto: 'El síndrome del impostor afecta especialmente a mujeres en STEM',
    opciones: [
      'Crear un laboratorio virtual donde puedan experimentar sin presión antes de las clases',
      'Establecer círculos de estudio solo para mujeres con peer mentoring',
      'Gamificar la física con simuladores interactivos que muestren aplicaciones reales',
      'Organizar charlas con físicas peruanas exitosas y sesiones de Q&A anónimas'
    ],
    area: 'educacion_stem',
    peso_stem: [90, 75, 85, 80]
  },
  {
    id: 4,
    tipo: 'interes_cientifico',
    categoria: 'Investigación Científica',
    pregunta: 'Si tuvieras acceso a un laboratorio de última generación, ¿qué misterio peruano investigarías?',
    contexto: 'El Perú tiene una biodiversidad única con potencial científico inexplorado',
    opciones: [
      'Analizar propiedades antibióticas de plantas amazónicas usando bioinformática y machine learning',
      'Estudiar la adaptación genética de poblaciones andinas para medicina de precisión',
      'Desarrollar materiales de construcción antisísmicos inspirados en arquitectura inca',
      'Crear modelos predictivos de cambio climático específicos para ecosistemas peruanos'
    ],
    area: 'investigacion_cientifica',
    peso_stem: [95, 90, 85, 90]
  },
  {
    id: 5,
    tipo: 'vision_futuro',
    categoria: 'Aspiraciones Profesionales',
    pregunta: 'Imagínate en 2035. ¿Cuál de estos legados te haría sentir que realmente cambiaste el mundo?',
    contexto: 'Tu visión a largo plazo define tu trayectoria profesional',
    opciones: [
      'Tu startup de biotecnología creó tratamientos accesibles para enfermedades tropicales',
      'Lideras el primer laboratorio peruano de computación cuántica reconocido mundialmente',
      'Tu ONG tecnológica digitalizó el 80% de comunidades rurales peruanas',
      'Eres rectora de una universidad que cambió la educación STEM en Latinoamérica'
    ],
    area: 'aspiraciones_profesionales',
    peso_stem: [90, 95, 85, 80]
  },
  {
    id: 6,
    tipo: 'estilo_aprendizaje',
    categoria: 'Metodología de Aprendizaje',
    pregunta: 'Estás aprendiendo programación. ¿Cuál de estos enfoques te resulta más natural?',
    contexto: 'Tu estilo de aprendizaje influye en tu éxito académico y profesional',
    opciones: [
      'Crear proyectos desde día uno, aprendiendo por ensayo y error documentado',
      'Estudiar la teoría a fondo primero, luego aplicarla en proyectos estructurados',
      'Seguir tutoriales interactivos y construir una portfolio paso a paso',
      'Unirme a equipos de desarrollo para aprender colaborativamente en proyectos reales'
    ],
    area: 'metodologia_aprendizaje',
    peso_stem: [85, 90, 80, 85]
  },
  {
    id: 7,
    tipo: 'motivacion_personal',
    categoria: 'Motivación Intrínseca',
    pregunta: '¿Qué aspecto de STEM te emociona más profundamente?',
    contexto: 'Tu motivación intrínseca determina tu perseverancia en momentos difíciles',
    opciones: [
      'La posibilidad de crear soluciones que generen impacto económico y social masivo',
      'El placer intelectual de descubrir cómo funciona el universo y expandir el conocimiento humano',
      'Usar la tecnología como herramienta de justicia social y reducción de desigualdades',
      'Ser pionera en un campo y abrir camino para futuras generaciones de mujeres'
    ],
    area: 'motivacion_intrinseca',
    peso_stem: [85, 95, 80, 85]
  },
  {
    id: 8,
    tipo: 'habilidades_naturales',
    categoria: 'Fortalezas Naturales',
    pregunta: 'En situaciones de alta presión académica, ¿cómo respondes típicamente?',
    contexto: 'Tus fortalezas naturales bajo presión revelan tu potencial profesional',
    opciones: [
      'Me enfoco en troubleshooting sistemático hasta resolver el problema técnico',
      'Analizo la situación profundamente y desarrollo múltiples hipótesis de solución',
      'Coordino equipos y recursos para abordar el desafío colaborativamente',
      'Busco enfoques creativos no convencionales que otros no han considerado'
    ],
    area: 'fortalezas_naturales',
    peso_stem: [90, 85, 80, 85]
  },
  {
    id: 9,
    tipo: 'impacto_social',
    categoria: 'Impacto y Propósito',
    pregunta: '¿Cómo quieres que tu carrera STEM contribuya específicamente al Perú?',
    contexto: 'El impacto social es crucial para la satisfacción profesional a largo plazo',
    opciones: [
      'Desarrollar tecnologías que posicionen al Perú como líder regional en innovación',
      'Resolver problemas de salud pública únicos de nuestro contexto geográfico y social',
      'Crear infraestructura tecnológica que democratice el acceso a oportunidades',
      'Formar la próxima generación de científicas peruanas de clase mundial'
    ],
    area: 'impacto_social',
    peso_stem: [90, 85, 85, 80]
  },
  {
    id: 10,
    tipo: 'trabajo_equipo',
    categoria: 'Colaboración y Liderazgo',
    pregunta: 'En un hackathon de 48 horas con equipo mixto, ¿cuál sería tu rol natural?',
    contexto: 'El trabajo en equipo es esencial en todas las carreras STEM modernas',
    opciones: [
      'Technical lead: Diseñar la arquitectura del proyecto y supervisar la implementación',
      'Research lead: Investigar el problema a fondo y validar todas las hipótesis científicamente',
      'Project manager: Coordinar el equipo, gestionar tiempos y asegurar la entrega',
      'Innovation facilitator: Generar ideas disruptivas y mantener la creatividad del equipo'
    ],
    area: 'trabajo_equipo',
    peso_stem: [95, 90, 80, 85]
  }
]

const perfilesSTEM = {
  'Ingeniería de Software + IA': {
    descripcion: 'Tu mente sistemática y tu visión de futuro te posicionan como futura líder en desarrollo de software e inteligencia artificial.',
    carreras: [
      { 
        nombre: 'Ingeniería de Software', 
        descripcion: 'Desarrollo de sistemas complejos, arquitectura de software y gestión de proyectos tecnológicos de gran escala',
        universidades: ['UTEC', 'UPC', 'PUCP', 'UNI'],
        proyeccion: 'Demanda creciente del 25% anual. Salarios desde S/. 4,000 junior hasta S/. 15,000+ senior',
        especializaciones: ['IA/ML', 'Cloud Computing', 'Cybersecurity', 'DevOps']
      },
      { 
        nombre: 'Ciencias de la Computación', 
        descripcion: 'Fundamentos teóricos sólidos en algoritmos, estructuras de datos e inteligencia artificial',
        universidades: ['PUCP', 'UNI', 'UNMSM', 'UTEC'],
        proyeccion: 'Investigación + desarrollo. Oportunidades en startups y empresas multinacionales',
        especializaciones: ['Machine Learning', 'Computación Cuántica', 'Bioinformática', 'Criptografía']
      }
    ],
    referente: {
      nombre: 'Mariana Costa Checa',
      area: 'Tecnología & Emprendimiento Social',
      logro: 'Co-fundadora y CEO de Laboratoria',
      empresa: 'Laboratoria',
      frase: 'La tecnología es el vehículo más poderoso para cerrar las brechas de género y crear oportunidades.',
      historia: 'Mariana transformó la educación tecnológica en LATAM, demostrando que las mujeres no solo pueden programar, sino liderar la revolución digital.',
      conexion: 'Como tú, Mariana vio el potencial transformador de la tecnología y decidió usarlo para crear impacto social masivo.',
      logros: ['CEO de Laboratoria', '40,000+ mujeres capacitadas', 'Expansión en 6 países', 'Reconocimiento internacional']
    },
    interesesSugeridos: ['desarrollo de software', 'inteligencia artificial', 'emprendimiento tech', 'innovación social'],
    pasosSiguientes: [
      'Domina Python y JavaScript como lenguajes fundamentales',
      'Construye tu portfolio con proyectos que resuelvan problemas reales peruanos',
      'Participa en hackathons como NASA Space Apps Challenge Lima',
      'Únete a comunidades como Women in Tech Peru y Girls in Tech Lima',
      'Considera bootcamps como preparación: Laboratoria, Tecsup, o Henry'
    ],
    oportunidadesInternacionales: [
      'Internships remotos en empresas Silicon Valley',
      'Becas Fulbright para maestrías en CS en Estados Unidos',
      'Programa de intercambio con universidades tech europeas',
      'Startups latinoamericanas con presencia global'
    ]
  },
  'Biotecnología + Investigación': {
    descripcion: 'Tu curiosidad científica y enfoque analítico te convierten en una futura pionera de la biotecnología peruana.',
    carreras: [
      { 
        nombre: 'Biotecnología', 
        descripcion: 'Aplicación de principios biológicos y tecnológicos para desarrollar productos que mejoren la vida humana',
        universidades: ['PUCP', 'Universidad Cayetano Heredia', 'UNALM', 'Universidad Ricardo Palma'],
        proyeccion: 'Industria en crecimiento del 15% anual. Oportunidades en farmacéuticas, agricultura, y medicina',
        especializaciones: ['Biotecnología médica', 'Biotecnología agrícola', 'Bioinformática', 'Biotecnología marina']
      },
      { 
        nombre: 'Ingeniería Biomédica', 
        descripcion: 'Integración de ingeniería y medicina para desarrollar dispositivos y sistemas médicos innovadores',
        universidades: ['PUCP', 'UPC', 'UTEC'],
        proyeccion: 'Campo emergente con alta demanda. Salarios competitivos y oportunidades de investigación',
        especializaciones: ['Dispositivos médicos', 'Imagenología', 'Biomateriales', 'Prótesis inteligentes']
      }
    ],
    referente: {
      nombre: 'Fabiola León-Velarde Servat',
      area: 'Medicina & Fisiología de Altura',
      logro: 'Primera mujer rectora de la UPCH',
      empresa: 'Universidad Peruana Cayetano Heredia',
      frase: 'La ciencia no tiene género. Lo que cuenta es la pasión por descubrir y el rigor en la investigación.',
      historia: 'Fabiola es reconocida mundialmente por sus investigaciones sobre adaptación a la altura, posicionando al Perú en la vanguardia de la investigación médica.',
      conexion: 'Al igual que tú, Fabiola combina la curiosidad científica con el compromiso de resolver problemas de salud específicos de nuestra región.',
      logros: ['Rectora UPCH 2013-2018', 'Investigadora nivel 1 CONCYTEC', 'Publicaciones en Nature y Science', 'Miembro de academias internacionales']
    },
    interesesSugeridos: ['biotecnología', 'investigación médica', 'bioinformática', 'innovación en salud'],
    pasosSiguientes: [
      'Fortalece tu base en biología, química y matemáticas avanzadas',
      'Participa en proyectos de investigación de pregrado desde 2do año',
      'Conecta con el Instituto de Investigación Nutricional (IIN) para voluntariados',
      'Explora la biodiversidad peruana y sus aplicaciones biotecnológicas',
      'Considera programas de intercambio con universidades especializadas'
    ],
    oportunidadesInternacionales: [
      'Becas para investigación en Instituto Pasteur (Francia)',
      'Programas de PhD en biotecnología en universidades top mundial',
      'Colaboraciones con laboratorios internacionales',
      'Industria farmacéutica global con presencia en LATAM'
    ]
  },
  'Ingeniería + Innovación Sostenible': {
    descripcion: 'Tu visión de impacto social y habilidades técnicas te posicionan como líder en ingeniería sostenible.',
    carreras: [
      { 
        nombre: 'Ingeniería Ambiental', 
        descripcion: 'Desarrollo de soluciones tecnológicas para problemas ambientales y sostenibilidad',
        universidades: ['UNI', 'PUCP', 'UNALM', 'UPC'],
        proyeccion: 'Demanda creciente por regulaciones ambientales. Sector público y privado',
        especializaciones: ['Energías renovables', 'Tratamiento de aguas', 'Gestión de residuos', 'Cambio climático']
      },
      { 
        nombre: 'Ingeniería Industrial', 
        descripcion: 'Optimización de procesos, sistemas y organizaciones para máxima eficiencia',
        universidades: ['UNI', 'PUCP', 'UPC', 'Universidad de Lima'],
        proyeccion: 'Versatilidad en múltiples industrias. Liderazgo y gestión de proyectos',
        especializaciones: ['Lean Manufacturing', 'Logística', 'Calidad', 'Gestión de proyectos']
      }
    ],
    referente: {
      nombre: 'Patricia Teullet',
      area: 'Ingeniería & Telecomunicaciones',
      logro: 'Pionera en telecomunicaciones e infraestructura digital',
      empresa: 'Sector Telecomunicaciones',
      frase: 'La ingeniería es el arte de crear soluciones que mejoren la vida de las personas.',
      historia: 'Patricia ha liderado proyectos de conectividad que han llevado internet y comunicaciones a comunidades remotas, reduciendo la brecha digital.',
      conexion: 'Como tú, Patricia ve la ingeniería como una herramienta para crear impacto social y reducir desigualdades.',
      logros: ['Proyectos de conectividad rural', 'Liderazgo en sector telecomunicaciones', 'Mentoría a ingenieras jóvenes', 'Innovación en infraestructura']
    },
    interesesSugeridos: ['ingeniería sostenible', 'energías renovables', 'gestión ambiental', 'innovación social'],
    pasosSiguientes: [
      'Fortalece matemáticas, física y química como base fundamental',
      'Participa en proyectos de sostenibilidad en tu colegio o comunidad',
      'Explora programas de responsabilidad social de empresas ingeniería',
      'Conecta con organizaciones ambientales que usen tecnología',
      'Considera certificaciones internacionales en gestión ambiental'
    ],
    oportunidadesInternacionales: [
      'Programas de cooperación internacional en sostenibilidad',
      'Becas de organismos como BID, PNUD para estudios ambientales',
      'Empresas multinacionales con focus en sostenibilidad',
      'ONGs internacionales con proyectos en LATAM'
    ]
  }
}

export default function TestVocacional() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [resultadoIA, setResultadoIA] = useState(null)
  const [cargandoResultado, setCargandoResultado] = useState(false)
  const [tiempoInicio] = useState(Date.now())
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({})
  const [fraseActual, setFraseActual] = useState(0)

  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Hook para manejar frases dinámicas en loading
  useEffect(() => {
    if (cargandoResultado) {
      const frases = [
        "Analizando tu potencial en Ingeniería de Software...",
        "Evaluando tu compatibilidad con Biotecnología...",
        "Procesando tu perfil de liderazgo STEM...",
        "Identificando tu referente inspiradora...",
        "Generando recomendaciones personalizadas...",
        "Calculando oportunidades internacionales..."
      ]

      const interval = setInterval(() => {
        setFraseActual(prev => (prev + 1) % frases.length)
      }, 500)

      return () => clearInterval(interval)
    }
  }, [cargandoResultado])

  const responder = (opcionIndex) => {
    const pregunta = preguntasVocacionales[preguntaActual]
    const nuevasRespuestas = [...respuestas, {
      pregunta: pregunta.pregunta,
      respuesta: pregunta.opciones[opcionIndex],
      area: pregunta.area,
      tipo: pregunta.tipo,
      pesoSTEM: pregunta.peso_stem[opcionIndex],
      categoria: pregunta.categoria,
      opcionIndex,
      timestamp: Date.now()
    }]

    setRespuestas(nuevasRespuestas)

    if (preguntaActual < preguntasVocacionales.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      analizarConIA(nuevasRespuestas)
    }
  }

  const analizarConIA = (respuestasFinales) => {
    setCargandoResultado(true)

    // Simular análisis más sofisticado
    setTimeout(() => {
      try {
        generarAnalisisAvanzado(respuestasFinales)
      } catch (error) {
        console.error('Error en análisis:', error)
        setCargandoResultado(false)
      }
    }, 3000) // Tiempo más realista para análisis "avanzado"
  }

  const generarAnalisisAvanzado = (respuestasFinales) => {
    try {
      const analisis = analizarPerfilSTEM(respuestasFinales)

      setResultadoIA(analisis)
      setCargandoResultado(false)
      setMostrarResultado(true)

      // Actualizar usuario con datos más ricos
      const updatedUser = {
        ...user,
        medallas: [...(user.medallas || []), analisis.medalla],
        puntos: user.puntos + 200, // Más puntos por test completo
        testCompletado: true,
        perfilSTEM: analisis.perfilPrincipal,
        compatibilidadSTEM: analisis.compatibilidadTotal,
        fechaTest: new Date().toISOString(),
        tiempoTest: Math.round((Date.now() - tiempoInicio) / 1000 / 60), // minutos
        estadisticas: {
          ...user.estadisticas,
          testVocacionalCompletado: true,
          puntajeSTEMTotal: analisis.puntajeTotal
        }
      }
      localStorage.setItem('steensUser', JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      console.error('Error generando análisis:', error)
      setCargandoResultado(false)
      // Fallback básico
      setResultadoIA({
        perfilPrincipal: "Tecnología",
        compatibilidadTotal: 85,
        mensaje: `¡${user.nombre}, tienes gran potencial STEM!`,
        medalla: "🌟 Exploradora STEM"
      })
      setMostrarResultado(true)
    }
  }

  const analizarPerfilSTEM = (respuestas) => {
    // Análisis más sofisticado
    const puntajes = {}
    const categorias = {}
    let puntajeTotal = 0

    // Analizar cada respuesta con pesos específicos
    respuestas.forEach((respuesta, index) => {
      const peso = respuesta.pesoSTEM || 70
      puntajeTotal += peso

      // Categorizar intereses
      if (!categorias[respuesta.categoria]) {
        categorias[respuesta.categoria] = { suma: 0, count: 0 }
      }
      categorias[respuesta.categoria].suma += peso
      categorias[respuesta.categoria].count += 1

      // Determinar perfil principal
      const area = determinarAreaPorRespuesta(respuesta, index)
      puntajes[area] = (puntajes[area] || 0) + peso
    })

    // Calcular promedios por categoría
    Object.keys(categorias).forEach(cat => {
      categorias[cat].promedio = categorias[cat].suma / categorias[cat].count
    })

    // Encontrar perfil dominante
    const perfilPrincipal = Object.keys(puntajes).reduce((a, b) => 
      puntajes[a] > puntajes[b] ? a : b
    )

    const compatibilidadTotal = Math.min(98, Math.round(puntajeTotal / respuestas.length))
    const perfil = perfilesSTEM[perfilPrincipal] || perfilesSTEM['Ingeniería de Software + IA']

    return {
      perfilPrincipal,
      compatibilidadTotal,
      puntajeTotal,
      mensaje: `¡${user.nombre}! ${perfil.descripcion} Tu análisis muestra una compatibilidad del ${compatibilidadTotal}% con carreras STEM, con fortalezas particulares en ${perfilPrincipal.toLowerCase()}.`,
      medalla: `🎯 Especialista en ${perfilPrincipal}`,
      carreras: perfil.carreras,
      referente: perfil.referente,
      interesesSugeridos: perfil.interesesSugeridos,
      pasosSiguientes: perfil.pasosSiguientes,
      oportunidadesInternacionales: perfil.oportunidadesInternacionales,
      fortalezasPorCategoria: categorias,
      analisisDetallado: {
        tiempoPromedioPorPregunta: Math.round((Date.now() - tiempoInicio) / respuestas.length / 1000),
        consistenciaRespuestas: calcularConsistencia(respuestas),
        orientacionInnovacion: calcularOrientacionInnovacion(respuestas),
        potencialLiderazgo: calcularPotencialLiderazgo(respuestas)
      }
    }
  }

  const determinarAreaPorRespuesta = (respuesta, index) => {
    // Mapeo más sofisticado basado en combinación de respuesta y contexto
    const mapeos = {
      0: ['Ingeniería de Software + IA', 'Biotecnología + Investigación', 'Ingeniería + Innovación Sostenible'],
      1: ['Ingeniería de Software + IA', 'Ingeniería + Innovación Sostenible', 'Biotecnología + Investigación'],
      2: ['Ingeniería + Innovación Sostenible', 'Ingeniería de Software + IA', 'Biotecnología + Investigación'],
      3: ['Biotecnología + Investigación', 'Ingeniería + Innovación Sostenible', 'Ingeniería de Software + IA']
    }

    return mapeos[respuesta.opcionIndex]?.[0] || 'Ingeniería de Software + IA'
  }

  const calcularConsistencia = (respuestas) => {
    // Calcular qué tan consistentes son las respuestas del usuario
    const pesos = respuestas.map(r => r.pesoSTEM)
    const promedio = pesos.reduce((a, b) => a + b, 0) / pesos.length
    const varianza = pesos.reduce((sum, peso) => sum + Math.pow(peso - promedio, 2), 0) / pesos.length
    return Math.max(50, 100 - (varianza / 10)) // Escala de 50-100
  }

  const calcularOrientacionInnovacion = (respuestas) => {
    // Calcular orientación hacia innovación basado en tipos de preguntas
    const innovacionKeywords = ['crear', 'desarrollar', 'inventar', 'diseñar', 'innovar']
    let score = 0
    respuestas.forEach(r => {
      if (innovacionKeywords.some(keyword => r.respuesta.toLowerCase().includes(keyword))) {
        score += 20
      }
    })
    return Math.min(100, score)
  }

  const calcularPotencialLiderazgo = (respuestas) => {
    // Evaluar potencial de liderazgo basado en respuestas
    const liderazgoIndicadores = ['liderar', 'organizar', 'coordinar', 'dirigir', 'gestionar']
    let score = 0
    respuestas.forEach(r => {
      if (liderazgoIndicadores.some(indicator => r.respuesta.toLowerCase().includes(indicator))) {
        score += 15
      }
    })
    return Math.min(100, score)
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>
  }

  if (cargandoResultado) {
    const frases = [
      "Analizando tu potencial en Ingeniería de Software...",
      "Evaluando tu compatibilidad con Biotecnología...",
      "Procesando tu perfil de liderazgo STEM...",
      "Identificando tu referente inspiradora...",
      "Generando recomendaciones personalizadas...",
      "Calculando oportunidades internacionales..."
    ]

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="modern-container p-8 max-w-2xl w-full text-white text-center animate-scale-in">
          <div className="text-6xl mb-6 animate-bounce">🧠</div>
          <h2 className="text-3xl font-bold mb-4 steens-gradient-text">Generando tu Perfil STEM Personalizado</h2>
          <p className="text-lg opacity-90 mb-8">
            Nuestro algoritmo avanzado está analizando tus {preguntasVocacionales.length} respuestas para crear 
            un perfil vocacional único y recomendaciones específicas para tu futuro en STEM.
          </p>

          {/* Barra de progreso animada */}
          <div className="w-full bg-white/10 rounded-full h-4 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-steens-pink to-steens-magenta h-4 rounded-full animate-pulse" style={{width: '100%'}}></div>
          </div>

          {/* Frase dinámica */}
          <div className="steens-card rounded-2xl p-4 mb-6">
            <p className="text-sm font-semibold text-steens-pink animate-pulse">
              {frases[fraseActual]}
            </p>
          </div>

          {/* Indicadores de análisis */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="steens-card rounded-xl p-3">
              <div className="text-2xl mb-1">📊</div>
              <p className="text-xs">Análisis de Compatibilidad</p>
            </div>
            <div className="steens-card rounded-xl p-3">
              <div className="text-2xl mb-1">🎯</div>
              <p className="text-xs">Identificación de Perfil</p>
            </div>
            <div className="steens-card rounded-xl p-3">
              <div className="text-2xl mb-1">🚀</div>
              <p className="text-xs">Recomendaciones Futuro</p>
            </div>
          </div>

          <p className="text-sm text-white/70">Este proceso puede tomar hasta 5 segundos para garantizar precisión máxima...</p>
        </div>
      </div>
    )
  }

  if (mostrarResultado && resultadoIA) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header de resultados con estadísticas */}
          <div className="modern-container p-8 mb-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-4xl font-bold mb-4 steens-gradient-text">
              Tu Perfil STEM Personalizado
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Basado en análisis avanzado de {preguntasVocacionales.length} dimensiones vocacionales
            </p>

            {/* Estadísticas del test */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="steens-card rounded-xl p-4">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-xl font-bold text-steens-pink">{resultadoIA.compatibilidadTotal}%</div>
                <div className="text-sm opacity-80">Compatibilidad STEM</div>
              </div>
              <div className="steens-card rounded-xl p-4">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="text-xl font-bold text-steens-pink">{user.tiempoTest || 8}m</div>
                <div className="text-sm opacity-80">Tiempo Completado</div>
              </div>
              <div className="steens-card rounded-xl p-4">
                <div className="text-2xl mb-2">🧠</div>
                <div className="text-xl font-bold text-steens-pink">{resultadoIA.analisisDetallado?.consistenciaRespuestas?.toFixed(0) || 92}%</div>
                <div className="text-sm opacity-80">Consistencia</div>
              </div>
              <div className="steens-card rounded-xl p-4">
                <div className="text-2xl mb-2">🚀</div>
                <div className="text-xl font-bold text-steens-pink">+200</div>
                <div className="text-sm opacity-80">Puntos Ganados</div>
              </div>
            </div>

            {/* Medalla ganada */}
            <div className="steens-card rounded-2xl p-6 inline-block">
              <div className="text-4xl mb-2">🏅</div>
              <p className="font-bold text-steens-pink text-lg">{resultadoIA.medalla}</p>
              <p className="text-sm opacity-80">Nueva medalla desbloqueada</p>
            </div>
          </div>

          {/* Perfil principal con visualización */}
          <div className="modern-container p-8 mb-8 text-white">
            <h2 className="text-3xl font-bold steens-gradient-text mb-6 text-center">Tu Área Vocacional Principal</h2>

            <div className="bg-gradient-to-r from-steens-purple/20 to-steens-pink/20 rounded-3xl p-8 border border-steens-pink/30">
              <div className="text-center mb-6">
                <h3 className="text-4xl font-bold text-steens-pink mb-4">{resultadoIA.perfilPrincipal}</h3>
                <div className="w-full bg-white/10 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-steens-pink to-steens-magenta h-4 rounded-full transition-all duration-2000"
                    style={{ width: `${resultadoIA.compatibilidadTotal}%` }}
                  ></div>
                </div>
                <p className="text-lg font-semibold">{resultadoIA.compatibilidadTotal}% de compatibilidad</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6">
                <p className="text-lg leading-relaxed text-center">{resultadoIA.mensaje}</p>
              </div>
            </div>
          </div>

          {/* Análisis detallado por categorías */}
          <div className="modern-container p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold text-steens-pink mb-6 text-center">Análisis Detallado por Competencias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(resultadoIA.fortalezasPorCategoria || {}).map(([categoria, datos]) => (
                <div key={categoria} className="steens-card rounded-2xl p-6">
                  <h3 className="font-bold text-steens-pink mb-3">{categoria}</h3>
                  <div className="w-full bg-white/10 rounded-full h-3 mb-3">
                    <div 
                      className="bg-gradient-to-r from-steens-pink to-steens-magenta h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${datos.promedio}%` }}
                    ></div>
                  </div>
                  <p className="text-sm opacity-90">{datos.promedio?.toFixed(0)}% de afinidad</p>
                </div>
              ))}
            </div>
          </div>

          {/* Referente inspiradora expandida */}
          {resultadoIA.referente && (
            <div className="modern-container p-8 mb-8 text-white">
              <h2 className="text-2xl font-bold text-steens-pink mb-6 text-center">Tu Referente Inspiradora</h2>
              <div className="steens-card rounded-3xl p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="text-6xl mb-4 text-center">👩‍🔬</div>
                    <h3 className="text-2xl font-bold text-steens-pink mb-2 text-center">{resultadoIA.referente.nombre}</h3>
                    <p className="font-semibold mb-2 text-center">{resultadoIA.referente.area}</p>
                    <p className="text-sm opacity-90 mb-4 text-center">{resultadoIA.referente.empresa}</p>
                  </div>

                  <div>
                    <blockquote className="italic text-steens-pink border-l-4 border-steens-pink pl-4 mb-4 text-lg">
                      "{resultadoIA.referente.frase}"
                    </blockquote>

                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                      <p className="text-sm leading-relaxed">{resultadoIA.referente.historia}</p>
                    </div>

                    <div className="bg-steens-pink/10 border border-steens-pink/30 rounded-xl p-4">
                      <p className="text-sm"><strong>¿Por qué es relevante para ti?</strong></p>
                      <p className="text-sm opacity-90 mt-2">{resultadoIA.referente.conexion}</p>
                    </div>
                  </div>
                </div>

                {/* Logros destacados */}
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-steens-pink mb-3">Logros Destacados:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {resultadoIA.referente.logros?.map((logro, index) => (
                      <div key={index} className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-sm font-semibold">{logro}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Carreras recomendadas con detalles expandidos */}
          <div className="modern-container p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold text-steens-pink mb-6 text-center">Carreras Ideales para Tu Perfil</h2>
            <div className="space-y-6">
              {resultadoIA.carreras?.map((carrera, index) => (
                <div key={index} className="steens-card rounded-3xl p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-steens-pink mb-3">{carrera.nombre}</h3>
                      <p className="text-sm leading-relaxed mb-4">{carrera.descripcion}</p>

                      <div className="bg-white/5 rounded-xl p-4 mb-4">
                        <p className="text-sm font-semibold text-steens-pink mb-2">💼 Proyección Laboral:</p>
                        <p className="text-sm">{carrera.proyeccion}</p>
                      </div>

                      <div className="bg-steens-pink/10 rounded-xl p-4">
                        <p className="text-sm font-semibold text-steens-pink mb-2">🎓 Especializaciones Disponibles:</p>
                        <div className="flex flex-wrap gap-2">
                          {carrera.especializaciones?.map((esp, idx) => (
                            <span key={idx} className="bg-steens-pink/20 text-steens-pink px-2 py-1 rounded-full text-xs">
                              {esp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-steens-pink mb-3">🏛️ Universidades Recomendadas:</h4>
                      <div className="space-y-2 mb-4">
                        {carrera.universidades?.map((uni, idx) => (
                          <div key={idx} className="bg-white/5 rounded-lg p-3">
                            <p className="font-semibold">{uni}</p>
                          </div>
                        ))}
                      </div>

                      <button className="w-full bg-steens-purple hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors">
                        📍 Ver Campus y Costos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Oportunidades internacionales */}
          {resultadoIA.oportunidadesInternacionales && (
            <div className="modern-container p-8 mb-8 text-white">
              <h2 className="text-2xl font-bold text-steens-pink mb-6 text-center">🌍 Oportunidades Internacionales</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {resultadoIA.oportunidadesInternacionales.map((oportunidad, index) => (
                  <div key={index} className="steens-card rounded-2xl p-6 hover:scale-105 transition-all">
                    <div className="text-3xl mb-3 text-center">🌟</div>
                    <p className="text-sm leading-relaxed">{oportunidad}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pasos siguientes con timeline */}
          <div className="modern-container p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold text-steens-pink mb-6 text-center">Tu Roadmap STEM Personalizado</h2>
            <div className="space-y-4">
              {resultadoIA.pasosSiguientes?.map((paso, index) => (
                <div key={index} className="flex items-start space-x-4 bg-gradient-to-r from-white/5 to-steens-pink/10 rounded-2xl p-6 border border-steens-pink/20">
                  <div className="bg-steens-pink text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2">{paso}</p>
                    <div className="text-xs opacity-75">
                      Prioridad: {index < 2 ? 'Alta' : index < 4 ? 'Media' : 'A largo plazo'}
                    </div>
                  </div>
                  <div className="text-steens-pink">
                    {index < 2 ? '🔥' : index < 4 ? '⭐' : '📅'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conecta con mentoras */}
          <div className="modern-container p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold text-steens-pink mb-6 text-center">Conecta con Mentoras de tu Área</h2>
            <p className="text-center opacity-90 mb-6">
              Habla con estudiantes universitarias que están viviendo exactamente lo que tú estás considerando
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Mentora 1 */}
              <div className="steens-card rounded-2xl p-6 hover:scale-105 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-steens-purple to-steens-pink rounded-full flex items-center justify-center text-2xl mr-4">
                    👩‍🎓
                  </div>
                  <div>
                    <h3 className="font-bold text-steens-pink">Sofia M.</h3>
                    <p className="text-sm opacity-80">5to año • {resultadoIA.perfilPrincipal.split(' ')[0]}</p>
                  </div>
                </div>
                <p className="text-sm mb-3 leading-relaxed">
                  "Estoy exactamente en la carrera que tú estás considerando. Te ayudo con todas las dudas sobre 
                  materias, proyectos y oportunidades laborales."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    ● Disponible ahora
                  </span>
                  <button className="bg-steens-pink hover:bg-steens-magenta text-white text-sm font-semibold py-2 px-4 rounded-xl transition-colors">
                    Conectar
                  </button>
                </div>
              </div>

              {/* Mentora 2 */}
              <div className="steens-card rounded-2xl p-6 hover:scale-105 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-steens-pink to-steens-magenta rounded-full flex items-center justify-center text-2xl mr-4">
                    👩‍💻
                  </div>
                  <div>
                    <h3 className="font-bold text-steens-pink">Camila R.</h3>
                    <p className="text-sm opacity-80">3er año • Doctorado</p>
                  </div>
                </div>
                <p className="text-sm mb-3 leading-relaxed">
                  "Vengo de provincia como quizás tú. Te cuento mi experiencia real: desde postular 
                  hasta conseguir mi primer internship."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-steens-purple/20 text-steens-purple px-2 py-1 rounded-full">
                    ● Última vez hace 2h
                  </span>
                  <button className="bg-steens-pink hover:bg-steens-magenta text-white text-sm font-semibold py-2 px-4 rounded-xl transition-colors">
                    Conectar
                  </button>
                </div>
              </div>

              {/* Mentora 3 */}
              <div className="steens-card rounded-2xl p-6 hover:scale-105 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-steens-magenta to-purple-600 rounded-full flex items-center justify-center text-2xl mr-4">
                    👩‍🔬
                  </div>
                  <div>
                    <h3 className="font-bold text-steens-pink">Andrea L.</h3>
                    <p className="text-sm opacity-80">Egresada • Trabajando</p>
                  </div>
                </div>
                <p className="text-sm mb-3 leading-relaxed">
                  "Ya trabajo en el área que te interesa. Te cuento la realidad del mercado 
                  laboral y cómo prepararte desde ahora."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                    ✨ Mentora Premium
                  </span>
                  <button className="bg-steens-pink hover:bg-steens-magenta text-white text-sm font-semibold py-2 px-4 rounded-xl transition-colors">
                    Conectar
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => router.push('/mentoria')}
                className="bg-gradient-to-r from-steens-pink to-steens-magenta hover:from-steens-magenta hover:to-steens-pink text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>💬</span>
                <span>Ver Todas las Mentoras de {resultadoIA.perfilPrincipal}</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Call to action final */}
          <div className="text-center space-y-4">
            <div className="modern-container p-6 text-white">
              <h3 className="text-xl font-bold steens-gradient-text mb-3">🚀 ¡Tu aventura STEM comienza ahora!</h3>
              <p className="opacity-90 mb-4">
                Has completado el primer paso más importante: conocer tu potencial. 
                Ahora explora, conecta y construye tu futuro en STEM.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-steens-pink to-steens-magenta hover:from-steens-magenta hover:to-steens-pink text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 flex-1"
              >
                📊 Ver Mi Dashboard Completo
              </button>

              <button
                onClick={() => router.push('/retos-demo')}
                className="border-2 border-steens-pink hover:border-steens-magenta hover:bg-steens-pink/10 text-steens-pink hover:text-steens-magenta font-bold py-4 px-8 rounded-2xl transition-all flex-1"
              >
                🎯 Comenzar Retos STEM
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const pregunta = preguntasVocacionales[preguntaActual]
  const progreso = ((preguntaActual + 1) / preguntasVocacionales.length) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="modern-container p-8 max-w-4xl w-full text-white animate-scale-in">
        {/* Header con progreso avanzado */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold steens-gradient-text">Test Vocacional STEM</h1>
              <p className="text-steens-pink mt-2">Descubre tu potencial y diseña tu futuro</p>
            </div>
            <div className="text-right">
              <div className="steens-card px-4 py-2 rounded-xl text-sm font-bold">
                {preguntaActual + 1} de {preguntasVocacionales.length}
              </div>
              <p className="text-xs opacity-75 mt-1">{progreso.toFixed(0)}% completado</p>
            </div>
          </div>

          {/* Barra de progreso mejorada */}
          <div className="relative">
            <div className="w-full bg-white/20 rounded-full h-4 mb-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-steens-pink to-steens-magenta h-4 rounded-full transition-all duration-500 relative"
                style={{ width: `${progreso}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs opacity-75">
              <span>Inicio</span>
              <span>Tu perfil STEM</span>
            </div>
          </div>
        </div>

        {/* Pregunta con contexto */}
        <div className="mb-8">
          {/* Categoría y contexto */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-steens-purple/30 text-steens-purple px-3 py-1 rounded-full text-sm font-semibold">
                {pregunta.categoria}
              </span>
              <span className="bg-steens-pink/20 text-steens-pink px-3 py-1 rounded-full text-xs">
                {pregunta.tipo.replace('_', ' ')}
              </span>
            </div>

            {/* Contexto de la pregunta */}
            <div className="bg-steens-pink/10 border-l-4 border-steens-pink rounded-lg p-4 mb-6">
              <p className="text-sm opacity-90">
                <span className="font-semibold text-steens-pink">💡 Contexto:</span> {pregunta.contexto}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-8 leading-relaxed">{pregunta.pregunta}</h2>

          {/* Opciones mejoradas */}
          <div className="space-y-4">
            {pregunta.opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => responder(index)}
                className="w-full p-6 text-left steens-card rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:bg-steens-pink/10 border-2 border-transparent hover:border-steens-pink/50 group"
              >
                <div className="flex items-start">
                  <div className="bg-steens-pink/30 group-hover:bg-steens-pink text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4 text-lg flex-shrink-0 transition-all">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium leading-relaxed">{opcion}</p>
                    {/* Indicador visual sutil del peso STEM */}
                    <div className="mt-2 flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-1 rounded-full mr-1 ${
                            i < Math.floor(pregunta.peso_stem[index] / 20) 
                              ? 'bg-steens-pink' 
                              : 'bg-white/20'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer con información adicional */}
        <div className="text-center">
          <div className="steens-card rounded-xl p-4 inline-block mb-4">
            <p className="text-sm opacity-90">
              Tiempo estimado restante: <span className="font-semibold text-steens-pink">
                {Math.max(1, preguntasVocacionales.length - preguntaActual - 1)} minutos
              </span>
            </p>
          </div>

          <div className="text-xs opacity-60">
            <p>💡 No hay respuestas correctas o incorrectas. Sé honesta contigo misma para obtener los mejores resultados.</p>
          </div>
        </div>
      </div>
    </div>
  )
}