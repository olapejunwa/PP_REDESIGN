/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'matte-dark-blue': '#111827', // Equivalent to bg-gray-900
        'brand-purple': '#6d28d9', // A nice purple for OWA
        'brand-cream': '#fdf6e3', // A light cream for Audit.me
      },
    },
  },
  plugins: [],
};
