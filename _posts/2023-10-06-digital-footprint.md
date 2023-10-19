---
layout: post
title: Protect Your Digital Footprint
date: 2023-10-06 13:45
categories: [Security]
tags: [Security, Decentralisation]
author: MNJR
image: cloudless footprint.jpeg

---
## **Your Digital Footprint**

The world uses online technologies for essential tasks - the activities create a “digital footprint” that can put online security, and privacy, at risk.  Digital footprints often contain sensitive and personal information such as browsing history, location data, social media activity, schedules, online purchases, engagement with certain topics, and even some communications. In aggregate, a user picture is created of “who you are and how you behave.”

**Security Risks:** Digital footprints can expose sensitive information to would-be attackers. For individuals, this exposure can lead to a theft of identity details - often used for financial crimes.  For companies, this exposure can increase the risk of cyberattacks or data breaches for themselves, partners, and suppliers. Sometimes, a chain of vulnerabilities can be exploited in linked third party systems, jeopardizing the security of many organizations.

**Privacy Concerns:** The profile built from your digital footprints is often sold by online platforms and advertisers to the highest bidder - you become the product, as companies capitalize on your profile. Additionally, your digital footprint can often be correlated to your real identity - in an increasing number of geo-political regions this correlation can lead to unexpected and undesired surveillance.

## **Tracing Your Digital Footprint**

Here are some of the leading vulnerabilities through which your digital footprints, and more, are leaked (Note: these do not include the more [fundamental problems with Internet security](https://diode.io/blog/why-there-are-3652-organizations-that-can-read-everyones-encrypted-traffic)).  

1.  **Lack of security** - Many websites and applications don’t actually secure communications.  One of the most interesting violators is Telegram because many users perceive Telegram to be a security-first chat application, but actually all group chats and default DMs are totally unencrypted and [readable by Telegram](https://www.makeuseof.com/telegram-security/) and others.
2.  **DNS** - The Internet relies on a technology called Domain Name Service (DNS).  For example, Diode's website address (diode.io) is a domain name - DNS is used to find every website address.  Every time anyone goes to a website, the request can be geo-located to a specific address and device, which can be correlated with the details of a user's web browsing history. [Google owns the majority of the Internet’s DNS infrastructure](https://en.wikipedia.org/wiki/Google_Public_DNS). DNS is by default recorded in plain text which allows anyone sniffing around to see who exactly you are talking with.
3.  **User Activity** - Cookies and other activity trackers log user behavior in mobile apps and websites.  These activity trackers sometimes have a user experience benefit (e.g. remembering your login), but can also be used to ["eavesdrop" on your behavior for commercial or other undesired purposes.](https://www.theverge.com/2022/4/28/23047026/amazon-alexa-voice-data-targeted-ads-research-report).
4.  **Usernames** - Almost every app and website requires a username.  More and more, these sites require a phone number, which is attached to your real identity via a government issued photo ID - [even Signal requires a phone number](https://support.signal.org/hc/en-us/articles/360007318691-Register-a-phone-number#:~:text=Requirements,insecure SMS or phone call.).  Even if the site doesn't actively resolve your personally identifiable information (PII), all personal and corporate usage of the app can be correlated to _your_ username and, via your phone number or other information (such as your location), to _your_ identity. 
5.  **Privacy Policies** - Every mobile app, and most websites, have a privacy policy.  It is rare to find a [privacy policy that is conveyed in plain language](https://www.theatlantic.com/technology/archive/2012/03/reading-the-privacy-policies-you-encounter-in-a-year-would-take-76-work-days/253851/).  Nearly all policies are drafted primarily to protect the organization, often burying how the company plans to use your data.  Some of the worst offenders are companies who offer “free” applications or services - these companies often intentionally leverage your data behind the scenes in order to support their business.

## **Diode's Solution to Reclaim Your Digital Footprint**

Incremental improvements to Internet security will not secure digital footprints - there are too many conflicts of interest. A radically different approach to Internet security is required - a solution that secures user connections, data, identities, and social graphs. 

Here is how Diode approaches the vulnerabilities listed above:

1.  **Lack of security** - We use End-to-End Encryption (E2EE) so that the content of communications (such as messages, files, etc.) is encrypted on the sender's device and only decrypted on the recipient's device. This eliminates the possibility of a third party hack while allowing for secure filing sharing and team collaboration. 
2.  **DNS** - Although you can access normal websites via Diode, Diode-secured resources have no central authorities who manage domain name registrations. Diode's approach uses a global network of independently operated servers who equally contribute to domain name lookups (Diode's "[Blockchain Name System](https://support.diode.io/article/2bzhaehdp2-reserving-a-domain-name)"). 
3.  **User Activity** - Diode has made a commitment not to collect application usage behavior as part of our commitment to privacy. 
4.  **Usernames** - Although the Diode App does use an anonymous username, there are no phone numbers or email accounts associated with the username.  People can choose one or more anonymous user names in order to further isolate their communications - for example to isolate work and personal usernames. 
5.  **Privacy Policies** - Although Diode also has a [privacy policy](https://diode.io/privacy-policy/), we try to keep it short.  At the end of the day, we protect your privacy by not having access to any of your communications or data in the App.

We are working hard to help transform the Internet into everyone’s private network. We know that Diode can't do it alone - the Diode Network is an _open_ E2EE [data fabric](https://www.dataversity.net/data-fabric-architecture-101/).  That means that many solutions can be built on it and integrate with it to address unique privacy and censorship problems around the world. Diode is helping to flip the common story of monetizing a user digital footprint – basically selling your data – to instead empower users to regain sovereignty of their communications and collaborations.  

If this sounds like the route you want to take for yourself, your organization, or your company, [try Diode.io out](https://diode.io/download/#download-app) today.
