import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://localhost:3000'
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@/components": path.resolve(__dirname, "./src/components"),
            "@/pages": path.resolve(__dirname, "./src/pages"),
            "@/layouts": path.resolve(__dirname, "./src/layouts"),
            "@/context": path.resolve(__dirname, "./src/context"),
            "@/hooks": path.resolve(__dirname, "./src/hooks"),
            "@/assets": path.resolve(__dirname, "./src/assets"),
        }
    },
    plugins: [svgr(), react()],
})
