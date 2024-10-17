import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        teal: {
          "50": "#eafffc",
          "100": "#cafffa",
          "200": "#9cfff8",
          "300": "#57fff6",
          "400": "#0cfffe",
          "500": "#00e2ea",
          "600": "#00b3c4",
          "700": "#0097a7",
          "800": "#0b717f",
          "900": "#0e5d6b",
          "950": "#023f4a",
        },
        coral: {
          "50": "#fff8ed",
          "100": "#ffefd4",
          "200": "#ffdba9",
          "300": "#ffc67d",
          "400": "#fe9c39",
          "500": "#fc7e13",
          "600": "#ed6309",
          "700": "#c54a09",
          "800": "#9c3a10",
          "900": "#7e3210",
          "950": "#441706",
        },
      },
    },
  },
  darkMode: "class",

  plugins: [nextui()],
};
export default config;
