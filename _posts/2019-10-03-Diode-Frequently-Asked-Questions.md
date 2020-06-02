---
layout: post
title: Diode FAQ
date: 2020-05-23 16:00
categories: [Diode]
tags: [Diode, FAQ, Blockchain]
image: Diode_FAQ_Image.png
author: Yahsin Huang
---

<script>
    window.location.replace("https://github.com/diodechain/wiki/wiki/FAQs");
</script>


# This page was moved

## [Please click here for the most recent FAQ](https://github.com/diodechain/wiki/wiki/FAQs)

Below is the old version of the FAQ


<ul id="auto-table-of-contents">
</ul>

## General Questions

### What is Diode?

Diode is an integrated Blockchain implementation of the Web3, the server-less internet and the decentralized web, targeted primarily at enabling IoT devices. It was designed to address the security and infrastructure needs of device-driven connected applications.

![alt_text](images/blog/Best-R2.png "image_tooltip"){: .center-block }



### Where did the name "Diode" come from?

We went back and forth with a ton of different potential names. We wanted the name of the technology and network etc… to connote something that really small things could interact with, and something that was secure. We wanted it to have some sort of face value to both Blockchain and IoT folks. It was a small electrical component that is fundamental to all electrical systems, and the use of the letters in the word kind of made a acronym for “Distributed Interent Of DEvices”

With the Diode tech, now all sorts of apps/devices/systems can interact directly with a public blockchain - cell phones, laptops, Raspberry Pis, Arduinos, etc… can all interact as part of a decentralized Web3 ecosystem.


### What is a fleet contract?

A fleet contract is a smart contract that stores the identidies of clients (public keys) that have permissions to communicate. What is a smart contract? When we talk about smart contracts, we are not referring to legally binding contracts. A fleet contract is a smart contract; a smart contract is essentailly a set of instructions written in computer code that is stored on a blockchain.

A smart contract is a computer program, and smart contracts store data. The logic of smart contract is enforced by the full nodes involved; the data is kept by the full nodes. So in our context, this means that the full nodes running on Diode blockchain are storing all the data.

### What does a Diode's fleet contract do?
What a Diode’s fleet contract does is it manages the whitelist of idendities (public keys) of clients who can communicate with each other. It provides a number of functions to facilitate secure communications, including client registration, client deregistration, protected or private connections, and other functions.

### Is Diode something similar to IPFS?

IPFS is about static file storage - it does that really well. Diode is more of a streaming network - the Diode network doesn’t store information, it makes it available. One of the great things that Diode brings that we believe is unique is the ability for distributing dynamic content. One of our first proof of concepts was a Raspberry Pi streaming real-time video peer-to-peer over the Diode network with no centralized components. The Pi did the work to create the content and “source” the video, but the network handled the routing, permissions, and distribution.

IPFS and Diode are both needed for a decentralized web3. IPFS is a distributed file system that allows storing static content, while Diode network enables secure real-time end2end encrypted communication. What makes Diode unique is there are lots of interesting things you can do with Diode. In addition to files, Diode allows you to do live video streaming, chat applications, office applications where users get to modify their contents,... are some of the good examples illustrating real-time data streams possible applications.


### What can I do with Diode?

Diode is a new decentralized Internet for connected devices, also known as the Web 3. We are building upon the Web3 movement. Currently we are looking at serving a number of groups of users: makers, corporates, consumers, independent journalists/free speech activists.

As a Maker, you will be able to create server-less IoT devices. Your devices are securely reachable to you and your friends from anywhere in the world even if they are behind NATs or firewalls.

As a Corporate, you can create e2e secure device connections which are resistant to attacks to the three pillars of the Web1/2: DNS, PKI, BGP. Attackers, including government actors, will have no chance to launch man-in-the-middle (MITM) attacks on your IoT rollout.

As a Consumer, you can get full transparency on how your IoT devices are controlled and protect your privacy. There are no hidden server administrators anymore who have access to all your data.

As an Independent Journalist or a Free Speech Activist, you can broadcast your video streams through the Web3 uninterruptible to your audience no matter what country on the planet.


