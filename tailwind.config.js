/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0B5FAE',
        accent: '#00A9E0',
        navy: '#1F2A44',
        'light-gray': '#F4F5F7',
        'mid-gray': '#CBD2D9',
        'text-gray': '#4A5568',
        orange: '#EA7317',
        green: '#2E8B57',
        red: '#C0392B',
        'pale-blue': '#E8F2FB',
        'pale-green': '#E8F5EE',
        'pale-orange': '#FCEEDD',
        'pale-red': '#FBEBE7',
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
