---
layout: post
title: Zero Trust Replaces VPN 
date: 2023-09-13 07:45
categories: [Zero Trust]
tags: [Zero Trust, Security]
author: MNJR
image: assets/img/blog/vpn.jpeg

---

## Why Choose Zero Trust?

[Zero Trust](https://diode.io/blog/pillars-of-zero-trust) networking is widely anticipated to replace traditional VPN in the next five years. The reasons for this are primarily three fold:

1.  **Zero Trust is more precise** - unlike VPN, which allows any system in the network to connect, Zero Trust permits only specific identities to connect, regardless of their network context.
2.  **Zero Trust is context aware** - unlike VPN, which allows any available network resource to be used by any system, Zero Trust governs permissioned access to each resource
3.  **Zero Trust is more available** - unlike traditional VPN, which often requires IT management (e.g. firewall configuration) to enable connections, Zero Trust connections use a Trust Broker that enables secure connections without IT configuration

As a whole, the advantages of Zero Trust networking can create a system that is more secure, more available, and easier to manage than traditional VPN. 

## Where Zero Trust Falls Short

Today’s Zero Trust offerings all have two shortcomings: 

1.  **Hard to Implement:** Traditional Zero Trust deployment models are ill-fitted to medium and small businesses
2.  **Security Compromises:** The Trust Broker servers, at the heart of Zero Trust, introduce new types of security vulnerabilities

### Hard to Implement

Today’s Zero Trust solutions are hard to implement.  An implementation requires wide spread integration into an organizations systems, and significant on-going maintenance.  Therefore, it is rare for organizations without a CIO to contemplate implementing a Zero Trust program.  Additionally, Zero Trust servers are complicated and require high level IT administration - both of which introduce cost and complexity.  The pricing models in the industry reflect this - Zero Trust providers must charge a premium for their services due to the complexity of deployment and the cost of operating the network.

For these reasons, Zero Trust is largely inaccessible to small and medium enterprise, and is unappealing to even many large enterprises.  

### Security Compromises

The Trust Broker is at the heart of the advantages of Zero Trust networking vs VPN - without the Trust Broker, there is no Zero Trust benefit.  However, the Trust Broker itself requires an extreme level of manual security precautions since a breach of the Trust Broker allows the communications it enables to also be attacked.  The Trust Broker’s advantages come at the expense of introducing new types of risks - they are the weak link of Zero Trust networking.

For these reasons, Zero Trust is costly to maintain, and cannot be easily deployed in many regions.

## Mesh VPN vs. Zero Trust

There are some innovative “mesh VPNs,” like Zero Tier and Tailscale, that are combining traditional VPN technology with a type of Trust Broker. This evolution allows those networks to emulate the precision and availability in Zero Trust networks. 

These mesh VPN providers may begin to blur the lines between VPN and Zero Trust.

However, they share the shortcomings of traditional Zero Trust networks in that the Trust Broker remains vulnerable.

## Diode’s Solution

Diode is the only Zero Trust security network that mathematically secures the [Trust Broker](https://diode.io/blog/trust-broker-security).  This allows Diode to be deployed at high scale, in any region, without creating security vulnerabilities.

Diode’s innovations not only eliminate the Trust Broker security challenges, but they are also easy to implement for teams collaborating on content, remotely accessing corporate environments, or managing OT assets.

If your company is ready to get started with Zero Trust networking, but wants a flexible solution that grows with you, please [get in touch](https://diode.io/about/)!
