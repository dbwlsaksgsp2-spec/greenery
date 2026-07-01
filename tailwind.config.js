/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          light: '#3E7D54',
          DEFAULT: '#2D5A3D',
          dark: '#1C3A27',
        },
        olive: {
          light: '#94A787',
          DEFAULT: '#7A8B6F',
          dark: '#5F6E55',
        },
        sage: {
          light: '#C3D0B7',
          DEFAULT: '#A8B89A',
          dark: '#8D9F80',
        },
        ivory: {
          DEFAULT: '#F5F1EB',
          dark: '#E2DDD4',
        },
        cream: {
          DEFAULT: '#FAF8F5',
          dark: '#EFECE6',
        },
        charcoal: '#2C2C2C',
        'warm-gray': {
          light: '#A5A093',
          DEFAULT: '#8A8578',
          dark: '#6F6A5D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Gowun Batang"', 'Georgia', 'serif'],
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'scale-up': 'scaleUp 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
