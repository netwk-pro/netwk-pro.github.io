import { sveltekit } from "@sveltejs/kit/vite";
import lightningcssPlugin from "vite-plugin-lightningcss";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    sveltekit(),
    lightningcssPlugin({
      minify: process.env.NODE_ENV === "production",
      pruneUnusedFontFaceRules: true,
      pruneUnusedKeyframes: true,
      removeUnusedFontFaces: true,
    }),
  ],
  test: {
    name: "server",
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,mjs}"],
    exclude: ["src/**/*.svelte.{test,spec}.{js,mjs}"],
    reporters: ["default", "json"],
    outputFile: {
      json: "./reports/server/results.json",
    },
    coverage: {
      provider: "v8",
      reporter: ["html"],
      reportsDirectory: "./reports/server/coverage",
    },
  },
});
