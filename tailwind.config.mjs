/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Placeholder palette — replace with brand colors when available
        brand: {
          bg: '#FAFAF8',
          text: '#1C1C1C',
          muted: '#8A8A8A',
          accent: '#B5A694', // warm taupe placeholder
          border: '#E5E3DF',
        },
      },
    },
  },
  plugins: [],
};
