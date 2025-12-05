// freelancex-ui/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light theme palette inspired by NotebookLM
        background: "#ffffff",      // Pure white
        surface: "#f8f9fa",         // Very subtle off-white for cards/sections
        primary: "#3b82f6",         // Calm Blue (keeping blue but used sparingly)
        "primary-dark": "#2563eb",  // Darker blue for hover states
        
        // Neutral grays for text and borders
        "text-main": "#1a1a1a",     // High contrast dark gray
        "text-muted": "#6b7280",    // Medium gray for descriptions
        "border-subtle": "#e5e7eb", // Very light gray for clean borders
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'clean': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'clean-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}