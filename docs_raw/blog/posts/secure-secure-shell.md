---
date:
  created: 2015-01-04
  updated: 2025-05-04
title: Secure Secure Shell
summary: Secure shell (SSHD) hardening guide.
authors:
  - team
categories:
  - Security
tags:
  - security
  - post
---

# Secure Secure Shell

<!-- markdownlint-disable-file -->

<div style="font-size: small; font-style: italic;">

> **Originally published on 1/4/2015 by [stribika](https://github.com/stribika) at:  
> [https://blog.stribik.technology/2015/01/04/secure-secure-shell.html](https://blog.stribik.technology/2015/01/04/secure-secure-shell.html)**
>
> Mirrored to preserve information. Minor changes have been made, and this is noted where applicable. Also see:  
> <https://security.stackexchange.com/questions/143442/what-are-ssh-keygen-best-practices>

</div>

<div style="font-size: small;">

> > 📝 **_NOTE:_** Despite this article's age, we've yet to come across a better source of information with regard to SSH configuration.

</div>

- [Skip to the good part.](#sshd)

You may have heard that the NSA can decrypt SSH at least some of the time.
If you have not, then read the [latest batch of Snowden documents][snowden-docs] now. All of it. This post will still be here when you finish. My goal with this post here is to make NSA analysts sad.

TL;DR: Scan this post for fixed width fonts, these will be the config file snippets and commands you have to use.

<!-- more -->

_Warning_: You will need a recent OpenSSH version.
It should work with 6.5 but I have only tested 6.7 and connections to Github.
Here is a good [compatibility matrix][compat].

---

# The crypto

Reading the documents, I have the feeling that the NSA can 1) decrypt weak crypto and 2) steal keys.
Let's focus on the crypto first.
SSH supports different key exchange algorithms, ciphers and message authentication codes.
The server and the client choose a set of algorithms supported by both, then proceed with the key exchange.
Some of the supported algorithms are not so great and should be disabled completely.
This hurts interoperability but everyone uses OpenSSH anyway.
Fortunately, downgrade attacks are not possible because the supported algorithm lists are included in the key derivation.
If a man in the middle were to change the lists, then the server and the client would calculate different keys.

## Key exchange

There are basically two ways to do key exchange: [Diffie-Hellman][dh] and [Elliptic Curve Diffie-Hellman][ecdh].
Both provide [forward secrecy][forward-secrecy] which the NSA hates because they can't use passive collection and key recovery later.
The server and the client will end up with a shared secret number at the end without a passive eavesdropper learning anything about this number.
After we have a shared secret we have to derive a cryptographic key from this using a key derivation function.
In case of SSH, this is a hash function.
[Collision attacks][sloth] on this hash function have been proven to allow downgrade attacks.

DH works with a multiplicative group of integers modulo a prime.
Its security is based on the hardness of the [discrete logarithm problem][dlp].

## <pre><code id="diffie-hellman">Alice Bob

Sa = random
Pa = g^Sa --> Pa
Sb = random
Pb <-- Pb = g^Sb
s = Pb^Sa s = Pa^Sb
k = KDF(s) k = KDF(s)</code></pre>

ECDH works with elliptic curves over finite fields.
Its security is based on the hardness of the elliptic curve discrete logarithm problem.

## <pre><code id="elliptic-curve-diffie-hellman">Alice Bob

Sa = random
Pa = Sa _G --> Pa
Sb = random
Pb <-- Pb = Sb_ G
s = Sa _Pb s = Sb_ Pa
k = KDF(s) k = KDF(s)</code></pre>

---

## <a id="sshd">SSHD Configuration</a>

> **_NOTE:_** Emphasis added, it was not present in the originally published article.  
> Key exchange **1** (curve25519-sha256) alone is ideal, **8** is also acceptable for interoperability.

OpenSSH supports 11 key exchange protocols:

1. **[curve25519-sha256][libsshdoc]: ECDH over [Curve25519][curve25519] with SHA2**
1. [diffie-hellman-group1-sha1][rfc4253]: 1024 bit DH with SHA1
1. [diffie-hellman-group14-sha1][rfc4253]: 2048 bit DH with SHA1
1. [diffie-hellman-group14-sha256][dh-draft]: 2048 bit DH with SHA2
1. [diffie-hellman-group16-sha512][dh-draft]: 4096 bit DH with SHA2
1. [diffie-hellman-group18-sha512][dh-draft]: 8192 bit DH with SHA2
1. [diffie-hellman-group-exchange-sha1][rfc4419]: Custom DH with SHA1
1. **_[diffie-hellman-group-exchange-sha256][rfc4419]: Custom DH with SHA2_**
1. ecdh-sha2-nistp256: ECDH over NIST P-256 with SHA2
1. ecdh-sha2-nistp384: ECDH over NIST P-384 with SHA2
1. ecdh-sha2-nistp521: ECDH over NIST P-521 with SHA2

We have to look at 3 things here:

- _ECDH curve choice_:
  This eliminates **9-11** because [NIST curves suck][nist-sucks].
  They leak secrets through timing side channels and off-curve inputs.
  Also, [NIST is considered harmful][bullrun] and cannot be trusted.
- _Bit size of the DH modulus_:
  This eliminates **2** because the NSA has supercomputers and possibly unknown attacks.
  1024 bits simply don't offer sufficient security margin.
- _Security of the hash function_:
  This eliminates **2**, **3**, and **7** because SHA1 is broken.
  We don't have to wait for a second preimage attack that takes 10 minutes on a cellphone to disable it right now.

We are left with **1** and **8**, as well as **4-6** which were added in [OpenSSH 7.3][73release].
**1** is better and it's perfectly OK to only support that but for interoperability (with Eclipse, WinSCP), **8** can be included.

> **_NOTE:_**: 8 should no longer be necessary in newer versions of WinSCP. If in doubt, test with only 1 first. Add 8 if it won't connect otherwise.

Recommended `/etc/ssh/sshd_config` snippet:

<pre><code id="server-kex">KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group-exchange-sha256</code></pre>

Recommended `/etc/ssh/ssh_config` snippet:

<pre><code id="client-kex"># Github needs diffie-hellman-group-exchange-sha1 some of the time but not always.
#Host github.com
#    KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group-exchange-sha256,diffie-hellman-group-exchange-sha1,diffie-hellman-group14-sha1

Host *
    KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group-exchange-sha256</code></pre>

> **_NOTE:_** GitHub should no longer need a separate setting, as they've transitioned away from SSH keys. They should not require an exception regardless.

If you chose to enable **8**, open `/etc/ssh/moduli` if exists, and delete lines where the 5th column is less than 2000.

<pre><code id="server-moduli-filter">awk '$5 > 2000' /etc/ssh/moduli > "${HOME}/moduli"
wc -l "${HOME}/moduli" # make sure there is something left
mv "${HOME}/moduli" /etc/ssh/moduli</code></pre>

If it does not exist, create it:

<pre><code id="server-moduli">ssh-keygen -G /etc/ssh/moduli.all -b 4096
ssh-keygen -T /etc/ssh/moduli.safe -f /etc/ssh/moduli.all
mv /etc/ssh/moduli.safe /etc/ssh/moduli
rm /etc/ssh/moduli.all</code></pre>

This will take a while so continue while it's running.

---

## Authentication

The key exchange ensures that the server and the client shares a secret no one else knows.
We also have to make sure that they share this secret with each other and not an NSA analyst.

### Server authentication

The server proves its identity to the client by signing the key resulting from the key exchange.
There are 4 public key algorithms for authentication:

1. DSA with SHA1
1. ECDSA with SHA256, SHA384 or SHA512 depending on key size
1. [Ed25519][ed25519] with SHA512
1. RSA with SHA1

DSA keys must be exactly 1024 bits so let's disable that.
Number 2 here involves NIST suckage and should be disabled as well.
Another important disadvantage of DSA and ECDSA is that it uses randomness for each signature.
If the random numbers are not the best quality, then it is [possible to recover][ecdsa-same-k] the [secret key][ecdsa-sony].
Fortunately, RSA using SHA1 is not a problem here because the value being signed is actually a SHA2 hash.
The hash function SHA1(SHA2(x)) is just as secure as SHA2 (it has less bits of course but no better attacks).

<pre><code id="server-auth">Protocol 2
HostKey /etc/ssh/ssh_host_ed25519_key
HostKey /etc/ssh/ssh_host_rsa_key</code></pre>

The first time you connect to your server, you will be asked to accept the new fingerprint.

This will also disable the horribly broken v1 protocol that you should not have enabled in the first place.
We should remove the unused keys and only generate a large RSA key and an Ed25519 key.
Your init scripts may recreate the unused keys.
If you don't want that, remove any `ssh-keygen` commands from the init script.

<pre><code id="server-keygen">cd /etc/ssh
rm ssh_host_*key*
ssh-keygen -t ed25519 -f ssh_host_ed25519_key -N "" < /dev/null
ssh-keygen -t rsa -b 4096 -f ssh_host_rsa_key -N "" < /dev/null</code></pre>

### Client authentication

The client must prove its identity to the server as well.
There are various methods to do that.

The simplest is password authentication.
This should be disabled immediately _after_ setting up a more secure method because it allows compromised servers to steal passwords.
Password authentication is also more vulnerable to online bruteforce attacks.

Recommended `/etc/ssh/sshd_config` snippet:

<pre><code id="server-auth-password">PasswordAuthentication no
ChallengeResponseAuthentication no</code></pre>

Recommended `/etc/ssh/ssh_config` snippet:

<pre><code id="client-auth-password">Host *
    PasswordAuthentication no
    ChallengeResponseAuthentication no</code></pre>

The most common and secure method is public key authentication, basically the same process as the server authentication.

Recommended `/etc/ssh/sshd_config` snippet:

<pre><code id="server-auth-pubkey">PubkeyAuthentication yes</code></pre>

Recommended `/etc/ssh/ssh_config` snippet:

<pre><code id="client-auth-pubkey">Host *
    PubkeyAuthentication yes
    HostKeyAlgorithms ssh-ed25519-cert-v01@openssh.com,ssh-rsa-cert-v01@openssh.com,ssh-ed25519,ssh-rsa</code></pre>

Generate client keys using the following commands:

<pre><code id="client-keygen">ssh-keygen -t ed25519 -o -a 100
ssh-keygen -t rsa -b 4096 -o -a 100</code></pre>

You can deploy your new client public keys using `ssh-copy-id`.

It is also possible to use OTP authentication to reduce the consequences of lost passwords.
[Google Authenticator][google-auth] is a nice implementation of [TOTP][totp], or Timebased One Time Password.
You can also use a [printed list of one time passwords][otp] or any other [PAM][pam] module, really, if you enable `ChallengeResponseAuthentication`.

### User Authentication

Even with Public Key authentication, you should only allow incoming connections from expected users. The `AllowUsers` setting in `sshd_config` lets you specify users who are allowed to connect, but this can get complicated with a large number of ssh users. Additionally, when deleting a user from the system, the username is [not removed][bug779880] from `sshd_config`, which adds to maintenance requirements. The solution is to use the `AllowGroups` setting instead, and add users to an `ssh-user` group.

Recommended `/etc/ssh/sshd_config` snippet:

<pre><code id="client-auth-allowgroups">AllowGroups ssh-user</code></pre>

Create the ssh-user group with `sudo groupadd ssh-user`, then add each ssh user to the group with `sudo usermod -a -G ssh-user <username>`.

---

## Symmetric ciphers

> **_NOTE:_** Emphasis added.

Symmetric ciphers are used to encrypt the data after the initial key exchange and authentication is complete.

Here we have quite a few algorithms (10-14 were removed in [OpenSSH 7.6][76release]):

1. 3des-cbc
1. aes128-cbc
1. aes192-cbc
1. aes256-cbc
1. aes128-ctr
1. aes192-ctr
1. aes256-ctr
1. **_<aes128-gcm@openssh.com>_**
1. **_<aes256-gcm@openssh.com>_**
1. arcfour
1. arcfour128
1. arcfour256
1. blowfish-cbc
1. cast128-cbc
1. **<chacha20-poly1305@openssh.com>**

We have to consider the following:

- _Security of the cipher algorithm_:
  This eliminates **1** and **10-12** - both DES and RC4 are broken.
  Again, no need to wait for them to become even weaker, disable them now.
- _Key size_:
  At least 128 bits, the more the better.
- _Block size_:
  Does not apply to stream ciphers.
  At least 128 bits.
  This eliminates **13** and **14** because those have a 64 bit block size.
- _Cipher mode_:
  The recommended approach here is to prefer [AE][ae] modes and optionally allow CTR for compatibility.
  CTR with Encrypt-then-MAC is provably secure.

Chacha20-poly1305 is preferred over AES-GCM because the SSH protocol [does not encrypt message sizes][aes-gcm] when GCM (or EtM) is in use.
This allows some traffic analysis even without decrypting the data.
We will deal with that soon.

Recommended `/etc/ssh/sshd_config` snippet:

<pre><code id="server-ciphers">Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr</code></pre>

Recommended `/etc/ssh/ssh_config` snippet:

<pre><code id="client-ciphers">Host *
    Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr</code></pre>

---

## Message authentication codes

> Emphasis added.

Encryption provides _confidentiality_, message authentication code provides _integrity_.
We need both.
If an AE cipher mode is selected, then extra MACs are not used, the integrity is already given.
If CTR is selected, then we need a MAC to calculate and attach a tag to every message.

There are multiple ways to combine ciphers and MACs - not all of these are useful.
The 3 most common:

- _Encrypt-then-MAC_: encrypt the message, then attach the MAC of the ciphertext.
- _MAC-then-encrypt_: attach the MAC of the plaintext, then encrypt everything.
- _Encrypt-and-MAC_: encrypt the message, then attach the MAC of the plaintext.

Only Encrypt-then-MAC should be used, period.
Using MAC-then-encrypt have lead to many attacks on TLS while Encrypt-and-MAC have lead to not quite that many attacks on SSH.
The reason for this is that the more you fiddle with an attacker provided message, the more chance the attacker has to gain information through side channels.
In case of Encrypt-then-MAC, the MAC is verified and if incorrect, discarded.
Boom, one step, no timing channels.
In case of MAC-then-encrypt, first the attacker provided message has to be decrypted and only then can you verify it.
Decryption failure (due to invalid CBC padding for example) may take less time than verification failure.
Encrypt-and-MAC also has to be decrypted first, leading to the same kind of potential side channels.
It's even worse because no one said that a MAC's output can't leak what its input was.
SSH by default, uses this method.

Here are the available MAC choices:

1. hmac-md5
1. hmac-md5-96
1. hmac-sha1
1. hmac-sha1-96
1. hmac-sha2-256
1. hmac-sha2-512
1. umac-64
1. umac-128
1. <hmac-md5-etm@openssh.com>
1. <hmac-md5-96-etm@openssh.com>
1. <hmac-sha1-etm@openssh.com>
1. <hmac-sha1-96-etm@openssh.com>
1. **<hmac-sha2-256-etm@openssh.com>**
1. **<hmac-sha2-512-etm@openssh.com>**
1. <umac-64-etm@openssh.com>
1. <umac-128-etm@openssh.com>

The selection considerations:

- _Security of the hash algorithm_:
  No MD5 and SHA1.
  Yes, I know that HMAC-SHA1 does not need collision resistance but why wait?
  Disable weak crypto today.
- _Encrypt-then-MAC_:
  I am not aware of a security proof for CTR-and-HMAC but I also don't think CTR decryption can fail.
  Since there are no downgrade attacks, you can add them to the end of the list.
  You can also do this on a host by host basis so you know which ones are less safe.
- _Tag size_:
  At least 128 bits.
  This eliminates umac-64-etm.
- _Key size_:
  At least 128 bits.
  This doesn't eliminate anything at this point.

Recommended `/etc/ssh/sshd_config` snippet:

<pre><code id="server-macs">MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-512,hmac-sha2-256,umac-128@openssh.com</code></pre>

Recommended `/etc/ssh/ssh_config` snippet:

<pre><code id="client-macs">Host *
    MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-512,hmac-sha2-256,umac-128@openssh.com</code></pre>

# Preventing key theft

Even with forward secrecy the secret keys must be kept secret.
The NSA has a database of stolen keys - you do not want your key there.

---

## System hardening

OpenSSH has some undocumented, and rarely used features.
UseRoaming is one such feature with a [known vulnerability][useroaming].

Recommended `/etc/ssh/ssh_config` snippet:

<pre><code id="client-features">Host *
   UseRoaming no</code></pre>

This post is not intended to be a comprehensive system security guide.
Very briefly:

- _Don't install what you don't need_:
  Every single line of code has a chance of containing a bug.
  Some of these bugs are security holes.
  Fewer lines, fewer holes.
- _Use free software_:
  As in speech.
  You want to use code that's actually reviewed or that you can review yourself.
  There is no way to achieve that without source code.
  Someone may have reviewed proprietary crap but who knows.
- _Keep your software up to date_:
  New versions often fix critical security holes.
- _Exploit mitigation_:
  Sad but true - there will always be security holes in your software.
  There are things you can do to prevent their exploitation, such as GCC's -fstack-protector.
  One of the best security projects out there is [Grsecurity][grsec].
  Use it or use OpenBSD.

---

## Traffic analysis resistance

Set up [Tor hidden services][tor-hs] for your SSH servers.
This has multiple advantages.
It provides an additional layer of encryption and server authentication.
People looking at your traffic will not know your IP, so they will be unable to scan and target other services running on the same server and client.
Attackers can still attack these services but don't know if it has anything to do with the observed traffic until they actually break in.

Now this is only true if you don't disclose your SSH server's fingerprint in any other way.
You should only accept connections from the hidden service or from LAN, if required.

If you don't need LAN access, you can add the following line to `/etc/ssh/sshd_config`:

<pre><code id="localhost-only">ListenAddress 127.0.0.1:22</code></pre>

Add this to `/etc/tor/torrc`:

<pre><code id="hidden-service">HiddenServiceDir /var/lib/tor/hidden_service/ssh
HiddenServicePort 22 127.0.0.1:22</code></pre>

You will find the hostname you have to use in `/var/lib/tor/hidden_service/ssh/hostname`.
You also have to configure the client to use Tor.
For this, socat will be needed.
Add the following line to `/etc/ssh/ssh_config`:

<pre><code id="onion-proxy">Host *.onion
    ProxyCommand socat - SOCKS4A:localhost:%h:%p,socksport=9050

Host *
    ...</code></pre>

If you want to allow connections from LAN, don't use the `ListenAddress` line, configure your firewall instead.

---

## Key storage

You should encrypt your client key files using a strong password.
Additionally, you can use `ssh-keygen -o -a $number` to slow down cracking attempts by iterating the hash function many times.
You may want to store them on a pendrive and only plug it in when you want to use SSH.
Are you more likely to lose your pendrive or have your system compromised?
I don't know.

Unfortunately, you can't encrypt your server key and it must be always available, or else sshd won't start.
The only thing protecting it is OS access controls.

---

# The end

It's probably a good idea to test the changes.
`ssh -v` will print the selected algorithms and also makes problems easier to spot.
Be extremely careful when configuring SSH on a remote host.
Always keep an active session, never restart sshd.
Instead you can send the `SIGHUP` signal to reload the configuration without killing your session.
You can be even more careful by starting a new sshd instance on a different port and testing that.

Can you make these changes?
If the answer is yes, then...

![NSA Happy Dance](https://raw.githubusercontent.com/netwk-pro/netwk-pro.github.io/refs/heads/master/assets/nsa-happy-dance.png "Happy Dance!!")

If the answer is no, it's probably due to compatibility problems.
You can try to convince the other side to upgrade their security and turn it into a yes.
I have created a [wiki page][sssh-wiki] where anyone can add config files for preserving compatibility with various SSH implementations and SSH based services.

If you work for a big company and change management doesn't let you do it, I'm sorry.
I've seen the v1 protocol enabled in such places.
There is no chance of improvement.
Give up to preseve your sanity.

Special thanks to the people of Twitter for the improvements.

---

# ChangeLog

You may have noticed that this document changed since last time.
I want to be very transparent about this.
There were three major changes:

- After some debate and going back and forth between including GCM or not, it's now back again.
  The reason for dropping it was that SSH doesn't encrypt packet sizes when using GCM.
  The reason for bringing it back is that SSH does the same with any EtM algorithms.
  There is no way around this unless you can live with chacha20-poly1305 only.
  Also, the leaked documents don't sound like they can figure out the lengths or confirm presence of some things, more like straight up "send it to us and we'll decrypt it for you".
  Wrapping SSH in a Tor hidden service will take care of any traffic analysis concerns.
- I'm now allowing Encrypt-and-MAC algorithms with CTR ciphers as a last resort.
  I initially thought it was possible to use downgrade attacks, I now think it is not.
- I briefly disabled RSA because it uses SHA1, this turned out to be a non-issue because we're signing SHA2 hashes.

You can see the [full list of changes][changelog] on github.
I promise not to use `git push -f`.

---

[snowden-docs]: <https://www.spiegel.de/international/germany/inside-the-nsa-s-war-on-internet-security-a-1010361.html>)  
[compat]: <http://ssh-comparison.quendi.de/comparison.html>  
[dh]: <https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange>  
[ecdh]: <https://en.wikipedia.org/wiki/Elliptic_curve_Diffie%E2%80%93Hellman>  
[forward-secrecy]: <https://en.wikipedia.org/wiki/Forward_secrecy>  
[dlp]: <https://en.wikipedia.org/wiki/Discrete_logarithm_problem>  
[libsshdoc]: <https://git.libssh.org/projects/libssh.git/tree/doc/curve25519-sha256@libssh.org.txt>  
[curve25519]: <https://cr.yp.to/ecdh.html>  
[rfc4253]: <https://www.ietf.org/rfc/rfc4253.txt>  
[dh-draft]: <https://tools.ietf.org/html/draft-ietf-curdle-ssh-modp-dh-sha2-09>  
[73release]: <https://www.openssh.com/releasenotes.html#7.3>  
[76release]: <https://www.openssh.com/releasenotes.html#7.6>  
[rfc4419]: <https://www.ietf.org/rfc/rfc4419.txt>  
[ed25519]: <https://ed25519.cr.yp.to/>  
[google-auth]: <https://github.com/google/google-authenticator/wiki/PAM-Module-Instructions>  
[totp]: <https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm>  
[otp]: <https://www.cl.cam.ac.uk/~mgk25/otpw.html>  
[pam]: <https://en.wikipedia.org/wiki/Pluggable_authentication_module>  
[nist-sucks]: <https://blog.cr.yp.to/20140323-ecdsa.html>  
[bullrun]: <https://projectbullrun.org/dual-ec/vulnerability.html>  
[ecdsa-same-k]: <https://security.stackexchange.com/a/46781>  
[ecdsa-sony]: <https://events.ccc.de/congress/2010/Fahrplan/attachments/1780%5F27c3%5Fconsole%5Fhacking%5F2010.pdf>  
[ae]: <https://en.wikipedia.org/wiki/Authenticated_encryption>  
[aes-gcm]: <http://blog.djm.net.au/2013/11/chacha20-and-poly1305-in-openssh.html>  
[useroaming]: <https://security.stackexchange.com/questions/110639/how-exploitable-is-the-recent-useroaming-ssh-problem>  
[grsec]: <https://grsecurity.net/>  
[tor-hs]: <https://www.torproject.org/docs/hidden-services.html.en>  
[sssh-wiki]: <https://github.com/stribika/stribika.github.io/wiki/Secure-Secure-Shell>  
[changelog]: <https://github.com/stribika/stribika.github.io/commits/master/_posts/2015-01-04-secure-secure-shell.md>  
[bug779880]: <https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=779880>  
[sloth]: <https://www.mitls.org/downloads/transcript-collisions.pdf>

<div style="font-size: 12px; text-align: center;">

<p>Network Pro&trade;, the shield logo, and the "Locking Down Networks&trade;" slogan are <a href="../../../../../legal/#trademark" target="_self">trademarks</a> of Network Pro Strategies.</p>

<p>Licensed under <a href="../../../../../legal/#cc-by" target="_self"><strong>CC BY 4.0</strong></a> and the <a href="../../../../../legal/#gnu-gpl" target="_self"><strong>GNU GPL</strong></a>, as published by the <a rel="noopener noreferrer" href="https://fsf.org" target="_blank">Free Software Foundation</a>, either version 3 of the License, or (at your option) any later version.</p>

</div>
