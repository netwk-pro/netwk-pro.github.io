/* =========================================================================
scripts/optimize-html.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const distDir = "./dist";

// Find all HTML files in dist directory
const htmlFiles = readdirSync(distDir).filter((file) => file.endsWith(".html"));

function optimizeHtml(html) {
  // Remove HTML comments (preserves conditional comments)
  html = html.replace(/<!--(?![^>]*-->)(?:(?!-->)[\s\S])*-->/g, "");

  // Remove type="text/javascript" from script tags
  html = html.replace(/\s+type="text\/javascript"/g, "");

  // Remove type="text/css" from style and link tags
  html = html.replace(/\s+type="text\/css"/g, "");

  // Remove redundant attributes
  const redundantAttrs = {
    input: {
      "type=text": true,
    },
    form: {
      "method=get": true,
    },
    script: {
      "language=javascript": true,
      "language=javascript1.5": true,
    },
    link: {
      "media=screen": true,
    },
  };

  Object.entries(redundantAttrs).forEach(([tag, attrs]) => {
    Object.keys(attrs).forEach((attr) => {
      const regex = new RegExp(`<${tag}([^>]*?)\\s+${attr}([^>]*?)>`, "gi");
      html = html.replace(regex, `<${tag}$1$2>`);
    });
  });

  // Convert DOCTYPE to HTML5
  html = html.replace(/<!DOCTYPE[^>]*>/i, "<!DOCTYPE html>");

  // Remove empty attributes
  html = html.replace(
    /(\s+(?:class|style|id|title)=["'](?:\s|&nbsp;)*["'])/gi,
    ""
  );

  // Remove trailing slashes from void elements
  const voidElements = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ];
  voidElements.forEach((element) => {
    const regex = new RegExp(`<${element}([^>]*?)\\s*/>`, "gi");
    html = html.replace(regex, `<${element}$1>`);
  });

  // Normalize quotation marks (use double quotes consistently)
  html = html.replace(/='([^']*?)'/g, '="$1"');

  // Remove multiple whitespace between attributes
  html = html.replace(/\s{2,}/g, " ");

  // Remove whitespace around equals signs in attributes
  html = html.replace(/\s*=\s*/g, "=");

  // Clean up line breaks and indentation while preserving content whitespace
  const lines = html
    .split("\n")
    .map((line) => {
      // Trim end of lines
      return line.trimEnd();
    })
    .filter((line) => {
      // Remove empty lines
      return line.trim().length > 0;
    });

  html = lines.join("\n");

  // Ensure file ends with exactly one newline
  html = html.trim() + "\n";

  return html;
}

htmlFiles.forEach((file) => {
  const filePath = join(distDir, file);
  console.log(`Optimizing ${file}...`);

  try {
    let html = readFileSync(filePath, "utf8");
    const originalSize = Buffer.from(html).length;

    html = optimizeHtml(html);

    writeFileSync(filePath, html);

    const newSize = Buffer.from(html).length;
    const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(
      2
    );
    console.log(
      `✓ Reduced ${file} by ${savings}% (${originalSize} → ${newSize} bytes)`
    );
  } catch (error) {
    console.error(`× Error processing ${file}:`, error);
  }
});

console.log("HTML files optimized successfully.");
