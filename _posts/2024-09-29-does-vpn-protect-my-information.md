---
layout: post
title: Does VPN Protect Me? 
description: How Diode improves on the privacy of VPN services
date: 2024-09-29 12:00
categories: [Diode, Security]
tags: [Diode, Diode Drive, Zero Trust, Security,Decentralization, Self-Custody]
author: MNJR
image: 	assets/img/blog/vpn-protect-information-blog.jpg

---

When it comes to privacy, many people turn to VPNs to protect their information and data. Unfortunately, traditional VPNs have a few shortcomings that most people aren't aware of. 

Diode addresses each of these key issues.

### Four Key Issues with VPN:

**VPN Servers Have Access to Some of Your Information**

Every VPN service has access to two important pieces of information about you: 1) What websites you visit 2) Who you are (via your billing data).  Sometimes, depending on the security of the websites you visit, the VPN service will also have access to more information than that.

In January of 2024, [a free VPN exposed](https://www.cyberghostvpn.com/privacyhub/chinese_vpn_leaks_user_data/) the IP dresses, IDs, domain names of websites visited, and app usage timestamps of 5.7 billion data entries after a breach. If VPNs didn't store such sensitive data in the first place and know what sites you look at and who you are, there would be nothing to leak in the event of a breach.

**VPN is Easy to Detect**

When your device is using a VPN, it is easy to detect from observing the network the computer is on. Websites, apps, and ISPs do this for a [variety of different reasons](https://www.fortinet.com/resources/cyberglossary/vpn-blocker) such as copyright protection, network security, government censorship, network load management, and so on. 

If using VPN is a “red flag” in your region, just the use of the VPN could create undesirable attention as well as block teams from being able to access necessary sites or tools they need while traveling.

**VPN “takes over” Your Device**

When you run a VPN, your computer [slows as all Internet traffic](https://surfshark.com/blog/do-vpns-slow-down-internet) funnels into the VPN. Therefore, people often turn VPN off and then forget to turn it back on, leading to [unintentional data leaks and potential breaches](https://nordvpn.com/blog/does-a-vpn-protect-you-from-hackers/). 

VPN runs at a "low level" on your device, so if you are a hardcore VPN user who runs one all the time, you can also be exposed to bugs that operate in the network stack like the recent ["Tunnel Vision" attack](https://thehackernews.com/2024/05/new-tunnelvision-attack-allows.html).

**Enterprise VPN Needs Static IPs or Vulnerable Trust Brokers**

If you want to create a VPN connection to an office or piece of machinery or server, both sides have to have a static IP address, or you have to use a “[trust broker](https://diode.io/blog/trust-broker-security)”.  In the former case (static IP addresses), your team will [experience difficulties](https://www.remote.it/resources/top-ten-vpn-struggles) in setting up and managing the connections.  In the latter case (using trust brokers), you introduce a high value target for [hackers to exploit](https://cybersecuritynews.com/post-exploitation-tactics-on-ivanti-fortigate-vpn-servers-hack/). 

Additionally, because enterprise VPN connections usually egress in a sensitive environment (e.g. your office), they can also be [unintended routes for hackers to exploit the secure network you are connecting to](https://thehackernews.com/2024/02/us-state-government-network-breached.html).


### Diode Fixes all Four Issues

**Completely Private**

Diode allows you, or your trusted IT provider, to run your own VPN exit node in your home, your office, or other secure location.  Since only the “exit node” provider can tell what sites you are looking at, it just makes sense to make this provider someone you already implicitly trust.  It takes just one minute to setup and run a Diode exit node. 

This also has the advantage that your VPN connections can't be detected as VPN connections.  Since an exit node can easily be placed in an office or home, whatever website you are accessing (e.g. Netflix) won't detect it as a VPN connection!

Diode is democratizing VPN and putting the “private” back in VPN, creating [“ZTN” (Zero Trust Network)](https://app.docs.diode.io/docs/features/regional-tunnels/). 

**Blends into the Background**

Diode's tunneling connections use TLS security - it is the same type of security as almost every website uses.  Additionally, Diode has over fifty locations (soon to be hundreds!) spread across the world, which randomly change frequently.  So, when you connect to a Diode relay node for your ZTN session, you are not connecting to a server known to be a VPN server.  Your connection a) looks like any other website browsing session b) is not going to a known VPN server location. 

The Diode connection from your computers blends into the background of all the other network traffic from your, and others, computers and phones in the area.

**Browsing-specific Tunneling**

The Diode App doesn't take over your network connection.  Instead, it simply connects each Bookmarked link in its own "TLS tunnel" without impacting any of your other Internet connectivity.  Just like a VPN connection, that specific bookmarked browsing session may be somewhat slower, but the rest of your connections will remain fast.

**Secure Infrastructure**

Diode enables any server, equipment, facility, or computer to connect point-to-point via Diode tunnels.  Their Web3 address serves as their “static IP” address, allowing credentialed access from anywhere. 

Unlike other VPN networks, it eliminates the vulnerabilities of the Trust Broker by [anchoring permissions in blockchain smart contracts](https://network.docs.diode.io/docs/features/lite-nodes-vs-full-nodes/).  These smart contracts operate autonomously, and cannot be be hacked unless the entire blockchain is hacked - they are one of the most secure methods of credential anchoring known to man.  They are not vulnerable to insider threat, social engineering attack, or breached trust broker technologies.  Diode's relay nodes are [mathematically secured](https://diode.io/blog/trust-broker-security).

Finally, if your organizations wants to participate in delivering its own network security, anyone can [set up their own relay node in less than five minutes](https://network.docs.diode.io/docs/). The ease of use and guaranteed security make ZTN a perfect alternative for those looking to replace VPNs or seeking a secure, hassle-free setup to protect their team or device.

To explore further please:
<div class="story__buttons">
  <a href="{{"https://contactdiode.paperform.co"}}" class="btn" target="">Get in Touch</a>
  <a href="#download-app" class="btn popup-open" target="">Try Diode Out</a>
</div>

