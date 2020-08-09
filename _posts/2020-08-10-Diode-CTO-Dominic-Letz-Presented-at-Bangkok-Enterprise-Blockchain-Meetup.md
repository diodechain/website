---
layout: post
title: "Diode CTO Dominic Letz Discussed Web3 and IoT security at Bangkok Enterprise Blockchain Meetup"
date: 2020-08-10 04:09
categories: [Diode]
tags: [Diode]
author: Yahsin Huang
image: Bangkok_01.png
imageclass: top
---


Diode CTO Dominic Letz was invited to speak at [Bangkok Enterprise Blockchain group](https://www.meetup.com/Bangkok-Enterprise-Blockchain/events/271814031/) on Wednesday, 29th of July, along with another speaker Jana Bulkin from Integrationworks Asia. 

Organized by Atato, the online event “Enterprise Blockchain 10th edition: Blockchain and IOT!” drew some 30 engineers, developers, industry experts and makers from Thailand, Germany, France, Taiwan, and a few from Vietnam. We appreciate Atato CMO Maxime Paul for facilitating and moderating the event.

![alt_text](images/blog/Bangkok_02.png "image_tooltip")

Check out Diode’s Bangkok meetup presentation slides on [Github](https://github.com/diodechain/presentations/blob/master/Bangkok_Meetup_2020/Bangkok_Meetup_2020.pdf). Watch the livestream-ed meetup on [YouTube](https://youtu.be/tGepc4324xQ?t=2320). Dominic’s presentation starts at 38:40.


<iframe width="560" height="315" src="https://www.youtube.com/embed/tGepc4324xQ?start=2320" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Dominic discussed issues concerning IoT security, and how Diode can play a key role in giving IoT security the upgrade it needed. At Diode, we’ve set up an integrated enterprise solution that is unique to upgrade the security. We’re using smart contracts instead of relying on a single admin.

The future of enterprise in terms of security, we think that the direction should be getting rid of the admin, in particular, the IT admin people who have full control of data. Recently, we saw a lot of social engineering attacks. We saw what happened to Twitter, for example -- how Twitter was having social engineering attacks which led to crypto scam tweets. We saw what happened to Garmin. It was down, and it is still in the process of getting up again. We saw all of these attacks. There’s a better way to do it. That is why we wanted to build Diode. 

![alt_text](images/blog/Bangkok_03.png "image_tooltip")

We’re a big believer of end-to-end blockchain, and end-to-end encryption. We’re using E2E encryption using Ethereum keys creating peer-to-peer connections. With Diode, you authenticate with the Ethereum keys. Using Ethereum keys allows you to get access to IoT devices anywhere in the world. Many attacks happened because they are not encrypted in the first place. Diode is unique and important to the IoT industry because we are the blockchain-based network that is fully encrypted.

![alt_text](images/blog/Bangkok_04.png "image_tooltip")


During the Q & A session, there was a question about Diode’s BlockQuick. “It seems to be an extension of Ethereum for “nano-clients,” is this correct? Is the underlying network the Eth main net?” 

The answer is yes, it is correct. Diode’s BlockQuick is an extension of nano-clients. The required blockheader change is detailed in the [BlockQuick paper](https://eprint.iacr.org/2019/579.pdf). It is not an Ethereum mainnet, but a fork of the Ethereum network that has that required blockheader change.

Another question was asked about DDoS attacks. “IoT devices are pretty vulnerable to cyberattacks. For instance, they could easily become a victim of DDoS attacks. How are blockchain technologies facing this security issue, and how can blockchain help better solve it?”

The IoT devices often become victims of DDoS attacks. In the [Garmin case](https://connect.garmin.com/status/), the devices are connected to a couple of central servers. Once the servers are DDoS'ed, the devices are down. In a blockchain network when devices can talk to any node, a DDoS attack on a couple of servers wouldn't do anything. For a DDoS attack to be successful, they would need to bring down 51% of all blockchain nodes. 

In face with the Diode network, only devices that you’ve enabled can connect to your servers. In the Diode client, you can set this up with a simple command  diode publish -protected so unknown, malicious devices won't be able to DDoS your servers, because they can't reach you.

Scalability was one of the issues discussed. “Can blockchain accelerate IoT, how?” We think the answer is positive. In fact blockchain accelerates IoT in many ways. First, it can bring your product to market faster, because you don’t have to worry about setting up the Edge, AWS, Azure… servers. Instead, you can have the blockchain scale it for you. 

Secondly, the public Diode routing networks allow you to do a single low-powered IoT device to publish its sensor data to thousands of consumers without increasing the load on the device. This means it is actually accelerating things. 

And lastly, we hope that with technology such as Diode, deploying large amounts of IoT fleets becomes a much easy, and much cheaper task. We look forward to seeing many more deployments and much more security especially from small and mid-tier companies.

A question asked about our plans to follow Ethereum’s recent development, such as Eth2. We’re definitely watching Eth2 closely. We think the Eth2 development is generally moving toward the right direction and we will be ready to follow Eth2 when it’s working well. 

Diode’s vision is to see a world wide network operating on fully decentralized infrastructure. We’d like to invite you to join the Web3 movement and build great decentralized infrastructure! Check out Dominic’s recent write-up on [Raspberry Pi hardware watchdog](https://diode.io/raspberry%20pi/running-forever-with-the-raspberry-pi-hardware-watchdog-20202/).

