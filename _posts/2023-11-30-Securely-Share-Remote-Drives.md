---
layout: post
title: Securely Share Remote Drives
description: share remote smb samba shares for Windows Linux or Mac
date: 2023-12-01 11:25
categories: [Security, IT Tools, CLI]
tags: [Security]
author: HR
image: Securely Share Remote Drives.jpeg

---
## Remote drive sharing and mapping

Although the [Diode App](https://diode.io/solutions/app) is great way to securely share / sync files between devices, some IT environments also need access to a remote shared drive.  This is especially true for certain Windows based applications that need to access remote files as if they are on the local machine.

### Use cases

Certain applications are created intentionally to only run on a Local Area Network or on a single computer - often for security, compliance, or other legacy reasons.  They are not cloud-native applications.  However, in our connected world, there are growing use cases in which these stand-alone applications need to securely interact with remote systems or between multiple users who are in different locations.

The traditional way of supporting this type of environment is via a VPN setup.  However, VPN requires IT setup and ongoing managemenet, and can even [introduce unintended risks](https://ir.zscaler.com/news-releases/news-release-details/zscaler-vpn-report-finds-nearly-half-organizations-are-concerned).  Diode can replace VPN for these applications without the [ongoing management or risk](https://diode.io/blog/zero-trust-replacing-vpn).

### How it works

The technology usually used to create a Windows network drive is called "SMB" - the [Server Message Block](https://www.techtarget.com/searchnetworking/definition/Server-Message-Block-Protoco) protocol.  We can use Diode to create a secure pipe for SMB that can tunnel into any device in the world, thereby creating a protected P2P network drive.  

This approach allows you to "Map Network Drive" on Windows to access the remote files as if they were on a hard-drive on the local computer.  The remote files can be on a Linux "Samba" share or on another Windows system.

If you're interested in using Diode in this way, please see the [technical support article](https://support.diode.io/article/mrebw2fgxw-remote-windows-smb-shares) or [get in touch](https://t.me/diode_chain)!


