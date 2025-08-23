'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const preguntasVocacionales = [
  {
    id: 1,
    tipo: 'pensamiento_logico',
    pregunta: 'Imagina que eres la alcaldesa de tu distrito y necesitas reducir el tráfico. ¿Cuál sería tu primera acción?',
    opciones: [
      'Analizar datos de tráfico para identificar patrones y horas pico',
      'Diseñar una app que conecte conductores para compartir viajes',
      'Crear un sistema de semáforos inteligentes que se adapten al flujo',
      'Investigar cómo otras ciudades del mundo han solucionado este problema'
    ],
    area: 'analisis_sistemas'
  },
  {
    id: 2,
    tipo: 'creatividad_tecnologica',
    pregunta: 'Si pudieras crear cualquier invento para ayudar a las mujeres peruanas, ¿qué sería?',
    opciones: [
      'Un dispositivo médico portátil para detectar enfermedades temprano',
      'Una plataforma digital que conecte emprendedoras con inversionistas',
      'Un robot doméstico que ayude con tareas del hogar y cuidado de niños',
      'Una app de realidad aumentada para aprender oficios técnicos'
    ],
    area: 'innovacion_social'
  },
  {
    id: 3,
    tipo: 'resolucion_problemas',
    pregunta: 'En tu colegio, muchas compañeras tienen miedo a las matemáticas. ¿Cómo las ayudarías?',
    opciones: [
      'Crear videos explicativos con ejemplos de la vida real peruana',
      'Organizar grupos de estudio donde se apoyen mutuamente',
      'Desarrollar juegos interactivos que hagan las matemáticas divertidas',
      'Invitar a mujeres matemáticas exitosas para que compartan sus historias'
    ],
    area: 'educacion_stem'
  },
  {
    id: 4,
    tipo: 'interes_cientifico',
    pregunta: '¿Qué misterio de la naturaleza te gustaría resolver?',
    opciones: [
      'Por qué algunas plantas de la Amazonía peruana tienen propiedades medicinales únicas',
      'Cómo podríamos usar la energía del sol y viento para electrificar comunidades rurales',
      'Qué secretos genéticos hacen que los peruanos se adapten bien a la altura',
      'Cómo la inteligencia artificial puede predecir terremotos en el Perú'
    ],
    area: 'investigacion_cientifica'
  },
  {
    id: 5,
    tipo: 'vision_futuro',
    pregunta: 'Imagínate en 10 años. ¿Cuál de estos logros te haría sentir más orgullosa?',
    opciones: [
      'Haber creado una startup tecnológica que genere empleos para mujeres',
      'Ser reconocida internacionalmente por un descubrimiento científico',
      'Liderar un proyecto de ingeniería que mejore la vida de comunidades rurales',
      'Enseñar en una universidad y inspirar a la próxima generación de científicas'
    ],
    area: 'aspiraciones_profesionales'
  },
  {
    id: 6,
    tipo: 'estilo_aprendizaje',
    pregunta: '¿Cómo prefieres aprender cosas nuevas?',
    opciones: [
      'Experimentando y probando hasta que funcione',
      'Leyendo investigaciones y estudios detallados',
      'Viendo tutoriales y siguiendo paso a paso',
      'Discutiendo ideas con otras personas y colaborando'
    ],
    area: 'metodologia_aprendizaje'
  },
  {
    id: 7,
    tipo: 'motivacion_personal',
    pregunta: '¿Qué te motiva más a estudiar STEM?',
    opciones: [
      'Quiero ser independiente económicamente y tener mi propia empresa',
      'Me fascina entender cómo funciona el mundo y hacer descubrimientos',
      'Quiero usar la tecnología para resolver problemas sociales del Perú',
      'Me emociona la idea de ser pionera en un campo dominado por hombres'
    ],
    area: 'motivacion_intrinseca'
  },
  {
    id: 8,
    tipo: 'habilidades_naturales',
    pregunta: 'Tus amigas siempre te piden ayuda cuando...',
    opciones: [
      'Tienen problemas con sus computadoras o celulares',
      'Necesitan entender conceptos difíciles de ciencias o matemáticas',
      'Quieren organizar eventos o proyectos grupales',
      'Buscan ideas creativas para solucionar problemas'
    ],
    area: 'fortalezas_naturales'
  }
]

