/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'matte-dark-blue': '#111827', // Equivalent to bg-gray-900
      },
    },
  },
  plugins: [],
};
