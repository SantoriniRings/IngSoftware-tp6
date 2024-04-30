/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '300px',
      'cel': '380px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1180px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
          'reno': {
            '50': '#d3d9ee',
            '100': '#c9d2e8',
            '200': '#acbadd',
            '300': '#8099cb',
            '400': '#4f73b5',
            '500': '#3c568b',
            '600': '#2c406d',
            '700': '#223153',
            '800': '#1c2640',
            '900': '#182034',
            '950': '#0b0d13',
        },
        'tp':{
          'oxfordblue': '#011638',
          'charcoal': '#364156',
          'silver': '#CDCDCD',
          'honeydew': '#DFF8EB',
          'calgreen': '#214E34'
        }
      }
    }
  },
  plugins: [],
}