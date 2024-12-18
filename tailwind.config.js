/** @type {import('tailwindcss').Config} */
export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
];
export const theme = {
  extend: {
    keyframes: {
      typing: {
        "0%": {
          width: "0%",
          visibility: "hidden"
        },
        "100%": {
          width: "100%"
        }  
      },
      blink: {
        "50%": {
          borderColor: "transparent"
        },
        "100%": {
          borderColor: "  "
        }  
      }
    },
    animation: {
      typing: "typing 2s steps(20) "
    },
    fontFamily: {
      merriweather: ["Merriweather", 'serif']
    }
  },
};
export const plugins = [];  