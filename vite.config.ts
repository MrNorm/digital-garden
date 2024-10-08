import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vike from 'vike/plugin'
import { pages } from 'vike-cloudflare'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT as unknown as number,
  },
  plugins: [
    react(), 
    vike({ prerender: true }),
    pages()
  ],
})
