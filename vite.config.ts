import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: "/",  // Custom domain (davidansa.com) serves from root
  build: {
    outDir: 'dist',  // Output to "dist" directory
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
