/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#090d16',
        darkPanel: '#0f172a',
        neonCyan: '#06b6d4',
        neonPurple: '#8b5cf6',
        neonBlue: '#2563eb',
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.15)',
        'glow-purple': '0 0 15px rgba(139, 92, 246, 0.15)',
        'glow-blue': '0 0 15px rgba(37, 99, 235, 0.15)',
      },
    },
  },
  plugins: [],
}
