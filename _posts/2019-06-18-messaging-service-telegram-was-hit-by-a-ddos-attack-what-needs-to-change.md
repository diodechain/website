---
layout: post
date: 2019-06-18 16:07
title: "Messaging Service Telegram Was Hit By a DDoS Attack, What Needs to Change?"
categories: [Security]
tags: [Security, Web3, Blockchain]
author: Yahsin Huang
image: Telegram-DDoS.jpg
redirect_from:
- /security/messaging-service-telegram-was-hit-by-a-ddos-attack-what-needs-to-change-19169/
---

According to a [report](https://www.reuters.com/article/us-telegram-cyber/messaging-service-telegram-ceo-points-to-china-as-likely-origin-of-cyber-attack-idUSKCN1TE0S5), Telegram's CEO Pavel Durov confirmed on Wednesday (June 12) that his popular messaging service experienced a “powerful” Distributed Denial-of-Service (DDoS) attack. The DDoS attack disrupted Telegram’s services for about an hour. He later [tweeted](https://twitter.com/durov/status/1138942773430804480) that the IP addresses involved in the attack were coming mostly from China.

“IP addresses coming mostly from China. Historically, all state actor-sized DDoS (200-400 Gb/s of junk) we experienced coincided in time with protests in Hong Kong (coordinated on Telegram). This case was not an exception.”

[DDoS](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) is a type of cyber attack which usually targets websites and online services. The attackers want to overwhelm them with more traffic than the server can accommodate and thereby making the website or the service inoperable. DDoS attacks are often accomplished through a network of bots. These remotely controlled bots can form a “botnet” that can be launched for attacks. Your IoT device may be part of a botnet, your computer can also be hacked and become a bot, without you knowing it.

So, you may wonder, what needs to change? Today’s modern internet infrastructure is based on a centralized [client-server model](https://en.wikipedia.org/wiki/Client–server_model). Unfortunately, there are problems with centralized client-server model that remain to be solved. For instance, online contents such as Telegram’s text messages, videos, pictures will need to be hosted on dedicated servers. Not just Telegram, but currently most social media platforms are storing their contents and data on their private, centralized servers. This means that these tech firms will need to ensure their servers and resources can satisfy the overall demand. Another problem is the cost of maintaining central servers to serve all users is high. Further, the risk of centralized attacks like the one Telegram experienced is also extremely high.

Thanks to [blockchain](https://en.wikipedia.org/wiki/Blockchain) technologies, for the first time we are able to realize [a decentralized model](/dpki/how-decentralized-public-key-infrastructure-will-be-the-future-for-the-web-19148/) in the modern Internet infrastructure. The decentralized web would not use centralized servers; instead, it would use blockchain and thereby adopting a model of a [peer-to-peer](https://en.wikipedia.org/wiki/Peer-to-peer) infrastructure of nodes.

With blockchain, instead of having centralized host servers serving all users, data is shared on public blockchains such as Bitcoin and Ethereum which are largely decentralized. In a decentralized peer-to-peer network, blockchain functions as a distributed data storage; its serverless, decentralized nature could significantly reduce the security risks that were previously impossible to avoid in centralized systems.

This is what Diode is trying to do. We want to replace centralized client-server systems through blockchain technologies. The Diode team has developed a prototype of [BlockQuick](/burning-platform-pki/blockquick-super-light-blockchain-client-for-trustless-time-19144/), a super light client protocol, that dramatically reduces the time and disk space for synchronization. Last month, Diode’s CTO [Dominic Letz](https://twitter.com/dominicletz) has published a [paper](https://eprint.iacr.org/2019/579.pdf) detailing what BlockQuick is and how it works.

You can join conversations on Ethereum Magicians forum discussions under the [constrained resource client ring](https://ethereum-magicians.org/c/working-groups/constrained-resource-client-ring). Follow our website, Twitter and Telegram group to learn more!
