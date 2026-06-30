import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio2.0/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  // The project keeps JSX inside .js files (CRA convention), so tell esbuild
  // to treat .js as JSX both for our source and for dependency pre-bundling.
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  // 3D model files are imported as URLs (Lanyard card, monitor models).
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  build: {
    chunkSizeWarningLimit: 3500,
    rollupOptions: {
      output: {
        // Split all third-party code into one long-cached vendor chunk so app
        // edits don't bust the (large, 3D-heavy) dependency cache. A single
        // chunk avoids the circular-chunk hazard of splitting vendor further.
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
