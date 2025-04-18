/* =========================================================================
webpack.config.dev.mjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import HtmlWebpackPlugin from "html-webpack-plugin"; // For generating HTML files
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import webpack from "webpack"; // For HMR plugin
import { merge } from "webpack-merge"; // For merging configurations
import common from "./webpack.common.mjs"; // Shared base configuration

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common, {
  mode: "development", // Development mode
  devtool: "inline-source-map", // Source maps for debugging
  stats: "errors-only", // Show errors only
  infrastructureLogging: {
    level: "error", // Log errors only
  },
  devServer: {
    liveReload: true, // Enable live reloading
    hot: true, // Enable HMR (Hot Module Replacement)
    open: true, // Automatically open browser
    client: { progress: true }, // Show progress in terminal/browser
    watchFiles: ["./**/*"], // Watch all files for changes
    static: {
      directory: path.resolve(__dirname, "./"), // Serve files from project root
    },
    port: 8080, // Default port for dev server
  },
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "js/[name].bundle.js", // Output filenames
    chunkFilename: "js/[name].chunk.js", // Chunk filenames
    clean: true, // Clean the output directory before each build
  },
  cache: {
    type: "filesystem", // Enable persistent caching
    cacheDirectory: path.resolve(__dirname, ".webpack_cache"), // Cache directory
  },
  target: "web", // Target browsers
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Path to your index.html
    }),
    new webpack.HotModuleReplacementPlugin(), // Explicitly enable HMR
  ],
});
