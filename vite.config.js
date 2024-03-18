import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import http from "https";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.API_BASE_URL,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        },
      },
    },
    resolve: {
      alias: [
        {find: 'theme', replacement: path.resolve(__dirname, 'src/theme')},
        {find: 'stories', replacement: path.resolve(__dirname, 'src/stories')},
        {find: 'scenes', replacement: path.resolve(__dirname, 'src/scenes')},
        {find: 'services', replacement: path.resolve(__dirname, 'src/services')},
        {find: 'layout', replacement: path.resolve(__dirname, 'src/layout')},
      ],
    },
  }
})
