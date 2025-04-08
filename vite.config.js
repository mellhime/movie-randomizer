import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    sourcemap: true,
    minify: "esbuild",
  },
  server: {
    port: 8000,
  },
});
