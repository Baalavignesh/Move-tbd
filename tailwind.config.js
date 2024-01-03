/** @type {import('tailwindcss').Config} */

export default {

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    colors: {
      'primary': '#FEEC18',
      'secondary': '#00FEFF',
      'secondary-2':'#193C46',
      'custom-grey': '#1C1C1C',
      'custom-grey-light':'#3D3D3D',
      'custom-white':'#FFF8E6',
      'custom-black': '#000000',
      'custom-red':'#FF1200'
    },
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }                    
    },

  },

  plugins: [],

};
