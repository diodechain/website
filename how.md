---
layout: new
class: header--white
permalink: /how-it-works/
title: How Diode works.


### Hero
hero:
  class: hero--rounded
  heading: How Diode works.
  subheading: A look at what makes Diode tick.
  image: hero/how-it-works.webp


### Story: Zero Leakage
story:
  class: "story--dash"
  title: No third parties
  heading: Zero Leakage.
  content: |
    Diode’s Blockquick&trade; algorithm allows people and devices using the open source Diode Network to define their security perimeters – to connect with each other without using managed server environments. 
  
    Secured through hardened smart contracts running on a decentralized blockchain infrastructure, our  autonomous E2EE environment eliminates third parties from the IT stack, thereby removing a major attack surface and setting a new standard for security.
  video:
    src: "https://www.youtube.com/watch?v=D0UnqGm_miA"
    preview: "video/preview.png"
    alt: ""


### Features: The moving pieces
features:
  heading: The moving pieces.
  actions:
  - title: BROWSE THE NETWORK EXPLORER
    url: "/prenet/"
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
    - title: Run a PoP Node
      url: "https://support.diode.io/article/y9hxzsbhg8"
      target: _blank
    - title: DOWNLOAD
      url: "/download/"
  - title: Zones and Fleet Contracts
    content: Fleet Contracts are the basic security perimeter element of the Diode Network - every Client must belong to at least one Fleet Contract so that the network can provision communications. Zones are a special type of Fleet Contract that are used by people and businesses to ring fence operations - including the operation of other Fleet Contracts.

---

{%- include hero.liquid -%}

{%- include story.liquid -%}

{%- include features.liquid -%}