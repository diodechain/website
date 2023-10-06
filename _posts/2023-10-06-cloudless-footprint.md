---
layout: post
title: Your Cloudless Footprint 
date: 2023-10-06 13:45
categories: [Security]
tags: [Security, Decentralisation]
author: MNJR
image: cloudless footprint.jpeg

---
## **Your Digital Footprint**

Most of the world uses online technologies for essential tasks and the activities create a “digital footprint” that can put online security, and privacy, at risk.

Digital footprints often contain sensitive and personal information such as browsing history, location data, social media activity and posts, schedules, online purchases, engagement and responses to certain messages, and even some communications. In aggregate, a user picture is created of “who you are and how you behave.”

**Security Risks:** Digital footprints can inadvertently expose valuable information to would-be attackers. For individuals, this exposure can lead to a theft of identity details - often used for financial crimes.  For companies, this exposure can increase the risk of cyberattacks or data breaches for themselves, partners, and suppliers. A chain of vulnerabilities can be exploited in linked third party systems, jeopardizing the security of many organizations.

**Privacy Concerns:** The profile built from your digital footprints is often sold by online platforms and advertisers to the highest bidder - you once again become the product as companies capitalize on your profile. Additionally, your digital footprint can often be correlated to your real identity - in an increasing number of geo-political regions this correlation can lead to unexpected and undesired surveillance.

## **Tracing Your Digital Footprint**

Here are five systemic vulnerabilities through which your digital footprints, and more, are leaked.  Please note, we don’t even delve into the more [fundamental problems with Internet security](https://diode.io/blog/why-there-are-3652-organizations-that-can-read-everyones-encrypted-traffic).  

1.  **Lack of security** - Many websites and applications don’t actually secure conversations.  One of the most interesting violators is Telegram because many users perceive Telegram to be a security-first chat application, but actually all group chats and default DMs are totally unencrypted and [readable by Telegram](https://www.makeuseof.com/telegram-security/) and others.
2.  **DNS** - The entire Internet runs on the Domain Name Service (DNS), even Diode's website, diode.io. The name “diode.io” is the domain name.  Every time anyone looks up a website, the request can be geo-located to a specific address and device, which can be correlated with the details of a user's web browsing history. [Google owns the majority of the Internet’s DNS infrastructure](https://en.wikipedia.org/wiki/Google_Public_DNS). DNS is by default recorded in plain text which allows anyone sniffing around to see who exactly you are talking with.
3.  **Cookies** - Cookie consent popups can often feel ridiculous, but the warnings are there for good reason.  Cookies are little bits of code stored on your computer that allow user behavior to be tracked by the website owner who issued the cookie.  This is what helps a webpage load quicker but also what is used to suggest ads related to a users current actions - whether it be related to online browsing activity or [conversations overheard by a smart speaker](https://www.theverge.com/2022/4/28/23047026/amazon-alexa-voice-data-targeted-ads-research-report).
4.  **Usernames** - All apps and websites utilize usernames.  More and more users can’t just choose a unique username that is separate from a real identity - [even Signal requires a phone number](https://support.signal.org/hc/en-us/articles/360007318691-Register-a-phone-number#:~:text=Requirements,insecure SMS or phone call.) - which connects to a government issued photo ID.  Even if they didn’t require personally identifiable information (PII), all personal and corporate usage of the app is correlated to _your_ username and _your_ identity. 
5.  **Privacy Policies** - Every app, and most websites, have a privacy policy.  However, it is rare to find a [privacy policy that is conveyed in plain language](https://www.theatlantic.com/technology/archive/2012/03/reading-the-privacy-policies-you-encounter-in-a-year-would-take-76-work-days/253851/).  Nearly all policies are written in legalese and drafted to primarily protect the organization while burying how the company plans to use your data.  The worst offenders are companies offering “free” applications or services.  Organizations often intentionally leverage your data behind the scenes, but it could also be the case that the company needs certain information to share with partnering organizations to deliver a better service. Either way, data is often being shared beyond common knowledge.

## **Diode's Solution to Reclaim Your Digital Footprint**

Small changes to the Internet’s underlying technologies are not going to secure your digital footprint. There are too many conflicts of interest. A radically different approach to Internet security is required - a solution that secures user connections, data, identities, and social graphs.

Here is how Diode treats each of the vulnerabilities listed above:

1.  **Lack of security** - End-to-End Encryption (E2EE) is used by Diode so that the content of communications (such as messages, files, etc.) is encrypted on the sender's device and only decrypted on the recipient's device. This eliminates the possibility of a third party hack while allowing for secure filing sharing and team collaboration. 
2.  **DNS** - Diode provides decentralized DNS and global static addresses with no single central authority to manage the domain name registrations. Rather, Diode has a system that relies on a network of independently operated servers, giving users more ownership and control to manage domain names and records without relying on a provider. 
3.  **Cookies** - There is absolutely zero user tracking within our app by cookies which completely eliminates the collection of personal information via a user's online behavior, interests, or preferences.  In the Diode app, there is nowhere to observe or store personal user information.  
4.  **Usernames** - Each zone is created with a unique pseudo username to remove the usage of a single, globally identifiable username. These pseudo usernames are specific to the respective zone and may not be linked directly to the user's primary account.
5.  **Privacy Policies** - Despite developing and enhancing the user experience within the Diode app, Diode doesn’t have any of your information. All chat, collaboration, file uploading, or other features used are entirely encrypted and unreadable by any of the Diode team.

We are motivated to help transform the Internet into everyone’s private network. This won’t happen with Diode alone.  We have created the Diode Network to be an _open_ E2EE [data fabric](https://www.dataversity.net/data-fabric-architecture-101/) for the creation of complementary solutions to address unique problems around the world. Diode is helping flip the common story of monetizing a user profile – basically selling your data – to empower users to regain sovereignty of their communications and collaborations.  

If this sounds like the route you want to take for yourself, your organization, or your company, [try Diode.io out](https://diode.io/download/#download-app) today.
