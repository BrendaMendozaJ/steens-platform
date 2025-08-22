'use client'

// Iconos ultra sofisticados para STEENS
export const Icon = ({ name, className = "w-12 h-12" }) => {
  const iconMap = {
    Rocket: "🚀",
    Brain: "🧠",
    Shield: "🛡️",
    Scientist: "👩‍🔬",
    Water: "💧",
    Energy: "⚡",
    Plant: "🌱",
    Butterfly: "🦋",
    SmartCity: "🏙️",
    Medical: "⚕️",
    Achievement: "⭐",
    Chat: "💬"
  }

  const emoji = iconMap[name] || "❓"

  return (
    <div className={`${className} flex items-center justify-center relative group cursor-pointer`}>
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-40 transition-all duration-500 blur-2xl scale-110 animate-pulse-glow"></div>

      {/* Outer ring */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-500/20 to-blue-500/20 rounded-3xl border border-white/20 group-hover:border-pink-400/50 transition-all duration-500 group-hover:scale-105"></div>

      {/* Inner container */}
      <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/15 rounded-2xl w-full h-full flex items-center justify-center text-3xl font-bold transition-all duration-500 group-hover:scale-110 group-hover:border-pink-400/40 group-hover:bg-gradient-to-br group-hover:from-white/15 group-hover:via-pink-400/10 group-hover:to-purple-500/10 overflow-hidden">

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>

        {/* Emoji */}
        <span className="relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>

        {/* Particle effects */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-2 left-2 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
          <div className="absolute top-4 right-3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute bottom-3 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
    </div>
  )
}