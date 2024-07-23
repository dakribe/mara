/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "oklch(15.12% 0.0379 244.86)",
        foreground: "oklch(99% 0.0303 244.86)",
        brand: {
          300: "oklch(58.89% 0.1116 244.86)",
          400: "oklch(53.89% 0.1116 244.86)",
          500: "oklch(50% 0.1116 244.86)",
          600: "oklch(43.89% 0.1116 244.86)",
          700: "oklch(38.89% 0.1116 244.86)",
          800: "oklch(33.89% 0.1116 244.86)",
          900: "oklch(28.89% 0.1116 244.86)",
        },
        red: {
          400: "oklch(60% 0.1116 22.84)",
          500: "oklch(50% 0.1116 22.84)",
        },
      },
    },
  },
  plugins: [],
};
