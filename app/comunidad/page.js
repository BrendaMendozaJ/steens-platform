'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '../components/Icons'

const referentesSTEM = [
  {
    nombre: 'Mariana Costa',
    area: 'Tecnología & Educación',
    logro: 'Fundadora y CEO de Laboratoria',
    descripcion: 'Revolucionó la educación tech en Latinoamérica, demostrando que las mujeres pueden liderar la transformación digital. Su visión inclusiva ha cambiado miles de vidas.',
    frase: '"La tecnología puede transformar vidas cuando es inclusiva y accesible para todas."',
    imagen: '👩‍💻',
    impacto: '+3000 mujeres capacitadas',
    historia: 'Comenzó con la idea de que la tecnología debería ser para todos. Hoy, Laboratoria es referente mundial en educación tech inclusiva.',
    inspiracion: 'Si te gusta la programación y quieres cambiar el mundo, Mariana te demuestra que es posible.'
  },
  {
    nombre: 'Fabiola León-Velarde',
    area: 'Medicina & Investigación',
    logro: 'Primera mujer rectora de la UPCH',
    descripcion: 'Pionera mundial en investigación de adaptación a la altura. Sus estudios han salvado vidas y abierto nuevos campos de investigación médica.',
    frase: '"La ciencia no tiene género, solo requiere pasión, dedicación y curiosidad infinita."',
    imagen: '👩‍⚕️',
    impacto: '40+ años investigando',
    historia: 'Desde joven se fascinó por entender cómo el cuerpo humano se adapta a las alturas de los Andes peruanos.',
    inspiracion: 'Si te emociona la medicina y la investigación, Fabiola te muestra que puedes descubrir cosas increíbles.'
  },
  {
    nombre: 'Antonieta Alva',
    area: 'Economía & Matemáticas Aplicadas',
    logro: 'Ex Ministra de Economía y Finanzas',
    descripcion: 'Demostró que las matemáticas son una herramienta poderosa para crear políticas que mejoren la vida de millones de peruanos.',
    frase: '"Los números cuentan historias que pueden cambiar el mundo y mejorar vidas."',
    imagen: '👩‍💼',
    impacto: 'Políticas que impactaron millones',
    historia: 'Usó su amor por los números para crear políticas económicas que redujeron la pobreza en el Perú.',
    inspiracion: 'Si te gustan las matemáticas y la economía, Antonieta te enseña que puedes cambiar un país entero.'
  },
  {
    nombre: 'Patricia Teullet',
    area: 'Ingeniería & Telecomunicaciones',
    logro: 'Líder en conectividad rural',
    descripcion: 'Ha liderado proyectos que llevaron internet a comunidades remotas del Perú, conectando a miles de familias con el mundo digital.',
    frase: '"Cada problema es una oportunidad para innovar y crear soluciones que impacten positivamente."',
    imagen: '👩‍🔧',
    impacto: 'Conectó comunidades remotas',
    historia: 'Vio que muchas comunidades peruanas no tenían acceso a internet y dedicó su carrera a solucionarlo.',
    inspiracion: 'Si te gusta la ingeniería y resolver problemas, Patricia te muestra cómo la tecnología puede unir al Perú.'
  }
]



