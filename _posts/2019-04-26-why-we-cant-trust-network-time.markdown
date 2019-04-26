---
layout: post
title: "Why We Can't Trust Network Time"
date: 2019-04-26 11:41
categories: [Burning-Platform-PKI]
tags: [Burning Platform, Security, Time]
author: Dominic Letz
image: Why-We0.png
---

<blockquote>

“If you knew Time as well as I do,” said the Hatter, “ you wouldn’t talk about wasting it. It’s him.” <br/>

“ I don’t know what you mean,” said Alice. <br/>

“ Of course you don’t !” the Hatter said, tossing his head contemptuously. “ I dare say you never even spoke to Time !

<small>Alice in Wonderland</small>

</blockquote>

In order to trust a time source, we need to validate its certificate. In order to validate a certificate, we need to know the current time. This is a catch-22. 

But why would a device not have the correct time in the first place and why is the time so important for certificate validation? This is the second part of a blog post series about the history of PKI and its current problems. If you've missed the previous post and want to know more about the history please [go here and check it out.](https://diode.io/burning-platform-pki/2019/04/08/why-there-are-3652-organizations-that-can-read-your-traffic.html) For today we just need to know that PKI is the internet trust system that works with central certificate authorities. These central authorities create signed certificates for domain names, machines, and services on the internet. The system requires an awareness of time that it captures in **validity periods**. Each signed certificate has a certain validity start and validity end date.

The validity period on each certificate serves three major purposes:  

**First**, it supports the case of normal domain ownership change. When a domain changes owners the validity periods ensure that after a sensible amount of time the new owner can be sure that the old owner does not hold any active certificates anymore. The validity period enforces that the domain ownership has to be proven in regular intervals to the certificate authority. 

**Secondly**, short validity periods helps in minimizing damages from successful hacker attacks and other types of misuse. When anywhere in the supply chain malicious usage occurs. 

**Thirdly**, the validity periods allow for technological upgrades in the encryption algorithms. As mechanisms are being found to be compromised or have cryptographic weaknesses, these can be excluded from the new issues successor certificates. This happened for example when the industry decided to [deprecate SHA1 fingerprints in certificates](https://knowledge.digicert.com/generalinformation/INFO3977.html).

Pragmatically speaking there's a **fourth** important aspect of validity periods in PKI certificates. And that is that the other approach the so-called revocation of a certificate is effectively non-functional on the internet. E.g. in the case of the above-mentioned ownership change of a domain, it would be much cleaner to revoke an existing certificate instead of waiting for its expiry. Unfortunately, though the two standards that have been defined for certificate revocation CRL and OCSP are not being used systematically. Most tools don't check revocation by default at all, those that do usually only check either CRL or OCSP and finally most suppliers don't care to even register certificates as revoked when they should.

![alt_text](/images/blog/Why-We1.png "Google Chrome vs. Firefox revocation checking")

A prime example of non-working revocation is the website [https://revoked.grc.com](https://revoked.grc.com), which shows the different behaviors from Google Chrome, Firefox, Safari and Internet Explorer. The situation is even worse with non-browser software tools such as wget, curl and most IoT deployments where there is no browser facilitating communication - these nearly never check any revocation. As a result, the validation periods are the primary and only reliable protection.

Unfortunately for IoT devices, these validation periods go all up to the chain to the very top **root certificates**, those that were used to sign the domain certificates. This means not only that devices need to always know the current time but they also need at all times to ensure to have a set of non-expired root certificates. In short there is no way for devices today to get around the requirement to know time in the first place.

# Why IoT Devices Can't Keep Track Of The Correct Time Alone

There are devices that can keep time accurately for an extended period of time. Most computers and notebooks have built-in battery driven clocks and their charge will in most circumstances never go to zero allowing them to keep the time mostly accurate. Small drifts of time such as by a couple of minutes or even hours are also not a problem since even that accuracy is enough to reasonably well differentiate valid from invalid certificates. Additionally there is a human factor for computers. Because we use computers it is often a human that is using the computer provided time and thus double checking whether the current time is correct. 

That's different for many IoT devices without displays though. Most IoT devices don't have a display, such as lamps, connected shoes, washing machines, cars, GPS trackers or even industrial routers. Additionally many IoT devices are by their nature mobile, battery powered and relatively often completely powered off. These products do run out of power at some point, while others are just be so cheaply mass-produced that they don't even come with an internal battery and/or clock to track time. But also larger appliances are affected. Let's imagine a washing machine that is sold through a retailer. This machine could well sit disconnected without power on shelf for an extended period of time before it is being bought. Whenever an embedded device runs completely out of power - meaning there is no standby power dedicated to keep an internal clock running it will either completely forget the current time and reset to manufacturing time or freeze at the current time like a wrist clock. Now when such a device is powered on again and comes online to receive commands from its owner it first needs to fetch the current time to be able to validate any PKI certificate. In the example of the washing machine It might easily have been a year between the washing machines manufacturing when it last was programmed with a current time and its first installation and powering up in a consumer's home network - in some cases significantly more time.

The connected shoe or the industrial gateway need to be able to deal with this situation from a system design perspective. The circumstances in which they lose track of time can be rare but the logic to fetch the current time from a time server must be present for the case when it is needed. For an attacker this means that there are avenues to inject a wrong time into the device. In most cases devices are still using the [non secured network time protocol](https://tools.ietf.org/html/rfc868). If that is the case it is easy for the attacker to inject a wrong time. The attacker just needs to get between the device and it's time server.

# What It Means To Trust Expired Certificates

![Google Chrome vs. Firefox revocation checking](/images/blog/Why-We2.png "Google Chrome vs. Firefox revocation checking")

An IoT device as discussed above that comes online or gets powered on first needs to find out what the current time is. And it has no choice but to make a leap of faith in order to successfully fetch the current time. It can choose to make this leap of faith either in a) insecurely getting the time from a time server - e.g. by using the unsafe network time protocol or in b) trusting an expired certificate from a secure time server. In both cases, strict security guarantees are gone. In fact, attacks become very easy, if an attacker can get into the middle between the device and its server.

Both choices a) and b) have the same fundamental issue. If the device decides to trust a time server without validation, that time-server might provide it with a wrong time. E.g. an arbitrary old time, as a result the attacker gets the opportunity to present the device with a wrong time to make certificates that have actually expired appear to be still valid. This is the same issue as if the device opts to trust an expired certificate directly to establish the current time. 

