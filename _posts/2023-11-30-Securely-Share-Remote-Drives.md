---
layout: post
title: Securely Share Remote Drives
description: share remote smb samba shares for Windows Linux or Mac
date: 2023-12-01 11:25
categories: [Self-Custody]
tags: [Self-Custody, Security, Use Case, Regulated Data]
author: HR
image: assets/img/blog/Securely Share Remote Drives.jpeg

---
## Remote drive sharing and mapping

Although the [Diode App](https://diode.io/solutions/app) is great way to securely share / sync files between devices, some IT environments also need a way to remotely access a shared drive.  This is especially true for certain Windows based applications that need to access remote files as if they are on the local machine.

### Use cases

Some applications are created intentionally to only run on a Local Area Network, or on a single computer - often for security, compliance, or other legacy reasons.  They are not cloud-native applications.  However, in our connected world, there are growing use cases in which these stand-alone applications need to securely interact with remote systems or between multiple users who are in different locations.

The traditional way of supporting this type of environment is by configuring VPN for all of the pieces.  However, VPN requires IT setup and ongoing management, and can even [introduce unintended risks](https://ir.zscaler.com/news-releases/news-release-details/zscaler-vpn-report-finds-nearly-half-organizations-are-concerned).  

Diode can replace VPN for these applications without the [ongoing management or risk](https://diode.io/blog/zero-trust-replacing-vpn).

### How it works

The technology usually used to access a Windows network drive is called "SMB" - the [Server Message Block](https://www.techtarget.com/searchnetworking/definition/Server-Message-Block-Protoco) protocol.  Diode can be used to create a secure tunnel for SMB so it can connect securely to any device in the world, thereby creating a protected P2P network drive.  

This approach allows you to "Map Network Drive" on Windows (or Mac or Linux!) to access the remote files as if they were on the hard-drive on the local computer.  The remote files can be on another Windows system, on a Linux "Samba" share, or on any other device that can support running both Diode and SMB.

If you're interested in using Diode in this way, please see the [technical support article](https://cli.docs.diode.io/docs/using/tunneled-p2p-dashboards/) or [get in touch](https://t.me/diode_chain)!


