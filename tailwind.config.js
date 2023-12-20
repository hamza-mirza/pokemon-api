/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          0: '#DCDBE7',
          1: '#CFCCE1',
          2: '#592FC1'
        },
        green: {
          0: '#EAECED',
          1: '#D7E2DC'
        }
      }
    }
  },
  plugins: []
}
