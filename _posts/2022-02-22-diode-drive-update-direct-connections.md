---
layout: post
title: Diode Drive Feature - Direct Connections
date: 2022-02-2 22:22
categories: [DiodeDrive]
tags: [Diode, Diode Drive, P2P]
author: Allen M
image: direct-connections.png
redirect_from:
- /diodedrive/diodedriveupdate-directconnect-22033/
---

One of the drawbacks of cloud storage is the time required to upload and/or download large amounts of data. Depending on the amount of data, this process can take several days before everything is synced up. Diode Drive has now introduced direct connections. This means that team members can sync files and communicate directly with each other via the fastest connection possible. With a direct connection, files can sync exponentially faster, depending on your network speed and the number of network “hops” between the team members. For team members or backup boxes on the same local area network, no Internet bandwidth is consumed - this may be important for users on a limited cell phone data plan or satellite internet. 

Previous to this update, team members would continue to use decentralized relays after connecting to each other (these relayed connections were/are end to end encrypted). 

You can tell if another team member is directly connected or not by their online indicator in the side bar. Some team members may not be able to directly connect – those peers will continue to use a relay for E2E encrypted communications, and are indicated by a single green dot:

![](../assets/img/blog/peer-bridged.png)

Team members that are directly connected are indicated by a green dot with a white border.

![](../assets/img/blog/peer-direct.png)

Also, if you click the team member name, their connection type will say either “bridged” (using a relay) or “direct” (direct connection).

This is yet another way that Diode Drive differentiates from centralized solutions like Google Drive or Dropbox. Not only is Diode Drive the leading [self-custody](diode drive/self-custody-for-data-22032/) collaboration solution, Diode Drive’s direct connections are more performant and have a smaller attack surface than are possible with centralized solutions.