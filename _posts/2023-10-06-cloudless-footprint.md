---
layout: post
title: Cultivate a Cloudless Footprint 
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
3.  **Cookies** - Cookie consent popups often feel tedious, but the warnings are there for good reason.  Cookies are little bits of code stored on your computer that allow user behavior to be tracked by the website owner who issued the cookie.  Cookies sometimes have a user experience benefit (e.g. remembering your login), but they are also used to track users actions - whether it be related to online browsing activity or [conversations overheard by a smart speaker](https://www.theverge.com/2022/4/28/23047026/amazon-alexa-voice-data-targeted-ads-research-report).
4.  **Usernames** - Almost every app and website requires a username.  More and more, these sites require a phone number, which is attached to your real identity via a government issued photo ID - [even Signal requires a phone number](https://support.signal.org/hc/en-us/articles/360007318691-Register-a-phone-number#:~:text=Requirements,insecure SMS or phone call.).  Even if the site doesn't actively resolve your personally identifiable information (PII), all personal and corporate usage of the app can be correlated to _your_ username and, via your phone number or other information (such as your location), to _your_ identity. 
5.  **Privacy Policies** - Every app, and most websites, have a privacy policy.  It is rare to find a [privacy policy that is conveyed in plain language](https://www.theatlantic.com/technology/archive/2012/03/reading-the-privacy-policies-you-encounter-in-a-year-would-take-76-work-days/253851/).  Nearly all policies are drafted primarily to protect the organization, often burying how the company plans to use your data.  Some of the worst offenders are companies who offer “free” applications or services - these companies often intentionally leverage your data behind the scenes in order to support their business.

## **Diode's Solution to Reclaim Your Digital Footprint**

Small changes to the Internet’s underlying technologies will not secure your digital footprint - there are too many conflicts of interest. A radically different approach to Internet security is required - a solution that secures user connections, data, identities, and social graphs.

Here is how Diode approaches the vulnerabilities listed above:

1.  **Lack of security** - End-to-End Encryption (E2EE) is used by Diode so that the content of communications (such as messages, files, etc.) is encrypted on the sender's device and only decrypted on the recipient's device. This eliminates the possibility of a third party hack while allowing for secure filing sharing and team collaboration. 
2.  **DNS** - Diode provides decentralized DNS and global static addresses with no single central authority to manage the domain name registrations. Rather, Diode has a system that relies on a network of independently operated servers, giving users more ownership and control to manage domain names and records without relying on a provider. 
3.  **Cookies** - There is absolutely zero user tracking within our app by cookies which completely eliminates the collection of personal information via a user's online behavior, interests, or preferences.  In the Diode app, there is nowhere to observe or store personal user information.  
4.  **Usernames** - Each zone is created with a unique pseudo username to remove the usage of a single, globally identifiable username. These pseudo usernames are specific to the respective zone and may not be linked directly to the user's primary account.
5.  **Privacy Policies** - Despite developing and enhancing the user experience within the Diode app, Diode doesn’t have any of your information. All chat, collaboration, file uploading, or other features used are entirely encrypted and unreadable by any of the Diode team.

We are motivated to help transform the Internet into everyone’s private network. This won’t happen with Diode alone.  We have created the Diode Network to be an _open_ E2EE [data fabric](https://www.dataversity.net/data-fabric-architecture-101/) for the creation of complementary solutions to address unique problems around the world. Diode is helping flip the common story of monetizing a user profile – basically selling your data – to empower users to regain sovereignty of their communications and collaborations.  

If this sounds like the route you want to take for yourself, your organization, or your company, [try Diode.io out](https://diode.io/download/#download-app) today.
