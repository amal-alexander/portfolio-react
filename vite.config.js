import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 5001,
    open: true,
    host: "0.0.0.0",
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to backend
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 600, // Adjust the size limit for chunk size warnings
    rollupOptions: {
      external: [], // Keep external dependencies bundled
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/lottie-web")) {
            return "lottie"; // Separate chunk for lottie-web
          }
          if (id.includes("node_modules/react-helmet-async")) {
            return "helmet"; // Separate chunk for react-helmet-async
          }
          if (id.includes("node_modules")) {
            return "vendor"; // Bundle other node_modules dependencies
          }
        },
      },
    },
    treeshake: true, // Remove unused code for optimization
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: "esbuild", // Fast minification using esbuild
  },
});
