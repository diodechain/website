---
layout: post
title: "The hidden threat"
date: 2019-01-21 13:23
categories: [Security]
tags: [Security, Blockchain]
image: img-03.jpg
---

If you're running IoT devices in your business or at your home it's likely that you're protected by 30 year old security infrastructure. In this post we will have a deeper look into what PKI is that holds most of the internet together today and summarize the more obvious known flaws and security threats. This will be the beginning of a series where we will have a look at...

In 1994 Netscape started to make the Web secure and created with the SSL protocol the first stepping stone for today's internet security. With it came the adoption of https - The <strong>secure</strong> version of the Hypertext transmission protocol and the public key infrastructure based on the X.509 standard. 

There are many different theoretical and practical implementations of public key infrastructures. In the following we will talk about the concrete implementation used to protect websites and most internet communication, furthermore as just "PKI". 

In todays internet setting up a domain and securing it with PKI is straight forward - In some cases fully automatic. In the background though there are different actors  working to together to make this possible.
Let's walk through this step by step for our imaginary domain "example.com"
The first step is the getting the ownership of the a domain name. This usually happens through a domain registrar such as GoDaddy. Often these registrars offer the additional services of associating the name "example.com" with a machine readable IP Address such as (208.109.192.70). These IP Addresses are used to route traffic through the world wide web, and are what the machines are actually using to communicate each other. This is similar to the connection between a persons name in a phone book and the actual telephone number.
When a user types the name "example.com" his browser is now able to look it up in the global Domain Name System (DNS) and retrieve the IP Address 208.109.192.70 to create the connection. 
For a secure connection on the other side of the connection the server will provide a PKI certificate, 

For the last step a certificate authority is required. This authority is already known to and trusted by browsers around the world. The certificate authority or short CA provides a signature on the servers certificate. The signature combines the name "example.com" and the servers identity and testifies that these belong together. Typically though certificate authorities have their certificates organized in a hierarchy. That means there is a <strong>root certificate</strong> of this certificate authority that is known and trusted to by the browsers, but it's not this root certificate which testifies. But instead there are multiple <strong>intermediate certificates</strong> which the root certificate has testified to and delegated all it's power. Then in day-to-day business the certificate authority is using one or multiple of these intermediate certificates to testify the ownership of "example.com" to the server identity.

The biggest certificate authorities by number of certificates signed are Comodo, GoDaddy and Symantec who account for around three-quarters of all internet certificates. But there are many more certificate authorities. While Netscape shipped in 1995 with just a handful of root certificates, today all the standard web browsers such as Google Chrome, Firefox, Safari, Edge, Internet Explorer come with a builtin list of around two hundred root certificates. Additional to that there is a second layer of intermediate certificates signed by these root certificates that inherit the same trust by the browser. Often these are subsidies or partners of the root certificate owners. In total there are some 3800 3rd party certificates that current web browsers and applications trust to testify.

This wide availability of trusted third party certificates has allowed the web to grow into all regions of the planet, having trusted certificates in hundreds of organizations across more than 50 countries. This is an amazing achievement in moving the adoption of the secure internet forward, especially given that this type of distributed trust system was developed many years before blockchain based consensus was invented. In the upcoming posts of this series we will be looking into some of the trust problems of this system and conclude with why we are determined that it's time for the internet and IoT especially to move beyond the current PKI structure and adopt blockchain technology for the distributed consensus.

== to do ==

* End with some highlights of the weaknesses
* * ValidityValidity
* * Common Name Consensus
* * Revocation
* Add specific but funny details, e.g.:
* * Netscape screenshot
* * The four Netscape 1.0 root certificates AT&T Bell Labs / RSA / Netscape / MCI
* * SSL to TLS renaming because of Microsoft pressure
* Maybe add issue examples / quotes

<blockquote cite="https://news.netcraft.com/archives/2019/01/10/gov-security-falters-during-u-s-shutdown.html">
As more and more certificates used by government websites inevitably expire over the following days, weeks — or maybe even months — there could be some realistic opportunities to undermine the security of all U.S. citizens.
</blockquote>

https://holtstrom.com/michael/tools/asn1decoder.php
https://ccadb-public.secure.force.com/mozilla/IncludedCACertificateReport
