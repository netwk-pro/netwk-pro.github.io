/* ==========================================================================
src/lib/data/fossData.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

// Import FOSS images
import { acodePng, acodeWbp, cryptomPng, cryptomWbp, eauthPng, eauthWbp, hboardPng, hboardWbp, lsheetPng, lsheetWbp, otphelpPng, otphelpWbp, pmxPng, pmxWbp, squirclePng, squircleWbp, tosPng, tosWbp, urlPng, urlWbp } from "$lib";

// cspell:disable
/**
 * External URL to add HeliBoard to Obtainium
 * @type {string}
 */
const hboardLink = "obtainium://app/%7B%22id%22%3A%22helium314.keyboard%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2FHelium314%2FHeliBoard%22%2C%22author%22%3A%22Helium314%22%2C%22name%22%3A%22HeliBoard%22%2C%22preferredApkIndex%22%3A0%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Afalse%2C%5C%22fallbackToOlderReleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22filterReleaseNotesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22verifyLatestTag%5C%22%3Afalse%2C%5C%22dontSortReleasesList%5C%22%3Afalse%2C%5C%22useLatestAssetDateAsReleaseDate%5C%22%3Afalse%2C%5C%22trackOnly%5C%22%3Afalse%2C%5C%22versionExtractionRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22matchGroupToUse%5C%22%3A%5C%22%5C%22%2C%5C%22versionDetection%5C%22%3Atrue%2C%5C%22releaseDateAsVersion%5C%22%3Afalse%2C%5C%22useVersionCodeAsOSVersion%5C%22%3Afalse%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22release%5C%22%2C%5C%22invertAPKFilter%5C%22%3Afalse%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22HeliBoard%5C%22%2C%5C%22shizukuPretendToBeGooglePlay%5C%22%3Afalse%2C%5C%22exemptFromBackgroundUpdates%5C%22%3Afalse%2C%5C%22skipUpdateNotifications%5C%22%3Afalse%2C%5C%22about%5C%22%3A%5C%22HeliBoard%20is%20a%20privacy-conscious%20and%20customizable%20open-source%20keyboard%2C%20based%20on%20AOSP%20%2F%20OpenBoard.%20Does%20not%20use%20internet%20permission%2C%20and%20thus%20is%20100%25%20offline.%5C%22%2C%5C%22appAuthor%5C%22%3A%5C%22Helium314%5C%22%7D%22%7D";
// cspell:enable

// cspell:disable
/**
 * External URL to add LinkSheet Nightly to Obtainium
 * @type {string}
 */
const lsheetLink = "obtainium://app/%7B%22id%22%3A%22fe.linksheet.nightly%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2FLinkSheet%2Fnightly%22%2C%22author%22%3A%221fexd%22%2C%22name%22%3A%22LinkSheet%20Nightly%22%2C%22preferredApkIndex%22%3A0%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22fallbackToOlderReleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22filterReleaseNotesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22verifyLatestTag%5C%22%3Afalse%2C%5C%22dontSortReleasesList%5C%22%3Afalse%2C%5C%22useLatestAssetDateAsReleaseDate%5C%22%3Afalse%2C%5C%22trackOnly%5C%22%3Afalse%2C%5C%22versionExtractionRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22matchGroupToUse%5C%22%3A%5C%22%5C%22%2C%5C%22versionDetection%5C%22%3Afalse%2C%5C%22releaseDateAsVersion%5C%22%3Afalse%2C%5C%22useVersionCodeAsOSVersion%5C%22%3Afalse%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22LinkSheet.Nightly%5C%22%2C%5C%22invertAPKFilter%5C%22%3Atrue%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22LinkSheet%20Nightly%5C%22%2C%5C%22shizukuPretendToBeGooglePlay%5C%22%3Afalse%2C%5C%22exemptFromBackgroundUpdates%5C%22%3Afalse%2C%5C%22skipUpdateNotifications%5C%22%3Afalse%2C%5C%22about%5C%22%3A%5C%22Restore%20link%20control%20on%20Android%2012%2B%5C%22%2C%5C%22appAuthor%5C%22%3A%5C%221fexd%5C%22%7D%22%7D";
// cspell:enable

