import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Libraries every page needs up front (Vite module ids use forward slashes).
// Anything else (the whole three.js / rapier stack behind the lazy hero badge)
// is left to Rollup, which keeps it in the async chunk.
const EAGER_VENDOR = /\/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom|@remix-run|framer-motion|motion-dom|motion-utils|lucide-react|tslib)\//;

// GitHub Pages has no SPA routing: opening /portfolio2.0/story/<id> directly (a
// shared link, a refresh) finds no file and gets GitHub's 404 page. Publishing the
// app itself as 404.html makes Pages serve it there, and the router then renders
// the right page from the URL.
const githubPagesFallback = {
  name: "github-pages-404-fallback",
  apply: "build",
  enforce: "post",
  generateBundle(_, bundle) {
    const index = bundle["index.html"];
    if (index && index.type === "asset") this.emitFile({ type: "asset", fileName: "404.html", source: index.source });
  },
};

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio2.0/",
  plugins: [react(), tailwindcss(), githubPagesFallback],
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
        // The libraries every page needs go in one long-cached vendor chunk so
        // app edits don't bust it. It is an allow-list on purpose: Rollup pulls
        // a manual chunk's unassigned dependencies into it, so a catch-all
        // "vendor" rule would drag three.js in with the first 3D helper package.
        manualChunks(id) {
          return EAGER_VENDOR.test(id) ? "vendor" : undefined;
        },
      },
    },
  },
});