The problem is that at this moment the device becomes susceptible to attacks using any of  the masses of expired certificates. This is especially true for the currently over 3000 active intermediate certificates. All of these expire and have one or more generations of predecessor certificates that are already expired - these generations of expired certificates are heaps of digital toxic waste. Expired certificates are usually considered worthless, and do not receive the same level of protection as active certificates from operators. Instead of needing to steal an active valid certificate from a server - it is enough for an attacker to retrieve any past and now expired certificate. And since the [trading of stolen certificates is rampant on the dark web](https://searchsecurity.techtarget.com/news/252460108/Study-reveals-sale-of-SSL-TLS-certificates-on-dark-web) it means that launching an attack on any such IoT device becomes a cheap operation. The purchase of a single expired intermediate certificate allows a malicious attacker to attack any number of devices.

# Way Forward

Today fetching time from a network is not possible in a secure way. This in return shakes the foundation of PKI security for internet communication. Next to the [PKI governance issues discussed](https://diode.io/burning-platform-pki/2019/04/08/why-there-are-3652-organizations-that-can-read-your-traffic.html) in the last blog post this poses a major technical security issue. In the next blog post of this series we want to introduce a new secure network time protocol based on blockchain technology and show how even the smallest devices can establish completely secure connections. Be sure to follow our [twitter account](https://twitter.com/diode_chain) to get notified when the next post comes out.

<hr/>

Sources

[https://knowledge.digicert.com/generalinformation/INFO3977.html](https://knowledge.digicert.com/generalinformation/INFO3977.html)

[https://revoked.grc.com/](https://revoked.grc.com/)

[https://tools.ietf.org/html/rfc868](https://tools.ietf.org/html/rfc868)

[https://searchsecurity.techtarget.com/news/252460108/Study-reveals-sale-of-SSL-TLS-certificates-on-dark-web](https://searchsecurity.techtarget.com/news/252460108/Study-reveals-sale-of-SSL-TLS-certificates-on-dark-web)
