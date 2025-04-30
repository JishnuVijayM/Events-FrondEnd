module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF960B',
        orange: '#FF7802',
        gray: '#403e3e'
      },
      height: {
        'screen-90': '90vh',
        'basic-screen': '66vh',
        'screen-50': '50vh', 
      },
      minHeight: {
        'basic-screen': '66vh',
        'auto': 'auto',
      },
    },
  },
  plugins: [],
}
