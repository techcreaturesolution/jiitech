/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    
    
    extend: {
      fontFamily: {
        monoton: ["Monoton", "cursive"],
        train: ['"Train One"', 'serif'],
        // zenTokyoZoo: ["Zen Tokyo Zoo", "cursive"]
      },

      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }  ,
      
      

     clipPath: {
        tree: "polygon(50% 0%, 0% 100%, 100% 100%)",
      },
      colors: {
        customBlue: '#b6002c',
        customLiteBlue: '#D01343',
        customRed:'#fedede'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
