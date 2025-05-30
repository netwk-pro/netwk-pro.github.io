/* ==========================================================================
netlify-functions/cspReport.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file cspReport.js
 * @description Sets up a CSP reporting endpoint with email notifications, to be deployed as a Netlify function.
 * @module netlify-functions
 * @author SunDevil311
 * @updated 2025-05-29
 */

import nodemailer from "nodemailer";

/**
 * Netlify Function: CSP violation report handler
 *
 * @param {import('@netlify/functions').HandlerEvent} event - Incoming Netlify request
 * @returns {Promise<import('@netlify/functions').HandlerResponse>} - Netlify-compatible HTTP response
 */
export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        body: "No body provided",
      };
    }

    /** @type {Record<string, any>} */
    const report = JSON.parse(event.body);
    const violation = report["csp-report"] || report;

    const shouldSendEmail =
      process.env.MAIL_ENABLED !== "false" && process.env.NODE_ENV !== "test";

    if (shouldSendEmail) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"CSP Reporter" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: "🚨 CSP Violation Detected",
        text: JSON.stringify(violation, null, 2),
      });
    }

    return {
      statusCode: 204,
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: `Invalid JSON: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
