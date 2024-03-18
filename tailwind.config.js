/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        myBlue: "#0A32B3",
        myBlueDark: "#082481",
        myPink: "#BD365D",
        myPinkDark: "#701E35",
      },
      backgroundImage: {
        pattern:
          "url('https://camo.githubusercontent.com/cba518ead87b032dc6f1cbfc7fade27604449201ac1baf34d889f77f093f01ac/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')",
        patternDark:
          "url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
      },
    },
  },
  plugins: [],
};
