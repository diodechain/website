---
layout: post
title: Free ngrok Alternative
date: 2022-06-01 14:44
categories: [Diode CLI, Web3, Diode Network]
tags: [Web3, Self-Custody, Decentralization, Free ngrok Alternative, Development]
author: Allen M
image: assets/img/blog/free-ngrok-alternative2.jpg
redirect_from:
- /diode%20cli/web3/diode%20network/free-ngrok-alternative-22152/
---

Diode offers a free ngrok alternative.

[Ngrok](https://ngrok.com/) is a service that allows you to publish services to the Internet and to remotely access local area networks and IT assets. Diode’s [Command Line Interface (CLI) tool](/solutions/cli/) provides a simple interface to the [Diode Network](/solutions/network/) – enabling many of the same use cases as does ngrok. 

Keep reading to understand how you can use the Diode CLI for free to accomplish many of the same use cases as the top ngrok paid plan.

## How the Diode CLI can be used as a free ngrok alternative

### 1)	Cost

Ngrok has an [entry level free plan and a couple of paid plans](https://ngrok.com/pricing). The free plan is for non-commercial use, and the paid plans provide a commercial license.

The Diode CLI is [free for all use cases](/pricing/), regardless if you are using the service for commercial or non-commercial use. If your use case requires a higher quality of service than is available using the standard Diode [fleet contract](https://support.diode.io/article/7vyr5mslsy-what-is-a-fleet-contract), you can create your own fleet contract and underwrite the bandwidth. In this latter case, there is some cost associated, but the economics are designed so the cost will approximate the commodity bandwidth market.

### 2)	Open Source
An [early version of ngrok is open source](https://github.com/inconshreveable/ngrok), but ngrok 2.0 and later is not.

The [Diode CLI](https://github.com/diodechain/diode_client) and [Diode Network server](https://github.com/diodechain/diode_server) applications are open source and available on [Diode’s GitHub](https://github.com/diodechain). We encourage you to contribute.

### 3)	Secure Tunnels

Ngrok [secure tunnels](https://ngrok.com/docs/secure-tunnels#what-are-ngrok-secure-tunnels) provide HTTPS connections for all plans, but only offers TLS (encryption for all other protocols, e.g. TCP) at the highest tier.

All traffic routed via the Diode CLI is [out of the box end-to-end encrypted using TLS](https://support.diode.io/article/jieo6utgv9-are-my-communications-via-the-diode-network-encrypted). This is important because many services that you may want to access cannot run on HTTPS – they must have a TLS connection to be accessible and secure. The Diode community regularly uses the Diode CLI to secure and remotely access services such as [Websockets](https://support.diode.io/article/p2rff6gumf-how-are-you-using-websockets), [SSH](https://support.diode.io/article/ub9xrruimv-ssh), [VNC](https://support.diode.io/article/tmb4zzkpd3-remote-vnc-on-windows), UDP, FTP, [HTTPS](https://support.diode.io/article/ss32engxlq-publish-your-local-webserver), [Stratum](https://braiins.com/stratum-v2), [RTMP](https://support.diode.io/article/3ty9pby3dz-stream-rtmp-video), [Livebook](https://livebook.dev/), and more using the Diode CLI.

### 4)	Always Up to Date

The ngrok agent can be [remotely updated](https://ngrok.com/docs/secure-tunnels#automatic-updates) if you are subscribed to the top paid plan.

All Diode CLI installs have access to automatic updates as soon as they are available – this is the default behavior of the client (also can be disabled if desired). Also, the Diode CLI can be made persistent on any system by using system tools – e.g. on Linux, [systemd](https://support.diode.io/article/gmo8f1f4ys-start-on-bootup)) – a paid feature with ngrok.

### 5)	End to End Encryption

Ngrok is implemented as a traditional web service – cloud servers are at the center of the service, and are responsible for authentication and routing the requests to/from the published network asset. You can contact ngrok to explore options for end to end encryption (AKA [Zero Knowledge Encryption](https://ngrok.com/docs/cloud-edge#zero-knowledge-tls)). 

The Diode CLI uses [end to end encryption by default](https://support.diode.io/article/jieo6utgv9-are-my-communications-via-the-diode-network-encrypted) for all communications. It is also possible to use the Diode CLI to publish a service “publicly” which enables a lower security <client ID>.diode.link end-to-server encryption (similar to ngrok), which may be acceptable in certain instances.

### 6)	Custom Domains

One custom [ngrok.io subdomain](https://ngrok.com/docs/secure-tunnels#http-tunnels-subdomain) or [full domain](https://ngrok.com/docs/secure-tunnels#http-tunnels-custom-domains) is available per paid license.

The Diode CLI allows you to assign a [BNS name](https://support.diode.io/article/5nsoxvhug1-what-is-bns) that is a fully decentralized domain name. All BNS names are hosted as subdomains on diode.link and can be used to access any ports/services published publicly. Further, if you want to use a full domain name (e.g. [for decentralized web hosting](https://diodechain.github.io/website_dev/web3/decentralized-web-hosting-22074/)), it is easy to [configure a custom full Web2 domain name](https://support.diode.io/article/6pctb40wj8-configure-a-custom-domain-for-diode).

### 7)	Self Host

The Internet infrastructure used to supply the ngrok service requires use of [ngrok server assets](https://ngrok.com/docs/ngrok-agent/config#config-region).

The Diode Network is a fully encrypted decentralized routing network that allows fully hosted ingress/egress points. The Diode CLI itself can act as an “exit node” ([see the “gateway” option](https://diode.helpdocs.io/app/content/article/josr6wwh5e)), thereby enabling a fully self-hosted environment at all TLS terminations.

### 8)	Ingress Routing

You can contact ngrok to specify a [custom ingress domain](https://ngrok.com/docs/secure-tunnels#agent-ingress).

Anyone can host a Diode Network [relay server](https://github.com/diodechain/diode_server) and configure domains for it. The [Diode CLI’s “diodeaddrs” parameter](https://support.diode.io/article/josr6wwh5e-go-client-commands) specifies acceptable relay servers for each agent/client.

---

As we hope you can see, the Diode Network is a powerful Web3 communications network that enables a whole host of peer-to-peer applications! 
 
Although ngrok does have [additional features](https://ngrok.com/pricing) (click “Full Feature Breakdown”) that some applications might require, your application may be perfectly suited to using the Diode Network/CLI as a free ngrok alternative.

Please feel free to [download the Diode CLI](/download/#cli) and [try it out](https://support.diode.io/article/lsr4tkzz8t-getting-started) and [let us know what you think](https://t.me/diode_chain)!
