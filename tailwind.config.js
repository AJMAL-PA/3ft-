/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
              "on-error": "#ffffff",
              "inverse-on-surface": "#f5f0e7",
              "on-tertiary-fixed-variant": "#77302d",
              "on-surface": "#1c1c16",
              "secondary-fixed-dim": "#c9c6c1",
              "tertiary-fixed-dim": "#ffb3ad",
              "surface-bright": "#fdf9f0",
              "error-container": "#ffdad6",
              "on-primary-fixed-variant": "#474746",
              "surface-variant": "#e6e2d9",
              "secondary-fixed": "#e5e2dc",
              "surface-container-highest": "#e6e2d9",
              "on-error-container": "#93000a",
              "surface-container-low": "#f7f3ea",
              "outline": "#747878",
              "secondary-container": "#e5e2dc",
              "surface-dim": "#dedad1",
              "on-primary": "#ffffff",
              "on-secondary-fixed-variant": "#474743",
              "error": "#ba1a1a",
              "tertiary-fixed": "#ffdad7",
              "surface": "#fdf9f0",
              "surface-container-high": "#ece8df",
              "on-secondary": "#ffffff",
              "on-surface-variant": "#444748",
              "surface-container-lowest": "#ffffff",
              "secondary": "#5f5e5a",
              "primary-container": "#1c1b1b",
              "on-secondary-container": "#656460",
              "on-secondary-fixed": "#1c1c18",
              "inverse-primary": "#c8c6c5",
              "on-tertiary-fixed": "#3d0506",
              "on-background": "#1c1c16",
              "on-primary-fixed": "#1c1b1b",
              "outline-variant": "#c4c7c7",
              "tertiary": "#000000",
              "inverse-surface": "#32302a",
              "surface-tint": "#5f5e5e",
              "on-tertiary": "#ffffff",
              "on-tertiary-container": "#c26b65",
              "primary-fixed": "#e5e2e1",
              "on-primary-container": "#858383",
              "primary": "#000000",
              "primary-fixed-dim": "#c8c6c5",
              "surface-container": "#f2ede4",
              "background": "#fdf9f0",
              "tertiary-container": "#3d0506"
      },
      "borderRadius": {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
      },
      "spacing": {
              "margin-desktop": "64px",
              "margin-mobile": "20px",
              "card-gap": "24px",
              "base-unit": "4px",
              "gutter": "16px"
      },
      "fontFamily": {
              "display-xl": ["Bodoni Moda"],
              "headline-lg": ["Anton"],
              "headline-lg-mobile": ["Anton"],
              "title-md": ["Bodoni Moda"],
              "body-base": ["Hanken Grotesk"],
              "label-caps": ["Space Grotesk"]
      },
      "fontSize": {
              "display-xl": ["80px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
              "headline-lg": ["48px", {"lineHeight": "1.0", "fontWeight": "400"}],
              "headline-lg-mobile": ["36px", {"lineHeight": "1.0", "fontWeight": "400"}],
              "title-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
              "body-base": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
              "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "600"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
