---
layout: post
title: Introducing Proof-Of-StakeWork
date: 2019-05-06 13:42
categories: [Mining]
tags: [Proof-Of-StakeWork, Mining, Blockchain]
author: Greg Belcher
image: StakeWork0.jpg
---

[Note: This post requires background knowledge in blockchain technology. We have provided links to background information.]

After determining a blockchain project’s reason for existence, the next most important decision developers and entrepreneurs must consider is the mechanism through which their network will arrive at consensus. There are many different types of consensus protocols, but the vast majority of them can be placed into one of two buckets, [Proof-of-Work](https://cointelegraph.com/explained/proof-of-work-explained) (POW) or [Proof-of-Stake](https://hackernoon.com/what-is-proof-of-stake-8e0433018256) (POS). Many developers may view this decision as a fork in the road where they must choose one over the other.

In this post, we will explore the advantages and disadvantages of POW and POS, examine some of the most significant drawbacks of each and then show how the two approaches can be combined to highlight each of their strengths while mitigating their weaknesses.

Before we dive into the solution, it’s important that we properly frame the challenges facing blockchain technology and how exactly we got here. Blockchains are databases that act a lot like linked lists. The lists are called blocks, and they form a chain (hence the name) starting from most recent and work backward in time to the genesis block. The property inherent to all blockchains that make them interesting to investors and technologists alike is their [immutability](https://bitsonblocks.net/2016/02/29/a-gentle-introduction-to-immutability-of-blockchains/). Each block is created with a [cryptographic hash](https://hackernoon.com/cryptographic-hashing-c25da23609c3) that is derived using the contents from each preceding block. Each hash contains information dating back to the genesis block providing a mathematical proof that none of the blocks in the chain have changed in the creation of the newest block.

POW is the process by which miners solve for the cryptographic hash and create the next block. This puzzle is designed to be computationally expensive to solve but cheap and easy for others in the network to verify. The first miner to solve this puzzle earns the [block reward](https://www.investopedia.com/terms/b/block-reward.asp). The competition to earn block rewards is driving an entire industry to develop more powerful hardware specified for this specific purpose.

The problem is that POW is becoming a victim of its own success. POW is doing exactly what it was designed to do; attract more computational power to secure the network. However, blockchain networks are getting so large that many in the community fear their electricity consumption could be unsustainable.

**Preventing 51% Attacks**

In his published blog post, [On Value Capture at Layers 1 and 2](https://multicoin.capital/2019/03/14/on-value-capture-at-layers-1-and-2/), Kyle Samani of Multicoin Capital detailed economic frameworks for how layer 1 and 2 protocols capture value in the marketplace. Layer 1 protocols are defined as ones that run on unique blockchain protocols while layer 2 protocols are built on top of existing blockchains. 

Samani argues that unique blockchains must be able to credibly thwart [51% attacks](https://www.investopedia.com/terms/1/51-attack.asp) for them to have any chance at becoming stores of value for investors.

Samani summarizes this simple yet astute observation by asking the rhetorical question: 

<blockquote>
“Why would users choose to store their wealth in a chain that’s been 51% attacked when they can choose to store their wealth in a chain that hasn’t been?”
</blockquote>

By the same logic, why would anyone build a distributed application on top of a blockchain that could be 51% attacked if they don’t have to?

Samani coined the phrase ‘security budget’ when describing the computational resources devoted to securing a unique blockchain network against 51% attacks. These computational resources are supplied through [mining](https://www.investopedia.com/tech/how-does-bitcoin-mining-work/) and are compensated for doing so via the block reward. An attacker would have to control over 50% of a given network’s [hashrate](https://www.hashgains.com/wiki/h/what-is-hash-rate), or security budget, to be sure that they can successfully perform a 51% attack.

Samani provides a formula to quantify a network’s security budget.

<code>
SB = aggregate network value &times; inflation rate + transaction fees
</code>

The inflation rate, in this case, is also the block reward as new coins (or tokens) are created to compensate miners for loaning their computational resources to secure the network. Network users can also compensate miners via transaction fees, but those tend to be a much smaller portion of the reward.

Samani points out that the security budget is a floor, not a ceiling. Meaning, the security budget represents the theoretical minimum cost to perform a 51% attack, but in the real world, an attack will usually be more costly. The largest restraint to successfully performing a 51% attack is the procurement of the computing hardware itself. 

The most vulnerable blockchains are [smaller blockchains](https://www.coindesk.com/blockchains-feared-51-attack-now-becoming-regular) that share the same mining protocols as larger chains. This allows specially designed miners, commonly referred to as [ASIC](https://en.bitcoin.it/wiki/ASIC)s (application specific integrated circuits) developed for larger blockchains like Bitcoin and Ethereum to point their large amount of computing power at smaller networks and quickly overpower their hashrate. The rapid growth of the [liquid mining rental market](https://www.coindesk.com/51-attacks-for-rent%e2%80%8a-the-trouble-with-a-liquid-mining-market) has made this threat even more pervasive. 

All hope is not lost, however, for layer 1 blockchain startups. There are a couple of defenses:



1. Design a unique mining protocol
2. Leverage Proof-of-Stake economics

**Unique Mining Protocols**

If a layer 1 blockchain has a small network because it is young and just getting started, a unique mining algorithm will prevent ASICs designed for other blockchains from working. This strategy has a limited shelf-life because eventually, someone will develop an ASIC for the blockchain.

Experts in the blockchain community estimate, depending upon the complexity and memory usage of the protocol, it will only take industry participants 4-6 months to develop ASICs for a specific blockchain.

**Proof-of-Stake Economics**

Proof-of-Stake (POS) provides a clever defense against 51% attacks. POS was initially designed to solve the [energy consumption](https://diode.io/distributed-infrastructure/2019/03/07/the-end-of-mining.html) issue associated with POW. As we have learned with Bitcoin, the more valuable a network becomes, the greater the security budget, but the worse it is for the environment. Every couple of months a new report is issued about which country Bitcoin has surpassed in terms of [energy usage](https://arstechnica.com/tech-policy/2017/12/bitcoins-insane-energy-consumption-explained/). POS rewards miners (or in this case validators) based upon the amount of digital currency “staked” on the chain instead of the amount of computational power.

A corollary to POS is that it forces attackers to buy over 50% of the outstanding coins in order to have over 50% influence over which blocks, and thus transactions, on the chain get verified. Attackers have a disincentive to act maliciously because while they are validating the blocks, their coins remain in a ‘staked’ state, and they risk losing them all if they are caught cheating.

Abhishek Sharma details many of the weaknesses in POS in [parts 2](https://medium.com/@abhisharm/understanding-proof-of-stake-through-its-flaws-part-2-nothing-s-at-stake-8d12d826956c) and [3](https://medium.com/p/672a3d413501) of his ‘_Understanding Proof of Stake Though it’s Flaws’_ series. In part 2, Sharma walks his readers through the ‘nothing at stake’ problem in great detail so I won’t do it here. The main point he makes is that potential attackers can stake their coins on all versions of a blockchain. Miners could mine every competing fork making it difficult to determine which is the ‘true’ chain. POW chains don’t have this problem because miners can only mine one blockchain at a time.

Vitalik Buterin offers [two possible solutions](https://blog.ethereum.org/2014/07/05/stake/) to the ‘nothing at stake’ problem.



1. Penalize those who voted on more than one version of the chain.
2. Penalize those who voted on the ‘wrong’ block whether they double-voted or not.

Various other projects are attempting to solve this problem, like [Peercoin](http://wiki.peercointalk.org/index.php?title=Peerunity), [NXT](https://nxtwiki.org/wiki/Whitepaper:Nxt), and Daniel Larimer’s [Transactions as POS](https://bravenewcoin.com/assets/Uploads/TransactionsAsProofOfStake10.pdf). However, none entirely solve the problem that the same coin can be staked on multiple chain versions.

In [part 3](https://medium.com/p/672a3d413501) Sharma details the ‘Long Range Attacks’ which is arguably a more severe vulnerability to POS. 


# Proof-Of-StakeWork<sup>TM</sup>

[Diode](https://diode.io/), a blockchain developed for industrial IoT applications, combined some of the most desirable attributes of both POW and POS to create Proof-of-StakeWork<sup>TM</sup>.

Proof-of-StakeWork is, at its core, a POW protocol but also employes POS economics to allow miners to grow their mining operation by reinvesting the block reward instead of having to buy more hardware and consume more electricity.

Proof-of-StakeWork<sup>TM</sup> defends against 51% attacks without the expense and environmental impact of POW mining. But at the same time, doesn’t have the ‘Nothing at stake’ vulnerability because miners can only mine one blockchain at a time.

Diode’s Proof-of-StakeWork<sup>TM  </sup>is a more fair and inclusive protocol than [DPoS](https://hackernoon.com/what-is-delegated-proof-of-stake-897a2f0558f9) (Delegated Proof-of-Stake). DPoS was developed to address the scaling issues with PoS. DPoS does not allow everyone in the network to vote on which blocks should be validated. Instead, for the sake of speed and efficiency, the network delegates a small number of ‘trusted’ elites to do the validation and those ‘trusted elites’ tend to keep most of the rewards for themselves. With Proof-of-StakeWork<sup>TM</sup>, community members don’t have to be industry insiders or own millions of dollars worth of coins to participate and share in the block reward.

Most importantly Proof-of-StakeWork gives miners a choice and empowers them to decide which growth model works best for their mining operation. Some may feel that they have an advantage in the development and procurement of advanced mining hardware or may have access to low -cost electricity. While others in the community may feel more comfortable growing their operation by reinvesting their block rewards into an increased stake. Either approach or even a combination of the two can make you successful with Diode.

For these reasons and more, we believe Proof-of-StakeWork<sup>TM</sup> is the next logical evolution toward a more perfect blockchain protocol that works for everyone in the community. To learn more please join us on this exciting journey and follow us on Twitter and Telegram and sign up for our mailing list.


<!-- Docs to Markdown version 1.0β17 -->
