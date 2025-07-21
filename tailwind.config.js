// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1a2a6c',
        'secondary': '#b21f1f',
        'accent': '#fdbb2d',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      },
      keyframes: {
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
```css
/* src/index.css */
@import url('[https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap](https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap)');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply font-sans text-gray-800 bg-white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.lavalamp {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.blob {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  filter: blur(40px);
}

.page-transition-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms, transform 300ms;
}

.page-transition-exit {
  opacity: 1;
  transform: translateY(0);
}

.page-transition-exit-active {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 300ms, transform 300ms;
}

.animated-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animated-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```react