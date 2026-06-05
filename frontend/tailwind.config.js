/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        atlas: {
          ink: "#172033",
          panel: "#ffffff",
          line: "#d9e0ea",
          mist: "#f3f6fa",
          green: "#1f9d72",
          amber: "#d18416",
          red: "#d13d3d",
          blue: "#2563eb"
        }
      },
      boxShadow: {
        panel: "0 12px 35px rgba(23, 32, 51, 0.08)"
      }
    }
  },
  plugins: []
};
