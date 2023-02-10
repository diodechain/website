---
layout: new
class: header--white
permalink: /solutions/network/
title: Diode Network

### Hero
hero:
  class: hero--rounded
  heading: Diode Network.
  subheading: Expand your team’s security perimeter.
  buttons:
  - title: DOWNLOAD
    url: "/download/"
  image: hero/network.webp


### Story: Security and Access.
story:
  class: "story--dash"
  title: Zero trust data fabric
  heading: Security and Access.
  content: |
    The Diode Network is the world’s most advanced Smart Network. It is a web3 communications network that combines the highest security with the best accessibility. And it’s available off-the-shelf as a service to the world.
  
    We believe the Diode Network is the beginning of great things for the future of the Internet.
  buttons:
  - title: See How The Network Works
    class: btn--blank
    url: "#"
  image:
    src: story/network.webp
    alt: "Network"


### Features
features:
  list:
  - title: Automated Security
    content: |
      The Diode Network uses hardened smart contracts running on a blockchain network to automate provisioning and to guarantee security.  This means you can use it like a SaaS product and operate your appliclation like an air-gapped security environment.

  - title: Use for
    content: |
      Custom apps, private networks, fleet sponsorship

      Use the public network off the shelf, extend with your own relay node, or connect with us about private network options.
    buttons:
    - title: Run a Node
      url: "#"
    - title: SCHEDULE A DEMO
      class: btn--blank btn--arrow
      url: "https://contactdiode.paperform.co/"
      target: _blank

  - title: Your Own Relay Node
    content: |
      You can host your own relay node (aka PoP Node) to expand the reach of the Diode Network and to earn rewards by relaying traffic.  You can direct your assets to prioritize the use of your own relay nodes to further isolate your traffic, reduce your cost, and to integrate with enterprise tools.

  -

  - title: Private Networks
    content: |
      Connect with us to learn about how you can deploy and use a fully private Diode Network to enable your Enterprise.


### Box: Our solutions
solutions:
  class: box--orange
  title: No third parties means Zero Leakage&trade;
  heading: Our solutions.
  solutions:
  - title: App
    icon: "icons/app.svg"
    content: The Diode App is for all your teams. Whether replacing a leaky chat app, sharing files E2EE, securing a simple dashboard, or deploying advanced OT assets, this app unlocks the power of Diode for people.
    button:
      label: Find Out More
      class: btn--blank
      url: "/solutions/app/"
  - title: CLI
    icon: "icons/cli.svg"
    content: The Diode CLI is a headless tool for OT, IT, and IoT devices. It can be used stand-alone or in concert with Zones created in the Diode App. Connect the edge here.
    button:
      label: Find Out More
      class: btn--blank
      url: "/solutions/cli/"
  - title: Vault
    icon: "icons/vault.svg"
    content: The Diode Vault is a Diode hardware appliance that combines both the App features and the CLI features in a small box. 24-7 availability, backup, and geo-access for your team and assets.
    button:
      label: Find Out More
      class: btn--blank
      url: "/solutions/vault/"

---

{%- include hero.liquid -%}

{%- include story.liquid -%}

{%- include features.liquid -%}

{%- include box.liquid data="solutions" -%}