/* =========================================================================
webpack.config.prod.mjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import CompressionPlugin from "compression-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { merge } from "webpack-merge";
import common from "./webpack.common.mjs";

export default merge(common, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(process.cwd(), "dist"),
    chunkFilename: "js/[name].[contenthash].js",
    chunkFormat: "array-push",
    clean: true,
  },
  target: "web",
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
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
    runtimeChunk: "single",
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
          format: {
            comments: false,
            beautify: true,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: false,
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.7, // More aggressive Brotli compression
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8, // Less aggressive Gzip compression
    }),
    new HtmlWebpackPlugin({
      template: "./index.html", // Template for the HTML file
      minify: {
        removeComments: true, // Remove comments
        removeRedundantAttributes: true, // Remove redundant attributes
        useShortDoctype: true, // Use short DOCTYPE
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: false, // Preserve whitespace in inline JavaScript
        minifyCSS: false, // Preserve whitespace in inline CSS
        minifyURLs: true,
        // collapseWhitespace is intentionally omitted to preserve whitespace
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: "img", to: "img", globOptions: { dot: false } },
        { from: "css", to: "css", globOptions: { dot: false } },
        { from: "html", to: "html", globOptions: { dot: false } },
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
        { from: "legal.html", to: "legal.html" },
        { from: "terms-of-use.html", to: "terms-of-use.html" },
        { from: "404.html", to: "404.html" },
        { from: "LICENSE.md", to: "LICENSE.md" },
        { from: "README.md", to: "README.md" },
        { from: "CNAME", to: "." },
      ],
    }),
  ],
});
