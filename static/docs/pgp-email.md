# 📧 Encrypting Email with PGP

> This guide walks you through using PGP (Pretty Good Privacy) to encrypt email using both graphical and client-based tools.

PGP encryption ensures that only the intended recipient can read your email content — even if it's intercepted.

---

## 🔹 Option A: Outlook (Windows) with GpgOL

GpgOL is a plugin included with **Gpg4win** that integrates directly into Microsoft Outlook (desktop only).

### ✅ Requirements

- Gpg4win (with GpgOL selected during installation)
- Outlook 2010 or newer (desktop version)
- Recipient’s **public key**

> ⚠️ GpgOL does not work with Outlook for Microsoft 365 Web or Outlook Mobile. It is only compatible with the **desktop edition of Outlook** on Windows.

### 📥 Encrypting an Email in Outlook

1. Open Outlook and compose a new message
2. Enter the recipient’s email address (must match imported key)
3. Click the `Encrypt` button on the **GpgOL ribbon** tab
4. Send your email

> ✉️ Outlook will encrypt the email contents using the recipient's public key.

### 📥 Decrypting an Email in Outlook

When receiving an encrypted message:

- GpgOL will automatically prompt to decrypt it using your private key
- You may need to enter your key passphrase

> 💡 Tip: Manage keys with **Kleopatra** — launch from Start Menu

---

## 🔹 Option B: Thunderbird (Windows/macOS/Linux)

Thunderbird includes **built-in OpenPGP** support and is often preferred for privacy-focused users.

### ✅ Setup

1. [Download Thunderbird](https://www.thunderbird.net)
2. Add your email account
3. Go to: `Account Settings → End-to-End Encryption`
4. Generate a new key, or import your existing one
5. Import your recipient’s **public key**

### 🔐 Sending Encrypted Email

When composing a message:

- Click the **padlock** icon to enable encryption
- Click **sign** if you also want to verify authenticity
- Send as usual

---

## 🔹 Option C: Webmail with Mailvelope

**Mailvelope** adds OpenPGP support to Gmail, Outlook.com, Yahoo, and others.

### 🔧 Setup

1. Install [Mailvelope](https://www.mailvelope.com/) for Chrome or Firefox
2. Import your keys or generate a new pair
3. Use the Mailvelope overlay when composing encrypted emails

---

## Alternative PGP-Compatible Email Clients

In addition to widely used options like Outlook (via GpgOL) and Thunderbird, several other desktop email clients offer OpenPGP support—either natively or through plugins.

Notable alternatives include:

- **[Betterbird](https://www.betterbird.eu/):**  
  A privacy-focused Thunderbird fork with full PGP support.  
  ▸ Available on Windows, Linux, and macOS.

- **[eM Client](https://www.emclient.com/):**  
  A feature-rich client with native OpenPGP integration and calendar/task support.  
  ▸ Available on Windows, macOS, Android, and iOS.  
  ▸ _Free tier supports 2 email accounts after a 30-day trial._

> 💡 **Note:** Be sure to verify the client’s compatibility with your GPG keyring (e.g., Gpg4win or Kleopatra on Windows).

---

## 📱 Mobile Email Clients with OpenPGP Support

For secure email on Android, the following apps support OpenPGP encryption via [**OpenKeychain**](https://www.openkeychain.org/):

- **[FairEmail](https://email.faircode.eu/)**  
  A lightweight, privacy-first email client for Android, offering built-in OpenPGP support, rich customization, and a modern, privacy-respecting interface.

- **[K-9 Mail](https://k9mail.app/)**  
  A veteran open-source Android mail client known for its simplicity and transparency. K-9 is now maintained by the Thunderbird team as part of their mobile strategy.

- **[Thunderbird Mobile](https://www.thunderbird.net/en-US/mobile/)**  
  A mobile adaptation of Thunderbird, currently built on K-9 Mail and maintained by the same team. Provides end-to-end encryption and an open-source, user-friendly experience.

> ⚠️ OpenPGP support on iOS is limited due to platform restrictions.  
> Most options are proprietary or require external tools, and may not provide full compatibility with standard PGP workflows.

---

## 📤 Exporting and Sharing Public Keys

You can export your public key from **Kleopatra**, Thunderbird, or the command line, and share it via:

- Your website
- A keyserver (e.g., [keys.openpgp.org](https://keys.openpgp.org))
- Your GitHub profile (e.g., in `SECURITY.md` or a `PGP-KEY.asc` file)

### 🔧 Export via Command Line

If you’re using GnuPG directly:

```sh
gpg --armor --export your@email.com > publickey.asc
```

This creates a text-formatted (`.asc`) version of your public key that’s easy to upload or embed.

> 💡 Replace `your@email.com` with the email associated with your PGP key.

---

## 🛠 Troubleshooting Tips

- Ensure email address in key matches recipient’s address
- Key must be **trusted/imported** before encryption works
- For Outlook, restart if GpgOL ribbon does not appear
- Thunderbird may require re-indexing of OpenPGP keyring

---

## 📚 Learn More

- [Gpg4win Documentation](https://gpg4win.org/documentation.html)
- [How to Encrypt Emails with OpenPGP in Thunderbird (2022)](https://www.linuxbabe.com/security/encrypt-emails-gpg-thunderbird)
- [Mozilla OpenPGP Docs](https://support.mozilla.org/en-US/kb/openpgp-thunderbird-how-does-it-work)
- [Mailvelope Overview](https://www.mailvelope.com/help)

---

> 🔐 PGP protects your communication, but both parties must be using it correctly. Always test before sending sensitive content.
