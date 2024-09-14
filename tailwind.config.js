/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {}
  },
  safelist: [
    {
      pattern: /bg-(blue|green|purple|pink|red)-(400|500|600|800|900)/,
    },
    {
      pattern: /text-(blue|green|purple|pink|red)-(400|500|600|800|900)/,
    },
  ],
  plugins: [],
  darkMode: "class"
};
