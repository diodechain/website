---
layout: new
permalink: /solutions/
title: Solutions


hero:
  heading: Connect E2EE with our Solutions
  subheading: For teams who care about the security of their&nbsp;operations.
  image: hero/solutions.webp


app:
  title: People
  heading: App
  icon: "icons/app.svg"
  content: |
    The Diode App is small application for computers and phones that connects your team to each other, to their information, and to their assets.  It is easy for non-technical people to install and use - everyone can collaborate and get things done without ever noticing they are also 256-bit E2EE secured.
  
    Team members can use their account on multiple devices, and the experience is the same across all of them.
    #### Use for
    Chat, files, notes, wiki, secure web access

  buttons:
  - title: Find Out More
    url: "./app/"
  - title: Download
    url: "/download/"
  image:
    src: story/orange.webp
    class: oval


cli:
  title: Things
  heading: CLI
  icon: "icons/cli.svg"
  content: |
    The Diode CLI is a headless tool that connects edge devices through Diode.  It can be used to securely publish, or subscribe to, resources from anywhere in the world.
  
    The CLI makes it easy to ensure your IT and OT systems stay in compliance with GDPR, HIPAA, and other data regulations.
  
    It is open-source and can be installed from binary or compiled for your platform.
    #### Use for
    IoT/OT data, SSH, Websites, <br>Server Admin

  buttons:
  - title: Find Out More
    url: "./cli/"
  - title: Download
    url: "/download/"
  image:
    src: story/orange-2.webp
    class: oval


vault:
  title: Presence
  heading: Vault
  icon: "icons/vault.svg"
  content: |
    The Diode Vault is a hardware appliance that works as an “always-on” team member device so that team chat, files, and assets are always available no matter if anyone else is online or not.

    You can put it in your office, in a data center, or in a friendly region to relay, sync, and backup up to 1TB of data.  It makes it easy for your team to operate in “Light Zone” mode, reducing the amount of data distributed.
    #### Use for
    Backup, timezone-bridging, network exit node

  buttons:
  - title: Find Out More
    url: "./vault/"
  - title: Download
    url: "/download/"
  image:
    src: story/orange-2.webp
    class: oval


network:
  title: Fabric
  heading: Network
  icon: "icons/network.svg"
  content: |
    The Diode Network is the world’s leading Smart Network.  Smart Networks are a new generation of zero trust software defined networks based on hardened blockchain technology.  It is the fabric that allows you to create, provision, and use E2EE perimeters without requiring IT resources.

    You can host your own server node to help expand the Diode Network’s points of presence, or even deploy your own stand- alone private network.
    #### Use for
    Relaying traffic, rewards, private networks

  buttons:
  - title: Find Out More
    url: "./network/"
  - title: Download
    url: "/download/"
  image:
    src: story/orange.webp
    class: oval
  mirrored: true

---

{%- include hero.liquid -%}

{%- include story.liquid data="app" -%}

---

{%- include stories.liquid data="cli,vault" -%}

---

{%- include story.liquid data="network" -%}