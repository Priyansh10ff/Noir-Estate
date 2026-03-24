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
        noir: {
          black:   '#0A0A0A',
          dark:    '#111111',
          surface: '#181818',
          surface2:'#1F1F1F',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light:   '#E8CC9A',
          dim:     '#8B6F43',
          pale:    '#F5EDD8',
        },
        cream: '#F5F0E8',
        muted: '#888880',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:    ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(52px,8vw,96px)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl':  ['clamp(42px,6vw,76px)', { lineHeight: '1.08' }],
        'display-lg':  ['clamp(36px,5vw,58px)', { lineHeight: '1.1' }],
      },
      animation: {
        'fade-up':     'fadeUp 0.8s ease forwards',
        'fade-in':     'fadeIn 0.6s ease forwards',
        'marquee':     'marquee 25s linear infinite',
        'scroll-pulse':'scrollPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:  { from:{ opacity:'0', transform:'translateY(24px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:  { from:{ opacity:'0' }, to:{ opacity:'1' } },
        marquee: { from:{ transform:'translateX(0)' }, to:{ transform:'translateX(-50%)' } },
        scrollPulse: {
          '0%,100%': { opacity:'0.3', transform:'scaleY(1)' },
          '50%':     { opacity:'1',   transform:'scaleY(1.3)' },
        },
      },
      borderColor: { gold: '#C9A96E', 'gold-dim': '#8B6F43' },
      spacing: { '18': '4.5rem', '22': '5.5rem' },
    },
  },
  plugins: [],
}

export default config
