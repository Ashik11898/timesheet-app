import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // This will make the server accessible from other devices in your local network.
    port: 5173,       // Optionally specify a port if you want something other than the default 3000
    open: true,       // Open browser automatically when the server starts
  },
})
