---
layout: post
title: Diode Product Update - January 2024
description: January product update
date: 2024-01-31 17:00
categories: [Diode]
tags: [Diode, Diode Drive]
author: MNJR
image: 

---

We have some great new goals for 2024 and we are excited to share the updates we have already published on Diode Drive since the beginning of the new year.

Here is a recap of the updates we’ve released in the last month (1.9.0 - 1.9.3): 

*   **Search Messages** We now provide “search” for your messages! As use of the app has grown, Search has been a fundamental capability that has been missing. This release only searches messages, but an upcoming release will include filename and file content search as well.
*   **Search Filenames and Folders** We added support for search to provide filename / folder name results in addition to message results. This does not yet include file content, but that will also fast-follow!
*   **Improved Bookmark Configuration** The use of bookmarks has been growing as more and more people are using Diode to replace VPN usage. To support this, we've condensed the bookmark types that a Zone owner or admin may experience when setting up bookmarks for their team members.
*   **Removed Emoticon Dependency on External Libraries** We missed a Web2 dependency in an emoticon library - it was loading emoticons real time from the external dependency. We've cauterized that now and emoticons are no longer dependent on being online or being able to access the external Web2 CDN.
*   **Endpoint Markdown Descriptions** A "Description" field has been incorporated into network endpoints, enabling the inclusion of markdown-formatted notes and descriptions for effective annotation and record-keeping, especially beneficial for managing IT or OT assets in the network area.
*   **Chat Integrations via Remote RPC** Diode now supports one-way chat integrations, allowing users to connect external services like DevOps teams sending outage alerts to an #incidents channel. Future updates will expand capabilities, including Zone and Device management.
*   **Several Bug Fixes** Our team addressed various bugs, including fixing the display issue for non-textual messages in v1.9.1 due to search optimization, resolving the "Upgrade" prompt when selecting Brave Browser for Web3 bookmarks, fixing broken MacOS notifications in v1.9.0 or later on specific systems, and restoring backup code capabilities for account restoration.

If you want to read more about the specifics of each update, to go our [support.diode.io](https://support.diode.io/) page to check them out along with any questions you may have on how best to utalize your Diode app.
