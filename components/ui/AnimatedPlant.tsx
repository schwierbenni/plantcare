'use client'

interface AnimatedPlantProps {
  variant?: 'monstera' | 'tall-tree' | 'small-bush' | 'fern' | 'succulent'
  className?: string
  size?: number
  delay?: number
}

export function AnimatedPlant({ variant = 'monstera', className = '', size = 120, delay = 0 }: AnimatedPlantProps) {
  const style = { animationDelay: `${delay}s` }

  if (variant === 'monstera') {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" className={className} style={style} fill="none">
        {/* Stem */}
        <line x1="60" y1="110" x2="60" y2="55" stroke="#4C6B3A" strokeWidth="3" strokeLinecap="round" />
        {/* Left large leaf */}
        <g className="plant-sway plant-sway-delay-1" style={{ transformOrigin: '60px 70px' }}>
          <path
            d="M60 70 C40 50 15 45 20 25 C25 5 45 10 55 30 C58 38 60 50 60 70Z"
            fill="#4C6B3A"
            opacity="0.9"
          />
          <path d="M60 70 C42 55 28 45 25 30" stroke="#33421F" strokeWidth="1" strokeLinecap="round" />
          <path d="M45 55 C38 48 32 42 28 35" stroke="#33421F" strokeWidth="0.8" strokeLinecap="round" />
          {/* Monstera holes */}
          <ellipse cx="35" cy="45" rx="4" ry="6" fill="#FAF7EE" opacity="0.6" transform="rotate(-20 35 45)" />
          <ellipse cx="42" cy="35" rx="3" ry="4" fill="#FAF7EE" opacity="0.6" transform="rotate(-15 42 35)" />
        </g>
        {/* Right large leaf */}
        <g className="plant-sway plant-sway-delay-2" style={{ transformOrigin: '60px 65px' }}>
          <path
            d="M60 65 C80 45 105 40 100 20 C95 0 75 5 65 25 C62 33 60 45 60 65Z"
            fill="#3d5630"
            opacity="0.85"
          />
          <path d="M60 65 C78 50 92 40 95 25" stroke="#26331F" strokeWidth="1" strokeLinecap="round" />
          <ellipse cx="83" cy="38" rx="4" ry="5" fill="#FAF7EE" opacity="0.5" transform="rotate(20 83 38)" />
          <ellipse cx="77" cy="28" rx="3" ry="4" fill="#FAF7EE" opacity="0.5" transform="rotate(15 77 28)" />
        </g>
        {/* Small top leaf */}
        <g className="animate-sway" style={{ transformOrigin: '60px 55px' }}>
          <path
            d="M60 55 C55 40 50 30 56 18 C60 10 68 15 66 28 C64 38 62 47 60 55Z"
            fill="#5a7f43"
            opacity="0.8"
          />
        </g>
        {/* Soil */}
        <ellipse cx="60" cy="112" rx="22" ry="6" fill="#5E4127" opacity="0.3" />
      </svg>
    )
  }

  if (variant === 'tall-tree') {
    return (
      <svg width={size * 0.8} height={size * 1.4} viewBox="0 0 100 170" className={className} style={style} fill="none">
        {/* Trunk */}
        <rect x="44" y="110" width="12" height="55" rx="4" fill="#5E4127" />
        <rect x="46" y="110" width="4" height="55" rx="2" fill="#7a5535" opacity="0.5" />
        {/* Main canopy layers */}
        <g className="plant-sway plant-sway-delay-1" style={{ transformOrigin: '50px 110px' }}>
          <ellipse cx="50" cy="90" rx="35" ry="30" fill="#4C6B3A" />
        </g>
        <g className="plant-sway plant-sway-delay-2" style={{ transformOrigin: '50px 90px' }}>
          <ellipse cx="50" cy="68" rx="28" ry="24" fill="#3d5630" />
        </g>
        <g className="plant-sway plant-sway-delay-3" style={{ transformOrigin: '50px 70px' }}>
          <ellipse cx="50" cy="48" rx="20" ry="18" fill="#4C6B3A" />
        </g>
        <g className="plant-sway" style={{ transformOrigin: '50px 50px' }}>
          <ellipse cx="50" cy="30" rx="13" ry="12" fill="#33421F" />
        </g>
        {/* Branch leaves */}
        <g className="animate-sway-slow" style={{ transformOrigin: '25px 85px' }}>
          <ellipse cx="22" cy="82" rx="12" ry="8" fill="#5a7f43" transform="rotate(-20 22 82)" />
        </g>
        <g className="animate-sway-slower" style={{ transformOrigin: '75px 80px' }}>
          <ellipse cx="78" cy="77" rx="12" ry="8" fill="#5a7f43" transform="rotate(20 78 77)" />
        </g>
      </svg>
    )
  }

  if (variant === 'fern') {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" className={className} style={style} fill="none">
        {/* Central stem */}
        <path d="M60 115 C60 90 58 70 55 50" stroke="#4C6B3A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Fern fronds */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = 105 - i * 13
          const angle = i % 2 === 0 ? -35 : 35
          const len = 20 + i * 3
          const cx = i % 2 === 0 ? 60 - len * 0.7 : 60 + len * 0.7
          return (
            <g key={i} className={`plant-sway plant-sway-delay-${(i % 4) + 1}`} style={{ transformOrigin: `60px ${y}px` }}>
              <path
                d={`M60 ${y} C${cx} ${y - 8} ${cx + (i % 2 === 0 ? -5 : 5)} ${y - 20} ${cx} ${y - 15}`}
                stroke="#4C6B3A"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <ellipse
                cx={cx}
                cy={y - 12}
                rx={len * 0.3}
                ry={6}
                fill="#5a7f43"
                opacity="0.85"
                transform={`rotate(${angle} ${cx} ${y - 12})`}
              />
            </g>
          )
        })}
      </svg>
    )
  }

  if (variant === 'succulent') {
    return (
      <svg width={size * 0.7} height={size * 0.6} viewBox="0 0 80 70" className={className} style={style} fill="none">
        {/* Pot */}
        <path d="M25 60 L30 50 L50 50 L55 60Z" fill="#8B6347" />
        <rect x="24" y="58" width="32" height="5" rx="2" fill="#7a5535" />
        {/* Leaves */}
        <g className="animate-breathe" style={{ transformOrigin: '40px 45px' }}>
          <ellipse cx="40" cy="38" rx="8" ry="14" fill="#4C6B3A" />
          <ellipse cx="26" cy="42" rx="7" ry="11" fill="#5a7f43" transform="rotate(-25 26 42)" />
          <ellipse cx="54" cy="42" rx="7" ry="11" fill="#5a7f43" transform="rotate(25 54 42)" />
          <ellipse cx="20" cy="36" rx="5" ry="8" fill="#4C6B3A" transform="rotate(-45 20 36)" />
          <ellipse cx="60" cy="36" rx="5" ry="8" fill="#4C6B3A" transform="rotate(45 60 36)" />
          {/* Center highlight */}
          <ellipse cx="40" cy="32" rx="3" ry="5" fill="#7aad5e" opacity="0.6" />
        </g>
      </svg>
    )
  }

  if (variant === 'small-bush') {
    return (
      <svg width={size * 0.9} height={size * 0.7} viewBox="0 0 100 80" className={className} style={style} fill="none">
        <g className="plant-sway" style={{ transformOrigin: '50px 70px' }}>
          <ellipse cx="50" cy="50" rx="38" ry="28" fill="#4C6B3A" />
          <ellipse cx="28" cy="55" rx="20" ry="18" fill="#5a7f43" />
          <ellipse cx="72" cy="55" rx="20" ry="18" fill="#3d5630" />
          <ellipse cx="50" cy="38" rx="22" ry="18" fill="#5a7f43" />
          {/* Highlight dots */}
          <circle cx="35" cy="42" r="3" fill="#7aad5e" opacity="0.4" />
          <circle cx="58" cy="38" r="2.5" fill="#7aad5e" opacity="0.4" />
          <circle cx="45" cy="55" r="2" fill="#7aad5e" opacity="0.3" />
        </g>
        <ellipse cx="50" cy="72" rx="28" ry="6" fill="#5E4127" opacity="0.2" />
      </svg>
    )
  }

  return null
}

export function FloatingParticles({ count = 6 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-particle-float"
          style={{
            left: `${15 + i * 14}%`,
            bottom: `${10 + (i % 3) * 8}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        >
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
            <ellipse cx="4" cy="5" rx="3" ry="5" fill="#4C6B3A" opacity="0.4" transform="rotate(15 4 5)" />
          </svg>
        </div>
      ))}
    </div>
  )
}
