import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    minify: "esbuild",
  },
  server: {
    port: 8000,
  },
  preview: {
    port: 8080,
  },
});