### What are some of the interesting applications that can be created on Diode?

You can build all kinds of Web3 applications on Diode. Here are some examples:

*   Decentralized IoT services such as video cameras that can stream or broadcast video data without the need for a central server.
*   Server-less IoT fleets that would not have any administrators that can spy on the IoT devices, but they would only be managed by transparent and auditable smart contracts.
*   Decentralized messaging apps that can send messages, data and tokens, and can’t be stopped.
*   Uncensorable websites that live in the Diode Network and are always reachable from everywhere.
*   Decentralized Friend to Friend File sharing services
*   Secure Network bridges and Blockchain controlled VPN, ([Blockchain Defined Networks BDN](https://diode.io/distributed-infrastructure/from-software-defined-networking-to-blockchain-defined-networking-19142/))


### There are several existing tools already pretty available to developers, helping them achieve the task of “demoing websites without deploying,” is it really necessary to do it with blockchain technology?

It is certainly not necessary, but there are advantages that we think will make this specific use case more attractive than the ones on the market today. Three of the immediate feature adds vs. other solutions are: you can publish content to a globally unique “domain” name of your choice, it's free, and if you want to limit access to just a few viewers, you can do that regardless of the IP they are on.

Because the tech is fully decentralized, it also has benefits for privacy.  If a person wanted to publish a website - as a dev tool for localhost development, or as a long term site - they can do so with the only information about the website (other than its content) being the Diode address (just like an ETH public address).  No ICANN registration, personal details, etc…. The fact that Web3/decentralized tech can stand toe-to-toe now with centralized tech in this, and other use cases, is a first. We wanted to prove this, and doing this as a proof-of-concept was so simple! The barrier to creating decentralized apps of this type is lower (in many ways) than centralized methods, and we believe will be much cheaper over time.


### How would you persuade software engineers and business leaders to assess the potential of Diode blockchain for their businesses?

The persuasion of software engineers and business leaders will be a road we have to travel. The word “blockchain”, frankly speaking, scares some people from industry. However, there are a growing number of developers who are not blockchain developers, but who are interested in blockchain. Because we can support the tech these people are used to working with blockchain, we believe these people will be early adopters and be one of the paths to mainstream adoption. We're very excited about bringing the blockchain and non-blockchain development worlds together - we have a way to go in terms of UX, but the fundamentals are there and will get stronger over time.


### What is your biggest unique proposition that puts you ahead of the competition?

The Diode Network is an implementation of a truly decentralized internet replacement. It builds on top of Ethereum as base technology but melds BlockQuick and Swarm like capabilities natively into the chain. 

*   Diode is the only Blockchain with super-light clients that:
    *   Works in Browsers
    *   Works on Mobile
    *   Works on Embedded Devices (RaspberryPi, Arduino, ESP32...)
*   Diode has an incentive model for Data traffic built-in



### How are we different from other existing blockchain protocols in the Web3 ecosystem?

We are seeing a number of players in the ecosystem doing some great work developing frameworks to build blockchains. But Diode has a different approach. Diode is a blockchain which empowers developers to build data applications on top and build a better Internet. If you want to compare Diode with other existing projects, the closest would be dat-protocol, Ethereum-Swarm, and IPFS.

The difference is, for instance, IPFS only works with pre-hashed files, so live-streaming and web conferencing for example, would not work. Diode, on the other hand, is a general network layer. It is designed to work for all kind of network applications.


### What are some of the possible applications for small-scale agriculture projects?

There are lots of things you can do with agriculture. The most straightforward application would be monitoring connected devices over the Diode Network. So, if you setup greenhouse monitoring on your Pi, then you can use the Diode Network to monitor and control your device securely anywhere in the world. You can even use the Diode gateway at "yourname" .diode.link to showcase your solution to everybody, without needing a server.


### Would it be something that runs on the router or on the person's computer in the future?

Absolutely, it could be routers in the future. In fact, that is one of our use cases that we are currently developing.


### How do I get started with Diode Chain?

As a Miner / Service Provider:
NOTE: Currently we are still working on fundamental changes regularly and would often restart the test network from scratch -- If you run a node, you will have to do the same or risk living on your own fork net.

To mine in the test network you can checkout the mining software from [https://github.com/diodechain/diode_server_ex](https://github.com/diodechain/diode_server_ex). Put it up on your server and start.

As a Maker with an embedded project:
We are currently working on a README to get started. Come October onboarding and getting your devices into the Web3 should be straight forward on our test network.

As a Code Contributor:
Check out our source code on Github [https://github.com/diodechain](https://github.com/diodechain). There is tons to do both in research and development. We’re working on publishing a list of tickets and tasks in the meantime. Contact us via Telegram group @diode_chain if you’re curious to help.


### How can Diode compete with IOTA?

IOTA is non-functional for IoT use cases apart from Demos and prototypes. It has at least two big problems:

1. IOTA doesn’t have smart contracts. This limits use cases to 0.1% of what is possible.
2. IOTA doesn’t run on 99% of IoT devices (runs only on luxury Cars with “real computers inside”)
    1. Minimal client hardware requirements for an IOTA node:
        1. 4+ GB of RAM
        2. 8+ GB of Storage
        3. Java 1.8.0_151 or higher.
    2. Light nodes do not exist -- They market a centralized RPC client as light node.

And one new problem: The old algorithm didn’t scale decentralized; it was centralized. IOTA is now in the middle of changing the core Consensus to “Coordicide”. This will mean any production deployments will have to wait until at least 2022.




## Technology

### Is Diode Chain a permissioned or permissionless blockchain?

Diode Chain is a permissionless, decentralized public blockchain which requires minimal computational power to join.


### What is BlockQuick?

Developed by the Diode team, [BlockQuick](https://diode.io/burning-platform-pki/blockquick-super-light-blockchain-client-for-trustless-time-19144/) is the first super light client protocol for Ethereum that addresses the issue of [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) and [eclipse attacks](https://diode.io/blockchain/how-blockquick-super-light-client-protocol-can-help-mitigate-eclipse-attacks-19161/). It is capable of preventing attacks because it doesn’t depend solely on choosing the longest chain with the highest difficulty on the Proof-of-Work (PoW) network when validating a block. Instead, it validates a block based on the so-called [Consensus Reputation Table](https://diode.io/blockquick/blockquick-consensus-reputation-table-explained-19182/).

BlockQuick super light client protocol is designed for anyone who hopes to connect IoT devices to public blockchains. Unlike the current full sync, fast sync, or light sync requirements (i.e. a full sync typically requires more than 200GB of disk storage), through BlockQuick the device only needs a handshake size of 20KB to establish the most recent block hash. The design enables a client to sync up to a recent block with a consensus reputation table.


### What is the difference between a full node, a light client, and a super light client?

In the Ethereum network, you have the option of running various types of nodes: full nodes, light clients, super-light clients. One of the key differences between a full node, a light client, and a super light client concerns the size of required storage to operate. For a full node, it requires hundreds of gigabytes of storage to operate (think more than 100GB). For a light client, it commonly requires less storage size (think a few gigabytes) to operate. For a super-light client, it only takes less than 100KB of storage to operate.

Below is an overview of the three node types with their storage requirements.

![alt_text](images/blog/FAQ-03.png "image_tooltip"){: .center-block }

Full nodes are typically run on servers in data-centers; they are commonly used for mining purposes. Light clients require less storage, but also offer less functionality as compared to running a full node. Light clients only need to download the block headers of the blockchain, and are designed for desktop and mobile wallet applications. The amount of data they have to store is much smaller, but still grows at the same pace as the blockchain itself.

Super light clients such as [Diode’s BlockQuick](https://diode.io/burning-platform-pki/blockquick-super-light-blockchain-client-for-trustless-time-19144/) require even less storage than light clients. Super light clients do not need to download every single block header for validation, and are designed for resource-constrained devices. As a result, super light clients can’t be used to monitor the blockchain in real time; instead, they read data periodically. 

A more detailed introduction of blockchain clients’ hardware requirements can be found in our [blog post](https://diode.io/iot/hardware-requirements-of-blockchain-clients-19196/).


### What is BlockQuick Reputation Table?

Consensus reputation table is a key security policy which BlockQuick adopts when validating a block. The consensus reputation table is constructed on each client based on the last known block headers in a given time frame. For instance, in a Proof-of-Work (PoW) system the client will be able to construct the consensus reputation table by reading 100 previous block headers from the last known state of the blockchain. All past block headers of the blockchain can be validated on the client using the parent block checksum alone. Thus, clients are able to fetch these block headers from untrusted nodes as the data can be validated using the existing block header and its contained parent block hash.


### If BlockQuick Consensus Reputation Table wants to keep the whole history of blockchain, wouldn’t it make the IoT device slower?

The BlockQuick consensus reputation table is not designed to keep the whole history of the blockchain. Instead, the reputation table is based on the last 100 block headers. Block headers are much smaller than the whole block and only requiring 100 of them means that even very small devices can store and process them. 


### How did BlockQuick decide to use 100 last blocks in the reputation table? Where did the number come from? Why not more, why not less?

The current proof of concept clients are working with consensus table sizes of 100. 

What we learned in Ethereum is that small miners are fluctuating a lot, while big miners stay for very long periods. So for the reputation table size, the question is how we can achieve the maximum consensus stability.

Factors influencing the size of the table:

Pro Small
*   Smaller tables mean fewer bytes to transport and store
*   Large/Infinite tables would collect "zombies"

Pro Big
*   Larger tables increase the cost of an attack
*   Variability vs Stability

### So every DNS change is stored into the blockchain, forever?

The question came from some comments from Hacker News ([https://news.ycombinator.com/item?id=20764104#20764865](https://news.ycombinator.com/item?id=20764104#20764865)) "So every DNS change is stored into the blockchain, forever? Will you have to download terabytes and terabytes of the blockchain in order to serve as a node? Why is that kind of audit history necessary?"

You don’t necessarily need to store DNS changes into the blockchain. The blockchain will only keep the current state and would prune the changes. According to Diode’s blog posts, 20kb of storage is all it needs with BlockQuick, the newly developed light-client protocol. The point is less about storing the audit history, but more about preventing Man-in-the-Middle attacks and solving the timestamp-certificate chicken-egg problem.

### If you can https/ssh Pi through the local network, why do you need Diode network?

SSH: If you’re not local, Diode is the only choice. (SSH is not using PKI) \
Usually nobody is checking the remote key - so Diode is better since you don’t have to.

HTTPS: Even if you’re local, there are security issues when using a self-signed certificate to accessing your Pi. 

### Why did you want to design edgeRPC? Why don’t you go for existing options such as  gRPC or JsonRPC?

At this stage, we use edgeRPC to allow nodes to interact with devices. We started out with ASN1 (like OpenSSL - super small binary format), and there is a chance that we would start using JsonRPC.

### Did you experience any “inconsistency issues” when using OpenSSL? For instance, the functions in OpenSSL could be different, such as the  function interface parameters could be different.

When choosing a secure communication channel, we looked at RLPx and TLS (OpenSSL). We decided to use OpenSSL, but forced it into using Secp256k1 to ensure both sides authenticate with their Eth wallet keys. But this means we are forcing OpenSSL to only accept Secp256k1 and self-signed certificates (self signed using the wallet key). 

OpenSSL does support Secp256k1. However, not all TLS libraries and clients support Secp256k1 at this time. So this can lead to connection issues when not using OpenSSL. We will be researching other libraries such as ARMmbed, wolfSSL, and SChannel for that matter.

### How are you guys using websocket?

The default Go client has a built-in capability to convert any binary TCP socket into a websocket. So, the Pi in the demo is simply publishing the raw video on port, and then the Go client is converting that into websocket frames.

### If you are using OpenSSL, does it mean you are using a CGo compiler?

Yes, we use CGo to call C functions.
