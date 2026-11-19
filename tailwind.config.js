/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: 'rgb(var(--c-night) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        parchment: 'rgb(var(--c-parchment) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        gold: 'rgb(var(--c-gold) / <alpha-value>)',
        saffron: 'rgb(var(--c-saffron) / <alpha-value>)',
        bronze: 'rgb(var(--c-bronze) / <alpha-value>)',
        vermilion: 'rgb(var(--c-vermilion) / <alpha-value>)',
        lapis: 'rgb(var(--c-lapis) / <alpha-value>)',
        jade: 'rgb(var(--c-jade) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--c-gold) / 0.35), 0 8px 30px -10px rgb(var(--c-gold) / 0.35)',
      },
    },
  },
  plugins: [],
};
