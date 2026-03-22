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
        bg: '#030608',
        surface: '#080f14',
        border: '#101e28',
        green: '#00e87a',
        muted: '#4a6a7a',
        white: '#e8f4fb',
        amber: '#f5a623',
        red: '#ff3d5a',
        blue: '#1a8cff',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