export default function Comunidad() {
  const [referenteSeleccionada, setReferenteSeleccionada] = useState(null)

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-3xl p-8 mb-8 text-white text-center">
          <div className="mb-4 flex justify-center">
            <Icon name="Scientist" className="w-20 h-20" />
          </div>
          <h1 className="text-4xl font-bold mb-3 steens-gradient-text">
            Comunidad STEENS
          </h1>
          <p className="text-lg opacity-90">
            Inspírate con mujeres peruanas que están cambiando el mundo
          </p>
        </div>

        {/* Comunidades Locales */}
        <div className="glass-effect rounded-3xl p-8 mb-8 text-white">
          <div className="text-center mb-6">
            <div className="mb-4 flex justify-center">
              <Icon name="Chat" className="w-16 h-16" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-steens-pink">Comunidades STEM en Perú</h2>
            <p className="text-lg opacity-90">Conecta con organizaciones reales que empoderan a mujeres en STEM</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* WIEE USIL Lima */}
            <div className="steens-card rounded-2xl p-6 hover-lift">
              <div className="text-center mb-4">
                <div className="mb-3 flex justify-center">
                  <Icon name="Energy" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-steens-pink mb-2">WIEE USIL Lima</h3>
                <p className="text-sm opacity-90 mb-3">Women in Electrical Engineering and Electronics</p>
              </div>
              <div className="space-y-3 text-sm">
                <p><strong>🎯 Misión:</strong> Empoderar a mujeres en ingeniería eléctrica y electrónica</p>
                <p><strong>📍 Ubicación:</strong> Universidad San Ignacio de Loyola, Lima</p>
                <p><strong>🔗 Actividades:</strong> Talleres, conferencias, networking</p>
                <div className="bg-steens-pink/20 rounded-xl p-3 mt-4">
                  <p className="text-xs font-semibold text-steens-pink">¡Perfecta para ti si te gusta la ingeniería eléctrica!</p>
                </div>
              </div>
            </div>

            {/* Peruvians in STEM */}
            <div className="steens-card rounded-2xl p-6 hover-lift">
              <div className="text-center mb-4">
                <div className="mb-3 flex justify-center">
                  <Icon name="Scientist" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-steens-pink mb-2">Peruvians in STEM</h3>
                <p className="text-sm opacity-90 mb-3">Red global de peruanos en ciencia y tecnología</p>
              </div>
              <div className="space-y-3 text-sm">
                <p><strong>🎯 Misión:</strong> Conectar y visibilizar talentos peruanos en STEM</p>
                <p><strong>🌍 Alcance:</strong> Internacional con capítulos locales</p>
                <p><strong>🔗 Actividades:</strong> Mentorías, eventos, oportunidades</p>
                <div className="bg-steens-pink/20 rounded-xl p-3 mt-4">
                  <p className="text-xs font-semibold text-steens-pink">¡Ideal para conectar con peruanos STEM en todo el mundo!</p>
                </div>
              </div>
            </div>

            {/* Women in Tech Peru */}
            <div className="steens-card rounded-2xl p-6 hover-lift">
              <div className="text-center mb-4">
                <div className="mb-3 flex justify-center">
                  <Icon name="Brain" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-steens-pink mb-2">Women in Tech Peru</h3>
                <p className="text-sm opacity-90 mb-3">Comunidad de mujeres en tecnología</p>
              </div>
              <div className="space-y-3 text-sm">
                <p><strong>🎯 Misión:</strong> Promover la participación femenina en tech</p>
                <p><strong>📍 Ubicación:</strong> Lima y ciudades principales</p>
                <p><strong>🔗 Actividades:</strong> Bootcamps, hackathons, charlas</p>
                <div className="bg-steens-pink/20 rounded-xl p-3 mt-4">
                  <p className="text-xs font-semibold text-steens-pink">¡Perfecta si quieres entrar al mundo tech!</p>
                </div>
              </div>
            </div>

            {/* IEEE WIE Peru */}
            <div className="steens-card rounded-2xl p-6 hover-lift">
              <div className="text-center mb-4">
                <div className="mb-3 flex justify-center">
                  <Icon name="SmartCity" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-steens-pink mb-2">IEEE WIE Peru</h3>
                <p className="text-sm opacity-90 mb-3">Women in Engineering - Sección Perú</p>
              </div>
              <div className="space-y-3 text-sm">
                <p><strong>🎯 Misión:</strong> Inspirar y empoderar mujeres ingenieras</p>
                <p><strong>📍 Ubicación:</strong> Múltiples universidades del Perú</p>
                <p><strong>🔗 Actividades:</strong> Conferencias técnicas, workshops</p>
                <div className="bg-steens-pink/20 rounded-xl p-3 mt-4">
                  <p className="text-xs font-semibold text-steens-pink">¡Excelente para networking profesional en ingeniería!</p>
                </div>
              </div>
            </div>

            {/* Girls in Tech Lima */}
            <div className="steens-card rounded-2xl p-6 hover-lift">
              <div className="text-center mb-4">
                <div className="mb-3 flex justify-center">
                  <Icon name="Rocket" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-steens-pink mb-2">Girls in Tech Lima</h3>
                <p className="text-sm opacity-90 mb-3">Capítulo limeño de la organización global</p>
              </div>
              <div className="space-y-3 text-sm">
                <p><strong>🎯 Misión:</strong> Cerrar la brecha de género en tecnología</p>
                <p><strong>📍 Ubicación:</strong> Lima, Perú</p>
                <p><strong>🔗 Actividades:</strong> Mentorías, eventos, programas educativos</p>
                <div className="bg-steens-pink/20 rounded-xl p-3 mt-4">
                  <p className="text-xs font-semibold text-steens-pink">¡Ideal para chicas que recién empiezan en tech!</p>
                </div>
              </div>
            </div>

            {/* Laboratoria Alumni */}
            <div className="steens-card rounded-2xl p-6 hover-lift">
              <div className="text-center mb-4">
                <div className="mb-3 flex justify-center">
                  <Icon name="Achievement" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-steens-pink mb-2">Laboratoria Alumni</h3>
                <p className="text-sm opacity-90 mb-3">Red de egresadas de Laboratoria</p>
              </div>
              <div className="space-y-3 text-sm">
                <p><strong>🎯 Misión:</strong> Apoyar el crecimiento profesional continuo</p>
                <p><strong>📍 Ubicación:</strong> Lima y Arequipa</p>
                <p><strong>🔗 Actividades:</strong> Networking, mentorías, oportunidades laborales</p>
                <div className="bg-steens-pink/20 rounded-xl p-3 mt-4">
                  <p className="text-xs font-semibold text-steens-pink">¡Perfecta si te interesa el desarrollo web y UX!</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Grid de Referentes con animaciones */}
        <div className="grid lg:grid-cols-2 gap-8">
          {referentesSTEM.map((referente, index) => (
            <div
              key={index}
              className="steens-card rounded-3xl p-8 text-white hover-lift cursor-pointer"
              onClick={() => setReferenteSeleccionada(referente)}
            >
              <div className="text-center mb-6">
                <div className="mb-4 flex justify-center animate-bounce-gentle hover:animate-spin-slow transition-all">
                  <Icon name="Scientist" className="w-20 h-20" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-steens-pink text-glow">
                  {referente.nombre}
                </h3>
                <p className="font-semibold text-lg mb-3 text-shimmer">
                  {referente.area}
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all">
                  <p className="text-sm font-semibold mb-2 text-steens-pink">🏆 Su Gran Logro:</p>
                  <p className="font-semibold">{referente.logro}</p>
                </div>

                <div className="bg-steens-pink/10 rounded-2xl p-4 hover:bg-steens-pink/20 transition-all">
                  <p className="text-sm font-semibold mb-2 text-steens-pink">📖 Su Historia:</p>
                  <p className="text-sm leading-relaxed">{referente.historia}</p>
                </div>

                <div className="bg-steens-purple/20 rounded-2xl p-4 hover:bg-steens-purple/30 transition-all">
                  <p className="text-sm font-semibold mb-2 text-steens-pink">💭 Su Frase Inspiradora:</p>
                  <p className="italic text-center font-medium">"{referente.frase.replace(/"/g, '')}"</p>
                </div>

                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl p-4 hover:from-yellow-400/30 hover:to-yellow-600/30 transition-all">
                  <p className="text-sm font-semibold mb-2 text-yellow-200">✨ ¿Por qué te puede inspirar?</p>
                  <p className="text-sm">{referente.inspiracion}</p>
                </div>

                <div className="text-center">
                  <span className="bg-steens-magenta/20 text-steens-magenta px-4 py-2 rounded-full text-sm font-bold hover:bg-steens-magenta/30 transition-all animate-pulse-glow">
                    Impacto: {referente.impacto}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="bg-steens-pink/20 hover:bg-steens-pink/40 text-steens-pink px-4 py-2 rounded-xl font-semibold transition-all">
                  Clic para conocer más ✨
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón volver */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors"
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}