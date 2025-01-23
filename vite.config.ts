import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/your-repo-name/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api/models': {
        target: 'https://api-inference.huggingface.co',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/models/, '/models')
      }
    }
  }
})
