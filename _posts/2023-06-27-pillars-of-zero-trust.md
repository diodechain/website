---
layout: post
title: The Pillars of Zero Trust Architecture 
date: 2023-06-27 16:45
categories: [Zero Trust]
tags: [Zero Trust, Security]
author: MNJR
image: pillars.png

---
## Pillars of Zero Trust Architecture

Every Zero Trust architecture is built around the “policy of least permission” (aka “least privilege”), but there are certain key pillars of Zero Trust architecture that must be put in place to achieve a system with fine-grained security that enhances the way your organization works.

### Identity/User Security

*   Each user must have a system-wide identity that can be verified for any access to any information (communications, data, etc.).  This identity must be recognized, authenticated, and then compared to the access control policies. Although some Zero Trust architectures do this through passwords, as well as through multi-factor authentications, others choose to even further reduce the identity attack surface by implementing [self-custody identities](https://www.ssh.com/academy/ssh/identity-key).

### Device Security

*   Authorization with a “system of record” validation is used when devices connect to one another, or an application resource, regardless of if they are user-controlled or autonomous. These validations often use an “Access Control List” that is managed by the Zero Trust network infrastructure, and are used to allow (or deny) a connection when a device tries to connect.

### Network Security

*   Assets can be placed into different virtual Zero Trust networks to isolate sensitive assets at the network level.  This makes it so that Devices and Users must be part of the same network first before being authorized for access.  This can be an effective way to mitigate the impact of IT administrator visibility, mistakes, and insider threat.

### Data and Workload Security

*   All security measures are taken in order to protect ones data through devices, applications, workloads, and/or networks. This is done through the categorization of the data so that it can be separated from everything/everyone else except for those who have been given explicit permission. Implementing data security will usually require determining where the data should be stored and how it should be encrypted both in-transit and at-rest.

### Automation and Observability

*   Automating security processes with continuous monitoring and defensive cyber operations integrations is an important step to optimizing and managing your Zero Trust architecture.  Although it is possible to implement Zero Trust all at once, many organizations find it more efficient to establish their Zero Trust architecture and expand the Zero Trust security perimeter over time.

# Get Started with Zero Trust using Diode

Diode has integrated these pillars into our Zero Trust solutions in order to make it easy for teams to protect their sensitive assets no matter where their team members, or their assets, are at in the world.

It is easy to try out Zero Trust fundamentals with the [Diode App](https://diode.io/solutions/app) - go to our [Downloads Page](https://diode.io/download) to download and start using Zero Trust connectivity today!

