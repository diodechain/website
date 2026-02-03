---
title: How Diode works
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
  heading: Self custody for data
  subheading: How Diode leverages blockchain to upgrade the Internet
  image: hero/how-it-works.webp


### Story: Zero Leakage
article:
  animated: false
  title: No third parties
  heading: Zero Leakage
  content: |
    Diode is digital sovereignty - our autonomous end to end encrypted connectivity eliminates third parties from the IT stack, thereby removing a major attack surface and setting a new standard for security.

    There are three basic innovations that make Diode special:
    1. Trustless connections
    2. Permissionless infrastructure
    3. Encrypted blockchain

    ### Trustless connections

    A not-so-well-kept-secret in blockchain is that the devices using blockchain tech are interact with highly centralized "RPC" servers that they must trust.  Although the blockchain ledger building process is decentralized/trustless, the on-ramp/off-ramp is not.  

    Diode’s [Blockquick&trade;](https://eprint.iacr.org/2019/579.pdf) family of algorithms allows people and devices using the open source Diode Network to bootstrap trust in the network so they can define and validate their security perimeters.  This not only enables them to connect with each other without using managed server environments, it is also a blueprint for the full decentralization of the Internet.

    Connections that can be trusted are at the very base of Diode's security.

    ### Permissionless infrastructure

    At its heart, Diode is a permissionless network of automated TCP/UDP relays that are choreographed by encrypted blockchain defined perimeters.  The configurations that control the network's behavior are fixed - they are part of immutable blockchain smart contracts that the operator owns.  Diode just provides the tools to enable operators with this type of self-custody ownership of their configurations.

    This also allows anyone to contribute to the network.  Anyone can add a node to the network and help expand its reach, or to ensure their communication routes only touch known IP addresses and infrastructure.

    Not only is the network infrastructure permissionless, so are the devices and users themselves.  Every device has a blockchain "wallet", which it self propagates without any central authority.  These devices can use the network with no other mechanisms, or they can join bootstrapped groups to increase relational security.

    ### Encrypted blockchain

    One of the main challenges for real world adoption of blockchain is that most blockchains are public ledger that store information in a publicly accessible format.  This can leak potentially critical information or meta data available to anyone with access to an RPC node.  While Diode does use some public ledger systems, we attempt to reduce the non-encrypted information on the ledger to only the information needed by infrastructure for routing.  
    
    However, for all of our products, we also support the Oasis blockchain.  Oasis is a privacy-first encrypted blockchain that stores smart contract information in encrypted format.  On Oasis, only the members of the contract can access contract data.  The encryption is enforced at the hardware layer on every RPC node, and provides a strong pattern for the future of on chain private communication and connectivity.


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
    - title: VISIT THE NETWORK
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

{%- include article.liquid data="article" -%}

{%- include features.liquid -%}
