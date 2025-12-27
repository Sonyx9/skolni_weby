/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0edff',
          100: '#ddd6ff',
          200: '#c2b5ff',
          300: '#9d8aff',
          400: '#7a5aff',
          500: '#5c3aff',
          600: '#4a2ae6',
          700: '#3d22b8',
          800: '#331f91',
          900: '#22009C', // Logo barva
        },
        // Brand colors
        brand: '#22009C', // Logo barva
        accent: '#FF7400', // Tlačítka
      },
    },
  },
  plugins: [],
};

