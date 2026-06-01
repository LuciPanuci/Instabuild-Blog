import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [react()],
  define: {
    // Baked in at build time — the anon key is read-only/public by design
    __INSTABUILD_SUPABASE_URL__: JSON.stringify(env.INSTABUILD_SUPABASE_URL || ''),
    __INSTABUILD_SUPABASE_ANON_KEY__: JSON.stringify(env.INSTABUILD_SUPABASE_ANON_KEY || ''),
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'InstaBuildBlog',
      fileName: (format) => `instabuild-blog.${format}.js`,
    },
    rollupOptions: {
      // React is a peer dep — don't bundle it
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  }
})
