import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core framework — changes rarely, lives in browser cache
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Animation library — large, isolated for cache
          motion: ['framer-motion'],
          // Supabase client — large, only invalidates on version bump
          supabase: ['@supabase/supabase-js'],
          // Admin-only rich text editor — never loaded on public routes
          editorCore: ['@tiptap/react', '@tiptap/starter-kit'],
          editorExt: [
            '@tiptap/extension-highlight',
            '@tiptap/extension-image',
            '@tiptap/extension-link',
            '@tiptap/extension-placeholder',
            '@tiptap/extension-table',
            '@tiptap/extension-table-cell',
            '@tiptap/extension-table-header',
            '@tiptap/extension-table-row',
            '@tiptap/extension-text-align',
            '@tiptap/extension-underline',
            '@tiptap/extension-character-count',
          ],
          // Notification + SEO utilities
          ui: ['sonner', 'react-helmet-async'],
        },
      },
    },
    // Warn when any individual chunk exceeds 500 kB
    chunkSizeWarningLimit: 500,
  },
})
