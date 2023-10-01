---
layout: post
title: Your Cloudless Footprint 
date: 2023-10-02 13:45
categories: [Security]
tags: [Security, Decentralisation]
author: MNJR
image: cloudless footprint.jpeg

---
# Your Digital Footprint

Most of us use online technologies for essential tasks - when we do, our activity creates a “digital footprint” that can put our online security and privacy at risk.

Digital footprints often contain sensitive and personal information, such as browsing history, location data, social media posts, schedule, online purchases, how your respond to certain messages, and even some communications. In aggregate, they create a picture of who you are and how you behave.

**Security Risks:** Digital footprints can inadvertently expose valuable information to would-be attackers. For individuals, this exposure can lead to a theft of identity details - often for use in an financial crime.  For companies, this exposure can heighten the risk of cyberattacks or data breaches for themselves, partners, and suppliers. A chain of vulnerabilities can be exploited in linked third party systems, jeopardizing the security of many organizations.

**Privacy Concerns:** The profile built from your digital footprints is often sold by online platforms and advertisers to the highest bidder - your profile becomes their product. Additionally, your digital footprint can often be correlated to your real identity - in an increasing number of geo-political regions this correlation can lead to unexpected and undesired surveillance.

# The Free-for-all on Your Digital Footprint

Here are five systemic vulnerabilities through which your digital footprints, and more, are leaked.  Please note, we don’t even delve into the more [fundamental problems with Internet security](https://diode.io/blog/why-there-are-3652-organizations-that-can-read-everyones-encrypted-traffic).  

We’ll try to be brief:

1.  **Lack of security** - Many websites and applications don’t actually secure your conversations.  Probably the most interesting violator is Telegram becuase many people perceive Telegram to be a security-first chat application, but actually all group chats and default DMs are totally unencrypted and [readable by Telegram](https://www.makeuseof.com/telegram-security/) and maybe others.
2.  **DNS** - The entire Internet runs on the Domain Name Service.  Even our website, diode.io - the name “diode.io” is domain name.  Every time you look up a website your request can be geo-located to your address and device, and correlated with the details of your web browsing history. [Google owns the majority of the Internet’s DNS infrastructure](https://en.wikipedia.org/wiki/Google_Public_DNS), and DNS is by default in plain text - anyone sniffing around can see who you are talking to.
3.  **Cookies** - We find it ridiculous all of the cookie consent popups these days - but they are there for good reason.  Cookies are little bits of code stored on your computer that allow your behavior to be tracked by whoever issued the cookie.  This is how you are offered an ad for something related to your current actions - whether it be what you are looking at online or [what you are saying](https://www.theverge.com/2022/4/28/23047026/amazon-alexa-voice-data-targeted-ads-research-report).
4.  **Usernames** - All apps and websites have a username.  More and more you can’t just choose a username that is separate from your real identity - [even Signal requires a phone number](https://support.signal.org/hc/en-us/articles/360007318691-Register-a-phone-number#:~:text=Requirements,insecure%20SMS%20or%20phone%20call.) - which requires a government issued photo ID.  Even if they didn’t require personally identifiable information, all your personal and corporate use of that app is correlated to _your_ username. 
5.  **Privacy Policies** - Every app, and most websites, have a privacy policy.  However, it is very rare to find a privacy [policy that speaks in plain language](https://www.theatlantic.com/technology/archive/2012/03/reading-the-privacy-policies-you-encounter-in-a-year-would-take-76-work-days/253851/) - they are nearly all legalese that serves to protect the organization because they’ve told you they will use your data.  Sometimes this is not becuase the organization is intentionally leveraging your data behind the scenes - sometimes it is just a fact of life based on the technology partners they rely on to deliver you the service.

# Diode's Radical Solution

Small changes to the Internet’s underlying technologies are not going to secure your digital footprint.  There are too many conflicts of interest.  A radically different approach to Internet security is required - one that secures your connections, your data, your identity, and your social graphs.

Here is how Diode treats each of the vulnerabilities above:

1.  **Lack of security** - End-to-End Encryption (E2EE) is used by Diode so that the content of communications (such as messages, files, etc.) is encrypted on the sender's device and only decrypted on the recipient's device. This eliminates the possibility of a third party hack while allowing for secure filing sharing and secure team collaboration. 
2.  **DNS** - Diode provides a decentralized DNS and global static addresses with no single cnetral authority to manage the domain name registrations. Rather, we hahve a system that relies on a network of indepdenently operated servers, giving users more ownership and control over their domain names while being able to manage their own domain records without relying on a provider. 
3.  **Cookies** - There is absolutely zero tracking in our app through your cookies meaning we avoid the collection of personal information via online behavior, interests, or preferences. There is nowhere in the Diode app where we can observe or store this type of information.  
4.  **Usernames** - Each zone is created with its own pseudo username to remove the usage of a single, globally identifiable username. These pseudo usernames are specific to the respective zone and may not be linked directly to the user's primary account.
5.  **Privacy Policies** - Despite working on the Diode app, not even Diode has your information. Any chat, collaboration, file uploading, or other features used are enitrely encrypted and unreadable by Diode itself.

Finally, Diode's goal is to transform the Internet into a private network accessible to everyone. Achieving this vision requires more than just Diode itself. That's why our Diode Network is an open end-to-end encrypted (E2EE) data fabric that an increasing number of people are building solutions around. Furthermore, this transformation won't succeed without an alternative to the current practice of selling your profile to the highest bidder. This is where blockchain tokens come into play. Instead of the traditional 'he who has the gold makes the rules,' we adopt a new approach: 'he who creates wildly popular apps receives greater rewards.' We harness [Metcalf’s law](https://en.wikipedia.org/wiki/Metcalfe%27s_law) as a meritocrical incentive to replace the incentive to sell your data to the highest bidder. 

If this sounds like the route you want to take for yourself, your organisation, or your company, [try Diode.io out](https://diode.io/download/#download-app) today.
