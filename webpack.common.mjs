/* =========================================================================
webpack.common.mjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import autoprefixer from "autoprefixer";
import path from "path";
import webpack from "webpack";

export default {
  mode: "none", // Explicitly set the mode (overridden by merge)
  entry: {
    app: "./js/app.js",
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "js/[name].[contenthash].js",
    chunkFilename: "js/[name].[contenthash].js",
    chunkFormat: "array-push",
    clean: true,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              cacheDirectory: true, // Enable caching for faster builds
            },
          },
          "astroturf/loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: { auto: true } }, // Auto-detect CSS Modules
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    add: true,
                    remove: false,
                  }),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    usedExports: true,
    sideEffects: false,
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 100000, // Increased max chunk size
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
    runtimeChunk: "single",
  },
  plugins: [
    new webpack.ProvidePlugin({
      global: "globalThis",
      self: "globalThis",
      window: "globalThis",
    }),
  ],
  resolve: {
    extensions: [".js", ".json"],
  },
};
