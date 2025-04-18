/* =========================================================================
webpack.common.mjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import path, { dirname } from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: "none", // Shared base configuration without specifying dev/prod mode
  entry: {
    app: "./js/app.mjs",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].mjs",
    chunkFilename: "js/[name].[contenthash].mjs",
    chunkFormat: "array-push",
    clean: true, // Cleans the 'dist' folder before each build
  },
  target: "web", // Targeting browser environments
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/, // Matches both .js and .mjs files
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              cacheDirectory: true, // Enable caching for faster builds
            },
          },
          "astroturf/loader", // CSS-in-JS loader
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // Injects CSS into the DOM
          {
            loader: "css-loader",
            options: { modules: { auto: true } }, // Auto-detect CSS Modules
          },
          "postcss-loader", // PostCSS processing
        ],
      },
    ],
  },
  optimization: {
    usedExports: true, // Enable tree-shaking
    sideEffects: false,
    concatenateModules: true, // Module concatenation
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 100000, // Increased max chunk size for better performance
      minChunks: 1,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: "single", // Extract runtime code for better caching
  },
  plugins: [
    new webpack.ProvidePlugin({
      global: "globalThis",
      self: "globalThis",
      window: "globalThis",
    }),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".cjs", ".json"], // Prioritize modern JavaScript extensions
  },
};
