---
title: Solutions
layout: page
class: header--dark
permalink: /solutions/
redirect_from:
- /products/
- /solutions/asset-management/
- /solutions/backup/
- /solutions/file-sharing/
- /solutions/healthcare-and-compliance/
- /solutions/private-collaboration/
- /solutions/private-storage/
- /solutions/remote-work/
- /solutions/serverless-communications/
- /solutions/streaming-video/


### Hero
hero:
  animated: true
  heading: Connect securely with Diode's solutions
  subheading: For teams who care about the security of their operations, from the ground up
  image: hero/solutions.webp


### Solution: App
app:
  animated: false
  class: story--app
  title: Connecting People
  heading: App
  icon: icons/app.svg
  content: |
    Diode Collab is a small application for computers and mobile devices that connects teams to each other, their information, and their assets. 
    
    It’s easy for non-techies to install and use and teammates can collaborate with each other at the same level of security used to access assets and work products.
    
    Now everyone can collaborate and get things done without ever noticing they’re 256-bit E2EE secure.
  more: |
    #### Use for
    Chat, files, notes, wiki, secure web access
  buttons:
  - title: Find Out More
    url: "/solutions/app/"
  - title: Download
    url: "/download/#app"
  image:
    src: story/app.webp
    class: app


### Solution: CLI
cli:
  animated: false
  title: Connecting Things
  heading: CLI
  icon: icons/cli.svg
  content: |
    The Diode CLI is a headless tool that enables edge device connectivity with zero leakage. It can be used to securely connect assets anywhere in the world.
  
    The CLI makes it easy to ensure your IT and OT systems stay in compliance with GDPR, HIPAA, and other data regulations.
  
    It is open-source and can be installed from binary or custom compiled for your platform.
    #### Use for
    IoT/OT data, SSH, Websites, Server Admin
  buttons:
  - title: Find Out More
    url: "/solutions/cli/"
  image:
    src: story/cli.webp
    class: cli


### Solution: Vault
vault:
  animated: false
  title: Ensuring Availability
  heading: Vault
  icon: icons/vault.svg
  content: |
    The Diode Vault is an autonomous team member that works as an “always-on” system so team chat, files, and assets are always available – whether your people are online or not.
  
    You can buy it for your office or deploy in a data center or friendly region to relay, sync, and backup up your data. It makes it easy for your team to operate in what we call “Light Zone” mode, reducing the amount of data distributed.
    #### Use for
    Backup, timezone-bridging, network exit node
  buttons:
  - title: Sign up
    url: "https://mk4kxqqc.paperform.co/"
    target: _blank
  image:
    src: story/vault.webp
    class: vault


### Solution: Network
network:
  animated: false
  title: Upgrading the Internet
  heading: Network
  icon: icons/network.svg
  content: |
    The Diode Network&trade; is the world’s leading Smart Network. Smart Networks are a new generation of zero trust software defined networks based on hardened blockchain technology. It is the fabric that allows Diode Collab and the CLI to create, provision, and use E2EE perimeters without requiring IT resources.
  
    You can host your own server node to help expand the core Diode Network’s points of presence, or even deploy your own stand- alone private network.
    #### Use for
    Custom apps, traffic SLA, private networks
  buttons:
  - title: Find Out More
    url: "/solutions/network/"
  image:
    src: story/network.webp
    class: network
  mirrored: true

---

{%- include hero.liquid -%}

{%- include app.liquid data="app" -%}

---

{%- include stories.liquid data="cli,vault" -%}

---

{%- include story.liquid data="network" -%}
