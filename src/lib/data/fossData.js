/* ==========================================================================
src/lib/data/fossData.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

// cspell:ignore lsheet eauth bolditalic tosdr

// Import FOSS images
import { acodePng, acodeWbp, eauthPng, eauthWbp, lsheetPng, lsheetWbp, pmxPng, pmxWbp, tosPng, tosWbp, urlPng, urlWbp } from "$lib";

export const fossData = [
{
    id: "eauth",
    images: {
      webp: eauthWbp,
      png: eauthPng,
    },
    imgAlt: "Ente Auth",
    title: "Ente Auth",
    headline: "🔐 Elevate Your 2FA Game with Ente Auth — The Cross-Platform Open-Source Powerhouse!",
    headlineDescription: `
      <p>This week's <strong>FOSS Spotlight</strong> is on <strong>Ente Auth</strong> — the sleek, open-source 2FA authenticator that's putting privacy and usability front and center.</p>
      <p>Whether you're a dev, a cybersecurity enthusiast, or simply serious about protecting your accounts, <strong>Ente Auth</strong> offers a next-level authentication experience — <strong>backed by encryption, not ads.</strong></p>
    `,
    features: [
      {
        emoji: "✨",
        label: "Why Make the Switch to Ente Auth?",
        isIntro: true
      },
      {
        emoji: "✔️",
        label: "End-to-End Encrypted Backups",
        description: "Never lose access to your 2FA codes again."
      },
      {
        emoji: "✔️",
        label: "Cross-Platform Sync",
        description: "Android, iOS, Windows, macOS, Linux, Web — all covered."
      },
      {
        emoji: "✔️",
        label: "Offline Functionality",
        description: "No account or connection? No problem."
      },
      {
        emoji: "✔️",
        label: "Intuitive UX",
        description: "Easily search, preview the next code, and share tokens securely."
      },
      {
        emoji: "✔️",
        label: "Audited Open Source",
        description: "Reviewed by top-tier security firms."
      },
      {
        emoji: "✔️",
        label: "Free Forever",
        description: "No ads. No tracking. Just transparent, user-first security."
      }
    ],
    detailsDescription: `
      <p>
        We've long backed <strong>Aegis</strong> — and still do. But <strong>Aegis lacks true cross-platform support</strong>. That's where <strong>Ente Auth</strong> shines.
      </p>
      <p>
        Take control of your authentication experience. <strong>Embrace the freedom of private, seamless, and secure 2FA.</strong>
      </p>
    `,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ente-io/ente/",
      },
      {
        label: "F-Droid",
        href: "https://f-droid.org/packages/io.ente.auth/",
      },
      {
        label: "Website",
        href: "https://ente.io/auth/",
      },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=io.ente.auth",
      },
    ],
    notes: [
      "Note: PMX maintains Play Store, F-Droid, and GitHub versions. These are not interchangeable, as they all have different signatures. We recommend either the F-Droid or GitHub version, though they should all be identical in terms of functionality.",
      "Further, PMX offers a paid version, PMX Pro, which offers significantly greater functionality. You have the option to send a minimal donation via the developer's website, or you can simply purchase it on the Play Store (it's currently $1.99). The developer also offers trial keys via Telegram so that you can test out PMX Pro.",
    ],
  },
  {
    id: "pmx",
    images: {
      webp: pmxWbp,
      png: pmxPng,
    },
    imgAlt: "PMX",
    title: "Permission Manager X",
    headline: "Take Control of App Permissions Like a Pro with PMX!",
    headlineDescription: `
      <p>
        Introducing Permission Manager X (PMX), the open-source, lightweight Android tool that provides you with full control over your app's permissions without the need for root access.
      </p>
      <p>
        PMX was designed with user autonomy and simplicity in mind, enabling users to fully manage app permissions (both manifest permissions and AppOps) on Android devices.
      </p>
    `,
    features: [
      "Granular, On-Demand Permission Control",
      "Sensitive Data Access Monitoring",
      "Autostart Abuse Prevention",
      "Clean, Ad-Free Interface",
      "Wireless ADB Support (No Root)",
    ],
    detailsDescription: `
      <p>
        PMX offers a wealth of features for anyone evaluating mobile security tools, be they an IT professional, developer, or privacy-conscious user.
      </p>
      <p>
        ⚡ <span class="bolditalic">Why Choose PMX?</span><br />
        ✔️ <strong>Granular, On-Demand Permission Control:</strong> Instantly block or allow app permissions with real-time control.<br />
        ✔️ <strong>Sensitive Data Access Monitoring:</strong> See which apps access your camera, mic, location, and more.<br />
        ✔️ <strong>Autostart Abuse Prevention:</strong> Halt apps that auto-launch and exploit background permissions.<br />
        ✔️ <strong>Clean, Ad-Free Interface:</strong> Lightweight UI with zero ads, trackers, or unnecessary bloat.<br />
        ✔️ <strong>Wireless ADB Support (No Root):</strong> Advanced controls via ADB—wireless if supported—no root needed.<br />
      </p>
      <p>
        No ads. No tracking. Just privacy made easy.<br />
        This isn't just another utility — it's a <em>must-have</em> for anyone serious about mobile privacy and transparency.
      </p>
      <p>
        Try it now and liberate your Android from bloatware permission abuse!
      </p>
    `,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mirfatif/PermissionManagerX",
      },
      {
        label: "F-Droid",
        href: "https://f-droid.org/en/packages/com.mirfatif.permissionmanagerx/",
      },
      {
        label: "Website",
        href: "https://mirfatif.github.io/PermissionManagerX/",
      },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.mirfatif.permissionmanagerx",
      },
    ],
    notes: [
      "Note: PMX maintains Play Store, F-Droid, and GitHub versions. These are not interchangeable, as they all have different signatures. We recommend either the F-Droid or GitHub version, though they should all be identical in terms of functionality.",
      "Further, PMX offers a paid version, PMX Pro, which offers significantly greater functionality. You have the option to send a minimal donation via the developer's website, or you can simply purchase it on the Play Store (it's currently $1.99). The developer also offers trial keys via Telegram so that you can test out PMX Pro.",
    ],
  },
  {
    id: "tosdr",
    images: {
      webp: tosWbp,
      png: tosPng,
    },
    imgAlt: "TOS;DR",
    title: "TOS;DR",
    headline:
      "Discover ToS;DR - The Open-Source Project That Translates Legal Jargon into Clarity",
    headlineDescription: `
      <p>We've all been there&mdash;scrolling past walls of legal text and clicking “I agree” just to get on with it. But what exactly are we agreeing to?</p>
      <p><strong>ToS;DR (Terms of Service; Didn't Read)</strong> is the open-source project that helps you find out—without needing a law degree.</p>
    `,
    features: [
      "Community-driven ratings from A (best) to E (worst)",
      "Clear summaries of complex terms and privacy policies",
      "Highlights of key clauses—both good and bad",
      "No account needed, completely free to use",
      "Transparent, open-source code and contribution process",
    ],
    detailsDescription: `
      <p>✨ <span class="bolditalic">Why ToS;DR?</span><br />
      ✔️ Community-driven ratings from A (best) to E (worst)<br />
      ✔️ Clear summaries of complex terms and privacy policies<br />
      ✔️ Highlights of key clauses—both good and bad<br />
      ✔️ No account needed, completely free to use<br />
      ✔️ Transparent, open-source code and contribution process</p>
      <p>Whether you're a privacy advocate, a curious user, or someone tired of blindly agreeing to questionable terms, ToS;DR helps you make informed decisions about the services you use every day.</p>
      <p>💡 From browser extensions to a dedicated <strong>Android app on F-Droid</strong>, ToS;DR is privacy-conscious, ad-free, and built to empower.</p>
      <p>Stay informed, protect your rights, and take back control of your digital life—one ToS at a time.</p>
    `,
    links: [
      {
        label: "F-Droid",
        href: "https://f-droid.org/en/packages/xyz.ptgms.tosdr/",
      },
      {
        label: "GitHub (works with Obtainium)",
        href: "https://github.com/tosdr/tosdr-android",
      },
      { label: "Website", href: "https://tosdr.org/" },
    ],
    notes: [
      `While the latest <a rel="noopener noreferrer" href="https://reports.exodus-privacy.eu.org/en/reports/592855/">Exodus</a> privacy audit shows the <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=xyz.ptgms.tosdr">Play Store</a> version is free of trackers, we'd still recommend opting for the F-Droid version or installing via <a rel="noopener noreferrer" href="https://github.com/ImranR98/Obtainium">Obtainium</a>.`,
    ],
  },
  {
    id: "acode",
    images: {
      webp: acodeWbp,
      png: acodePng,
    },
    imgAlt: "Acode",
    title: "Acode",
    headline:
      "Bring the power of a full-fledged IDE to your Android device with Acode!",
    headlineDescription: `
      <p>Discover Acode, the open-source code editor that brings the power of a full-fledged IDE to your Android device. Whether you're tweaking HTML, crafting CSS, or debugging JavaScript, Acode has you covered.</p>
    `,
    features: [
      "Lightweight & fast",
      "Supports over 100 programming languages",
      "Offline functionality—no internet needed",
      "Integrated Git support",
      "Customizable themes & syntax highlighting",
    ],
    detailsDescription: `
      <p>✨ <span class="bolditalic">Why Acode?</span><br />
      ✔️ Lightweight & fast<br />
      ✔️ Supports over 100 programming languages<br />
      ✔️ Offline functionality—no internet needed<br />
      ✔️ Integrated Git support<br />
      ✔️ Customizable themes & syntax highlighting</p>
      <p>Perfect for developers on the go, students, or anyone passionate about coding and open-source software.</p>
    `,
    links: [
      { label: "GitHub", href: "https://github.com/Acode-Foundation/Acode" },
      {
        label: "F-Droid",
        href: "https://f-droid.org/packages/com.foxdebug.acode/",
      },
      { label: "Website", href: "https://acode.app/" },
    ],
    notes: [
      "We recommend you use only the F-Droid or GitHub versions, as the Play Store version contains ads.",
    ],
  },
  {
    id: "linksheet",
    images: {
      webp: lsheetWbp,
      png: lsheetPng,
    },
    imgAlt: "LinkSheet Nightly",
    title: "LinkSheet Nightly",
    headline:
      "Restore link control on Android 12 and later with LinkSheet Nightly.",
    headlineDescription: `
      <p>LinkSheet is a powerful tool that restores the ability to choose which app opens your links on Android 12 and later. With its Material Design interface, LinkSheet allows you to set custom preferences for specific hosts, enhancing your privacy and control.</p>
    `,
    features: [
      "Regain Choice: Decide which app opens your links, bypassing Android's default restrictions.",
      "Custom Preferences: Set your preferred browser or app for specific hosts.",
      "Enhanced Privacy: Prevent unwanted app launches and ensure links open where you intend.",
      "User-Friendly Interface: Enjoy a sleek, Material Design that integrates seamlessly with your device.",
    ],
    detailsDescription: `
      <p>✨ <span class="bolditalic">Why LinkSheet?</span><br />
      ✔️ <strong>Regain Choice:</strong> Decide which app opens your links, bypassing Android's default restrictions.<br />
      ✔️ <strong>Custom Preferences:</strong> Set your preferred browser or app for specific hosts.<br />
      ✔️ <strong>Enhanced Privacy:</strong> Prevent unwanted app launches and ensure links open where you intend.<br />
      ✔️ <strong>User-Friendly Interface:</strong> Enjoy a sleek, Material Design that integrates seamlessly with your device.</p>
    `,
    links: [
      {
        imgAlt: "Obtainium",
        hideLabels: true,  // Special flag to control rendering
        downloadText: "Obtainium App Config",
        downloadHref:
          "https://raw.githubusercontent.com/netwk-pro/dev-sveltekit/refs/heads/master/assets/bin/linksheet.json",
      },
      {
        label: "GitHub",
        href: "https://github.com/LinkSheet/LinkSheet",
      },
      {
        label: "GitHub Releases",
        href: "https://github.com/LinkSheet/nightly",
      },
    ],
    notes: [],
  },
  {
    id: "urlcheck",
    images: {
      webp: urlWbp,
      png: urlPng,
    },
    imgAlt: "URLCheck",
    title: "URLCheck",
    headline: "Analyze and inspect links before opening them with URLCheck.",
    headlineDescription: `
      <p>URLCheck is a must-have for privacy-conscious users! This app helps you analyze and inspect links before opening them, protecting you from trackers, malicious sites, and other online threats.</p>
    `,
    features: [
      "Automatic URL screening: Set it as your default browser for real-time link analysis.",
      "Full transparency: Know what's behind a link before you click.",
      "Stronger privacy & security: Stay safe online with minimal effort.",
    ],
    detailsDescription: `
      <p>🔍 <span class="bolditalic">Why you need it:</span><br />
      ✔️ <b>Automatic URL screening:</b> Set it as your default browser for real-time link analysis.<br />
      ✔️ <b>Full transparency:</b> Know what's behind a link before you click.<br />
      ✔️ <b>Stronger privacy & security:</b> Stay safe online with minimal effort!</p>
    `,
    links: [
      { label: "GitHub", href: "https://github.com/TrianguloY/URLCheck" },
      {
        label: "F-Droid",
        href: "https://f-droid.org/packages/com.trianguloy.urlchecker/",
      },
    ],
    notes: [],
  },
];
