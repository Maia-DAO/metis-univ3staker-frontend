/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/views/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'ui-sans-serif', 'system-ui']
    },
    // fontSize: {
    //   'xs': ['0.625rem', { lineHeight: '1rem' }], // 10px
    //   'sm': ['0.75rem', { lineHeight: '1.25rem' }], // 12px
    //   'base': ['0.875rem', { lineHeight: '1.5rem' }], // 14px
    //   'lg': [ '1rem', { lineHeight: '1.75rem' }], // 16px
    //   'xl': [ '1.125rem', { lineHeight: '1.75rem' }], // 18px
    //   '2xl': ['1.375rem', { lineHeight: '2rem' }], // 22px
    //   '3xl': ['1.75rem', { lineHeight: '2.25rem' }], // 28px
    //   '4xl': ['2.125rem', { lineHeight: '2.5rem' }], // 34px
    //   '5xl': ['2.75rem', { lineHeight: '1' }], // 44px
    //   '6xl': ['3.25rem', { lineHeight: '1' }], // 52px
    //   '7xl': ['3.75rem', { lineHeight: '1' }], // 60px
    //   '8xl': ['4.5rem', { lineHeight: '1' }], // 72px
    //   '9xl': ['5.25rem', { lineHeight: '1' }], // 84px
    // },
    extend: {
      backgroundImage: {
        "gradient-190": "linear-gradient(190deg, var(--tw-gradient-stops))",
      },
      colors: {
        green: {
          charleston: "#252833"
        },
        blue: {
          tiffany: "#18CAB9",
          yankees: "#1a2d42",
        },
        dark: {
          light: "#121A2A",
          medium: "#121625",
          hard: "#0d111c",
          gunmetal: "#1B1E29",
          purple: "#320930",
          turquoise: "#00DACC",
          crayola: "#313042",
        },
      },
    },
  },
  plugins: [],
};
