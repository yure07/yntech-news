/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#500E7F',
        'purple-dark': '#360B54',
        'primary-light': '#F5F5F5',
        'secondary-light': '#ADADAD'
      },
      fontFamily: {
        'montagu': ['Montagu Slab', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      fontSize: {
        'h1': '30px',
        'h2': '26px',
        'h3': '15px',
        'small': '10px'
      },
      width: {
        'max-desktop': '1060px',
        'custom': '1440px',
        'custom-image': '630px',
        '57.5': '230px',
      },
      height: {
        '9.5': '38px',
        '11.5': '46px',
        '38': '156px'
      },
      spacing: {
        '1/10': '10%'
      },
      borderRadius: {
        'xl-plus': '14px'
      }
    },
  },
  plugins: [],
}

