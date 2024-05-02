---
layout: post
date: 2019-06-24 10:02
categories: [Security]
tags: [Security, Blockchain]
author: Yahsin Huang
image: BGP0.jpg
redirect_from:
- /security/why-the-internet-infrastructure-is-vulnerable-to-bgp-hijacking-attacks-19175/
---

Earlier this month, Doug Madory, Oracle’s director of internet analysis, wrote in a [blog post](https://blogs.oracle.com/internetintelligence/large-european-routing-leak-sends-traffic-through-china-telecom) detailing a BGP route leak incident happened on Thursday, June 6. For approximately two hours, a massive amount of European Internet traffic was rerouted through China Telecom’s own servers. The Internet traffic was rerouted following a BGP route leak at Swiss data center collocation company Safe Host. Over 70,000 routes - comprising an estimated 368 millions IP addresses coming out of Europe - from its internal routing table had been leaked, and subsequently had been rerouted to the Chinese internet service provider (ISP).

Simply put, what happened was the internet traffic that was meant for European mobile networks was rerouted through China Telecom’s network. While some people may think that maybe it’s because they are using Chinese-brand mobile phones; however, the security issue at stake is not so much about what kind of phone you use, but more about how carrier companies are handling routing of the bulk of internet traffic from any mobile device. In fact, any device that comes with a SIM card can be affected. This includes 3G-enabled iPads, industrial devices, as well as cars and vehicles that use 3G or 4G for communication.

During those two hours of rerouting Internet traffic coming from Europe to Chinese servers, the affected 368 million IP addresses that passed through China could potentially be monitored by the Chinese. This means that China was able to read all of the Internet traffic during this time period. According to the analysis, the mobile phone traffic of Swisscom, KPN of Holland, and Bouygues Telecom and Numericable-SFR of France had passed through China. So, if you have a Swisscom mobile contract and you surf the web during the affected period, your Internet traffic goes to Chinese servers. The implication is all your online activities then become visible to the Chinese ISP, including the websites you visited, your banking and your social media online activities, your emails, etc.

### What is BGP?

The above-mentioned incident is known as [Border Gateway Protocol (BGP) leak or hijacking](https://en.wikipedia.org/wiki/BGP_hijacking). (It’s unclear whether the incident was a BGP hijack - that it was done with malicious intent - or an unintentional leak at this stage.) To understand a BGP hijack, we need to know some basics of the BGP. [The Border Gateway Protocol (BGP)](https://en.wikipedia.org/wiki/Border_Gateway_Protocol) is the protocol used throughout the Internet to exchange routing and reachability information among [autonomous systems (AS)](https://en.wikipedia.org/wiki/Autonomous_system_(Internet)) on the Internet. It’s a unique language spoken by routers on the Internet to decide how packets should be sent from one router to another among networks.

As defined in [RFC 4271](https://tools.ietf.org/html/rfc4271), a Border Gateway Protocol (BGP-4), an autonomous system (AS) is “a set of routers under a single technical administration, using an interior gateway protocol (IGP) and common metrics to determine how to route packets within the autonomous system, and using an inter-autonomous system routing protocol to determine how to route packets to other autonomous systems”.

What that means is it’s a group of networks that operate under a routing policy and it owns IP prefixes. The prefixes are individual IP addresses which are grouped together. Safe Host, China Telecom, AT&T, and Verizon each are an autonomous system. The routing tables between autonomous systems are maintained using the BGP. If the autonomous system is also an Internet Service Provider (ISP), as in the European traffic rerouting case mentioned above where China Telecom is the AS and also the ISP, it could assign some of the individual IP addresses it manages to customers.

### What is a BGP route leak? A BGP hijack?

A BGP route leak is when BGP is used to reroute network traffic at the ISP level by accident. Defined by the Internet Engineering Task Force (IETF), a [BGP route leak](https://www.rfc-editor.org/rfc/rfc7908.txt) is “the propagation of routing announcement(s) beyond their intended scope. That is, an announcement from an Autonomous System (AS) of a learned BGP route to another AS is in violation of the intended policies of the receiver, the sender, and/or one of the ASes along the preceding AS path.”

[BGP hijacking](https://en.wikipedia.org/wiki/BGP_hijacking) is a type of cybersecurity incident which is essentially a targeted attack against the interconnections between different Internet routing entities typically referred to by Autonomous System Numbers (ASNs). When as autonomous system announces a route to IP prefixes that it does not own, it can be added to the routing tables in BGP routers across the Internet.

BGP hijacks are when attackers announce a route in the network they do not own. It’s when the Internet traffic was maliciously rerouted. Attackers can intentionally announce ownership of IP prefixes that they do not own. In most cases, configuration errors are the main cause of a BGP hijack. A critical BGP protection mechanism is the routing prefix filtering. It allows network administrators to filter out undesirable or illegal prefixes in the routing table. A BGP hijack is much like if someone were to change out the traffic signs and reroute the traffic.

### Blockchain as decentralized Internet infrastructure

One of the major challenges the BGP faces is it’s inherently built on trust. In other words, the BGP is inherently vulnerable to the propagation of illegitimate routes because it wasn’t designed with security built into it. The route advertisements are generally trusted among ISPs. As a result, the Internet is vulnerable to propagating all sorts of incorrect routes. Because there is no built-in mechanism for making sure that ASs are actually do own the prefixes that they advertise.

The fact that the protocol doesn’t include security mechanisms and that it’s largely based on the trust between network operators worries a lot of people. Attackers could affect the routing tables used by the BGP with a high success rate. It’s no exaggeration to say that the world isn’t yet in a position to entirely prevent BGP hijacking from occurring. Many security researchers are increasingly concerned with BGP vulnerabilities and a lack of improvements towards the current global routing system.

Just last month, an [incident](https://www.manrs.org/2019/05/public-dns-in-taiwan-the-latest-victim-to-bgp-hijack/) of BGP hijack occurred where traffic going through a public DNS run by the Taiwan Network Information Center (TWNIC) was rerouted to an entity in Brazil for about three and a half minutes. The current Internet routing infrastructure security protection condition is in such a bad shape that BGP hijacks are going to happen again and again if we continue to ignore the reality of the present-day Internet security.

Further, due to the centralized nature of the current Internet routing infrastructure, it’s vulnerable to BGP hijacking attacks and many other types of attacks. That’s why we want to swing back to creating a new Internet infrastructure that is governed by open, transparent, decentralized peer-to-peer networks. This has only recently become possible, thanks to technologies arising from blockchains.

Unlike a traditional centralized routing network infrastructure with central servers around, a blockchain which acts as the decentralized web infrastructure could remove the need for central servers, eliminates the certificate authority as the third-party intermediary, and offer strong trust guarantees with its cryptographic designs rooted in the system. Major browser companies such as Google Chrome and Mozilla Firefox are aware of the benefits of blockchain but are reluctant to build extensions that will bring positive change even to this day.

Fortunately, some of the participants in building new decentralized DNS models, such as [Handshake](https://handshake.org/), [Ethereum Name Service (ENS)](https://ens.domains/), and [Diode](https://diode.io/) have proposed that we look at network infrastructure from a decentralized point of view. Diode is developing a blockchain-based [decentralized PKI](/dpki/how-decentralized-public-key-infrastructure-will-be-the-future-for-the-web-19148/) for resource constrained devices. The system is implemented with a new super-light client protocol for Ethereum called [BlockQuick](/burning-platform-pki/blockquick-super-light-blockchain-client-for-trustless-time-19144/).

In this blog post, we covered recent BGP hijacking incidents, explained some basics of BGP, what a BGP hijack is, and described how the blockchain model can help us progress towards a complete, decentralized new internet infrastructure. Diode hopes to keep you updated so that you will be able to respond quickly when new opportunities arise. So stay tuned! Follow us on Twitter: [https://twitter.com/diode_chain](https://twitter.com/diode_chain), our website: [https://diode.io/](https://diode.io/). Stay up-to-date and subscribe to our newsletter.
