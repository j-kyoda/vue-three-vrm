import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VueThreeVrm',
      fileName: (format) => `vue-three-vrm.${format}.js`
    },
    rollupOptions: {
      external: [
        'vue',
        'axios',
        'three',
        '@pixiv/three-vrm',
        'vue-axios'
      ],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
          three: 'THREE',
          '@pixiv/three-vrm': 'THREE_VRM',
          'vue-axios': 'VueAxios'
        }
      }
    },
    cssCodeSplit: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
