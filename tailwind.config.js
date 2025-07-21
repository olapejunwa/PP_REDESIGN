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