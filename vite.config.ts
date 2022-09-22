import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import postcss from "./postcss.config.js";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css: {
    postcss,
  },
  resolve: {
    alias: {
      src: path.resolve("/src"),
    },
  },
});
