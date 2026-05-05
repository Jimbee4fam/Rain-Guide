/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rain-bg': '#0a0c0f',
        'rain-surface': '#111418',
        'rain-card': '#161b22',
        'rain-border': '#21262d',
        'rain-green': '#00ff88',
        'rain-green-dim': '#00cc66',
        'rain-blue': '#00aaff',
        'rain-blue-dim': '#0088cc',
        'rain-amber': '#ffaa00',
        'rain-amber-dim': '#cc8800',
        'rain-red': '#ff4444',
        'rain-purple': '#aa44ff',
        'rain-text': '#c9d1d9',
        'rain-muted': '#6e7681',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
