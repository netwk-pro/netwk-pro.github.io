/* =========================================================================
webpack.config.dev.mjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import path from "path";
import { merge } from "webpack-merge";
import common from "./webpack.common.mjs";

export default merge(common, {
  mode: "development", // Set the mode to development
  devtool: "inline-source-map", // Enable inline source maps for better debugging
  stats: "errors-only", // Show only errors in console
  infrastructureLogging: {
    level: "error", // Suppress Webpack internal logs
  },
  devServer: {
    liveReload: true, // Enable live reloading
    hot: true, // Enable hot module replacement
    open: true, // Automatically open the browser
    client: { progress: true },
    watchFiles: ["./**/*"], // More efficient live reloading
    static: {
      directory: path.resolve(process.cwd(), "./"), // Serve static files from the root directory
    },
  },
  output: {
    chunkFormat: "array-push", // Specify the chunk format
    path: path.resolve(process.cwd(), "dist"), // Output directory for compiled assets
    filename: "js/[name].bundle.js", // Output file name for better caching in development
    chunkFilename: "js/[name].chunk.js", // File name for dynamically loaded chunks
    clean: true, // Clean the output directory before emit
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(process.cwd(), ".webpack_cache"),
  },
  target: "web", // Ensure the target is set to 'web' for browser environments
});
