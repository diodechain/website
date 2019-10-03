---
layout: post
date: 2019-10-03 10:30
categories: [Diode]
tags: [Diode, FAQ, Diode Network, Diode Chain, Blockchain, BlockQuick, DPKI, Ethereum]
author: Yahsin Huang
image: FAQ-1.jpg
---

Below is a list of the most common questions about Diode and how to get the most out of our network. It includes all frequently asked questions about our decentralized blockchain for Internet-of-Things devices. 

Additionally, you have a chance to be among the first to learn about the details of our blockchain-based decentralized PKI for IoT devices. [Presentation slides](https://github.com/diodechain/presentations) discussing the vision of decentralized PKI and Diode Network are now publicly available on Github. A more detailed technical description can be found in our [BlockQuick paper](https://diode.io/burning-platform-pki/blockquick-super-light-blockchain-client-for-trustless-time-19144/). 

We will be starting a series of video tutorials and workshops teaching the basics of how to use the Diode Network. DM us on [Twitter](https://twitter.com/diode_chain) if you want to share your thoughts. We look forward to hearing from you!


# Frequently Asked Questions (FAQs)

# Q: What is Diode?

Diode is an integrated Blockchain implementation of the Web3, the server-less internet and the decentralized web, targeted primarily at enabling IoT devices. It was designed to address the security and infrastructure needs of device-driven connected applications.

![alt_text](/images/blog/Best-R2.png "image_tooltip"){: .center-block }

# Q: Where did the name Diode come from? 

Diodes are embedded components that conduct electric current primarily in one direction. This one-directionality we think matches the immutability of the blockchain technology. Things that get written can never be changed. It is a kind of one way as well. At the same time, “Diode” reminds us of the fact that this Blockchain Network we built is primarily targeting deployment on small embedded IoT devices. A diode is a minimalistic yet hugely important component, in the same way the Diode Network needs to stay lean and minimalistics to work on tiny devices.

Diode stands for Decentralized Internet of Devices in addition to the above-mentioned reference.


# Q: What is your biggest unique proposition that puts you ahead of the competition?

The Diode Network is an implementation of a truly decentralized internet replacement. It builds on top of Ethereum as base technology but melds BlockQuick and Swarm like capabilities natively into the chain. 

*   Diode is the only Blockchain with super-light clients that:
    *   Works in Browsers
    *   Works on Mobile
    *   Works on Embedded Devices (RaspberryPi, Arduino, ESP32...)
*   Diode has an incentive model for Data traffic built-in
    

# Q: What can I do with Diode?

Diode is a new decentralized Internet for connected devices, also known as the Web 3. We are building upon the Web3 movement. Currently we are looking at serving a number of groups of users: makers, corporates, consumers, independent journalists/free speech activists.

As a **Maker** you will be able to create server-less IoT devices. Your devices are securely reachable to you and your friends from anywhere in the world even if they are behind NATs or firewalls.

As a **Corporate** you can create e2e secure device connections which are resistant to attacks to the three pillars of the Web1/2: DNS, PKI, BGP. Attackers, including government actors, will have no chance to launch man-in-the-middle (MITM) attacks on your IoT rollout.

As a **Consumer** you can get full transparency on how your IoT devices are controlled and protect your privacy. There are no hidden server administrators anymore who have access to all your data.

As an **Independent Journalist / Free Speech Activist** you can broadcast your video streams through the Web3 uninterruptible to your audience no matter what country on the planet.


# Q: What are some of the interesting applications that can be created on Diode Chain?

You can build all kinds of Web3 applications on Diode Chain. Here are some examples:

*   Decentralized IoT services such as video cameras that can stream or broadcast video data without the need for a central server.
*   Server-less IoT fleets that would not have any administrators that can spy on the IoT devices, but they would only be managed by transparent and auditable smart contracts.
*   Decentralized messaging apps that can send messages, data and tokens, and can’t be stopped.
*   Uncensorable websites that live in the Diode Network and are always reachable from everywhere.
*   Decentralized Friend to Friend File sharing services
*   Secure Network bridges and Blockchain controlled VPN, ([Blockchain Defined Networks BDN](https://diode.io/distributed-infrastructure/from-software-defined-networking-to-blockchain-defined-networking-19142/))



# Q: How do I get started with Diode Chain?

**As a Miner / Service Provider:**

**NOTE:** Currently we’re still working on fundamental changes regularly and often restart the test network from scratch -- If you run a node, you’ll have to do the same or risk living on your own fork net.

To mine in the test network you can checkout the mining software from [https://github.com/diodechain/diode_server_ex](https://github.com/diodechain/diode_server_ex). Put it up on your server and start.

**As a Maker with an embedded project: **

We are currently working on a README to get started. Come October onboarding and getting your devices into the Web3 should be straight forward on our test network.

**As a Code Contributor:**

Check out our source code on Github [https://github.com/diodechain](https://github.com/diodechain). There is tons to do both in research and development. We’re working on publishing a list of tickets and tasks in the meantime. Contact us via Telegram group @diode_chain if you’re curious to help.


# Q: How can Diode compete with IOTA?

IOTA is non-functional for IoT use cases apart from Demos and prototypes. It has at least two big problems:

1. IOTA doesn’t have smart contracts. This limits use cases to 0.1% of what is possible.
2. IOTA doesn’t run on 99% of IoT devices (runs only on luxury Cars with “real computers inside”)
    1. Minimal client hardware requirements for an IOTA node:
        1. 4+ GB of RAM
        2. 8+ GB of Storage
        3. Java 1.8.0_151 or higher.
    2. Light nodes do not exist -- They market a centralized RPC client as light node.

And one new problem: The old algorithm didn’t scale decentralized; it was centralized. IOTA is now in the middle of changing the core Consensus to “Coordicide”. This will mean any production deployments will have to wait until at least 2022.


# Q: Is Diode Chain a permissioned or permissionless blockchain?

Diode Chain is a permissionless, decentralized public blockchain which requires minimal computational power to join.


# Q: What is BlockQuick?

Developed by the Diode team, [BlockQuick](https://diode.io/burning-platform-pki/blockquick-super-light-blockchain-client-for-trustless-time-19144/) is the first super light client protocol for Ethereum that addresses the issue of [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) and [eclipse attacks](https://diode.io/blockchain/how-blockquick-super-light-client-protocol-can-help-mitigate-eclipse-attacks-19161/). It is capable of preventing attacks because it doesn’t depend solely on choosing the longest chain with the highest difficulty on the Proof-of-Work (PoW) network when validating a block. Instead, it validates a block based on the so-called [Consensus Reputation Table](https://diode.io/blockquick/blockquick-consensus-reputation-table-explained-19182/).

BlockQuick super light client protocol is designed for anyone who hopes to connect IoT devices to public blockchains. Unlike the current full sync, fast sync, or light sync requirements (i.e. a full sync typically requires more than 200GB of disk storage), through BlockQuick the device only needs a handshake size of 20KB to establish the most recent block hash. The design enables a client to sync up to a recent block with a consensus reputation table.


# Q: What is the difference between a full node, a light client, and a super light client?

In the Ethereum network, you have the option of running various types of nodes: full nodes, light clients, super-light clients. One of the key differences between a full node, a light client, and a super light client concerns the size of required storage to operate. For a full node, it requires hundreds of gigabytes of storage to operate (think more than 100GB). For a light client, it commonly requires less storage size (think a few gigabytes) to operate. For a super-light client, it only takes less than 100KB of storage to operate.

Below is an overview of the three node types with their storage requirements.

<table>
  <tr>
   <td><strong>Node Type</strong>
   </td>
   <td><strong>Network</strong>
   </td>
   <td><strong>Client Implementation</strong>
   </td>
   <td><strong>Storage Required</strong>
   </td>
  </tr>
  <tr>
   <td>Full node
   </td>
   <td>Ethereum
   </td>
   <td>Geth -- sync mode = fast sync
   </td>
   <td>140GB
   </td>
  </tr>
  <tr>
   <td>Light client
   </td>
   <td>Ethereum
   </td>
   <td>Geth -- sync mode = light sync
   </td>
   <td>1.2GB
   </td>
  </tr>
  <tr>
   <td>Super-light client
   </td>
   <td>Ethereum
   </td>
   <td>BlockQuick
   </td>
   <td>20KB
   </td>
  </tr>
</table>


Full nodes are typically run on servers in data-centers; they are commonly used for mining purposes. Light clients require less storage, but also offer less functionality as compared to running a full node. Light clients only need to download the block headers of the blockchain, and are designed for desktop and mobile wallet applications. The amount of data they have to store is much smaller, but still grows at the same pace as the blockchain itself.

Super light clients such as [Diode’s BlockQuick](https://diode.io/burning-platform-pki/blockquick-super-light-blockchain-client-for-trustless-time-19144/) require even less storage than light clients. Super light clients do not need to download every single block header for validation, and are designed for resource-constrained devices. As a result, super light clients can’t be used to monitor the blockchain in real time; instead, they read data periodically. 

A more detailed introduction of blockchain clients’ hardware requirements can be found in our [blog post](https://diode.io/iot/hardware-requirements-of-blockchain-clients-19196/).


# Q: What is BlockQuick Reputation Table? 

Consensus reputation table is a key security policy which BlockQuick adopts when validating a block. The consensus reputation table is constructed on each client based on the last known block headers in a given time frame. For instance, in a Proof-of-Work (PoW) system the client will be able to construct the consensus reputation table by reading 100 previous block headers from the last known state of the blockchain. All past block headers of the blockchain can be validated on the client using the parent block checksum alone. Thus, clients are able to fetch these block headers from untrusted nodes as the data can be validated using the existing block header and its contained parent block hash.


# Q: If BlockQuick Consensus Reputation Table wants to keep the whole history of blockchain, wouldn’t it make the IoT device slower? 

The BlockQuick consensus reputation table is not designed to keep the whole history of the blockchain. Instead, the reputation table is based on the last 100 block headers. Block headers are much smaller than the whole block and only requiring 100 of them means that even very small devices can store and process them. 


# Q: How did BlockQuick decide to use 100 last blocks in the reputation table? Where did the number come from? Why not more, why not less?

The current proof of concept clients are working with consensus table sizes of 100. 

What we learned in Ethereum is that small miners are fluctuating a lot, while big miners stay for very long periods. So for the reputation table size, the question is how we can achieve the maximum consensus stability. Keeping big miners 

Factors influencing the size of the table:

Pro Small

*   Smaller tables mean fewer bytes to transport and store
*   Large/Infinite tables would collect "zombies"

Pro Big

*   Larger tables increase the cost of an attack
*   Variability vs Stability

# Q: So every DNS change is stored into the blockchain, forever? 
# Based on some comments from Hacker News ([https://news.ycombinator.com/item?id=20764104#20764865](https://news.ycombinator.com/item?id=20764104#20764865)) So every DNS change is stored into the blockchain, forever? Will you have to download terabytes and terabytes of the blockchain in order to serve as a node? Why is that kind of audit history necessary?

You don’t necessarily need to store DNS changes into the blockchain. The blockchain will only keep the current state and would prune the changes. According to Diode’s blog posts, 20kb of storage is all it needs with BlockQuick, the newly developed light-client protocol. The point is less about storing the audit history, but more about preventing Man-in-the-Middle attacks and solving the timestamp-certificate chicken-egg problem.