export const fossData = [
  {
    id: "otp-helper",
    images: {
      webp: otphelpWbp,
      png: otphelpPng,
    },
    imgAlt: "Copy SMS Code - OTP Helper",
    title: "Copy SMS Code - OTP Helper",
    headline: "Secure. Effortless. 100% Open Source",
    headlineDescription: `
      <p>
        If you've ever juggled between apps just to copy a one-time password (OTP), you know how frustrating the process can be.
      </p>
      <p>
        <strong>Copy SMS Code - OTP Helper</strong> is a minimalist Android app that takes care of that, seamlessly detecting OTPs from SMS or notifications and copying them directly to your clipboard—<em>automatically</em>. No interaction needed. No internet access required. No user data touched.
      </p>
      <p>
        And yes—it's fully <strong>open source</strong>, under the AGPL-3.0 license. 🔓
      </p>
    `,
    features: [
      {
        emoji: "🧩",
        label: "Why Copy SMS Code - OTP Helper stands out:",
        isIntro: true
      },
      {
        emoji: "✔️",
        label: "100% offline",
        description: "doesn't even request internet permission",
      },
      {
        emoji: "✔️",
        label: "Choose your workflow",
        description: "Notification Listener or SMS access",
      },
      {
        emoji: "✔️",
        label: "Compatible with virtually any OTP-based or 2FA system",
      },
      {
        emoji: "✔️",
        label: "Lightweight, privacy-first, and customizable",
      },
      {
        emoji: "✔️",
        label: "Translated into 70+ languages and growing",
      },
      {
        emoji: "✔️",
        label: "Inspect, contribute, or fork on GitHub",
      }
    ],
    detailsDescription: `
      <p>
        This is a perfect example of how small, thoughtful tools can reduce friction in our everyday workflows—<strong>while keeping user agency and transparency at the core.</strong>
      </p>
      <p>
        Let's continue supporting software that empowers users through simplicity and openness. 💡
      </p>
    `,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jd1378/otphelper",
      },
      {
        label: "F-Droid",
        href: "https://f-droid.org/packages/io.github.jd1378.otphelper",
      }
    ],
  },
  {
    id: "cryptomator",
    images: {
      webp: cryptomWbp,
      png: cryptomPng,
    },
    imgAlt: "Cryptomator",
    title: "Cryptomator",
    headline: "Vault Up Your Cloud Privacy",
    headlineDescription: `
      <p>
        Tired of feeling like your cloud files are just floating out there, unprotected? Say hello to <strong>Cryptomator</strong>—your personal vault for keeping sensitive data safe in the cloud, <em>without giving up open-source freedom</em>.
      </p>
      <p>
        🛡️ <strong>Cryptomator</strong> provides transparent client-side encryption for your cloud storage. Whether you're using Nextcloud, Google Drive, OneDrive or another service, Cryptomator keeps your files <strong>encrypted and private</strong>—before they even leave your device.
      </p>
    `,
    features: [
      {
        emoji: "📋",
        label: "Why Cryptomator stands out:",
        isIntro: true
      },
      {
        emoji: "🔐",
        label: "Zero-knowledge encryption",
        description: "not even Cryptomator can access your data",
      },
      {
        emoji: "🆓",
        label: "Completely free and open-source",
        description: "GPLv3",
      },
      {
        emoji: "💻",
        label: "Cross-platform",
        description: "Windows, macOS, Linux, iOS & Android"
      },
      {
        emoji: "📂",
        label: "Folder-level encryption",
        description: "integrated with your file system",
      },
      {
        emoji: "💬",
        label: "No account needed",
        description: "no tracking, no ads"
      }
    ],
    detailsDescription: `
      <p>
        📈 Why privacy-conscious users are switching:<br />
        ✅ <strong>User-friendly interface</strong><br />
        ✅ <strong>End-to-end encryption</strong> without needing to trust any cloud provider<br />
        ✅ <strong>Community-driven</strong> with regular updates<br />
        ✅ <strong>Works with any cloud provider</strong><br />
        ✅ <strong>100% local key management</strong>
      </p>
      <p>
        Your cloud deserves more than blind trust. Cryptomator empowers you to <em>own your data</em> with ease and elegance.
      </p>
    `,
    links: [
      {
        label: "Website",
        href: "https://cryptomator.org",
      },
      {
        label: "GitHub",
        href: "https://github.com/cryptomator/cryptomator",
      },
      {
        label: "F-Droid",
        href: "https://f-droid.org/en/packages/org.cryptomator.lite/",
      }
    ],
    notes: [
      "Cryptomator is available from several sources, including <strong>Google Play, F-Droid, and GitHub/Obtainium</strong>. While we generally recommend using only open-source versions, <strong>you may opt for the Google Play version if Google Drive integration is important to you</strong>. Note that the F-Droid and GitHub versions exclude third-party libraries, which means <strong>they cannot interface with Google Drive</strong>."
    ],
  },
  {
    id: "squircle",
    images: {
      webp: squircleWbp,
      png: squirclePng,
    },
    imgAlt: "Squircle CE",
    title: "Squircle CE",
    headline: "Squircle CE vs. QuickEdit - Which Text Editor Deserves Your Love?",
    headlineDescription: `
      <p>
        Looking for a lightweight, open-source text editor that <em>actually</em> respects your privacy and still packs modern power? Meet <strong>Squircle CE</strong>!
      </p>
      <p>
        🚀 <strong>Squircle CE</strong> is more than just a pretty interface—it's built on a clean Material 3 design, supports syntax highlighting for 50+ languages, and includes all the must-haves like code folding, session management, and Git integration.
      </p>
      <p>
        🔥 <strong>How it stacks against QuickEdit:</strong><br />
        While <strong>QuickEdit</strong> is known for its speed and decent performance, it comes with closed-source limitations and ads that can hinder user experience. Squircle CE, on the other hand, is <strong>100% open-source</strong>, <strong>ad-free</strong>, and lets YOU control the experience.
      </p>
    `,
    features: [
      {
        emoji: "💬",
        label: "Why developers are switching:",
        isIntro: true
      },
      {
        emoji: "✔️",
        label: "No ads, no tracking",
      },
      {
        emoji: "✔️",
        label: "True dark mode",
      },
      {
        emoji: "✔️",
        label: "Lightning-fast code editing",
      },
      {
        emoji: "✔️",
        label: "F-Droid support",
      },
      {
        emoji: "✔️",
        label: "Open contributions welcome!",
      }
    ],
    detailsDescription: `
      <p>
        Whether you're debugging scripts or tweaking configs on the go, Squircle CE has you covered without the bloat or barriers.
      </p>
    `,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/massivemadness/Squircle-CE",
      },
      {
        label: "F-Droid",
        href: "https://f-droid.org/packages/com.blacksquircle.ui/",
      },
    ],
    notes: [
      "Although Squircle CE is available on the Play Store, that version includes closed-source libraries and is therefore not considered fully open-source. For a completely free and open-source experience, we recommend downloading Squircle CE from either <strong>F-Droid</strong> or <strong>GitHub</strong>."
    ],
  },
  {
    id: "heliboard",
    images: {
      webp: hboardWbp,
      png: hboardPng,
    },
    imgAlt: "HeliBoard",
    title: "HeliBoard",
    headline: "⌨️ A privacy-first keyboard that respects your data. Always.",
    headlineDescription: `
      <p>
        Meet <strong>HeliBoard</strong> — a fully open-source Android keyboard that puts privacy and user control first. No internet permissions. No telemetry. No tracking. Just a lightweight, seamless typing experience built by developers who genuinely care about digital freedom and transparency.
      </p>
    `,
    features: [
      {
        emoji: "💡",
        label: "Why Make the Switch to HeliBoard?",
        isIntro: true
      },
      {
        emoji: "✔️",
        label: "Material Design interface",
      },
      {
        emoji: "✔️",
        label: "Built-in themes with dark mode support",
      },
      {
        emoji: "✔️",
        label: "No ads, data collection, or background connections",
      },
      {
        emoji: "✔️",
        label: "Emoji support, gesture input, and smart customization",
      },
      {
        emoji: "✔️",
        label: "Actively developed on GitHub",
        description: "get involved!"
      }
    ],
    detailsDescription: `
      <p>
        Whether you're switching from Gboard or just want something more minimal and ethical, HeliBoard brings you that true FOSS flavor while keeping your taps smooth and secure.
      </p>
      <p>
        🛠️ Open-source. Lightweight. Transparent. HeliBoard isn't just a keyboard—it's a philosophy.
      </p>
      <p>
        ✨ <strong>Weekly FOSS gems like this remind us: we have powerful alternatives, built by passionate devs, made for people who care. <em>Let's support that</em>.</strong>
      </p>

    `,
    obtainium: {
    label: "Obtainium App Config",
    href: hboardLink,
    download: "/bin/heliboard.json"
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Helium314/HeliBoard",
      },
      {
        label: "F-Droid",
        href: "https://f-droid.org/packages/helium314.keyboard/",
      },
      {
        label: "IzzyOnDroid",
        href: "https://apt.izzysoft.de/fdroid/index/apk/helium314.keyboard",
      },
    ],
    notes: [
      "Network Pro&trade; <strong>highly recommends</strong> that Android users choose an open-source keyboard—ideally one that does not require internet permissions. Concerns remain valid around proprietary keyboards like Gboard and Microsoft SwiftKey, which may collect and store user input data."
    ],
  },
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
      <p>
        Discover <strong>Ente Auth</strong> — the sleek, open-source 2FA authenticator that's putting privacy and usability front and center.
      </p>
      <p>
        Whether you're a dev, a cybersecurity enthusiast, or simply serious about protecting your accounts, <strong>Ente Auth</strong> offers a next-level authentication experience — <strong>backed by encryption, not ads.</strong>
      </p>
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
    notes: [],
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
      {
        emoji: "⚡",
        label: "Why Choose PMX?",
        isIntro: true
      },
      {
        emoji: "✔️",
        label: "Granular, On-Demand Permission Control",
        description: "Instantly block or allow app permissions with real-time control."
      },
      {
        emoji: "✔️",
        label: "Sensitive Data Access Monitoring",
        description: "See which apps access your camera, mic, location, and more."
      },
      {
        emoji: "✔️",
        label: "Autostart Abuse Prevention",
        description: "Halt apps that auto-launch and exploit background permissions."
      },
      {
        emoji: "✔️",
        label: "Clean, Ad-Free Interface",
        description: "Lightweight UI with zero ads, trackers, or unnecessary bloat."
      },
      {
        emoji: "✔️",
        label: "Wireless ADB Support (No Root)",
        description: "Advanced controls via ADB—wireless if supported—no root needed."
      }
    ],
    detailsDescription: `
      <p>
        PMX offers a wealth of features for anyone evaluating mobile security tools, be they an IT professional, developer, or privacy-conscious user.
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
      <p>
        We've all been there&mdash;scrolling past walls of legal text and clicking “I agree” just to get on with it. But what exactly are we agreeing to?
      </p>
      <p>
        <strong>ToS;DR (Terms of Service; Didn't Read)</strong> is the open-source project that helps you find out—without needing a law degree.
      </p>
    `,
    features: [
      {
        emoji: "✨",
        label: "Why ToS;DR?",
        isIntro: true
      },
      {
        emoji: "✔️",
        label: "Community-driven ratings",
        description: "from A (best) to E (worst)."
      },
      {
        emoji: "✔️",
        label: "Clear summaries of complex terms and privacy policies",
        description: ""
      },
      {
        emoji: "✔️",
        label: "Highlights of key clauses",
        description: "both good and bad."
      },
      {
        emoji: "✔️",
        label: "No account needed, completely free to use",
        description: ""
      },
      {
        emoji: "✔️",
        label: "Transparent, open-source code and contribution process",
        description: ""
      }
    ],
    detailsDescription: `
      <p>
        Whether you're a privacy advocate, a curious user, or someone tired of blindly agreeing to questionable terms, ToS;DR helps you make informed decisions about the services you use every day.
      </p>
      <p>
        💡 From browser extensions to a dedicated <strong>Android app on F-Droid</strong>, ToS;DR is privacy-conscious, ad-free, and built to empower.
      </p>
      <p>
        Stay informed, protect your rights, and take back control of your digital life—one ToS at a time.
      </p>
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
      <p>
        Discover Acode, the open-source code editor that brings the power of a full-fledged IDE to your Android device. Whether you're tweaking HTML, crafting CSS, or debugging JavaScript, Acode has you covered.
      </p>
    `,
    features: [
      {
        emoji: "✨",
        label: "Why Acode?",
        isIntro: true
      },
      {
        emoji: "✔️",
        label: "Lightweight & fast",
        description: ""
      },
      {
        emoji: "✔️",
        label: "Supports over 100 programming languages",
        description: ""
      },
      {
        emoji: "✔️",
        label: "Offline functionality",
        description: "no internet needed."
      },
      {
        emoji: "✔️",
        label: "Integrated Git support",
        description: ""
      },
      {
        emoji: "✔️",
        label: "Customizable themes & syntax highlighting",
        description: ""
      }
    ],
    detailsDescription: `
      <p>
        Perfect for developers on the go, students, or anyone passionate about coding and open-source software.
      </p>
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
      <p>
        LinkSheet is a powerful tool that restores the ability to choose which app opens your links on Android 12 and later. With its Material Design interface, LinkSheet allows you to set custom preferences for specific hosts, enhancing your privacy and control.
      </p>
    `,
    features: [
      {
        emoji: "✨",
        label: "Why LinkSheet?",
        isIntro: true
      },
      {
        emoji: "✔️",
        label: "Regain Choice",
        description: "Decide which app opens your links, bypassing Android's default restrictions."
      },
      {
        emoji: "✔️",
        label: "Custom Preferences",
        description: "Set your preferred browser or app for specific hosts."
      },
      {
        emoji: "✔️",
        label: "Enhanced Privacy",
        description: "Prevent unwanted app launches and ensure links open where you intend."
      },
      {
        emoji: "✔️",
        label: "User-Friendly Interface",
        description: "Enjoy a sleek, Material Design that integrates seamlessly with your device."
      },
      {
        emoji: "✔️",
        label: "Customizable themes & syntax highlighting",
        description: ""
      }
    ],
    detailsDescription: `
    `,
    obtainium: {
    label: "Obtainium App Config",
    href: lsheetLink,
    download: "/bin/linksheet.json"
    },
    links: [
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
      <p>
        URLCheck is a must-have for privacy-conscious users! This app helps you analyze and inspect links before opening them, protecting you from trackers, malicious sites, and other online threats.
      </p>
    `,
    features: [
      {
        emoji: "🔍",
        label: "Why you need it:",
        isIntro: true
      },
      {
        emoji: "✔️",
        label: "Automatic URL Screening",
        description: "Set it as your default browser for real-time link analysis."
      },
      {
        emoji: "✔️",
        label: "Full Transparency",
        description: "Know what's behind a link before you click."
      },
      {
        emoji: "✔️",
        label: "Stronger Privacy & Security",
        description: "Stay safe online with minimal effort!"
      }
    ],
    detailsDescription: `
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

// cspell:ignore hboard gboard lsheet eauth tosdr cryptom otphelp
