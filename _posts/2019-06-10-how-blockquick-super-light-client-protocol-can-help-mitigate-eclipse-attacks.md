---
layout: post
date: 2019-06-10 14:24
categories: [Blockchain]
tags: [Blockchain, Eclipse Attack, Security]
author: Yahsin Huang
image: Eclipse-Attacks2.jpg
---
In May, Diode’s CTO Dominic Letz published a [paper](https://eprint.iacr.org/2019/579.pdf) introducing [BlockQuick](https://diode.io/burning-platform-pki/blockquick-super-light-blockchain-client-for-trustless-time-19144/), a super light client protocol for blockchain validation on constrained devices. The paper shows that unlike other existing approaches such as [proofs of proof-of-work (PoPoW)](https://fc16.ifca.ai/bitcoin/papers/KLS16.pdf) and [FlyClient](https://eprint.iacr.org/2019/226.pdf), Diode’s BlockQuick super light client protocol is capable of protecting against [eclipse attacks](https://bitcoinmagazine.com/articles/researchers-explore-eclipse-attacks-ethereum-blockchain/) and [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) on a peer-to-peer network. But what is an eclipse attack? Is it possible to prevent some of blockchain’s biggest security threats?

To shed some light on the issue, we describe what an eclipse attack is, some of the bad things you can do in an eclipse attack, and how BlockQuick is addressing them in [Proof-of-Work (PoW)](https://en.wikipedia.org/wiki/Proof-of-work_system) networks.

![alt_text](images/blog/Eclipse-Attacks1.png "image_tooltip"){: .center-block }

Image: Aviv Zohar’s [website](https://www.avivz.net)

**What is an Eclipse Attack?**

An eclipse attack is a type of attack occurs at a peer-to-peer network level: an attacker gains full control of a specific node’s access to information by eclipsing the node from the whole peer-to-peer network. In popular peer-to-peer networks such as Bitcoin and Ethereum, an attacker can perform an eclipse attack by ensuring the victim node no longer receives correct information from the rest of the network but only receives information manipulated by the attacker.

In other words, an attack occurs when the majority of peers on a network are malicious and are gaining control of the connections of a specific node. Attackers in control of such connections can ensure that this specific node is surrounded by malicious nodes. Further, rather than attacking the entire network as in a [Sybil attack](https://en.wikipedia.org/wiki/Sybil_attack), in an eclipse attack, the attacker focuses on isolating and targeting a specific node. This attack often results in the victim node receiving a manipulated, fake view of the blockchain.  Malicious nodes block the victim node’s view of the real blockchain with their imposter blockchain.  Hence the name of one of blockchain’s major security threats—the Eclipse Attack.

According to Heilman et al’s [report](https://eprint.iacr.org/2015/263.pdf) in 2015, one key implication of eclipse attacks is that eclipse attacks could be a useful building block for other attacks. For instance, one of the bad things an attacker can do once the attack positions are secured is that the attacker can launch mining attacks such as a [51% attack](https://en.bitcoinwiki.org/wiki/51%25_attack) with much less than 51% mining power. This could potentially result in altering a network's transaction history as seen by the victim and thus, may lead to economic losses for the victim(s).

**What would it take to carry out a successful Eclipse Attack on Ethereum?**

According to research findings, it doesn’t take much from a malicious actor to successfully carry out an eclipse attack. Heilman et al's 2018 [paper](https://eprint.iacr.org/2018/236.pdf) showed that it takes only a few machines to perform an eclipse attack on the Ethereum network. The researchers pointed out that to pull off an eclipse attack on Ethereum, an adversary needs “only control two machines, each with only a single IP address” to monopolize the connections going to and from a victim’s node, and eventually, isolating the victim node from the rest of its peers in the network.

Nonetheless, in most cases eclipse attacks are still difficult to do because the attacker would have to pick a target node or group of nodes, have an established botnet of host nodes, disconnect the targets from every node they’re connected to, and work out by trial and error the neighboring nodes of the targets in order to make them connect to the attacker’s. Then, the attacker would have to wait for the next time the victim node logs off and rejoins the network. 

During the resetting, the attacker would force the connections to redirect to a new set of nodes, and thereby gaining full control of all of the victim’s connections. That is not an easy task, but it is doable. So far we haven’t seen any examples of eclipse attacks happening in real life; however, recent research results have shown that it is something that shouldn’t be ignored.

![alt_text](images/blog/Eclipse-Attacks3.png "image_tooltip"){: .center-block }

**Eclipse attacks on IoT devices**

If we think about eclipse attacks in an IoT environment, the risks posed by IoT devices rise significantly higher. In a common scenario of mining nodes in a data center, an attacker would need several machines in order to successfully execute an eclipse attack. In the data center scenario, an eclipse attack is hard to do because it usually involves attacking multiple independent uplinks. On the other hand, in an IoT environment scenario, it becomes a lot easier for the attacker to perform an eclipse attack. An IoT device is an easy target for attackers because it involves attacking only one single point of failure, for instance, attacking a cellular 3g uplink.

If the attacker wants to launch an eclipse attack on an IoT device, what the attacker can do is to first launch a man-in-the-middle attack by targeting an IoT device’s gateway. Once the gateway is compromised, the attacker has full control of the victim IoT device’s data such as block synchronization requests, and can therefore force connection to the malicious nodes. The IoT device becomes isolated from the rest of the peer-to-peer network and thus, becoming impossible to view the real blockchain network. Henceforth, an eclipse attack on an IoT device is completed.

**So how does BlockQuick mitigate Eclipse Attacks?**

In an eclipse attack scenario in a proof-of-work (PoW) based network, the attacker exploits to force a node to accept a longer chain with lower total difficulty than the main chain. Since the attacker advertised a higher total difficulty than honest nodes', when the victim node rejoins the network, it would receive a chain that is longer than the valid chain but has lower total difficulty. Therefore, what happens is the victim node can no longer synchronize with the valid chain. So, how does BlockQuick alleviate this problem?

Proposed by Dominic Letz last month, [BlockQuick](https://diode.io/burning-platform-pki/blockquick-super-light-blockchain-client-for-trustless-time-19144/) is the first super light client protocol that addresses the issue of eclipse attacks. As Letz wrote in the [paper](https://eprint.iacr.org/2019/579.pdf) “BlockQuick: Super-Light Client Protocol for Blockchain Validation on Constrained Devices,” BlockQuick is capable of preventing eclipse attacks because it doesn’t depend solely on choosing the longest chain with the highest difficulty on the Proof-of-Work (PoW) network when validating a block.

The longest chain and highest difficulty features are critical in the blockchain protocol and to popular light clients such as [Ethereum Geth](https://geth.ethereum.org) as well, but without proper protection can be abused by attackers. We believe that in order to provide a secure light client protocol, the security policy must adopt the consensus reputation table when validating a block. As Letz explains: “In each new block the device validates the cryptographic signature of the miner and compares these with the known miner identities in its consensus reputation table. Only if a block receives a consensus score of >50% is it accepted by the client. Receiving a chain with a lower total score results in an abort.”

With BlockQuick, the client will look at how the devices iterate the blocks and will run a slow update mechanism. The idea is that instead of complying with the longest chain rule, BlockQuick will be running a reputation check in order to ensure that the client is accepting only the blocks with >50% reputation scores.

In this article, we explained what an eclipse attack is, discussed some of the implications of eclipse attacks, and explored how BlockQuick the super light client protocol is addressing the issue. As blockchain technologies continue to evolve, being knowledgeable in current and possible future developments are critical to your success as a leader. Diode is here to keep you updated to the increasingly complex cryptography and blockchain technologies. So stay tuned! Follow us on [Twitter](https://twitter.com/diode_chain) and our [website](https://diode.io). Stay up-to-date and subscribe to our newsletter.
