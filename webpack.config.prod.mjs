// webpack.config.prod.mjs
/* =========================================================================
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
  target: "web", // Ensure the target is set to 'web' for browser environments
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true }, // Remove console logs for better performance
          format: {
            comments: false, // Removes comments while keeping minified output
            beautify: true, // Preserve whitespace in JavaScript files
          },
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true }, // Remove comments, but preserve whitespace
              normalizeWhitespace: false, // Preserve whitespace in CSS files
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
        { from: "pages", to: "pages", globOptions: { dot: false } },
        { from: "legal", to: "legal", globOptions: { dot: false } },
        { from: "js/vendor", to: "js/vendor" },
        { from: "robots.txt", to: "robots.txt" },
        { from: "site.webmanifest", to: "site.webmanifest" },
        { from: "sitemap.xml", to: "sitemap.xml" },
        { from: "favicon.svg", to: "favicon.svg" },
        { from: "favicon.ico", to: "favicon.ico" },
        { from: "favicon-180.png", to: "favicon-180.png" },
        { from: "favicon-192.png", to: "favicon-192.png" },
        { from: "legal.html", to: "legal.html" },
        { from: "LICENSE.md", to: "LICENSE.md" },
        { from: "README.md", to: "README.md" },
        { from: "404.html", to: "404.html" },
        { from: "CODE_OF_CONDUCT.md", to: "CODE_OF_CONDUCT.md" }
        { from: "CNAME", to: "." }, // Correct path to copy CNAME to the root directory
      ],
    }),
  ],
});
