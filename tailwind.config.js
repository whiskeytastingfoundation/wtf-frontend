const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './node_modules/@flavorly/vanilla-components/dist/presets/tailwind/all.json',
  ],
  theme: {
    extend: {
      colors: {
        // Set your primary color
        primary: colors.indigo,
        'dark-bg': '#1a202c',
        'dark-text': '#f7fafc',
        'dark-input-bg': '#2d3748',
        'dark-input-border': '#4a5568',
        'dark-input-focus': '#63b3ed',
        // Add more custom colors as needed
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),

    // Forms plugin is required if you are using the tailwind preset
    require('@tailwindcss/forms'),
  ],
}