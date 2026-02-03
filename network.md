---
title: Diode Network
layout: page
class: header--white
permalink: /products/network/
redirect_from:
- /products/diode-network/
- /solutions/network/


### Hero
hero:
  animated: true
  class: hero--rounded
  heading: Permissionless ZTNA
  subheading: More secure than other solutions, for a fraction of the cost
  buttons:
  - title: USE THE NETWORK
    url: "https://ztna.diode.io"
    target: _blank
  image: hero/network.webp


### Story: Security and Access.
story:
  animated: false
  class: story--dash
  title: Anyone can run a node, and anyone can use the network
  heading: Zero trust data fabric
  content: |
    The Diode Network is lower cost and more secure than other ZTNAs.
    
    It is an open-source network of relay nodes that facilitate TCP and UDP connections - it routes traffic between any two points in the universe.

    It is a new take on zero trust networking: globally unique identifiers, blockchain-based sovereign definitions, permissionless access (no account required), and a commodity bandwidth fee structure.
    
    The Diode Network is the beginning of great things for the future of the Internet.
  buttons:
  - title: Visit the Diode Network site
    class: btn--blank btn--arrow
    url: "https://diodenetwork.io"
  image:
    src: story/network-full.webp
    alt: Network
    class: network-full


### Features
features:
  animated: false
  list:
  - title: Private Nodes
    content: |
      You can host your own Diode Network relay node (aka Point of Presence) to isolate your enterprise traffic or to expand the reach of the Diode Network.

  - title: Isolated Sidechannel
    content: |
      A Diode connection can be a valuable sidechannel for your existing application.  Every client gets its own routable Ethereum public key (like an IP address).  

  - title: Automated Security
    content: |
      The Diode Network is choreographed by smart contracts running on a blockchain network.  Its behavior is automated, and security is deterministic. This means you can use it like a SaaS product while achieving security like an air-gapped environment.

  - title: Internet Exit Nodes
    content: |
      Each virtual network can include one or more independently addressable Internet exit nodes.  This allows you to choreograph what region your web traffic emerges from - like a private consumer VPN.

  - title: Multi Protocol Routing
    content: |
      Every type of protocol can be routed over the network - HTTPS, WebRTC, WireGuard, etc.

  - title: Use the network for -
    content: |
      Private AI, enterprise VPN, secure SaaS apps, zero trust networks
  
      Use the public network off the shelf, extend with your own relay node, or connect with us about private network options.
    buttons:
    - title: RUN A NODE
      url: "https://network.docs.diode.io/docs/"
      target: _blank
    - title: USE THE NETWORK
      class: btn--blank btn--arrow
      url: "https://ztna.diode.io"
      target: _blank


### Box: Our solutions
solutions:
  animated: false
  class: box--orange
  title: No third parties means Zero&nbsp;Leakage&trade;
  heading: Our products
  solutions:
  - title: Zero Trust WireGuard
    icon: "icons/cli.svg"
    content: WireGuard how it was meant to be - point-to-point connections with a sovereign control plane that you fully control.  The Diode Network delivers world wide STUN/TURN so your team and systems can connect from anywhere.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/products/cli/"
  - title: Secure AI
    icon: "icons/vault.svg"
    content: Diode provides a full suite of private AI capabilities, delivered via our automated zero trust network.  Provision private LLMs, extend with a secure pipeline, expand with secure tools & MCP servers.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/products/vault/"
  - title: Diode Collab
    icon: "icons/app.svg"
    content: Diode Collab&trade; is for your team. Whether replacing a leaky chat app, sharing files E2EE, securing a server dashboard, or deploying advanced OT assets, Diode Collab unlocks the power of Diode for people.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "https://collab.diode.io"

---

{%- include hero.liquid -%}

{%- include story.liquid -%}

{%- include features.liquid -%}

{%- include box.liquid data="solutions" -%}
