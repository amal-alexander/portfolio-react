import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5174,
    open: true,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 600, // Adjust the size limit for chunk size warnings
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Example: Create a separate chunk for lottie-web
          if (id.includes('node_modules/lottie-web')) {
            return 'lottie'; // This creates a new chunk named 'lottie'
          }
          // You can add more conditions for other libraries as needed
        },
      },
    },
  },
});