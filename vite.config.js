import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5174, // Ensure this port is available
    open: true, // Automatically open the browser
    host: '0.0.0.0', // Allow access from external devices (optional)
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});