---
layout: post
title: Raspberry Pi File Server
date: 2021-10-08 19:04
categories: [DiodeDrive]
tags: [Diode, Diode Drive, File Access, How To, Raspberry Pi]
author: Hans Rempel
image: rpifileserver-diode-pi-mesh.png
imageclass: top
---
There are no inherently “cloud” components of Diode-based applications – they are decentralized systems, aggregating capabilities from the edge-connected participants.  While that has many advantages (security, low-cost-of-maintenance, efficiency, accessibility), it means that some of the state persistence that centralized Web2 applications take for granted must be provided for differently in a pure <a href="blockchain/Best-Resources-to-Learn-Web3-Blockchain-Decentralized-PKI-and-Ethereum-19262/">Web3 / Diode environment</a>.

<p align="center"><img src="images/blog/rpifileserver-web3-token.png" width="124"></p>

In the case of <a href="products/d-drive/">Diode Drive</a>, if all Team Members in a Zone are just people using their phones and their computers, the overall state of the Zone may not be fully reflected in the aggregate of active participants at any given time.  Take the situation, for example, in which there are just two Team Members who happen to be in different timezones – if Team Member A updates a file and then goes offline all while Team Member B’s computer is off, when Team Member B does come online, the file update will not be available.  Since there are no centralized “always on” cloud components to the application, Team Members who pass like ships in the night may not get synchronized.

<p align="center"><img src="images/blog/rpifileserver-not-synced-trio.png" width="50%"></p>

They need a third “Team Member” who is always online, and who can represent the state of the information to the other Team Member(s).  Enter the humble <a href="https://www.raspberrypi.org/">Raspberry Pi</a>.
 
<p align="center"><img src="images/blog/rpifileserver-rpi-board.png" width="50%"></p>

A Raspberry Pi is a low cost, reliable, and remotely manageable device that can play the role of this “always on” Team Member - we’ve found nearly everyone running a multi-team Zone can make use of a device, like a Raspberry Pi, to ensure file availability, perform seamless backups, and deliver on asynchronous communications.  

<p align="center"><img src="images/blog/rpifileserver-synced-trio.png" width="50%"></p>

We recently posted an article that <a href="https://support.diode.io/article/ad7s45khyq">describes how to configure a Raspberry Pi for this purpose</a>.

These are early days in the deployment of Web3-based <a href="https://www.inkandswitch.com/local-first.html">Local First</a> applications!  The Raspberry Pi Team Member solution is a functional stop gap – it is not the end game.  Its role as a regional, secure, and persistent peer is informing the evolution of Diode’s R&D as we work to make high security Web3-based collaboration even easier to use, and even easier to deploy, than traditional cloud based applications. 

