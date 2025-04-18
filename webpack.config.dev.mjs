/* =========================================================================
webpack.config.dev.mjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import fs from "fs"; // File system module
import HtmlWebpackPlugin from "html-webpack-plugin"; // For generating HTML files
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import webpack from "webpack"; // For HMR plugin
import { merge } from "webpack-merge"; // For merging configurations
import common from "./webpack.common.mjs"; // Shared base configuration

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Recursively find all HTML files, excluding specific directories
const findHtmlFiles = (
  dir,
  excludeDirs = ["node_modules", "dist", "coverage"]
) => {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.resolve(dir, entry.name);

    // Skip excluded directories
    if (entry.isDirectory() && excludeDirs.includes(entry.name)) {
      return [];
    }

    return entry.isDirectory()
      ? findHtmlFiles(entryPath, excludeDirs)
      : entry.name.endsWith(".html")
        ? [entryPath]
        : [];
  });
};

// Dynamically create HtmlWebpackPlugin instances for all HTML files
const htmlFilePaths = findHtmlFiles(process.cwd());
const htmlPlugins = htmlFilePaths.map(
  (filePath) =>
    new HtmlWebpackPlugin({
      template: filePath, // Template for each HTML file
      filename: path.relative(process.cwd(), filePath), // Maintain original directory structure
      minify: false, // Disable minification for development
    })
);

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
    watchFiles: ["./**/*", "./html/**/*"], // Watch all files in root and ./html directories
    static: {
      directory: path.resolve(__dirname, "./"), // Serve files from project root
    },
    port: 8080, // Default port for dev server
  },
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "js/[name].bundle.mjs", // Output filenames
    chunkFilename: "js/[name].chunk.mjs", // Chunk filenames
    clean: true, // Clean the output directory before each build
  },
  cache: {
    type: "filesystem", // Enable persistent caching
    cacheDirectory: path.resolve(__dirname, ".webpack_cache"), // Cache directory
  },
  target: "web", // Target browsers
  plugins: [
    ...htmlPlugins, // Dynamically generated HTML plugins
    new webpack.HotModuleReplacementPlugin(), // Explicitly enable HMR
  ],
});
