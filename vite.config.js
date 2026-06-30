import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio2.0/",
  plugins: [react(), tailwindcss()],
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
});
