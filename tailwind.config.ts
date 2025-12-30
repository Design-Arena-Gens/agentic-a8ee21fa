import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B9D",
        secondary: "#C44569",
        accent: "#FFA07A",
        warm: "#FFF5E1",
      },
    },
  },
  plugins: [],
};
export default config;
