---
layout: post
date: 2019-07-29 15:00
categories: [Blockchain]
tags: [Blockchain, DPKI, PKI, Decentralization, Security]
author: Yahsin Huang
image: MITM-DPKI-feature.jpg
imageclass: top
---

Picture this: you’re sitting in a coffee shop with your laptop, and find yourself trying to connect to the internet, like most people, using a public wifi connection provided by the coffee shop. Wouldn’t it be nice to book a hotel room over the weekend, you ask your partner?

You click on an online reservation website, search for a hotel room to book, and you’re looking forward to the vacation. You may not be aware that the corner sits a stranger using a laptop spoofing the public wifi connections. This is a common cyber attack scenario known as [Man-In-The-Middle (MITM) attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

A MITM attack is when an attacker intercepts a communication between the two parties. Your personal data such as your credit card numbers and your social media user login credentials can easily be intercepted if not properly protected in a MITM attack.

[KRACK attack](https://en.wikipedia.org/wiki/KRACK), for example, is one of the many tricks an attacker can use to perform a MITM attack. It targets WPA2, a protocol used to secure wireless networks that is commonly used in coffee shops. This type of attack allows an attacker to get into the network, and from there the attacker can use [ARP spoofing](https://en.wikipedia.org/wiki/ARP_spoofing) to intercept, alter, and resend your message between your laptop and the Wi-Fi router.

Today what is protecting you from the MITM attack is [PKI](https://en.wikipedia.org/wiki/Public_key_infrastructure), or Public Key Infrastructure. Whenever you visit a webpage you interact with the web PKI. PKI is the underlying infrastructure for the management of public keys used in digital certificates. One of the key components of a PKI system are [certificate authorities](https://en.wikipedia.org/wiki/Certificate_authority) (CAs). There are about [3,800](https://censys.io/certificates?q=validation.nss.valid%253A+true+AND+parsed.extensions.basic_constraints.is_ca%253A+true) authoritative certificates around the world today, and the number is still growing. A certificate authority is responsible for issuing digital certificates within the PKI framework.


![alt_text](/images/blog/MITM-DPKI1.png "image_tooltip"){: .center-block }


When you connect to your website using HTTPS, there’s a green padlock icon located at the start of the URL bar. If you click on the padlock icon, you can view the certificate details. Behind the scene, your web browser verifies the authenticity of the webpage data with a pre-installed list of trusted digital certificates issued by the certificate authorities. These digital certificates are responsible for protecting information and securing online communication.

**Why the current PKI is not enough**

The above scheme looks unbreakable, but it's in fact vulnerable! The problem is that it relies on trust of a certificate authority. Many attack incidents have successfully exploited the type of vulnerability. For instance, in 2017 an [incident](https://www.wired.com/2017/04/hackers-hijacked-banks-entire-online-operation/) occured when attackers took control of Brazilian banks DNS server and tricked a certificate authority into issuing a valid certificate to them.

The centralized trust model employed in the current PKI is the fundamental problem that needs to be solved. To minimize the trust of centralized parties, we need to change our mindset from a centralized model to a decentralized model. This is when blockchain comes into play.

**Blockchain as Decentralized PKI**

Research has shown that it is possible to implement blockchain as decentralized PKI - a more innovative approach to the current PKI. In 2015, Allen et al. have explored the concept in a publication “[Decentralized Public Key Infrastructure](https://danubetech.com/download/dpki.pdf)”. The researchers suggested that unlike the traditional centralized approach to PKI, decentralized PKI ensures no single third-party - now the miners or validators - can compromise the integrity and security of the system as a whole.

The benefit of decentralized PKI is that it can use blockchain as a decentralized key-value storage that is capable of securing the data read and also prevent MITM attacks. Furthermore, blockchain-based decentralized PKI has the ability to minimize the power of third parties; thus, it resolves the issues with traditional, centralized PKI.

But there’s a potential downside - in order to make blockchain work, you need to download a full copy of chain data. The key challenge is how to reduce the size of data to download while not losing the security too much. This is one of the main reasons why we're not using blockchain as DPKI now. Nonetheless, we've seen several projects that are already experimenting with different approaches to solve this particular issue.

Proposed by Benedikt Bünz in 2018, [FlyClient](https://eprint.iacr.org/2019/226.pdf) hopes to build a super-light client in the Ethereum network. Their protocol reduces the needed download data size by downloading only a logarithmic amount of block headers for validation. More recently, the [Diode](https://diode.io) team has developed a prototype of [BlockQuick](https://diode.io/burning-platform-pki/blockquick-super-light-blockchain-client-for-trustless-time-19144/) - a super-light client protocol. BlockQuick requires only 20KB of data to validate the blockchain. Its traffic is small enough for tiny microcontrollers to process. It establishes decentralized trust at a low bandwidth while at the same time providing resistance to [Eclipse attacks](https://diode.io/blockchain/how-blockquick-super-light-client-protocol-can-help-mitigate-eclipse-attacks-19161/) and MITM attacks.

**Conclusion**

The nature of decentralization gives blockchain an edge over traditional PKI systems. As blockchain technology is expected to flourish over the next few years, the world will be seeing more innovation coming out from the startup community in Asia and across the globe. By leveraging the power of blockchain technology, developers and entrepreneurs will be able to create the next generation of PKI that would impact every aspect of the industry. Stay connected! Follow us on Twitter and our website.