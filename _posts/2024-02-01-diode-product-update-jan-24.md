---
layout: post
title: Diode Product Update - January 2024
description: January product update
date: 2024-02-01 19:00
categories: [Diode]
tags: [Diode, Diode Drive]
author: MNJR
image: assets/img/blog/Product Update.jpeg

---
## Diode Product Update - January 2024

We are making good headway on our roadmap for 2024!  Here are some updates we rolled out in January for the Diode App ([v1.9.0 - 1.9.3](https://support.diode.io/category/9gss923s33-diode-app-updates-versions)):

**Search Messages** 

The app (finally) has “Search” for your DMs, channel chats, and file/folder names! As more and more people use the app, Search has been the top request. An upcoming release will include file content search as well.

**Chat Integrations** 

We introduced our first chat integration capability!  You can now configure external services to send messages to chat channels - for example: an IT monitoring outage alert sent to an #incidents channel.  An unique thing about our integrations is the integration can be done via full E2E security from your external service to your team (other chat apps break encryption at the server).  This is just the start of our integration features.  Self custody LLM anyone?

**Improved Bookmarks** 

Many of the team using Diode use it as a VPN replacement by creating "bookmarks" for their team that tunnel through Diode and emerge in different locations into the Internet.  We simplified the bookmark types that a Zone owner or admin uses when setting up bookmarks for their team members.

**Markdown Descriptions for Endpoints** 

Diode Endpoints are uniquely addressable devices that can connect through Diode from/to anywhere in the world. The Diode Network Management area allows you to setup Endpoints that you may want your team to interact with via the App (e.g. private dashboards).  When endpoints are IoT devices, machinery (OT), or IT devices, teams sometimes want to add more information describing the Endpoint.  The Markdown Description field helps people document information about the Endpoint.

**Removed Emoticon Dependency on External Libraries** 

Diode is a local-first app: it doesn't store any data on servers.  However, it goes further than that - it also doesn't require any servers for its functionality.  However, we missed a dependency in a Web2 emoticon library - it was loading emoticons real time from an Internet server. We've cauterized that now and emoticons are no longer dependent on being online - big sigh of relief :-). 

**Several Bug Fixes** 

The team addressed various bugs: a chat display issue for image-only messages, an incorrect "Upgrade" prompt for Web3 bookmarks, broken MacOS notifications, and an issue with account restoration via backup code.

If you want to read more about the specifics of each update, to go our [App Versions page](https://support.diode.io/category/9gss923s33-diode-app-updates-versions) and check out the specific version details.
