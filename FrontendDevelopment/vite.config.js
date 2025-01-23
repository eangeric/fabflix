import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/fabflix/react/", // Base URL for assets
  build: {
    outDir: "../WebContent/react", // Output directly to WebContent/react
    emptyOutDir: true, // Ensure the directory is cleaned before building
  },
});
