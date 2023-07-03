import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      babel: {
        plugins: [
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-nullish-coalescing-operator",
        ],
      },
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports:['vue'] // 自动引入 vue 库
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    VueSetupExtend(),
  ],
  resolve: {
    alias: {
      '@/': '/src/',
    },
  },
  base: '/', // 项目的基础路径
  build: {
    outDir: 'dist', // 打包输出目录，用于线上打包
    // outDir: 'mobile', // 打包输出目录，用于本地打包
    cssTarget: 'chrome49', // css兼容处理
  },
  server: {
    port: 9777, // 服务端口
    host: '0.0.0.0',
    proxy: {
      '/proxy': {
        target: "https://datadev.artmuse.cn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
      },
    }
  }
})
