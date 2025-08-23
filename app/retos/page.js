'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Code, Cog, Calculator, Shield, Lock, Trophy, Star, ChevronRight, Award, Target, Zap, Clock, CheckCircle, Heart, Users, Rocket } from 'lucide-react'

// Deshabilitar generación estática
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Retos() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [categoriaActiva, setCategoriaActiva] = useState('inspiracion')
  const [nivelActivo, setNivelActivo] = useState('basico')
  const [retoSeleccionado, setRetoSeleccionado] = useState(null)
  const [retoCompletado, setRetoCompletado] = useState({})
  const [retoEnProgreso, setRetoEnProgreso] = useState({})
  const [progresoCyber, setProgresoCyber] = useState({})
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [mostrarSoloDisponibles, setMostrarSoloDisponibles] = useState(false)

  // Cargar datos del usuario y progreso
  useEffect(() => {
    const userData = localStorage.getItem('steensUser')
    const progresoData = localStorage.getItem('steensProgreso')
    const cyberData = localStorage.getItem('steensCyberProgreso')

    if (userData) {
      setUser(JSON.parse(userData))
    }
    if (progresoData) {
      const progreso = JSON.parse(progresoData)
      setRetoCompletado(progreso.completados || {})
      setRetoEnProgreso(progreso.enProgreso || {})
    }
    if (cyberData) {
      setProgresoCyber(JSON.parse(cyberData))
    }
  }, [])

  // Guardar progreso en localStorage
  const guardarProgreso = useCallback(() => {
    const progresoData = {
      completados: retoCompletado,
      enProgreso: retoEnProgreso,
      timestamp: Date.now()
    }
    localStorage.setItem('steensProgreso', JSON.stringify(progresoData))
    localStorage.setItem('steensCyberProgreso', JSON.stringify(progresoCyber))
  }, [retoCompletado, retoEnProgreso, progresoCyber])

  useEffect(() => {
    guardarProgreso()
  }, [guardarProgreso])

  const categorias = {
    inspiracion: {
      nombre: 'Inspiración y Propósito STEM',
      icon: Heart,
      color: 'from-pink-400 to-purple-500',
      descripcion: 'Fortalece tu identidad y confianza en STEM',
      habilidades: ['Autoconocimiento', 'Motivación', 'Identidad STEM'],
      niveles: {
        basico: [
          {
            id: 'i1',
            titulo: 'Role Model Challenge',
            descripcion: '✨ Investiga y comparte la historia de una mujer STEM influyente que te inspire',
            puntos: 60,
            tipo: 'investigacion-inspiracional',
            dificultad: 'Fácil',
            duracion: '45 min',
            objetivo: 'Conectar con referentes femeninos en STEM',
            competencias: ['Investigación', 'Storytelling', 'Inspiración'],
            prerequisitos: [],
            pasos: [
              { 
                id: 1, 
                titulo: 'Elige tu heroína STEM', 
                descripcion: 'Selecciona una mujer que admires en ciencia o tecnología',
                contenido: 'Puede ser histórica como Marie Curie o contemporánea como Ada Lovelace.',
                tips: ['Busca en diferentes campos STEM', 'Considera mujeres de América Latina', 'Piensa en quién te inspira más']
              },
              { 
                id: 2, 
                titulo: 'Investiga su historia', 
                descripcion: 'Descubre su trayectoria, obstáculos y logros',
                contenido: 'Enfócate en su journey personal y profesional.',
                tips: ['Busca fuentes confiables', 'Incluye desafíos que superó', 'Identifica sus logros clave']
              },
              { 
                id: 3, 
                titulo: 'Crea tu presentación', 
                descripcion: 'Diseña una presentación visual atractiva',
                contenido: 'Usa herramientas como Canva o PowerPoint.',
                tips: ['Incluye fotos e infografías', 'Haz la historia emocionante', 'Conecta con tu propia experiencia']
              },
              { 
                id: 4, 
                titulo: 'Comparte tu inspiración', 
                descripcion: 'Presenta a tu role model en la comunidad STeens',
                contenido: 'Explica por qué la elegiste y cómo te inspira.',
                tips: ['Sé auténtica en tu presentación', 'Conecta con la audiencia', 'Incluye una reflexión personal']
              }
            ]
          },
          {
            id: 'i2',
            titulo: 'Mi yo del futuro',
            descripcion: '🚀 Diseña tu "yo profesional" en 5-10 años con herramientas de visualización',
            puntos: 70,
            tipo: 'vision-board',
            dificultad: 'Fácil',
            duracion: '50 min',
            objetivo: 'Visualizar y planificar tu futuro profesional en STEM',
            competencias: ['Visión estratégica', 'Planificación', 'Autoconocimiento'],
            prerequisitos: []
          },
          {
            id: 'i3',
            titulo: 'Supera el mito personal',
            descripcion: '💪 Identifica y derriba un prejuicio o miedo propio frente a STEM',
            puntos: 50,
            tipo: 'mindset-challenge',
            dificultad: 'Fácil',
            duracion: '30 min',
            objetivo: 'Romper barreras mentales y fortalecer la confianza',
            competencias: ['Autoreflexión', 'Growth mindset', 'Resiliencia'],
            prerequisitos: []
          },
          {
            id: 'i4',
            titulo: 'STEM en mi vida',
            descripcion: '🌟 Cuenta cómo aplicas ciencia/tecnología en tu día a día',
            puntos: 40,
            tipo: 'storytelling',
            dificultad: 'Fácil',
            duracion: '25 min',
            objetivo: 'Reconocer la presencia de STEM en tu vida cotidiana',
            competencias: ['Observación', 'Comunicación', 'Conexión práctica'],
            prerequisitos: []
          },
          {
            id: 'i5',
            titulo: 'Mi pitch STEM',
            descripcion: '🎥 Graba un video de 1 minuto explicando un tema STEM sencillo',
            puntos: 80,
            tipo: 'video-pitch',
            dificultad: 'Fácil',
            duracion: '60 min',
            objetivo: 'Desarrollar habilidades de comunicación científica',
            competencias: ['Comunicación efectiva', 'Divulgación científica', 'Confianza'],
            prerequisitos: []
          }
        ],
        intermedio: [],
        avanzado: []
      }
    },
    proyectos: {
      nombre: 'Mini Proyectos Tech',
      icon: Zap,
      color: 'from-blue-400 to-teal-500',
      descripcion: 'Aplica habilidades STEM en proyectos prácticos',
      habilidades: ['Prototipado', 'Programación', 'Resolución de problemas'],
      niveles: {
        basico: [
          {
            id: 'p1',
            titulo: 'App en 1 hora',
            descripcion: '📱 Crea una app básica con herramientas no-code como Glide o Scratch',
            puntos: 90,
            tipo: 'no-code-development',
            dificultad: 'Fácil',
            duracion: '60 min',
            objetivo: 'Crear tu primera aplicación sin programar',
            competencias: ['No-code development', 'UX básico', 'Lógica de aplicaciones'],
            prerequisitos: []
          },
          {
            id: 'p2',
            titulo: 'STEM Maker',
            descripcion: '🔧 Construye un prototipo sencillo con materiales caseros (puente, catapulta, robot)',
            puntos: 85,
            tipo: 'maker-project',
            dificultad: 'Fácil',
            duracion: '90 min',
            objetivo: 'Aplicar principios de ingeniería en construcción práctica',
            competencias: ['Diseño de prototipos', 'Pensamiento ingenieril', 'Construcción'],
            prerequisitos: []
          },
          {
            id: 'p3',
            titulo: 'Reto lógico',
            descripcion: '🧩 Resuelve un problema matemático o de programación con pasos creativos',
            puntos: 70,
            tipo: 'problem-solving',
            dificultad: 'Fácil',
            duracion: '45 min',
            objetivo: 'Desarrollar pensamiento lógico y algorítmico',
            competencias: ['Pensamiento lógico', 'Resolución creativa', 'Algoritmos básicos'],
            prerequisitos: []
          },
          {
            id: 'p4',
            titulo: 'Mini-website',
            descripcion: '💻 Diseña una página web personal o temática STEM',
            puntos: 95,
            tipo: 'web-development',
            dificultad: 'Fácil',
            duracion: '75 min',
            objetivo: 'Crear tu presencia digital con HTML/CSS básico',
            competencias: ['HTML/CSS', 'Diseño web', 'Branding personal'],
            prerequisitos: []
          },
          {
            id: 'p5',
            titulo: 'Data Challenge',
            descripcion: '📊 Analiza datos sencillos y comparte conclusiones gráficas',
            puntos: 80,
            tipo: 'data-analysis',
            dificultad: 'Fácil',
            duracion: '50 min',
            objetivo: 'Introducción práctica a la ciencia de datos',
            competencias: ['Análisis de datos', 'Visualización', 'Interpretación estadística'],
            prerequisitos: []
          }
        ],
        intermedio: [],
        avanzado: []
      }
    },
    comunidad: {
      nombre: 'Comunidad y Vitrina Tech',
      icon: Users,
      color: 'from-green-400 to-blue-500',
      descripcion: 'Conecta con la comunidad STEM y muestra tu talento',
      habilidades: ['Networking', 'Colaboración', 'Exposición pública'],
      niveles: {
        basico: [
          {
            id: 'c1',
            titulo: 'Tech Company Challenge',
            descripcion: '🏢 Resuelve un reto real planteado por una startup o empresa STEM',
            puntos: 120,
            tipo: 'industry-challenge',
            dificultad: 'Medio',
            duracion: '120 min',
            objetivo: 'Experimentar desafíos reales del mundo tech',
            competencias: ['Problem solving', 'Pensamiento empresarial', 'Innovación'],
            prerequisitos: ['p1', 'p4']
          },
          {
            id: 'c2',
            titulo: 'Hackathon Express',
            descripcion: '⚡ Competencia corta en equipos para resolver un desafío en 24-48h',
            puntos: 150,
            tipo: 'hackathon',
            dificultad: 'Medio',
            duracion: '1440 min', // 24 horas
            objetivo: 'Experiencia intensiva de desarrollo colaborativo',
            competencias: ['Trabajo en equipo', 'Desarrollo rápido', 'Innovación bajo presión'],
            prerequisitos: ['p1', 'p2', 'p4']
          },
          {
            id: 'c3',
            titulo: 'Mentoría Challenge',
            descripcion: '👩‍🏫 Conversa con una profesional STEM y comparte aprendizajes con la comunidad',
            puntos: 100,
            tipo: 'mentorship',
            dificultad: 'Fácil',
            duracion: '90 min',
            objetivo: 'Crear conexiones significativas con profesionales STEM',
            competencias: ['Networking', 'Comunicación profesional', 'Aprendizaje activo'],
            prerequisitos: ['i1']
          },
          {
            id: 'c4',
            titulo: 'Reto en dupla',
            descripcion: '👯‍♀️ Trabaja con otra estudiante para desarrollar una solución conjunta',
            puntos: 110,
            tipo: 'pair-programming',
            dificultad: 'Medio',
            duracion: '100 min',
            objetivo: 'Fortalecer habilidades de colaboración técnica',
            competencias: ['Colaboración', 'Comunicación técnica', 'Co-creación'],
            prerequisitos: ['p3']
          },
          {
            id: 'c5',
            titulo: 'Showcase STEM',
            descripcion: '🌟 Publica y expone un proyecto en la "vitrina digital" de la comunidad',
            puntos: 90,
            tipo: 'public-presentation',
            dificultad: 'Medio',
            duracion: '60 min',
            objetivo: 'Desarrollar confianza para mostrar tu trabajo públicamente',
            competencias: ['Presentación pública', 'Portfolio digital', 'Storytelling técnico'],
            prerequisitos: ['p4', 'i5']
          }
        ],
        intermedio: [],
        avanzado: []
      }
    },
    futuro: {
      nombre: 'Futuro y Permanencia STEM',
      icon: Rocket,
      color: 'from-purple-400 to-pink-500',
      descripcion: 'Prepárate para la universidad y tu carrera STEM',
      habilidades: ['Planificación académica', 'Resiliencia', 'Visión a largo plazo'],
      niveles: {
        basico: [
          {
            id: 'f1',
            titulo: 'Simulación universitaria',
            descripcion: '🎓 Organiza un mini-proyecto con entregables y presentación académica',
            puntos: 130,
            tipo: 'academic-simulation',
            dificultad: 'Medio',
            duracion: '180 min',
            objetivo: 'Experimentar la dinámica del trabajo universitario',
            competencias: ['Gestión de proyectos', 'Escritura académica', 'Presentaciones formales'],
            prerequisitos: ['c5']
          },
          {
            id: 'f2',
            titulo: 'Mapa de metas',
            descripcion: '🗺️ Define objetivos académicos a 1, 3 y 5 años',
            puntos: 60,
            tipo: 'goal-planning',
            dificultad: 'Fácil',
            duracion: '40 min',
            objetivo: 'Crear un plan estratégico para tu futuro académico',
            competencias: ['Planificación estratégica', 'Establecimiento de metas', 'Visión a largo plazo'],
            prerequisitos: ['i2']
          },
          {
            id: 'f3',
            titulo: 'Reto confianza',
            descripcion: '💫 Comparte un logro académico o personal reciente',
            puntos: 50,
            tipo: 'confidence-building',
            dificultad: 'Fácil',
            duracion: '30 min',
            objetivo: 'Celebrar y reconocer tus logros para fortalecer la confianza',
            competencias: ['Autoreconocimiento', 'Comunicación personal', 'Confianza'],
            prerequisitos: ['i3']
          },
          {
            id: 'f4',
            titulo: 'Carrera soñada',
            descripcion: '💼 Investiga una carrera STEM y presenta sus oportunidades',
            puntos: 85,
            tipo: 'career-research',
            dificultad: 'Fácil',
            duracion: '70 min',
            objetivo: 'Explorar opciones de carrera y tomar decisiones informadas',
            competencias: ['Investigación de carreras', 'Análisis de oportunidades', 'Toma de decisiones'],
            prerequisitos: ['i1']
          },
          {
            id: 'f5',
            titulo: 'Vida universitaria 101',
            descripcion: '📚 Participa en un reto grupal que simule dinámicas de clase universitaria',
            puntos: 95,
            tipo: 'university-simulation',
            dificultad: 'Medio',
            duracion: '90 min',
            objetivo: 'Prepararte para la transición a la educación superior',
            competencias: ['Trabajo académico en equipo', 'Debate académico', 'Presentaciones universitarias'],
            prerequisitos: ['f1', 'c4']
          }
        ],
        intermedio: [],
        avanzado: []
      }
    },
    tecnologia: {
      nombre: 'Tecnología',
      icon: Code,
      color: 'from-teal-400 to-blue-500',
      descripcion: 'Desarrolla tus habilidades técnicas',
      niveles: {
        basico: [
          {
            id: 't1',
            titulo: 'Diccionario Cyber - Nivel 1',
            descripcion: '🔒 Aprende términos básicos: Password, Phishing, Firewall, WiFi Seguro',
            puntos: 50,
            tipo: 'ciberseguridad',
            dificultad: 'Fácil',
            duracion: '30 min',
            terminos: ['Password', 'Phishing', 'Firewall', 'WiFi', 'Antivirus'],
            totalPasos: 5,
            prerequisitos: [],
            pasos: [
              { 
                id: 1, 
                titulo: 'Contraseñas Fuertes', 
                descripcion: 'El primer escudo de tu seguridad digital',
                contenido: 'Una buena contraseña debe tener al menos 12 caracteres, combinar letras, números y símbolos.',
                tips: ['Usa frases en lugar de palabras', 'Evita información personal', 'Cambia contraseñas regularmente']
              },
              { 
                id: 2, 
                titulo: 'Phishing - Anzuelos digitales', 
                descripcion: 'Aprende a identificar intentos de estafa',
                contenido: 'El phishing es cuando los cibercriminales se hacen pasar por empresas confiables para robar datos.',
                tips: ['Revisa el remitente del email', 'No hagas clic en enlaces sospechosos', 'Verifica URLs antes de ingresar datos']
              },
              { 
                id: 3, 
                titulo: 'Firewall - Tu guardián digital', 
                descripcion: 'La barrera que protege tu red',
                contenido: 'Un firewall es como un portero que decide qué tráfico puede entrar y salir de tu red.',
                tips: ['Mantén el firewall activado', 'Configura reglas apropiadas', 'Actualiza regularmente']
              },
              { 
                id: 4, 
                titulo: 'WiFi Seguro', 
                descripcion: 'Navega sin riesgos en redes inalámbricas',
                contenido: 'No todas las redes WiFi son seguras. Aprende a conectarte de forma protegida.',
                tips: ['Evita redes públicas abiertas', 'Usa WPA3 si está disponible', 'Desactiva conexión automática']
              },
              { 
                id: 5, 
                titulo: 'Antivirus - Tu escudo personal', 
                descripcion: 'Protección contra software malicioso',
                contenido: 'Los antivirus detectan y eliminan amenazas conocidas de tu dispositivo.',
                tips: ['Mantén el antivirus actualizado', 'Escanea regularmente', 'No desactives la protección en tiempo real']
              }
            ]
          },
          {
            id: 't2',
            titulo: 'Mi Primera Página Web',
            descripcion: 'Crea tu primera página web con HTML básico',
            puntos: 50,
            tipo: 'programacion',
            dificultad: 'Fácil',
            duracion: '30 min',
            prerequisitos: []
          },
          {
            id: 't3',
            titulo: 'Protege tu Perfil',
            descripcion: '🛡️ Aprende a configurar la privacidad en redes sociales de forma segura',
            puntos: 40,
            tipo: 'ciberseguridad',
            dificultad: 'Fácil',
            duracion: '20 min',
            totalPasos: 4,
            prerequisitos: [],
            pasos: [
              { 
                id: 1, 
                titulo: 'Configuración de Privacidad', 
                descripcion: 'Ajusta quien puede ver tu información',
                contenido: 'Revisa todas las configuraciones de privacidad en tus redes sociales.',
                tips: ['Limita visibilidad de posts', 'Controla quien puede contactarte', 'Revisa configuración regularmente']
              },
              { 
                id: 2, 
                titulo: 'Publicaciones Seguras', 
                descripcion: 'Qué compartir y qué no en redes',
                contenido: 'Evita compartir información personal sensible como ubicación en tiempo real.',
                tips: ['No publiques datos personales', 'Cuidado con geolocalización', 'Piensa antes de publicar']
              },
              { 
                id: 3, 
                titulo: 'Contactos Seguros', 
                descripcion: 'Gestiona solicitudes de amistad',
                contenido: 'Solo acepta solicitudes de personas que conoces realmente.',
                tips: ['Verifica identidad real', 'Desconfía de perfiles sin fotos', 'Bloquea comportamientos sospechosos']
              },
              { 
                id: 4, 
                titulo: 'Reportar Problemas', 
                descripcion: 'Cómo denunciar contenido inapropiado',
                contenido: 'Todas las plataformas tienen herramientas para reportar acoso o contenido inapropiado.',
                tips: ['Conoce las herramientas de reporte', 'Documenta evidencia', 'Busca ayuda si es necesario']
              }
            ]
          }
        ],
        intermedio: [
          {
            id: 't4',
            titulo: 'Diccionario Cyber - Nivel 2',
            descripcion: '🔐 Términos intermedios: Malware, Ransomware, Autenticación de dos factores',
            puntos: 60,
            tipo: 'ciberseguridad',
            dificultad: 'Medio',
            duracion: '25 min',
            terminos: ['Malware', 'Ransomware', '2FA', 'VPN', 'Encriptación'],
            totalPasos: 5,
            prerequisitos: ['t1'],
            pasos: [
              { 
                id: 1, 
                titulo: 'Malware Avanzado', 
                descripcion: 'Tipos y formas de protección',
                contenido: 'El malware incluye diferentes tipos: virus, gusanos, troyanos, ransomware, spyware.',
                tips: ['Mantén software actualizado', 'Usa soluciones de seguridad multicapa', 'Haz copias de seguridad regulares']
              },
              { 
                id: 2, 
                titulo: 'Ransomware', 
                descripcion: 'El secuestro digital y cómo prevenirlo',
                contenido: 'El ransomware cifra tus archivos y pide rescate. La prevención es clave.',
                tips: ['Backups offline regulares', 'No pagues el rescate', 'Educa a tu entorno']
              },
              { 
                id: 3, 
                titulo: 'Autenticación 2FA', 
                descripcion: 'Doble seguridad para tus cuentas',
                contenido: 'La autenticación de dos factores añade una capa extra de seguridad.',
                tips: ['Activa 2FA en cuentas importantes', 'Usa apps authenticator', 'Guarda códigos de respaldo']
              },
              { 
                id: 4, 
                titulo: 'VPN - Tu túnel seguro', 
                descripcion: 'Navega de forma privada',
                contenido: 'Una VPN crea un túnel seguro entre tu dispositivo e internet.',
                tips: ['Usa VPN en WiFi público', 'Elige proveedores confiables', 'No todo el tráfico necesita VPN']
              },
              { 
                id: 5, 
                titulo: 'Encriptación', 
                descripcion: 'Códigos secretos para proteger datos',
                contenido: 'La encriptación convierte datos legibles en código secreto.',
                tips: ['Usa apps con encriptación end-to-end', 'Cifra dispositivos móviles', 'Entiende diferentes tipos de cifrado']
              }
            ]
          },
          {
            id: 't5',
            titulo: 'Detecta el Phishing',
            descripcion: '🎣 Juego interactivo para identificar correos y sitios web falsos',
            puntos: 70,
            tipo: 'ciberseguridad',
            dificultad: 'Medio',
            duracion: '30 min',
            totalPasos: 3,
            prerequisitos: ['t1'],
            pasos: [
              { 
                id: 1, 
                titulo: 'Email Detective', 
                descripcion: 'Identifica correos sospechosos',
                contenido: 'Aprende a identificar señales de alerta en correos electrónicos.',
                tips: ['Revisa remitente cuidadosamente', 'Desconfía de urgencia', 'Verifica enlaces antes de hacer clic']
              },
              { 
                id: 2, 
                titulo: 'Web Scanner', 
                descripcion: 'Detecta sitios web falsos',
                contenido: 'Los sitios de phishing imitan páginas legítimas para robar credenciales.',
                tips: ['Verifica certificados SSL', 'Revisa URL completa', 'Busca errores de diseño']
              },
              { 
                id: 3, 
                titulo: 'Cyber Champion', 
                descripcion: 'Prueba final de detección',
                contenido: 'Pon a prueba todo lo aprendido en escenarios reales.',
                tips: ['Confía en tu instinto', 'Cuando dudes, no hagas clic', 'Reporta intentos de phishing']
              }
            ]
          },
          {
            id: 't6',
            titulo: 'App con JavaScript',
            descripcion: 'Desarrolla una aplicación interactiva con JavaScript',
            puntos: 85,
            tipo: 'programacion',
            dificultad: 'Medio',
            duracion: '45 min',
            prerequisitos: ['t2']
          }
        ],
        avanzado: [
          {
            id: 't7',
            titulo: 'Diccionario Cyber - Nivel 3',
            descripcion: '🔬 Términos avanzados: Pentesting, Zero-day, Blockchain, IoT Security',
            puntos: 90,
            tipo: 'ciberseguridad',
            dificultad: 'Difícil',
            duracion: '40 min',
            terminos: ['Pentesting', 'Zero-day', 'Blockchain', 'IoT', 'OSINT'],
            totalPasos: 5,
            prerequisitos: ['t4', 't5'],
            pasos: [
              { 
                id: 1, 
                titulo: 'Pentesting Ético', 
                descripcion: 'Hackeo legal para encontrar vulnerabilidades',
                contenido: 'El pentesting simula ataques para encontrar vulnerabilidades de forma legal.',
                tips: ['Siempre con autorización', 'Documenta todo', 'Sugiere soluciones']
              },
              { 
                id: 2, 
                titulo: 'Vulnerabilidades Zero-day', 
                descripcion: 'Amenazas desconocidas',
                contenido: 'Zero-day son vulnerabilidades no conocidas públicamente.',
                tips: ['Mantén sistemas actualizados', 'Usa detección basada en comportamiento', 'Ten planes de respuesta']
              },
              { 
                id: 3, 
                titulo: 'Blockchain Security', 
                descripcion: 'Seguridad en cadena de bloques',
                contenido: 'Blockchain tiene ventajas de seguridad pero también vulnerabilidades únicas.',
                tips: ['Entiende smart contracts', 'Protege claves privadas', 'Audita código regularmente']
              },
              { 
                id: 4, 
                titulo: 'IoT y Dispositivos', 
                descripcion: 'Proteger el internet de las cosas',
                contenido: 'Los dispositivos IoT a menudo tienen seguridad débil.',
                tips: ['Cambia contraseñas predeterminadas', 'Mantén firmware actualizado', 'Segmenta la red']
              },
              { 
                id: 5, 
                titulo: 'OSINT - Inteligencia', 
                descripcion: 'Investigación con fuentes abiertas',
                contenido: 'OSINT usa información pública para investigación de seguridad.',
                tips: ['Respeta privacidad', 'Verifica fuentes', 'Usa herramientas especializadas']
              }
            ]
          },
          {
            id: 't8',
            titulo: 'Ethical Hacking Challenge',
            descripcion: '⚡ Resuelve desafíos de hacking ético en un entorno seguro',
            puntos: 150,
            tipo: 'ciberseguridad',
            dificultad: 'Difícil',
            duracion: '90 min',
            totalPasos: 6,
            prerequisitos: ['t7'],
            pasos: [
              { 
                id: 1, 
                titulo: 'Reconocimiento', 
                descripcion: 'Identifica el objetivo',
                contenido: 'Recopila información sobre el objetivo sin interactuar directamente.',
                tips: ['Usa herramientas pasivas', 'Documenta hallazgos', 'Respeta límites legales']
              },
              { 
                id: 2, 
                titulo: 'Escaneo', 
                descripcion: 'Busca vulnerabilidades',
                contenido: 'Identifica servicios activos y posibles puntos de entrada.',
                tips: ['Usa scanners automatizados', 'Valida resultados manualmente', 'Minimiza ruido']
              },
              { 
                id: 3, 
                titulo: 'Enumeración', 
                descripcion: 'Recopila información detallada',
                contenido: 'Obtén información específica sobre servicios y configuraciones.',
                tips: ['Se meticuloso', 'Busca configuraciones por defecto', 'Identifica versiones']
              },
              { 
                id: 4, 
                titulo: 'Explotación', 
                descripcion: 'Accede de forma ética',
                contenido: 'Demuestra el impacto de las vulnerabilidades encontradas.',
                tips: ['Solo con autorización', 'Minimiza impacto', 'Documenta evidencia']
              },
              { 
                id: 5, 
                titulo: 'Documentación', 
                descripcion: 'Reporta hallazgos',
                contenido: 'Crea un reporte detallado con hallazgos y recomendaciones.',
                tips: ['Sé claro y preciso', 'Incluye evidencia', 'Propón soluciones']
              },
              { 
                id: 6, 
                titulo: 'Certificación', 
                descripcion: 'Obtén tu insignia de hacker ético',
                contenido: '¡Felicidades! Has completado el desafío de hacking ético.',
                tips: ['Practica continuamente', 'Mantente actualizado', 'Comparte conocimiento']
              }
            ]
          },
          {
            id: 't9',
            titulo: 'IA y Machine Learning',
            descripcion: 'Crea tu primer modelo de inteligencia artificial',
            puntos: 140,
            tipo: 'ia',
            dificultad: 'Difícil',
            duracion: '60 min',
            prerequisitos: ['t6']
          }
        ]
      }
    },
    ingenieria: {
      nombre: 'Ingeniería',
      icon: Cog,
      color: 'from-orange-400 to-red-500',
      descripcion: 'Construye soluciones innovadoras',
      niveles: {
        basico: [
          {
            id: 'i1',
            titulo: 'Puente de Papel',
            descripcion: 'Diseña el puente más resistente usando solo papel y cinta',
            puntos: 50,
            tipo: 'estructural',
            dificultad: 'Fácil',
            duracion: '30 min',
            prerequisitos: []
          },
          {
            id: 'i2',
            titulo: 'Circuito Simple',
            descripcion: 'Construye tu primer circuito eléctrico con LED',
            puntos: 45,
            tipo: 'electrica',
            dificultad: 'Fácil',
            duracion: '25 min',
            prerequisitos: []
          },
          {
            id: 'i3',
            titulo: 'Robot de Cartón',
            descripcion: 'Diseña y construye un robot básico con materiales reciclados',
            puntos: 60,
            tipo: 'robotica',
            dificultad: 'Fácil',
            duracion: '40 min',
            prerequisitos: []
          }
        ],
        intermedio: [
          {
            id: 'i4',
            titulo: 'Casa Sostenible',
            descripcion: 'Diseña una casa eco-amigable con materiales sustentables',
            puntos: 80,
            tipo: 'civil',
            dificultad: 'Medio',
            duracion: '50 min',
            prerequisitos: ['i1']
          },
          {
            id: 'i5',
            titulo: 'Motor Casero',
            descripcion: 'Construye un motor eléctrico desde cero',
            puntos: 85,
            tipo: 'mecanica',
            dificultad: 'Medio',
            duracion: '45 min',
            prerequisitos: ['i2']
          }
        ],
        avanzado: [
          {
            id: 'i6',
            titulo: 'Prótesis 3D',
            descripcion: 'Diseña una prótesis funcional usando impresión 3D',
            puntos: 130,
            tipo: 'biomedica',
            dificultad: 'Difícil',
            duracion: '90 min',
            prerequisitos: ['i4', 'i5']
          }
        ]
      }
    },
    matematica: {
      nombre: 'Matemática',
      icon: Calculator,
      color: 'from-blue-400 to-purple-500',
      descripcion: 'Descubre la belleza de los números',
      niveles: {
        basico: [
          {
            id: 'm1',
            titulo: 'Matemática en la Cocina',
            descripcion: 'Aprende fracciones y proporciones cocinando galletas',
            puntos: 40,
            tipo: 'aplicada',
            dificultad: 'Fácil',
            duracion: '20 min',
            prerequisitos: []
          },
          {
            id: 'm2',
            titulo: 'Geometría en la Naturaleza',
            descripcion: 'Descubre patrones matemáticos en flores y plantas',
            puntos: 45,
            tipo: 'geometria',
            dificultad: 'Fácil',
            duracion: '25 min',
            prerequisitos: []
          },
          {
            id: 'm3',
            titulo: 'Códigos Secretos',
            descripcion: 'Crea y descifra mensajes usando matemáticas',
            puntos: 50,
            tipo: 'criptografia',
            dificultad: 'Fácil',
            duracion: '30 min',
            prerequisitos: []
          }
        ],
        intermedio: [
          {
            id: 'm4',
            titulo: 'Estadísticas de Redes Sociales',
            descripcion: 'Analiza datos reales de uso de redes sociales',
            puntos: 70,
            tipo: 'estadistica',
            dificultad: 'Medio',
            duracion: '35 min',
            prerequisitos: ['m1']
          },
          {
            id: 'm5',
            titulo: 'Fractales Artísticos',
            descripcion: 'Crea arte usando matemáticas fractales',
            puntos: 75,
            tipo: 'geometria',
            dificultad: 'Medio',
            duracion: '40 min',
            prerequisitos: ['m2']
          }
        ],
        avanzado: [
          {
            id: 'm6',
            titulo: 'Algoritmos de Recomendación',
            descripcion: 'Programa el algoritmo que usa Netflix para recomendar películas',
            puntos: 120,
            tipo: 'algoritmos',
            dificultad: 'Difícil',
            duracion: '70 min',
            prerequisitos: ['m4', 'm5']
          }
        ]
      }
    }
  };

  const niveles = [
    { id: 'basico', nombre: 'Básico', color: 'bg-green-500/20 text-green-300', icon: Target },
    { id: 'intermedio', nombre: 'Intermedio', color: 'bg-yellow-500/20 text-yellow-300', icon: Zap },
    { id: 'avanzado', nombre: 'Avanzado', color: 'bg-red-500/20 text-red-300', icon: Award }
  ];

  const tiposFiltro = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'investigacion-inspiracional', nombre: 'Inspiración' },
    { id: 'no-code-development', nombre: 'No-Code' },
    { id: 'maker-project', nombre: 'Maker' },
    { id: 'industry-challenge', nombre: 'Empresarial' },
    { id: 'academic-simulation', nombre: 'Académico' }
  ];

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'investigacion-inspiracional': return Heart;
      case 'vision-board': return Star;
      case 'mindset-challenge': return Target;
      case 'storytelling': return BookOpen;
      case 'video-pitch': return Zap;
      case 'no-code-development': return Code;
      case 'maker-project': return Cog;
      case 'problem-solving': return Calculator;
      case 'web-development': return Code;
      case 'data-analysis': return BookOpen;
      case 'industry-challenge': return Trophy;
      case 'hackathon': return Zap;
      case 'mentorship': return Users;
      case 'pair-programming': return Users;
      case 'public-presentation': return Star;
      case 'academic-simulation': return BookOpen;
      case 'goal-planning': return Target;
      case 'confidence-building': return Heart;
      case 'career-research': return BookOpen;
      case 'university-simulation': return BookOpen;
      case 'ciberseguridad': return Shield;
      case 'programacion': return Code;
      case 'ia': return Zap;
      default: return Star;
    }
  };

  const getDificultadColor = (dificultad) => {
    switch (dificultad) {
      case 'Fácil': return 'bg-green-500/20 text-green-300';
      case 'Medio': return 'bg-yellow-500/20 text-yellow-300';
      case 'Difícil': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const verificarPrerequisitos = (prerequisitos) => {
    if (!prerequisitos || prerequisitos.length === 0) return true;
    return prerequisitos.every(prereq => retoCompletado[prereq]);
  };

  const completarReto = (retoId, puntos) => {
    setRetoCompletado(prev => ({
      ...prev,
      [retoId]: true
    }));

    if (user) {
      const updatedUser = {
        ...user,
        puntos: (user.puntos || 0) + puntos,
        retosCompletados: [...(user.retosCompletados || []), retoId],
        ultimaActividad: Date.now()
      };
      localStorage.setItem('steensUser', JSON.stringify(updatedUser));
      setUser(updatedUser);

      // Notificación mejorada
      const mensaje = `¡Excelente! 🎉\n+${puntos} puntos ganados\nTotal: ${updatedUser.puntos} puntos`;
      alert(mensaje);
    } else {
      alert(`¡Excelente trabajo! Para guardar tu progreso y ganar ${puntos} puntos, regístrate en STEENS 🚀`);
    }
  };

  const iniciarRetoCyber = (retoId) => {
    setRetoEnProgreso(prev => ({
      ...prev,
      [retoId]: true
    }));
    setProgresoCyber(prev => ({
      ...prev,
      [retoId]: 1
    }));
  };

  const avanzarPasoReto = (retoId, totalPasos, puntos) => {
    setProgresoCyber(prev => {
      const nuevoProgreso = Math.min((prev[retoId] || 0) + 1, totalPasos);
      if (nuevoProgreso === totalPasos) {
        completarReto(retoId, puntos);
        setRetoEnProgreso(prevProg => ({
          ...prevProg,
          [retoId]: false
        }));
      }
      return {
        ...prev,
        [retoId]: nuevoProgreso
      };
    });
  };

  const getRetos = () => {
    const retos = categorias[categoriaActiva].niveles[nivelActivo] || [];
    let retosFiltrados = retos;

    if (filtroTipo !== 'todos') {
      retosFiltrados = retos.filter(reto => reto.tipo === filtroTipo);
    }

    if (mostrarSoloDisponibles) {
      retosFiltrados = retosFiltrados.filter(reto => verificarPrerequisitos(reto.prerequisitos));
    }

    return retosFiltrados;
  };

  const calcularEstadisticas = () => {
    let totalRetos = 0;
    let completados = 0;
    let puntosGanados = 0;

    Object.values(categorias).forEach(categoria => {
      Object.values(categoria.niveles).forEach(nivel => {
        nivel.forEach(reto => {
          totalRetos++;
          if (retoCompletado[reto.id]) {
            completados++;
            puntosGanados += reto.puntos;
          }
        });
      });
    });

    return { totalRetos, completados, puntosGanados };
  };

  const stats = calcularEstadisticas();

  // Vista detallada del reto
  if (retoSeleccionado) {
    const esCiberseguridad = retoSeleccionado.tipo === 'ciberseguridad' && retoSeleccionado.pasos;
    const completado = retoCompletado[retoSeleccionado.id];
    const enProgreso = retoEnProgreso[retoSeleccionado.id];
    const progreso = progresoCyber[retoSeleccionado.id] || 0;
    const pasoActual = retoSeleccionado.pasos ? retoSeleccionado.pasos[progreso - 1] : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-steens-purple/20 to-steens-pink/20 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setRetoSeleccionado(null)}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all flex items-center gap-2"
              >
                ← Volver a retos
              </button>
              <div className="flex items-center gap-3">
                <div className="steens-card px-4 py-2 rounded-xl">
                  <span className="text-sm font-semibold flex items-center gap-1">
                    <Star size={16} fill="currentColor" className="text-yellow-500" />
                    {retoSeleccionado.puntos} puntos
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDificultadColor(retoSeleccionado.dificultad)}`}>
                  {retoSeleccionado.dificultad}
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="mb-4 flex justify-center">
                {React.createElement(getTipoIcon(retoSeleccionado.tipo), {
                  size: 48,
                  className: `${retoSeleccionado.tipo === 'ciberseguridad' ? 'text-steens-pink' : 'text-steens-purple'}`
                })}
              </div>
              <h1 className="text-3xl font-bold mb-3 text-steens-pink">{retoSeleccionado.titulo}</h1>
              <p className="text-lg opacity-90 mb-4">{retoSeleccionado.descripcion}</p>

              <div className="flex justify-center space-x-4 text-sm mb-6">
                <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                  <Clock size={14} />
                  <span>{retoSeleccionado.duracion}</span>
                </div>
                <div className="flex items-center gap-1 bg-steens-purple/20 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-steens-purple rounded-full"></span>
                  <span>{categorias[categoriaActiva].nombre}</span>
                </div>
              </div>
            </div>

            {/* Mostrar contenido específico para ciberseguridad */}
            {esCiberseguridad && (enProgreso || completado) && pasoActual && (
              <div className="bg-white/10 rounded-2xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-steens-pink">
                    Paso {progreso}: {pasoActual.titulo}
                  </h2>
                  <span className="text-sm bg-steens-pink/20 px-3 py-1 rounded-full">
                    {progreso}/{retoSeleccionado.totalPasos}
                  </span>
                </div>

                <p className="text-gray-300 mb-4">{pasoActual.descripcion}</p>

                {pasoActual.contenido && (
                  <div className="bg-steens-purple/20 rounded-xl p-4 mb-4">
                    <h3 className="font-semibold mb-2 text-steens-purple">📚 Contenido:</h3>
                    <p className="text-sm text-gray-300">{pasoActual.contenido}</p>
                  </div>
                )}

                {pasoActual.tips && (
                  <div className="bg-steens-pink/20 rounded-xl p-4">
                    <h3 className="font-semibold mb-2 text-steens-pink">💡 Tips importantes:</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {pasoActual.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-steens-pink mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Progreso gamificado */}
            {esCiberseguridad && retoSeleccionado.totalPasos && (enProgreso || completado) && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">
                    Progreso: {progreso}/{retoSeleccionado.totalPasos}
                  </span>
                  <span className="text-sm text-gray-400">
                    {Math.round((progreso / retoSeleccionado.totalPasos) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-600/50 rounded-full h-3 mb-4">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      completado 
                        ? 'bg-gradient-to-r from-green-400 to-green-600' 
                        : 'bg-gradient-to-r from-steens-pink to-steens-purple'
                    }`}
                    style={{ width: `${(progreso / retoSeleccionado.totalPasos) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Términos que se aprenderán */}
            {retoSeleccionado.terminos && !enProgreso && !completado && (
              <div className="bg-white/10 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-bold mb-4 text-steens-pink">🎯 Términos que dominarás:</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {retoSeleccionado.terminos.map((termino, index) => (
                    <div
                      key={index}
                      className="bg-steens-purple/30 text-purple-200 text-sm rounded-xl p-3 text-center font-medium"
                    >
                      {termino}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisitos */}
            {retoSeleccionado.prerequisitos && retoSeleccionado.prerequisitos.length > 0 && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4 mb-6">
                <h3 className="font-semibold text-yellow-300 mb-2">📋 Prerequisitos:</h3>
                <div className="flex flex-wrap gap-2">
                  {retoSeleccionado.prerequisitos.map((prereq, index) => {
                    const prerequisitoCompleto = retoCompletado[prereq];
                    return (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                          prerequisitoCompleto 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {prerequisitoCompleto ? <CheckCircle size={12} /> : <Lock size={12} />}
                        Reto {prereq.toUpperCase()}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="text-center">
              {esCiberseguridad && retoSeleccionado.totalPasos ? (
                <div className="space-y-3">
                  {!enProgreso && !completado && verificarPrerequisitos(retoSeleccionado.prerequisitos) && (
                    <button
                      onClick={() => iniciarRetoCyber(retoSeleccionado.id)}
                      className="w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-steens-pink to-steens-purple text-white hover:shadow-lg transform hover:scale-105"
                    >
                      <Shield size={20} />
                      Iniciar Misión Cyber
                      <ChevronRight size={20} />
                    </button>
                  )}

                  {enProgreso && !completado && (
                    <button
                      onClick={() => avanzarPasoReto(retoSeleccionado.id, retoSeleccionado.totalPasos, retoSeleccionado.puntos)}
                      className="w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:shadow-lg transform hover:scale-105"
                    >
                      <Zap size={20} />
                      Continuar Paso {progreso + 1}/{retoSeleccionado.totalPasos}
                      <ChevronRight size={20} />
                    </button>
                  )}

                  {completado && (
                    <div className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 bg-green-500/20 text-green-300 border border-green-500/30">
                      <Trophy size={20} />
                      ¡Misión Cyber Completada!
                    </div>
                  )}

                  {!verificarPrerequisitos(retoSeleccionado.prerequisitos) && (
                    <div className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 bg-red-500/20 text-red-300 border border-red-500/30">
                      <Lock size={20} />
                      Completa los prerequisitos primero
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {verificarPrerequisitos(retoSeleccionado.prerequisitos) && !completado && (
                    <button
                      onClick={() => completarReto(retoSeleccionado.id, retoSeleccionado.puntos)}
                      className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 bg-gradient-to-r ${categorias[categoriaActiva].color} text-white hover:shadow-lg transform hover:scale-105`}
                    >
                      <Target size={20} />
                      Empezar Reto
                      <ChevronRight size={20} />
                    </button>
                  )}

                  {completado && (
                    <div className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 bg-green-500/20 text-green-300 border border-green-500/30">
                      <Trophy size={20} />
                      ¡Reto Completado!
                    </div>
                  )}

                  {!verificarPrerequisitos(retoSeleccionado.prerequisitos) && (
                    <div className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 bg-red-500/20 text-red-300 border border-red-500/30">
                      <Lock size={20} />
                      Completa los prerequisitos primero
                    </div>
                  )}
                </div>
              )}

              <p className="text-xs opacity-75 mt-3">
                {user 
                  ? `Al completar ganarás ${retoSeleccionado.puntos} puntos`
                  : `Regístrate para guardar tu progreso y ganar ${retoSeleccionado.puntos} puntos`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Vista principal de retos
  return (
    <div className="min-h-screen bg-gradient-to-br from-steens-purple/20 to-steens-pink/20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-3xl p-8 mb-8 text-white text-center">
          <div className="text-5xl mb-4 animate-bounce-gentle">🚀</div>
          <h1 className="text-4xl font-bold mb-3 steens-gradient bg-clip-text text-transparent">
            Retos STEM
          </h1>
          <p className="text-lg opacity-90 mb-4">
            Desafía tu mente y descubre tu potencial en ciencia y tecnología
          </p>

          {/* Estadísticas del usuario */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-steens-pink">{stats.completados}</div>
              <div className="text-sm opacity-75">Completados</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-steens-purple">{stats.puntosGanados}</div>
              <div className="text-sm opacity-75">Puntos</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-400">{Math.round((stats.completados / stats.totalRetos) * 100)}%</div>
              <div className="text-sm opacity-75">Progreso</div>
            </div>
          </div>

          {!user && (
            <div className="bg-steens-pink/20 border border-steens-pink/30 rounded-2xl p-4 mt-4">
              <p className="text-sm font-semibold text-steens-pink mb-2">👋 ¡Hola, visitante!</p>
              <p className="text-xs opacity-90">
                Puedes explorar todos los retos. Para guardar tu progreso y ganar puntos, 
                <a href="/registro" className="text-steens-pink font-semibold hover:underline ml-1">regístrate aquí</a>
              </p>
            </div>
          )}
        </div>

        {/* Selector de Categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(categorias).map(([key, categoria]) => {
            const IconComponent = categoria.icon;
            return (
              <button
                key={key}
                onClick={() => {
                  setCategoriaActiva(key);
                  setNivelActivo('basico');
                }}
                className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 ${
                  categoriaActiva === key
                    ? `bg-gradient-to-r ${categoria.color} text-white shadow-lg`
                    : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 hover:border-steens-pink/30'
                }`}
              >
                <IconComponent size={24} />
                <div>
                  <div className="font-bold">{categoria.nombre}</div>
                  <div className="text-xs opacity-75">{categoria.descripcion}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Controles de filtrado */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {/* Selector de Niveles */}
          <div className="flex gap-2">
            {niveles.map((nivel) => {
              const IconComponent = nivel.icon;
              return (
                <button
                  key={nivel.id}
                  onClick={() => setNivelActivo(nivel.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    nivelActivo === nivel.id
                      ? nivel.color
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  <IconComponent size={16} />
                  {nivel.nombre}
                </button>
              );
            })}
          </div>

          {/* Filtro por tipo */}
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-steens-pink/50"
          >
            {tiposFiltro.map((tipo) => (
              <option key={tipo.id} value={tipo.id} className="bg-gray-800">
                {tipo.nombre}
              </option>
            ))}
          </select>

          {/* Toggle para mostrar solo disponibles */}
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="checkbox"
              checked={mostrarSoloDisponibles}
              onChange={(e) => setMostrarSoloDisponibles(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Solo disponibles</span>
          </label>
        </div>

        {/* Grid de Retos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getRetos().map((reto) => {
            const TipoIcon = getTipoIcon(reto.tipo);
            const completado = retoCompletado[reto.id];
            const enProgreso = retoEnProgreso[reto.id];
            const progreso = progresoCyber[reto.id] || 0;
            const esCiberseguridad = reto.tipo === 'ciberseguridad' && reto.totalPasos;
            const prerequisitosCompletos = verificarPrerequisitos(reto.prerequisitos);

            return (
              <div
                key={reto.id}
                className={`rounded-2xl p-6 shadow-lg border-2 transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer ${
                  completado 
                    ? 'border-green-500/30 bg-green-500/20' 
                    : enProgreso && esCiberseguridad
                    ? 'border-blue-500/30 bg-blue-500/20'
                    : !prerequisitosCompletos
                    ? 'border-red-500/30 bg-red-500/20 opacity-75'
                    : 'border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md hover:border-steens-pink/30'
                }`}
                onClick={() => setRetoSeleccionado({
                  ...reto,
                  categoria: categorias[categoriaActiva].nombre,
                  dificultad: reto.dificultad || (nivelActivo === 'basico' ? 'Fácil' : nivelActivo === 'intermedio' ? 'Medio' : 'Difícil')
                })}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TipoIcon 
                      size={24} 
                      className={`${
                        reto.tipo === 'ciberseguridad' 
                          ? 'text-steens-pink' 
                          : 'text-steens-purple'
                      }`} 
                    />
                    {completado && <Trophy size={20} className="text-yellow-500" />}
                    {enProgreso && esCiberseguridad && !completado && (
                      <div className="animate-pulse">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                    {!prerequisitosCompletos && <Lock size={16} className="text-red-400" />}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold">{reto.puntos}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {reto.titulo}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {reto.descripcion}
                </p>

                {/* Información adicional */}
                <div className="flex justify-between items-center mb-4 text-xs">
                  <span className={`px-2 py-1 rounded-full ${getDificultadColor(reto.dificultad || (nivelActivo === 'basico' ? 'Fácil' : nivelActivo === 'intermedio' ? 'Medio' : 'Difícil'))}`}>
                    {reto.dificultad || (nivelActivo === 'basico' ? 'Fácil' : nivelActivo === 'intermedio' ? 'Medio' : 'Difícil')}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Clock size={12} />
                    {reto.duracion}
                  </span>
                </div>

                {/* Progreso para ciberseguridad */}
                {esCiberseguridad && (enProgreso || completado) && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-300">
                        Progreso: {progreso}/{reto.totalPasos}
                      </span>
                      <span className="text-xs text-gray-400">
                        {Math.round((progreso / reto.totalPasos) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-600/50 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          completado 
                            ? 'bg-green-500' 
                            : 'bg-gradient-to-r from-steens-pink to-steens-purple'
                        }`}
                        style={{ width: `${(progreso / reto.totalPasos) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Términos que se aprenderán */}
                {reto.terminos && !enProgreso && !completado && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">Términos que aprenderás:</p>
                    <div className="flex flex-wrap gap-1">
                      {reto.terminos.slice(0, 3).map((termino, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-steens-purple/30 text-purple-200 text-xs rounded-full"
                        >
                          {termino}
                        </span>
                      ))}
                      {reto.terminos.length > 3 && (
                        <span className="px-2 py-1 bg-steens-pink/30 text-pink-200 text-xs rounded-full">
                          +{reto.terminos.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Estado del reto */}
                <div className="text-center">
                  {!prerequisitosCompletos ? (
                    <div className="py-2 px-4 rounded-xl font-medium text-sm bg-red-500/20 text-red-300 flex items-center justify-center gap-2">
                      <Lock size={16} />
                      Prerequisitos requeridos
                    </div>
                  ) : completado ? (
                    <div className="py-2 px-4 rounded-xl font-medium text-sm bg-green-500/20 text-green-300 flex items-center justify-center gap-2">
                      <Trophy size={16} />
                      ¡Completado!
                    </div>
                  ) : enProgreso && esCiberseguridad ? (
                    <div className="py-2 px-4 rounded-xl font-medium text-sm bg-blue-500/20 text-blue-300 flex items-center justify-center gap-2">
                      <Zap size={16} />
                      En progreso ({progreso}/{reto.totalPasos})
                    </div>
                  ) : (
                    <div className={`py-2 px-4 rounded-xl font-medium text-sm bg-gradient-to-r ${categorias[categoriaActiva].color} text-white flex items-center justify-center gap-2 opacity-90 hover:opacity-100`}>
                      <Target size={16} />
                      Empezar Reto
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {getRetos().length === 0 && (
          <div className="text-center text-white/70 py-12">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-xl font-bold mb-2">No hay retos disponibles</h3>
            <p>Prueba cambiando los filtros o selecciona otra categoría</p>
          </div>
        )}

        {/* Mensaje especial para ciberseguridad */}
        {categoriaActiva === 'tecnologia' && (
          <div className="mt-8 bg-steens-pink/20 border-l-4 border-steens-pink p-6 rounded-lg backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-steens-pink" size={24} />
              <h3 className="font-bold text-steens-pink">Zona Ciberseguridad 🛡️</h3>
            </div>
            <p className="text-steens-pink/90 mb-2">
              Los retos marcados con 🔒 son parte del programa de ciberseguridad. 
              ¡Completa los 3 niveles del Diccionario Cyber para convertirte en una experta en seguridad digital!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold text-green-300">Nivel 1</div>
                <div className="text-xs text-gray-300">Fundamentos básicos</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold text-yellow-300">Nivel 2</div>
                <div className="text-xs text-gray-300">Conceptos intermedios</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold text-red-300">Nivel 3</div>
                <div className="text-xs text-gray-300">Hacking ético avanzado</div>
              </div>
            </div>
          </div>
        )}

        {/* Botón volver */}
        <div className="text-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-2xl transition-all font-semibold"
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>

      {/* Estilos CSS personalizados para la paleta STeens */}
      <style jsx>{`
        .bg-steens-gradient {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd);
        }
        .steens-gradient {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd);
        }
        .bg-steens-pink { background-color: #ff6b6b; }
        .text-steens-pink { color: #ff6b6b; }
        .border-steens-pink { border-color: #ff6b6b; }
        .from-steens-magenta { --tw-gradient-from: #d63384; --tw-gradient-to: rgb(214 51 132 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .to-steens-purple { --tw-gradient-to: #6f42c1; }
        .bg-steens-purple { background-color: #6f42c1; }
        .text-steens-purple { color: #6f42c1; }
        .border-steens-purple { border-color: #6f42c1; }
        .glass-effect {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .steens-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(10px);
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        select option {
          background-color: #1f2937;
          color: white;
        }
      `}</style>
    </div>
  )
}