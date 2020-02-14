---
redirect_from: burning-platform-pki/2019/04/08/why-there-are-3652-organizations-that-can-read-your-traffic.html
layout: post
title: "Why there are 3652 organizations that can read everyone's encrypted traffic"
date: 2019-04-08 13:23
categories: [Burning-Platform-PKI]
tags: [Burning Platform, Security, PKI]
image: Netscape-and.png
author: Dominic Letz
---

You may not be aware of this but if you are browsing the web or running IoT devices in your business or at your home, you are being protected by a 30-year-old security infrastructure. In this post, we will uncover the history of the internet PKI that holds most of the internet together today and highlight some of the most obvious threats and known flaws. This article is the first in a series investigating the current state of PKI and the events leading up to the first Diode concept.

In 1994, Netscape started to make the Web secure and created, with the SSL protocol, the first stepping stone for today's Internet security. With it came the adoption of HTTPS - The **secure** version of the HyperText Transmission Protocol and the public key infrastructure based on the X.509 standard.

The Internet, being a rich archive, we can quickly find the [first public version of the Netscape Navigator 1.0 from 1994](https://winworldpc.com/product/netscape-navigator/1x), using "Wine," a Windows emulation software, it is even possible to run Netscape Navigator version 1.0 today:

![alt_text](images/blog/Netscape-and0.png "image_tooltip")

Netscape Navigator 1.0 was developed in 1994 by a team led by Marc Andreessen, who later went on to found Andreessen Horowitz

Unfortunately, there are hardly any websites that can still be viewed using this ancient browser, but let's dig deeper!

Downloading the executable and seeing the RSA logo confirms that this version has SSL support, for the first time on the Internet. Using Linux command line commands **strings** and **grep**, we locate the embedded root certificates of this very first version.  Here they are in all their base64 glory:

```
$ md5sum NETSCAPE.EXE
34a9c1e0f8d4650ede0c4b5ec8bae1ad  NETSCAPE.EXE

$ strings NETSCAPE.EXE | grep MII
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
```

We want to make them human readable and find out which organizations were here so early in the game. Unfortunately, these certificates from 1994 are not yet the X.509 standard certificates that we would be able to decode using the OpenSSL command line tools. But they still are ASN1 encoded, so we can dump them one by one with dumpasn1 and check their **organizationName.**First, we have to get from base64 to binary-asn1, and then to readable text. So in one bash command something along this line.

```
base64 -d - | dumpasn1 - 2>&1 | grep -m1 -A1 ' organizationName '
```

This takes a line of input from above and spits out the first line matching " organizationName" as well as one line directly after that. Now to combine that with the previous command, we need one more tool. xargs will help us to split each of the four certificates and call the above decoding command for each one of them:

```
$ strings NETSCAPE.EXE | grep MII | xargs -I % -n1 sh -c "echo % | base64 -d - | dumpasn1 - 2>&1 | grep -m1 -A1 ' organizationName '" | grep -oE "'.+'"
'Netscape Communications Corp.'
'RSA Data Security, Inc.'
'RSA Data Security, Inc.'
'MCI'
```

There are a total of four certificates in the Netscape 1.0 binary belonging to three companies. Netscape itself, RSA Data Security, and MCI. At the time, MCI was a large telecommunications company that supported Netscape with a $7 million deal to build an online marketplace. For more on that background story, there is nice coverage directly between Marc Andreessen and Vint Carf at minute 24:00:

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/y9bJ8LslSZ4?start=1440" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center>

In 1994, there were only four root certificates. Each root certificate could be used to create entity certificates for websites. Subordinate intermediate certificates were introduced soon after, allowing organizations to keep the root certificates in secure cold storage while only using the subordinate intermediate certificates for creating new website certificates. At that point in time, the Internet had Internet PKI with fundamentally the same structure as today.

The name SSL coined by Netscape for this new protocol had to change after SSLv3 to TLS. Even though the protocol differences between SSLv3 and TLS were rather small, Microsoft, at that time competing with Netscape in the browser wars, [required the name change in order to join the new standard.](http://tim.dierks.org/2014/05/security-standards-and-name-changes-in.html)

From there to today, adoption of SSL/TLS, and with that, the internet PKI was slowly but surely gaining traction. While in 1994 there were only four trusted certificates, today we're looking at a total of more than [3,600 known certificates](https://censys.io/certificates?q=validation.nss.valid%3A+true+AND+parsed.extensions.basic_constraints.is_ca%3A+true) with around 72% percent of all Internet traffic being transmitted in encrypted form. It has become a commodity.

![alt_text](images/blog/Netscape-and1.png "image_tooltip")

In today's Internet, setting up a domain and securing it with PKI is straightforward - in some cases, fully automatic. 

This wide availability of trusted third party certificates has allowed the web to grow into all regions of the planet-we have trusted certificates from hundreds of organizations across more than 50 countries. But the system doesn't scale: at its current size, the number of trusted certificates has become too large. 

Oversight and governance of these certificates is largely a manual task across the whole Internet. Misuse of trusted certificates, as well as industrial espionage, are on the rise. To fight this angle of attack, new certificates are being issued for shorter and shorter validity periods, but this increases the maintenance efforts on the owner's side who want to protect their communication. The recent US government shutdown showcased that again. During the relatively short shutdown period, multiple US government websites became effectively unprotected because the current Internet PKI system forced a renewal action, but [operators we're not able to renew the short lived certificates during a government freeze](https://news.netcraft.com/archives/2019/01/16/manufacturing-gov-and-white-house-security-suffer-under-u-s-shutdown.html).

![alt_text](images/blog/Netscape-and2.png "image_tooltip")

The Internet PKI as introduced by Netscape was an amazing achievement. It started the widespread adoption of secure communications.  This achievement is even more impressive given that this type of distributed trust system, now spanning thousands of organizations, was developed years before blockchain based consensus was invented. However, the system is clearly showing it's age. Having over 3,600 copies of what essentially are master keys around the globe doesn't scale, and more importantly, does not sufficiently guarantee security anymore. This brings us back to the headline. Every single one of these certificates can be used to issue valid certificates for all domain names worldwide, and [any](https://www.esecurityplanet.com/network-security/symantec-issues-fraudulent-google-ssl-cert.html) [one](https://www.securityweek.com/lets-encrypt-issues-15000-fraudulent-paypal-certificates-used-cybercrime) of them [might do so in order to tap into your traffic at any time](https://www.zdnet.com/article/indian-government-agency-issues-fake-google-certificates/). Your browser, your operating system or the operating system of your IoT devices will not be able to tell the difference, because all these certificates are equally valid, [yet you might be compromised](https://news.netcraft.com/archives/2014/02/12/fake-ssl-certificates-deployed-across-the-internet.html).

Today we have much better tools to handle distributed consensus and are able to create security without thousands of master keys. In the upcoming posts of this series, we will be looking into some of the trust problems arising from this system, and conclude with why we are determined to move the internet and IoT especially beyond the current PKI structure to adopt blockchain technology for anchoring certificates and ownership instead.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">While the <a href="https://twitter.com/hashtag/darkmatter?src=hash&amp;ref_src=twsrc%5Etfw">#darkmatter</a> discussion is still going on we had a look at the awesome stats from <a href="https://twitter.com/censysio?ref_src=twsrc%5Etfw">@censysio</a>, checking whom else browsers are trusting. 6 DarkMatter certificates are now known, time to start discussion on the other 3,646? <a href="https://twitter.com/hashtag/decentralizedPKI?src=hash&amp;ref_src=twsrc%5Etfw">#decentralizedPKI</a> anyone? <a href="https://t.co/SdfRuqhCY9">pic.twitter.com/SdfRuqhCY9</a></p>&mdash; Diode (@diode_chain) <a href="https://twitter.com/diode_chain/status/1107550806566330369?ref_src=twsrc%5Etfw">March 18, 2019</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Sources

[https://www.networkcomputing.com/network-security/encrypted-traffic-reaches-new-threshold](https://www.networkcomputing.com/network-security/encrypted-traffic-reaches-new-threshold)

[https://www.netcraft.com/internet-data-mining/ssl-survey/](https://www.netcraft.com/internet-data-mining/ssl-survey/)

[https://ccadb-public.secure.force.com/mozilla/IncludedCACertificateReport](https://ccadb-public.secure.force.com/mozilla/IncludedCACertificateReport)

[https://censys.io/certificates?q=validation.nss.valid%3A+true+AND+parsed.extensions.basic_constraints.is_ca%3A+true](https://censys.io/certificates?q=validation.nss.valid%3A+true+AND+parsed.extensions.basic_constraints.is_ca%3A+true)

[https://www.fortinet.com/blog/industry-trends/as-the-holiday-season-draws-near--mobile-malware-attacks-are-pre.html](https://www.fortinet.com/blog/industry-trends/as-the-holiday-season-draws-near--mobile-malware-attacks-are-pre.html)

[https://www.feistyduck.com/ssl-tls-and-pki-history/](https://www.feistyduck.com/ssl-tls-and-pki-history/)

[http://tim.dierks.org/2014/05/security-standards-and-name-changes-in.html](http://tim.dierks.org/2014/05/security-standards-and-name-changes-in.html)