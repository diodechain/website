---
layout: post
title: Diode Product Update - February 2024
description: February Product Update
date: 2024-02-28 8:00
categories: [Diode]
tags: [Diode, Diode Drive]
author: MNJR
image: assets/img/blog/Product Update.jpeg

---
The Diode team continues to work hard as another round of updates have made their way through the app this month! Here are some of the updates that were made in February for the Diode App (v1.9.4 - 1.10.4).

**Language Translation**

*   Thanks to a dedicated community collaborator, our app now features a Chinese translation! Currently available in traditional characters (Taiwan/Hong Kong), a simplified version is in the works. 
*   French and Italian languages are also now integrated into the app, alongside updates to the German translation, automatically adapting to your operating system's settings; share your language preferences or improvement suggestions in this [article](https://app.docs.diode.io/docs/features/languages-on-the-diode-app/)!
*   If you're interested in contributing to the simplified character translation of Chinese (or other languages), please join [our project](https://crowdin.com/project/diode-drive/zh-CN).

**Private Chat Channels Upgrade** 
Diode now supports fully E2E private channels in Enterprise Zones, allowing teams to create exclusive group chats, enhancing conversation and privacy.

**File Backup Improvement** 
File backup now also triggers on a 0 byte write condition, providing an extra layer of protection for accidentally deleted file contents in addition to the existing backup-upon-delete feature.

**Read-Only Team Members** 
We've introduced a "Read Only" role for new Team Members, set by default to enhance ease of managing larger Zones, restricting file modification and visibility while allowing access to Broadcast Channels and DM with Zone Owner or Admins.

**Search in all Zones** 
When you search for a specific phrase, file, or word within the Diode App, it now searches within all the Zones so you can find what you’re looking for. Ctrl+F (or "Cmd+F" on Mac) to search is also now available to accomplish this! 

**Multiple Concurrent Tunnels for Brave** 
The Brave browser, when utilized for tunneled Bookmarks, now seamlessly accommodates multiple concurrent tunnels, eliminating the need to fully shut down the browser between accessing different Bookmarks and enabling simultaneous access to as many tunnels as needed.

**Websockets API** 
Introducing support for a websockets connection in our API, facilitating bidirectional integrations with chat channels and DMs, enhancing the versatility and functionality of the platform.

**Several Bug Fixes**

The team addressed various bugs: File capitalization sync error, mention popups and double checkmarks show immediately, improvements to chat and file sync reliability, and internal browser javascript handling. 

If you want to read more about the specifics of each update, to go our [App Versions page](https://app.docs.diode.io/docs/versions/1-12-0/) and check out the specific version details.

<div class="story__buttons">
  <a href="{{"/solutions/app/" | prepend: path | relative_url}}" class="btn" target="">Find Out More</a>
  <a href="#download-app" class="btn popup-open" target="">{{ site.links.download.title }}</a>
</div>
