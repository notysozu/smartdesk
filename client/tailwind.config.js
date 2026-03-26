/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--page-bg)",
        "background-soft": "var(--page-bg-soft)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        "surface-muted": "var(--surface-muted)",
        border: "var(--surface-border)",
        "border-strong": "var(--surface-border-strong)",
        brand: "var(--brand)",
        "brand-strong": "var(--brand-strong)",
        "brand-ink": "var(--brand-ink)",
        accent: "var(--accent)",
        success: "var(--success)",
        danger: "var(--danger)",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "glass-sm": "var(--shadow-sm)",
        "glass-lg": "var(--shadow-lg)",
        "glass-xl": "var(--shadow-xl)",
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
