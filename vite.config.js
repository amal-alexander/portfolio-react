import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 5000,
    open: true,
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 600, // Adjust the size limit for chunk size warnings
    rollupOptions: {
      external: [], // Remove 'react-helmet-async' from external if you want to bundle it
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/lottie-web")) {
            return "lottie"; // Creates a separate chunk for lottie-web
          }
          if (id.includes("node_modules/react-helmet-async")) {
            return "helmet"; // Creates a chunk for react-helmet-async
          }
          if (id.includes("node_modules")) {
            return "vendor"; // Bundle all node_modules dependencies into "vendor"
          }
        },
      },
    },
    treeshake: true, // Optimize by removing unused code
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: "esbuild", // Use esbuild for fast minification
  },
});
