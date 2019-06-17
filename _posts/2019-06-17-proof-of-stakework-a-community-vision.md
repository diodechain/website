---
layout: post
date: 2019-06-17 17:46
categories: [Mining]
tags: [Mining, Proof-Of-StakeWork, Blockchain]
author: Greg Belcher
image: POSW-Community3.jpg
---
[Note: This post is a follow-on discussion to topics discussed in [Introducing Proof-Of-StakeWork](https://diode.io/mining/introducing-proof-of-stakework-19126/) and requires some background knowledge in blockchain technology.] 

In the last [post](https://diode.io/mining/introducing-proof-of-stakework-19126/) on Proof-Of-StakeWork we talked about some of the advantages and disadvantages of both Proof-Of-Work (POW) and Proof-Of-Stake (POS) so I won’t go into those details here. The purpose of this post is to more fully articulate the vision and motivation behind Proof-Of-StakeWork (POSW) and to provide a little more detail around how the protocol will actually work.

The motivation behind POSW is to contribute to the blockchain community in 3 main ways:



  1. Offer a model for how Layer 1 start-ups can protect against 51% attacks.
  2. Allow individual and small mining operations to remain profitable.
  3. Find a sustainable solution to the POW power consumption problem.

<br/>

{:start="1"}
1. **Layer 1 protection against 51% attacks.**

    Kyle Samani of Multicoin Capital [defines](https://multicoin.capital/2019/03/14/on-value-capture-at-layers-1-and-2/) Layer 1 as unique blockchain protocols while Layer 2 protocols are built on top of existing blockchains.


    We see protecting Layer 1 protocols against [51% attacks](https://www.investopedia.com/terms/1/51-attack.asp) as one of the most important issues facing the blockchain community. Blockchain developers and entrepreneurs need to be able to modify existing protocols or invent new ones if existing technology doesn’t solve their problem.


    There are some incredible platform projects like Hyperledger, Ethereum, EOS, Stellar and many more but unfortunately no one platform will ever be able to handle all of the potential blockchain use cases. As the industry matures, there will definitely be a small number of dominant blockchain platforms but there will still be a need for a long tail of smaller blockchains optimized to solve very specific problems. There needs to be a credible defense to protect these smaller blockchains.


    Additionally, without a credible defense against 51% attacks, start-up blockchains would be so vulnerable at the beginning that no one would have the economic incentive to innovate. Imagine where Silicon Valley would be if a start-up’s bank account could get raided just days after a seed funding round. 


    We are creating Proof-of-StakeWork so that developers can innovate beyond everyone’s wildest dreams without being at the mercy of whether the major platforms can accommodate their project.

2. **Allowing individual and small mining operations to remain profitable.**

    Deepak Puthal, a blockchain researcher, co-authored “[Blockchain as a Decentralized Security Framework](https://www.researchgate.net/publication/323491592_The_Blockchain_as_a_Decentralized_Security_Framework_Future_Directions)” where he argued that blockchain is “one of the most propitious and ingenious technologies of cybersecurity.” Among the key characteristics supporting his thesis is blockchain’s distributed and decentralized nature.


    The success and profitability of individual and small mining operations is key to keeping blockchain decentralized. Economies of scale are the cost advantages large firms in an industry obtain from simply being large. In these industries, the cost per unit decreases with increasing scale. This benefits consumers with lower prices and allows already large companies to sustain high growth rates. In blockchain, however, economies of scale in large centralized mining operations can an absolute disaster.


    The lack of decentralization is becoming a problem in even the largest blockchains. [Studies](https://howmuch.net/articles/bitcoin-wealth-distribution) suggest that 4% of Bitcoin wallet addresses own over 96% of all Bitcoin and the top 5 mining pools control over 70% of Bitcoin’s hashrate. While it’s debatable how we should interpret these types of statistics, conceptually, it’s easy to imagine how warehouses of corporately owned ASICs can come online and change the governance and overall health of a small community driven blockchain project. 


    We are creating Proof-of-StakeWork so that small blockchains can remain distributed, independent and decentralized.

3. **A sustainable solution to the POW power consumption problem.**

    Philippe Klintefelt Collet of Heartcore Capital wrote an interesting [series](https://medium.com/@philippe.klintefelt.collet/climate-change-and-venture-capital-part-1-the-mechanics-of-carbon-emissions-reduction-9facfc6562a8) on the economics of climate change, why it’s such a big deal and why it’s so hard to fix. For all of the problems blockchain technology is solving it would be a shame if it was also contributing to one of the most pressing problems facing humanity.


    We are creating Proof-of-StakeWork to be a scalable and sustainable technology so the community can focus on solving problems without creating new ones.


**How does it work?**

Proof-of-Work (POW) algorithms require miners to solve a cryptographic puzzle in order to validate new blocks into the chain. The first to solve the puzzle earns the block reward. The difficulty of this puzzle is dynamic. It becomes easier or harder depending upon how quickly the previous blocks were solved in order to keep the time between blocks approximately the same. As the network attracts more compute power, the cryptographic puzzle has a higher chance of being solved more quickly. When that happens the algorithm responds by increasing the difficulty to achieve equilibrium. If the puzzle is solved more slowly, the difficulty is reduced.

To illustrate this concept in more concrete terms, POW algorithms such as Bitcoin and Ethereum, can be expressed mathematically as the following; where, **H,** is a cryptographic hash function:



![alt_text](/images/blog/POSW-Community0.png "image_tooltip"){: .center-block }



Mining software is designed to calculate H(Block) with different [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) values until H calculates a value below the specified Difficulty.

Proof-Of-StakeWork introduces a new variable, the stake of the miner (S<sub>miner</sub>), representing their amount of Tokens, as well as a factor function, **F**, into this equation:



![alt_text](/images/blog/POSW-Community1.png "image_tooltip"){: .center-block }



Staking will reduce the mining difficulty for (Sminer) by factor **F**. Staking will work similar to Proof-of-Stake (POS) in that it requires the miner to lock a certain amount of coins for a period of time so that it is not possible for the miner to quickly stake and then un-stake.

Further, **F** is a weighting function that amplifies the effectiveness of the miner. For illustrative purposes only, let us define **F** as:



![alt_text](/images/blog/POSW-Community2.png "image_tooltip"){: .center-block }



In this implementation, (S<sub>miner</sub>) can exponentially increase its Proof-Power for each additional token staked increasing the likelihood that the miner will solve the block problem first and earn the block reward. This would incentivize miners to stake more coins to grow their mining operation instead of using more electricity.

For these reasons and more, we believe Proof-of-StakeWork is the next logical evolution toward a perfect blockchain protocol that works for everyone in the community. To learn more please join us on this exciting journey and follow us on Twitter and Telegram and sign up for our mailing list.
