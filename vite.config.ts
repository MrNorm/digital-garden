import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vercel from 'vite-plugin-vercel';
import vike from 'vike/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT as unknown as number,
  },
  plugins: [
    react(), 
    vike({ prerender: true }),
    vercel()
  ],
})
