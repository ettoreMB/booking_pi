/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'body': '#FFF',
        optionA: {
          'main': '#F0572D',
          gray: {
            'light': '#DFE4EA',
            'dark': '#191B1D',
            'main': '#31363F'
          }
        },
        optionB: {
          'main': '#1DBEB4',
          gray: {
            'light': '#F3F1ED',
            'main': '#545776',
            'dark': '#383B58',
          }
        },
        optionC: {
          'main': '#FBC02D',
          gray: {
            'light': '#FFFBE2',
            'main': '#607D8B',
            'dark': '#263238',
          }
        },
        red: {
          'light': '#ffe6e6',
          'dark': '#b00020'
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("@tailwindcss/forms")
  ],
}
