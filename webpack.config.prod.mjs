/* =========================================================================
webpack.config.prod.mjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import CompressionPlugin from "compression-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import { merge } from "webpack-merge";
import common from "./webpack.common.mjs";

// Define __filename for ES module
const __filename = fileURLToPath(import.meta.url);

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
      minify: {
        removeComments: true, // Remove all comments
        removeEmptyAttributes: true, // Remove empty attributes
        collapseWhitespace: false, // Do not collapse whitespace globally
        preserveLineBreaks: false, // Remove excessive line breaks
      },
    })
);

export default merge(common, {
  mode: "production", // Enables production optimizations, including tree shaking
  output: {
    filename: "js/[name].[contenthash].js", // Include content hash for long-term caching
    path: path.resolve(process.cwd(), "dist"),
    chunkFilename: "js/[name].[contenthash].js", // Cache-busting for chunks
    chunkFormat: "array-push",
    clean: true,
  },
  cache: {
    type: "filesystem", // Enable persistent caching
    buildDependencies: {
      config: [__filename], // Cache invalidates when the config changes
    },
  },
  target: "web",
  resolve: {
    extensions: [".mjs", ".js", ".cjs", ".json"], // Prioritize modern JavaScript files
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true, // Minify the output
    runtimeChunk: "single", // Separate runtime code for better caching
    splitChunks: {
      chunks: "all", // Split all chunks (async and initial)
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors", // Separate vendor code
          chunks: "all",
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true, // Use multi-process parallelization
        terserOptions: {
          compress: { drop_console: true }, // Remove console logs
          format: {
            comments: false, // Remove all comments
            beautify: false, // Do not prettify output
            preserve_annotations: false, // Remove annotations only
          },
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true }, // Remove all comments
              normalizeWhitespace: true, // Normalize whitespace left behind
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css", // Cache-friendly CSS file naming
    }),
    new CompressionPlugin({
      filename: "[path][base].br", // Brotli compression
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // Compress files larger than 10 KB
      minRatio: 0.7,
    }),
    new CompressionPlugin({
      filename: "[path][base].gz", // Gzip compression
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    ...htmlPlugins, // Dynamically created HtmlWebpackPlugin instances
    new CopyPlugin({
      patterns: [
        { from: "img", to: "img", globOptions: { dot: false } },
        { from: "css", to: "css", globOptions: { dot: false } },
        { from: "js/vendor", to: "js/vendor" },
        { from: "robots.txt", to: "robots.txt" },
        { from: "site.webmanifest", to: "site.webmanifest" },
        { from: "sitemap.xml", to: "sitemap.xml" },
        { from: "favicon.svg", to: "favicon.svg" },
        { from: "favicon.ico", to: "favicon.ico" },
        { from: "favicon-180.png", to: "favicon-180.png" },
        { from: "favicon-192.png", to: "favicon-192.png" },
        { from: "favicon-512.png", to: "favicon-512.png" },
        { from: "favicon-splash.png", to: "favicon-splash.png" },
        { from: "LICENSE.md", to: "LICENSE.md" },
        { from: "README.md", to: "README.md" },
        { from: "CNAME", to: "." },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/, // Match both .js and .mjs files
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          "astroturf/loader", // Add CSS-in-JS loader
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          {
            loader: "css-loader",
            options: { modules: { auto: true } }, // Enable CSS Modules
          },
          "postcss-loader", // Add PostCSS processing
        ],
      },
    ],
  },
});
