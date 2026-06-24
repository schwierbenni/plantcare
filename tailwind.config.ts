import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7EE',
        primary: '#4C6B3A',
        dark: '#26331F',
        muted: '#7C8A6B',
        brown: '#5E4127',
        'dark-green': '#26331F',
        'mid-green': '#33421F',
      },
      fontFamily: {
        newsreader: ['var(--font-newsreader)', 'Georgia', 'serif'],
        bricolage: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
        nunito: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        app: '390px',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg) translateX(0px)' },
          '50%': { transform: 'rotate(3deg) translateX(2px)' },
        },
        'sway-slow': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'leaf-flutter': {
          '0%, 100%': { transform: 'rotate(-1deg) scaleX(1)' },
          '50%': { transform: 'rotate(1.5deg) scaleX(0.98)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
          '100%': { transform: 'translateY(-40px) rotate(15deg)', opacity: '0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'grow-up': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        drip: {
          '0%': { transform: 'translateY(-4px)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(10px)', opacity: '0' },
        },
        'particle-float': {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-60px) translateX(20px) rotate(45deg)', opacity: '0' },
        },
      },
      animation: {
        sway: 'sway 4s ease-in-out infinite',
        'sway-slow': 'sway-slow 6s ease-in-out infinite',
        'sway-slower': 'sway-slow 9s ease-in-out infinite',
        'leaf-flutter': 'leaf-flutter 3s ease-in-out infinite',
        'float-up': 'float-up 3s ease-out forwards',
        breathe: 'breathe 5s ease-in-out infinite',
        'grow-up': 'grow-up 1s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        wiggle: 'wiggle 2s ease-in-out infinite',
        drip: 'drip 2s ease-in infinite',
        'particle-float': 'particle-float 4s ease-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
