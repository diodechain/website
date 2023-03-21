---
layout: post
date: 2019-05-28 15:54
categories: [DPKI]
tags: [DPKI, PKI, Blockchain, Security, Distributed Infrastructure]
author: Yahsin Huang
image: dpki.jpg
---
If you’ve been following our blog, you will have heard us mentioning the term [decentralized public key infrastructure before](/burning-platform-pki/2019/03/20/decentralized-pki.html). But you probably don’t know what it is or how it works, let alone why it matters so much. In this post, we will examine current approaches to the traditional centralized PKI, explore the basics of decentralized public key infrastructure (DPKI), and then show how blockchain-based DPKI can make an impact as the industry transitions to the next generation of PKI.

**The Web PKI is Centralized**

In today’s world, the most commonly employed approach to public key infrastructures (PKIs) is the Web PKI. It’s a Certificate Authority (CA) based system that adopts a centralized trust infrastructure. Communications over the internet are secured through the safe delivery of public keys and the corresponding private keys. Third-parties such as CAs are responsible for facilitating the authentication and distribution of public keys. What a CA does is that it functions as a trusted third party that distributes and manages digital certificates for a network of users. Most web services are secured through the creation of the keys signed by CAs.

**Problems with Centralized PKIs**

The centralized PKIs such as the CA-based system has its problems and limitations generally because it relies on a central trusted party. In a centralized PKI system, you don’t get to choose your own online identity; instead, your identity is defined by trusted third parties the CAs, sometimes private companies and sometimes governments. This is a big problem because it leaves the door open for attackers to conduct MITM (Man-in-the-Middle) attacks. There are different forms of MITM attacks - ARP spoofing, IP spoofing, DNS spoofing, HTTPS spoofing, and Man in the Browser (MITB), and more. Numerous incidents have already shown that you can increase the risk of MITM attacks when you place too much trust in CAs. 

