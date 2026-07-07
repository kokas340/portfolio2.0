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
    // Open directly at the base path so the browser doesn't land on the
    // "did you mean /portfolio2.0/?" notice.
    open: "/portfolio2.0/",
  },
  // The project keeps JSX inside .js files (CRA convention), so tell esbuild
  // to treat .js as JSX both for our source and for dependency pre-bundling.
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    // Rapier loads its physics engine as a WASM module. @react-three/rapier
    // statically imports bindings (EventQueue, World, …) from
    // @dimforge/rapier3d-compat AND separately does a dynamic import + init()
    // of the same package. Vite's dep pre-bundler splits those into two module
    // instances, so init() populates the WASM on one copy while the world/queue
    // constructors read from an uninitialized copy — crashing with
    // "Cannot read properties of undefined (reading 'raweventqueue_new')".
    // Excluding both from pre-bundling makes every import resolve to one shared
    // ESM instance, so init() and the constructors see the same WASM.
    exclude: ["@react-three/rapier", "@dimforge/rapier3d-compat"],
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
