import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('motion')) {
              return 'motion'
            }
            if (id.includes('@supabase')) {
              return 'supabase'
            }
            if (
              id.includes('react-markdown') ||
              id.includes('gray-matter') ||
              id.includes('remark-gfm') ||
              id.includes('rehype-highlight') ||
              id.includes('highlight.js') ||
              id.includes('micromark') ||
              id.includes('unist') ||
              id.includes('vfile') ||
              id.includes('mdast')
            ) {
              return 'markdown'
            }
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom')
            ) {
              return 'vendor'
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})

