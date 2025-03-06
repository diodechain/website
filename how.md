---
title: How Diode works.
layout: page
class: header--white
permalink: /how-it-works/
redirect_from:
- /resources/
- /resources/how-it-works/


### Hero
hero:
  animated: true
  class: hero--rounded
  heading: How Diode works
  subheading: A look at what makes Diode tick
  image: hero/how-it-works.webp


### Story: Zero Leakage
story:
  animated: false
  class: "story--dash"
  title: No third parties
  heading: Zero Leakage.
  content: |
    Diode’s [Blockquick&trade;](https://eprint.iacr.org/2019/579.pdf) algorithm allows people and devices using the open source Diode Network to bootstrap trust in the network so they can define and validate their security perimeters.  This enables them to connect with each other without using managed server environments. 
  
    Our autonomous E2EE environment eliminates third parties from the IT stack, thereby removing a major attack surface and setting a new standard for security.


### Features: The moving pieces
features:
  animated: false
  heading: The moving pieces
  actions:
  - title: Read support articles
    class: btn--blank btn--arrow
    url: "https://docs.diode.io"
    target: _blank
  list:
  - title: Clients
    content: Everything (people, devices) using Diode are called “Clients”.  Every Client is secured with a public/private key self-custody identity. A Client’s routing address is its public key, and its security is ensured through the same technology that secures self custody digital assets everywhere.
  - title: Points of Presence
    content: The Diode Network is comprised of self-scaling “Points of Presence” (PoPs) that can join the network on an ad hoc basis at any time and from anywhere. Diode’s ecosystem has been contributing PoP nodes since the early days and we’re just getting started. Connecting to any one node unlocks the world.
  - title: Communications
    content: Any type of protocol can be piped over Diode’s ultra light weight communications interface. This interface is a Zero Trust backplane that establishes secure, end-point validated, communications as a prerequisite. Once bridged, Clients often negotiate direct connections and carry the conversion forward from there.
  - title: Visibility
    content: Clients publish resources via the Diode Network and can do so publicly, privately (allow list), or protected (Zone/Fleet).  Diode’s Blockchain Name System can be used for Client friendly names, and Kademlia routing is used to optimize routes.
    buttons:
    - title: BROWSE THE NETWORK
      url: "https://diodenetwork.io/"
      target: _blank
    - title: SCHEDULE A DEMO
      class: btn--blank btn--arrow
      url: "https://diodedemo.paperform.co/"
      target: _blank
  - title: Zones and Fleet Contracts
    content: Fleet Contracts are the basic security perimeter element of the Diode Network - every Client must belong to at least one Fleet Contract so that the network can provision communications. Zones are a special type of Fleet Contract that are used by people and businesses to ring fence operations - including the operation of other Fleet Contracts.

---

{%- include hero.liquid -%}

{%- include story.liquid -%}

{%- include features.liquid -%}
