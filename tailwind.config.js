/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0077be',
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0077be',
          600: '#0369a1',
          700: '#0c4a6e',
        },
        adventure: '#ff6b35',
        beaches: '#0077be',
        wildlife: '#228b22',
        culture: '#8b4513',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            h1: {
              color: '#111827',
              fontWeight: '800',
            },
            h2: {
              color: '#111827',
              fontWeight: '700',
            },
            h3: {
              color: '#111827',
              fontWeight: '600',
            },
            strong: {
              color: '#111827',
            },
            'ul > li': {
              paddingLeft: '1.5rem',
            },
            'ul > li::before': {
              backgroundColor: '#6b7280',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}