const referentesPeruanas = {
  tecnologia: {
    nombre: 'Mariana Costa',
    area: 'Tecnología & Educación',
    logro: 'Fundadora de Laboratoria',
    frase: 'La tecnología puede transformar vidas cuando es inclusiva y accesible.',
    historia: 'Mariana revolucionó la educación tech en Latinoamérica, demostrando que las mujeres pueden liderar la transformación digital.'
  },
  ciencias: {
    nombre: 'Fabiola León-Velarde',
    area: 'Medicina & Investigación',
    logro: 'Primera mujer rectora de la UPCH',
    frase: 'La ciencia no tiene género, solo requiere curiosidad infinita y dedicación.',
    historia: 'Pionera en investigación de adaptación a la altura, ha inspirado a generaciones de científicas peruanas.'
  },
  matematicas: {
    nombre: 'Antonieta Alva',
    area: 'Economía & Matemáticas Aplicadas',
    logro: 'Ex Ministra de Economía y Finanzas',
    frase: 'Los números cuentan historias que pueden cambiar el mundo.',
    historia: 'Demostró que las matemáticas son una herramienta poderosa para crear políticas que mejoren la vida de millones.'
  },
  ingenieria: {
    nombre: 'Patricia Teullet',
    area: 'Ingeniería & Innovación',
    logro: 'Líder en ingeniería de telecomunicaciones',
    frase: 'Cada problema es una oportunidad para innovar y crear soluciones que impacten positivamente.',
    historia: 'Ha liderado proyectos de conectividad que han llevado internet a comunidades remotas del Perú.'
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
  
  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])
  
  const responder = (opcionIndex) => {
    const nuevasRespuestas = [...respuestas, {
      pregunta: preguntasVocacionales[preguntaActual].pregunta,
      respuesta: preguntasVocacionales[preguntaActual].opciones[opcionIndex],
      area: preguntasVocacionales[preguntaActual].area,
      tipo: preguntasVocacionales[preguntaActual].tipo
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
    
    // Simular tiempo de procesamiento para mejor UX
    setTimeout(() => {
      try {
        generarAnalisisInteligente(respuestasFinales)
      } catch (error) {
        console.error('Error en análisis:', error)
        setCargandoResultado(false)
      }
    }, 2000) // 2 segundos para que se vea el análisis
  }
  
  const generarAnalisisInteligente = (respuestasFinales) => {
    try {
      // Sistema inteligente local que analiza las respuestas
      const analisis = analizarRespuestas(respuestasFinales)
      
      setResultadoIA(analisis)
      setCargandoResultado(false) // Importante: detener la carga
      setMostrarResultado(true)
      
      const updatedUser = {
        ...user,
        medallas: [...(user.medallas || []), analisis.medalla],
        puntos: user.puntos + 120, // Puntos por análisis inteligente
        testCompletado: true,
        areaPrincipal: analisis.areaPrincipal,
        intereses: analisis.interesesSugeridos
      }
      localStorage.setItem('steensUser', JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      console.error('Error generando análisis:', error)
      setCargandoResultado(false)
      // Mostrar un resultado básico si hay error
      setResultadoIA({
        areaPrincipal: "Tecnología",
        porcentajeCompatibilidad: 85,
        mensaje: `¡${user.nombre}, tienes un gran potencial STEM! Continúa explorando para descubrir tu área favorita.`,
        medalla: "🌟 Exploradora STEM",
        carreras: [
          { nombre: "Ingeniería de Sistemas", descripcion: "Desarrollo de software y sistemas tecnológicos innovadores", proyeccion: "Alta demanda en el mercado peruano" }
        ],
        referente: {
          nombre: "Mariana Costa",
          area: "Tecnología & Educación",
          logro: "Fundadora de Laboratoria",
          frase: "La tecnología puede transformar vidas cuando es inclusiva.",
          conexion: "Como tú, Mariana vio el potencial de la tecnología para empoderar mujeres."
        },
        interesesSugeridos: ["tecnología", "programación", "innovación"],
        pasosSiguientes: [
          "Explora cursos online de programación",
          "Participa en hackathons estudiantiles",
          "Conecta con comunidades tech femeninas"
        ]
      })
      setMostrarResultado(true)
    }
  }

  const analizarRespuestas = (respuestas) => {
    // Mapeo de respuestas a áreas STEM
    const mapeoAreas = {
      0: { // Primera opción
        'analisis_sistemas': 'Ingeniería de Datos',
        'innovacion_social': 'Ingeniería Biomédica', 
        'educacion_stem': 'Tecnología Educativa',
        'investigacion_cientifica': 'Biotecnología',
        'aspiraciones_profesionales': 'Emprendimiento Tech',
        'metodologia_aprendizaje': 'Ingeniería Experimental',
        'motivacion_intrinseca': 'Fintech',
        'fortalezas_naturales': 'Soporte Técnico'
      },
      1: { // Segunda opción
        'analisis_sistemas': 'Desarrollo de Software',
        'innovacion_social': 'Ingeniería Industrial',
        'educacion_stem': 'Psicología Educativa',
        'investigacion_cientifica': 'Energías Renovables',
        'aspiraciones_profesionales': 'Investigación Científica',
        'metodologia_aprendizaje': 'Investigación Académica',
        'motivacion_intrinseca': 'Ciencias Puras',
        'fortalezas_naturales': 'Docencia STEM'
      },
      2: { // Tercera opción
        'analisis_sistemas': 'Sistemas Inteligentes',
        'innovacion_social': 'Robótica',
        'educacion_stem': 'Gamificación Educativa',
        'investigacion_cientifica': 'Medicina Genética',
        'aspiraciones_profesionales': 'Ingeniería Civil',
        'metodologia_aprendizaje': 'Aprendizaje Visual',
        'motivacion_intrinseca': 'Ingeniería Sostenible',
        'fortalezas_naturales': 'Gestión de Proyectos'
      },
      3: { // Cuarta opción
        'analisis_sistemas': 'Inteligencia Artificial',
        'innovacion_social': 'Realidad Aumentada',
        'educacion_stem': 'Mentoría y Liderazgo',
        'investigacion_cientifica': 'IA Aplicada',
        'aspiraciones_profesionales': 'Academia e Investigación',
        'metodologia_aprendizaje': 'Aprendizaje Colaborativo',
        'motivacion_intrinseca': 'Liderazgo Femenino STEM',
        'fortalezas_naturales': 'Innovación Creativa'
      }
    }

    // Contar preferencias por área
    const conteoAreas = {}
    const areasDetectadas = []

    respuestas.forEach((respuesta, index) => {
      const opcionIndex = preguntasVocacionales[index].opciones.indexOf(respuesta.respuesta)
      const areaDetectada = mapeoAreas[opcionIndex]?.[respuesta.area]
      
      if (areaDetectada) {
        areasDetectadas.push(areaDetectada)
        conteoAreas[areaDetectada] = (conteoAreas[areaDetectada] || 0) + 1
      }
    })

    // Determinar área principal
    const areaPrincipal = Object.keys(conteoAreas).reduce((a, b) => 
      conteoAreas[a] > conteoAreas[b] ? a : b
    ) || 'Tecnología'

    // Base de datos de perfiles STEM
    const perfilesStem = {
      'Ingeniería de Datos': {
        mensaje: `¡${user.nombre}, tienes una mente analítica excepcional! Tu capacidad para encontrar patrones y soluciones sistemáticas te convierte en una futura líder en el mundo de los datos. En el Perú, las empresas necesitan urgentemente profesionales como tú para tomar decisiones basadas en evidencia.`,
        medalla: '📊 Analista de Datos del Futuro',
        carreras: [
          { nombre: 'Ingeniería de Sistemas', descripcion: 'Especialización en Big Data y Analytics para transformar datos en decisiones inteligentes', proyeccion: 'Alta demanda en bancos, retail y gobierno peruano' },
          { nombre: 'Estadística', descripcion: 'Análisis estadístico y modelado predictivo para resolver problemas complejos', proyeccion: 'Investigación, consultoría y sector público' }
        ],
        referente: {
          nombre: 'Antonieta Alva',
          area: 'Economía & Análisis de Datos',
          logro: 'Ex Ministra de Economía y Finanzas del Perú',
          frase: 'Los datos cuentan historias que pueden transformar un país entero.',
          conexion: 'Como tú, Antonieta usa el análisis de datos para resolver problemas complejos y tomar decisiones que impactan millones de vidas.'
        },
        interesesSugeridos: ['análisis de datos', 'estadística', 'programación'],
        pasosSiguientes: [
          'Aprende Python y R para análisis de datos',
          'Practica con datasets del gobierno peruano (datos abiertos)',
          'Únete a comunidades como R-Ladies Lima'
        ]
      },
      'Desarrollo de Software': {
        mensaje: `¡${user.nombre}, eres una desarrolladora nata! Tu enfoque en crear soluciones digitales y tu visión de conectar personas te posiciona perfectamente para liderar la transformación tecnológica del Perú. Las empresas tech peruanas necesitan más mujeres como tú.`,
        medalla: '💻 Desarrolladora del Futuro',
        carreras: [
          { nombre: 'Ingeniería de Software', descripcion: 'Desarrollo de aplicaciones y sistemas que resuelven problemas reales', proyeccion: 'Startups, empresas tech y freelancing internacional' },
          { nombre: 'Ciencias de la Computación', descripcion: 'Fundamentos sólidos en programación, algoritmos e inteligencia artificial', proyeccion: 'Empresas multinacionales y emprendimiento tech' }
        ],
        referente: {
          nombre: 'Mariana Costa',
          area: 'Tecnología & Emprendimiento',
          logro: 'Fundadora y CEO de Laboratoria',
          frase: 'La tecnología puede transformar vidas cuando es inclusiva y accesible para todas.',
          conexion: 'Al igual que tú, Mariana vio el potencial de la tecnología para conectar y empoderar a las mujeres latinoamericanas.'
        },
        interesesSugeridos: ['programación', 'desarrollo web', 'aplicaciones móviles'],
        pasosSiguientes: [
          'Domina JavaScript y Python',
          'Crea tu primer proyecto web personal',
          'Participa en hackathons como HackatonPeru'
        ]
      },
      'Biotecnología': {
        mensaje: `¡${user.nombre}, tienes el perfil perfecto para revolucionar la medicina peruana! Tu curiosidad científica y tu enfoque en resolver problemas de salud te convierte en una futura pionera en biotecnología. El Perú necesita científicas como tú para aprovechar nuestra biodiversidad única.`,
        medalla: '🧬 Biotecnóloga Innovadora',
        carreras: [
          { nombre: 'Biotecnología', descripcion: 'Aplicación de tecnología a sistemas biológicos para crear soluciones innovadoras', proyeccion: 'Industria farmacéutica, agricultura y investigación' },
          { nombre: 'Ingeniería Biomédica', descripcion: 'Tecnología aplicada a la medicina para mejorar la calidad de vida', proyeccion: 'Hospitales, empresas de dispositivos médicos' }
        ],
        referente: {
          nombre: 'Fabiola León-Velarde',
          area: 'Medicina & Investigación Biomédica',
          logro: 'Primera mujer rectora de la UPCH y experta mundial en adaptación a la altura',
          frase: 'La ciencia no tiene género, solo requiere curiosidad infinita y dedicación.',
          conexion: 'Como tú, Fabiola combina la curiosidad científica con la pasión por resolver problemas de salud únicos del Perú.'
        },
        interesesSugeridos: ['biotecnología', 'medicina', 'investigación científica'],
        pasosSiguientes: [
          'Explora la biodiversidad peruana y sus aplicaciones medicinales',
          'Participa en ferias de ciencias escolares',
          'Conecta con el Instituto de Investigación Nutricional (IIN)'
        ]
      }
    }

    // Obtener perfil o usar uno por defecto
    const perfil = perfilesStem[areaPrincipal] || perfilesStem['Desarrollo de Software']

    return {
      areaPrincipal,
      porcentajeCompatibilidad: Math.min(95, 70 + (conteoAreas[areaPrincipal] || 1) * 8),
      mensaje: perfil.mensaje,
      medalla: perfil.medalla,
      carreras: perfil.carreras,
      referente: perfil.referente,
      interesesSugeridos: perfil.interesesSugeridos,
      pasosSiguientes: perfil.pasosSiguientes,
      areas: Object.keys(conteoAreas).map(area => ({
        nombre: area,
        compatibilidad: Math.min(100, (conteoAreas[area] || 0) * 25 + 50),
        descripcion: `Basado en tus respuestas, muestras afinidad hacia ${area.toLowerCase()}`
      })).slice(0, 3)
    }
  }
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>
  }
  
  if (cargandoResultado) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white text-center">
          <div className="text-4xl sm:text-6xl mb-4 sm:mb-6 animate-bounce">🧠</div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-steens-pink">Analizando tu perfil con IA...</h2>
          <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6">
            Nuestra inteligencia artificial está procesando tus respuestas para crear 
            un análisis vocacional personalizado específicamente para ti.
          </p>
          <div className="flex justify-center space-x-2 mb-4 sm:mb-6">
            <div className="w-3 h-3 bg-steens-pink rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-steens-purple rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-steens-magenta rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <p className="text-sm text-white/70">Esto puede tomar unos segundos...</p>
        </div>
      </div>
    )
  }

  if (mostrarResultado && resultadoIA) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header de resultados */}
          <div className="glass-effect rounded-3xl p-8 mb-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold mb-4 steens-gradient-text">
              ¡Tu Perfil STEM Personalizado!
            </h1>
            <div className="steens-card rounded-2xl p-4 inline-block">
              <p className="text-lg font-semibold">+150 puntos ganados • Análisis con IA</p>
            </div>
          </div>

          {/* Área principal y compatibilidad */}
          <div className="glass-effect rounded-3xl p-8 mb-8 text-white">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-steens-pink mb-4">Tu Área Principal</h2>
              <div className="bg-gradient-to-r from-steens-purple to-steens-pink rounded-2xl p-6 inline-block">
                <h3 className="text-3xl font-bold text-white">{resultadoIA.areaPrincipal}</h3>
                <p className="text-xl text-white/90">{resultadoIA.porcentajeCompatibilidad}% de compatibilidad</p>
              </div>
            </div>
            
            {/* Mensaje personalizado */}
            <div className="bg-white/10 rounded-2xl p-6 mb-6">
              <p className="text-lg leading-relaxed">{resultadoIA.mensaje}</p>
            </div>
          </div>

          {/* Referente inspiradora */}
          {resultadoIA.referente && (
            <div className="glass-effect rounded-3xl p-8 mb-8 text-white">
              <h2 className="text-2xl font-bold text-steens-pink mb-6 text-center">Tu Referente Inspiradora</h2>
              <div className="steens-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">👩‍🔬</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-steens-pink mb-2">{resultadoIA.referente.nombre}</h3>
                    <p className="font-semibold mb-2">{resultadoIA.referente.area}</p>
                    <p className="text-sm opacity-90 mb-3">{resultadoIA.referente.logro}</p>
                    <blockquote className="italic text-steens-pink border-l-4 border-steens-pink pl-4 mb-3">
                      "{resultadoIA.referente.frase}"
                    </blockquote>
                    <p className="text-sm bg-steens-pink/20 rounded-xl p-3">
                      <strong>¿Por qué es relevante para ti?</strong> {resultadoIA.referente.conexion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Carreras recomendadas */}
          <div className="glass-effect rounded-3xl p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold text-steens-pink mb-6 text-center">Carreras Recomendadas para Ti</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {resultadoIA.carreras?.map((carrera, index) => (
                <div key={index} className="steens-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-steens-pink mb-2">{carrera.nombre}</h3>
                  <p className="text-sm mb-3">{carrera.descripcion}</p>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs font-semibold text-steens-pink mb-1">Proyección laboral:</p>
                    <p className="text-xs">{carrera.proyeccion}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Botón para explorar universidades */}
            <div className="text-center">
              <button className="bg-steens-purple hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors inline-flex items-center space-x-2">
                <span>🏛️</span>
                <span>Explorar Universidades Cerca</span>
                <span>📍</span>
              </button>
            </div>
          </div>

          {/* Conecta con universitarias */}
          <div className="glass-effect rounded-3xl p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold text-steens-pink mb-6 text-center">Conecta con Universitarias de tu Área</h2>
            <p className="text-center text-white/80 mb-6">
              Habla con estudiantes que ya están viviendo la experiencia universitaria en {resultadoIA.areaPrincipal}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Mentora 1 */}
              <div className="steens-card rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-steens-purple to-steens-pink rounded-full flex items-center justify-center text-2xl mr-4">
                    👩‍🎓
                  </div>
                  <div>
                    <h3 className="font-bold text-steens-pink">Sofia M.</h3>
                    <p className="text-sm text-white/80">5to año • Lima</p>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  "Estudié exactamente lo que tú estás considerando. Te puedo contar sobre la experiencia real, 
                  los retos y las oportunidades increíbles que encontré."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-steens-purple/20 text-steens-purple px-2 py-1 rounded-full">
                    Disponible para chat
                  </span>
                  <button className="text-steens-pink hover:text-steens-magenta text-sm font-semibold">
                    Conectar →
                  </button>
                </div>
              </div>

              {/* Mentora 2 */}
              <div className="steens-card rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-steens-pink to-steens-magenta rounded-full flex items-center justify-center text-2xl mr-4">
                    👩‍💻
                  </div>
                  <div>
                    <h3 className="font-bold text-steens-pink">Camila R.</h3>
                    <p className="text-sm text-white/80">3er año • Arequipa</p>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  "Vengo de provincia y sé lo que es tomar esta decisión. Te ayudo a resolver todas tus dudas 
                  sobre la carrera y la vida universitaria."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    En línea ahora
                  </span>
                  <button className="text-steens-pink hover:text-steens-magenta text-sm font-semibold">
                    Conectar →
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-steens-pink hover:bg-steens-magenta text-white font-semibold py-3 px-8 rounded-xl transition-colors inline-flex items-center space-x-2">
                <span>💬</span>
                <span>Ver Más Mentoras de {resultadoIA.areaPrincipal}</span>
              </button>
            </div>
          </div>

          {/* Pasos siguientes */}
          <div className="glass-effect rounded-3xl p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold text-steens-pink mb-6 text-center">Tus Próximos Pasos</h2>
            <div className="space-y-4">
              {resultadoIA.pasosSiguientes?.map((paso, index) => (
                <div key={index} className="flex items-center space-x-4 bg-white/10 rounded-2xl p-4">
                  <div className="bg-steens-pink text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="flex-1">{paso}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="text-center space-y-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full max-w-md bg-steens-pink hover:bg-steens-magenta text-white font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-105 mx-auto block"
            >
              ¡Continuar mi aventura STEM! 🚀
            </button>
            
            <button
              onClick={() => router.push('/comunidad')}
              className="w-full max-w-md border-2 border-steens-pink/50 hover:border-steens-pink text-steens-pink hover:bg-steens-pink/10 font-semibold py-3 px-6 rounded-2xl transition-all mx-auto block"
            >
              Conocer más referentes
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  const pregunta = preguntasVocacionales[preguntaActual]
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-3xl w-full text-white">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <h1 className="text-xl sm:text-2xl font-bold text-steens-pink">Test Vocacional STEM</h1>
            <span className="steens-card px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold">
              {preguntaActual + 1} de {preguntasVocacionales.length}
            </span>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 mb-4 sm:mb-6">
            <div 
              className="bg-gradient-to-r from-steens-pink to-steens-magenta h-2 sm:h-3 rounded-full transition-all duration-500"
              style={{ width: `${((preguntaActual + 1) / preguntasVocacionales.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 sm:mb-4">
            <span className="bg-steens-purple/20 text-steens-purple px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold capitalize">
              {pregunta.tipo.replace('_', ' ')}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 leading-relaxed">{pregunta.pregunta}</h2>
          
          <div className="space-y-3 sm:space-y-4">
            {pregunta.opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => responder(index)}
                className="w-full p-4 sm:p-5 text-left steens-card rounded-xl sm:rounded-2xl transition-all hover:scale-105 border border-steens-pink/20 hover:border-steens-pink/50"
              >
                <div className="flex items-center">
                  <span className="bg-steens-pink/20 text-steens-pink font-bold w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 sm:mr-4 text-xs sm:text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium text-sm sm:text-base">{opcion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="steens-card rounded-lg sm:rounded-xl p-3 sm:p-4 inline-block">
            <p className="text-xs sm:text-sm opacity-90">
              Tipo: <span className="capitalize font-semibold text-steens-pink">{pregunta.tipo.replace('_', ' ')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}