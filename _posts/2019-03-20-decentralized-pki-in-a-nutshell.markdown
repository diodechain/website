---
layout: post
title:  "Decentralized PKI in a nutshell"
date: 2019-03-20 16:58
categories: [Burning-Platform-PKI]
tags: [Burning Platform, Development, Security, PKI, Decentralization]
image: conflict.png
author: Dominic Letz
redirect_from:
- /burning-platform-pki/2019/03/20/decentralized-pki.html
- /burning-platform-pki/decentralized-pki-in-a-nutshell-19079/
---

In Today's internet, the authenticity of content is secured by the internet PKI system and the domain name registries. To make it all work first the domain name server (DNS), second you - holding the certificate and the corresponding private key and third a certificate authority which signed your certificate all have to agree on the same data to create this security.

A single miss like a domain name server pointing to a different server - not yours - is already enough for hackers to create a fake certificate and impersonate your website [such as in the hack of a Brazilian bank's online operations](https://www.wired.com/2017/04/hackers-hijacked-banks-entire-online-operation/). The same is true if a certificate authority is issuing a second certificate to someone else deliberately, like when [Symantec employees created secondary certificates for Google domains without Google knowing about it](https://news.softpedia.com/news/three-symantec-employees-fired-for-issuing-fake-google-com-ssl-certificates-492190.shtml). In order to prevent that abuse a system of checks and balances is has been built and is enforced by big browser companies such as Google and Mozilla, maker of Firefox. Still, the conversations about who is eligible and who is not to be a certificate authority are hard to formalize, such as in the case of the [United Arab Emirates government contracted company DarkMatter](/burning-platform-pki/2019/01/27/darkmatter.html).

> For years, though, hackers have been using valid signing authorities to create valid authentication signatures for <strong>bad updates</strong><small>Bruce Schneier - Click Here to Kill Everybody</small>

The problems with still using this solution are that:

1. The current system is so complicated that it might be impossible to keep completely secure & fair
2. While Internet PKI usage in browser software is watched by Google and Mozilla, nobody is keeping an eye on m2m and IoT traffic
3. There is a much simpler solution

Proving ownership in the digital world used to be a hard problem. The method Netscape introduced in 1995 relied on external trusted authorities who always tell the truth. It was intended to protect websites against man-in-the-middle attacks and proof that the content you see is authentic. This is still the system we use today as internet PKI. With the invention of blockchains such as Bitcoin and Ethereum though, we have gotten new options. Today it is easily possible to store and retrieve information about a domain all in the same place. So information such as who owns the domain, what IP-addresses are the servers at and what public keys will be used can be stored in one place - removing the threat of fake certificates and malicious actors at certificate authorities.

This is what we do at Diode for IoT, so when a device connects mqtts://mycloud.diode domain and key information are fetched from the blockchain, because why would you do anything else?

What really bugs us though is when will Mozilla and Google finally start doing the same and bring security to all browsers? If you wonder the same, let's bring the tag #decentralizedPKI to twitter and ask them.
