# 💻 Using PGP on Windows (Gpg4win & Kleopatra)

## This section walks through encrypting a message or file using **Gpg4win** and its GUI tool **Kleopatra**

### 📦 1. Install Gpg4win

- Download from: [https://gpg4win.org](https://gpg4win.org)
- During setup, make sure **Kleopatra** is selected.

---

### 🔑 2. Import the Recipient’s Public Key

1. Open **Kleopatra**
2. Click `File` → `Import Certificates…`
3. Select the `.asc` or `.gpg` file you downloaded
4. Confirm the fingerprint matches the published value

---

### ✍️ 3. Encrypt a Message (Text)

1. In Kleopatra, go to `Tools` → `Clipboard` → `Encrypt`
2. Paste your message
3. Select the recipient’s public key
4. Click **Encrypt**
5. Copy or save the armored output (begins with `-----BEGIN PGP MESSAGE-----`)

You can now send that encrypted message via email or any communication platform.

---

### 📁 4. Encrypt a File

1. Right-click on any file (e.g., PDF or TXT)
2. Choose **More GpgEX options** → **Encrypt**
3. Select the recipient key
4. The encrypted file will be saved with a `.gpg` extension

---

### 🔓 5. Decrypt a Message or File

To decrypt a file:

- Right-click `.gpg` file → **Decrypt and verify**

To decrypt a clipboard message:

- In Kleopatra, go to `Tools` → `Clipboard` → `Decrypt/Verify`
- Paste the encrypted message
- Kleopatra will prompt for your private key if needed

---

### 🧠 Tips for Windows Users

- Your private key is protected by a passphrase — never share it.
- You can export your public key for others to encrypt messages to you.
- Kleopatra also supports **signing** files and messages to verify your identity.

---

📘 For full walkthroughs, see:

- [Gpg4win Documentation](https://gpg4win.org/documentation.html)
- [Kleopatra User Guide (PDF)](https://files.gpg4win.org/doc/gpg4win-compendium-en.pdf)
