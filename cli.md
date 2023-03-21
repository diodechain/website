---
title: Diode CLI
layout: page
class: header--white
permalink: /solutions/cli/
redirect_from:
- /products/diode-cli/


### Hero
hero:
  class: hero--rounded
  heading: Manage assets with Diode CLI.
  subheading: Access and manage servers and OT assets.
  buttons:
  - title: DOWNLOAD CLI
    url: "/download/#cli"
  image: hero/cli.webp


### Story: For Assets
story:
  title: Precise global access
  heading: For assets.
  content: |
    The Diode CLI makes your IT, OT, or IoT assets both smart and secure. Every CLI-enabled asset is globally accessible to authorized parties and is 256-bit E2EE secured.
  
    The open source CLI uses less resources than a VPN, requires no managed server infrastructure (VPN cloud), and is more secure - it brings the power of the Diode Network to your edge devices.
  buttons:
  - title: See How The Network Works
    class: btn--blank btn--arrow
    url: "/solutions/network/"
  image:
    src: story/cli-full.webp
    alt: Diode CLI
    class: cli-full


### Features
features:
  after:
    src: story/world.svg
  list:
  - title: Globally accessible
    content: |
      Every Diode client has a globally unique identifier that is used for security and routing.The Diode CLI “lights up” your device, making it accessible from anywhere in the world while securing it to only the resources you’ve authorized to access it. It becomes globally accessible while being more secure than a local network. 

  - title: Use for
    content: |
      IoT/OT data, SSH, Websites, Server Admin

      Connect, manage, collect, view, and administrate - everything you wish you could do with your IT and OT assets.
    buttons:
    - title: DOWNLOAD
      url: "/download/#cli"
    - title: SCHEDULE A DEMO
      class: btn--blank btn--arrow
      url: "https://diodedemo.paperform.co/"
      target: _blank

  - title: Resource publication
    content: |
      Whether your asset is publishing an SSH port to an explicit DevOps allow-list, an IoT API in a zero trust data fabric, or a website to the world, the CLI makes it easy.Publishing a resource with the CLI allows you to isolate the rest of the system, saving IT time and resources that would otherwise be spent on system maintenance.

  -

  - title: Access management
    content: |
      Any Diode CLI client can publish a resource in private, protected, or public mode. By using the protected mode, an ad hoc zero trust perimeter is created that contains the asset, and makes it easy to manage access to it on a group level.


### Box: Our solutions
solutions:
  class: box--orange
  title: No third parties means Zero&nbsp;Leakage&trade;
  heading: Our solutions.
  solutions:
  - title: App
    icon: "icons/app.svg"
    content: The Diode App is for your team. Whether replacing a leaky chat app, sharing files E2EE, securing a server dashboard, or deploying advanced OT assets, our app unlocks the power of Diode for people.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/solutions/app/"
  - title: Vault
    icon: "icons/vault.svg"
    content: The Diode Vault is an autonomous tool that combines both App and CLI features in a small box or cloud appliance. 24-7 availability, backup, and geo-access for your team and assets.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/solutions/vault/"
  - title: Network
    icon: "icons/network.svg"
    content: The Diode Network is the world’s leading Smart Network - a new generation of zero trust software defined networks based on hardened blockchain technology. Think ad hoc E2EE perimeters.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/solutions/network/"

---

{%- include hero.liquid -%}

{%- include story.liquid -%}

{%- include features.liquid -%}

{%- include box.liquid data="solutions" -%}