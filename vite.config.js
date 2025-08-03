import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    build: {
      rollupOptions: {
        input: {
          background: resolve(__dirname, 'background.js'),
        },
        output: {
          entryFileNames: '[name].js',
          format: 'esm',
        },
      },
      outDir: 'dist',
    },
  }
});
