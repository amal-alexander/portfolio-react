import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: "/", // Adjust if deploying under a sub-path
  server: {
    port: 5000,
    strictPort: true, 
    open: true,
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      external: [], // Add any external libraries you want to exclude
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/lottie-web")) {
            return "lottie";
          }
          if (id.includes("node_modules/react-helmet-async")) {
            return "helmet";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    treeshake: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: "esbuild",
  },
}));
