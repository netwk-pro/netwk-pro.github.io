/* =========================================================================
webpack.config.dev.mjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { merge } from "webpack-merge";
import common from "./webpack.common.mjs";

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",
  infrastructureLogging: {
    level: "error",
  },
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    client: { progress: true },
    watchFiles: ["./**/*"],
    static: {
      directory: new URL("./", import.meta.url).pathname,
    },
  },
  output: {
    chunkFormat: "array-push",
    path: new URL("./dist", import.meta.url).pathname,
    filename: "js/[name].bundle.js",
    chunkFilename: "js/[name].chunk.js",
    clean: true,
  },
  cache: {
    type: "filesystem",
    cacheDirectory: new URL("./.webpack_cache", import.meta.url).pathname,
  },
  target: "web",
});