In practice, attackers can trick the CA into thinking they are someone else, or they can go so far as to compromise the CA to get it to issue a rogue certificate. For instance, [the DigiNotar incident](https://www.theguardian.com/technology/2011/sep/05/diginotar-certificate-hack-cyberwar) that happened in 2011 when fraudulent certificates from the Dutch certificate authority company were issued as a result of an attack. As described in a previous [blog post](/burning-platform-pki/2019/03/20/decentralized-pki.html), another incident happened in 2017 where hackers took control of [Brazilian banks](https://www.wired.com/2017/04/hackers-hijacked-banks-entire-online-operation/) DNS server and tricked a CA into issuing a valid certificate to them.

The Internet Engineering Task Force (IETF) responsible for Web PKI itself has [created a memorandum describing current issues of PKI](https://tools.ietf.org/html/draft-iab-web-pki-problems-01#section-3.2.1); independently, a group of researchers around Rebooting the Web of Trust including Vitalik Buterin assessed its weaknesses in their [publications](https://danubetech.com/download/dpki.pdf), all agreeing that the current implementation of Web PKI is broken. The out-of-date PKI design poses high security risks because a single point of failure can be used to open any encrypted online communication. Centralized PKI systems are struggling to keep up with the evolving digital landscape; the modern world is desperate for a better designed, decentralized approach to PKIs.

**Decentralized PKI (DPKI)**

Decentralized Public Key Infrastructure, or DPKI, is an alternative approach to designing better PKI systems. Pretty Good Privacy (PGP), an encryption program developed by Phil Zimmermann, is a decentralized trust system that was created when blockchain didn’t exist. It has issues with establishing trust relations between all parties. But today there is no need for the third-parties. Blockchain is a novel approach to build a more competent, secure PKI system.

But how blockchain is going to improve PKI? In decentralized PKI, blockchain acts as a decentralized key-value storage. It is capable of securing the data read to prevent MITM attacks, and to minimize the power of third parties. By bringing the power of blockchain technology to the systems, DPKI resolves the issues with traditional PKI systems. The decentralized nature of the management framework can tackle the problems with the CA systems through certificate revocation, eliminating single points of failure, and reacting fast to misuses of CAs. Blockchain is able to make the process transparent, immutable, and prevent attackers from breaking in, thus effectively avoiding the MITM attacks.

As a group of Rebooting the Web of Trust researchers (including Christopher Allen, Vitalik Buterin) have explored in a 2015 publication titled “[Decentralized Public Key Infrastructure](https://danubetech.com/download/dpki.pdf),” the authors pointed out that unlike the traditional approach, DPKI ensures that no single third-party can compromise the integrity and security of the system as a whole. In blockchain-powered DPKI, the new third parties become miners or validators. The trust is established and maintained based on consensus protocols. Third-parties, the miners or validators, will have to follow the rules of the protocol, that would financially reward and punish these third-parties to effectively preventing misbehavior in the blockchain and limiting their roles.

<blockquote>

“Trust is decentralized through the use of technologies that make it possible for geographically and politically disparate entities to reach consensus on the state of a shared database,” the authors wrote in the 2015 paper, “blockchains allow for the assignment of arbitrary data such as public keys to these identifiers and permit those values to be globally readable in a secure manner that is not vulnerable to the MITM attacks that are possible in PKIX.”

</blockquote>

Furthermore, researchers argued that the logic of key management can be implemented on smart contract of blockchain, and “[Privacy based decentralized Public Key Infrastructure (PKI) implementation using Smart contract in Blockchain](https://isrdc.iitb.ac.in/blockchain/workshops/2017-iitb/papers/paper-11%20-%20Decentralized%20PKI%20in%20blockchain%20and%20Smart%20contract.pdf)” by Sivakumar P and Dr. Kunwar Singh published in 2017 had successfully implemented it.

Nevertheless, blockchain is not perfect yet because it requires a device to synchronize a full copy of consensus data. Today’s Geth (Go-Ethereum) client provides multiple types of sync mode: full sync, fast sync, light sync. The following table is a comparison of different types of sync mode, trust model, bandwidth, and duration for Geth, FlyClient, [BlockQuick](/files/blockquick.pdf), traditional Web PKI client.


<div style="overflow: auto"><table>
  <tr>
   <th>Node Type</th>
   <th>Trust Model</th>
   <th>Bandwidth</th>
   <th>Duration</th>
  </tr>
  <tr>
   <th>geth --syncmode=full</th>
   <td>Decentralized</td>
   <td>~400GB</td>
   <td>days</td>
  </tr>
  <tr>
   <th>geth --syncmode=fast</th>
   <td>Decentralized</td>
   <td>~130GB</td>
   <td>hours</td>
  </tr>
  <tr>
   <th>geth --syncmode=light</th>
   <td>Decentralized</td>
   <td>~1.2GB</td>
   <td>minutes</td>
  </tr>
  <tr>
   <th>FlyClient</th>
   <td>Decentralized</td>
   <td>~500kb</td>
   <td>seconds</td>
  </tr>
  <tr>
   <th>BlockQuick</th>
   <td>Decentralized</td>
   <td>~20kb</td>
   <td>sub-seconds</td>
  </tr>
  <tr>
   <th>Trad. Web PKI Client</th>
   <td>Centralized</td>
   <td>~5kb</td>
   <td>sub-seconds</td>
  </tr>
</table></div>


As the table shows, a standard sync of Geth client takes up to 400GB of your disk - that’s a huge user experience downgrade, compared to a traditional Web PKI client’s ~5kb size that is needed for a standard TLS certificate handshake. In addition, 400GB raises a bar too high for IoT devices that are generally resource-constrained with limited computing power.

This is where Diode comes into play. The Diode team is dedicated to establish decentralized trust at a never-before-seen low bandwidth. We have developed a prototype of [BlockQuick](https://eprint.iacr.org/2019/579.pdf) - a super light client protocol - that dramatically reduces the time and disk space for synchronization. The DPKI infrastructure we designed aims to provide the kind of framework that will enable developers to get started quickly - for instance, to enable developers to quickly launch their Arduino fleets.
