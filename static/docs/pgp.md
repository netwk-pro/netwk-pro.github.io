# 🔐 How to Encrypt Messages Using PGP

This guide explains how to encrypt a message or file using PGP (Pretty Good Privacy) for secure communication with **Network Pro Strategies** or any contact with a published PGP key.

---

## 📥 1. Obtain the Recipient's Public Key

You can find the official public key at:

- [https://netwk.pro/pgp](https://netwk.pro/pgp)
- Or via GitHub, Keybase, or direct contact

Make sure the key fingerprint matches what the recipient advertises.

---

## 🔧 2. Import the Public Key

Save the public key as a `.asc` or `.gpg` file, then run:

```bash
gpg --import path/to/public-key.asc
```

You can confirm the key is imported:

```bash
gpg --list-keys
```

## 🔏 3. Encrypt a Message

To encrypt a plain text file (e.g. message.txt) for the recipient:

```bash
gpg --encrypt --armor --recipient recipient@example.com message.txt
```

- --armor creates ASCII-formatted output
- Output is saved as message.txt.asc

## 🔏 4. Encrypt a File (Binary or Attachment)

```bash
gpg --encrypt --recipient recipient@example.com file.pdf
```

This will create file.pdf.gpg, which you can send securely.

## 🔓 Optional: Decrypting (For Testing)

If you're the recipient and want to decrypt a file:

```bash
gpg --decrypt file.txt.asc
```

## 🔐 Tips

- Always verify the recipient’s key fingerprint.
- Never share your private key.
- Use a strong passphrase to protect your keypair.

---

📘 For more help, see:

- [GnuPG Documentation](https://gnupg.org/documentation/)
- [A Practical Guide to GPG](https://www.linuxbabe.com/security/a-practical-guide-to-gpg-part-1-generate-your-keypair)
- [OpenPGP Best Practices](https://help.riseup.net/en/security/message-security/openpgp/best-practices)
