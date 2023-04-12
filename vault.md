---
title: Diode Vault
layout: page
class: header--white
permalink: /solutions/vault/


### Hero
hero:
  animated: true
  class: hero--rounded
  heading: Extend team reach with Diode Vault.
  subheading: A small but powerful tool that helps keep your remote teams connected.
  image: hero/vault.webp


### Story: Set and forget
story:
  animated: true
  title: Set and forget
  heading: Always on. Always.
  content: |
    The Diode Vault is a tool that extends the presence and reach of your team. It can be deployed in the cloud or as a small box that plugs into power and Ethernet.  Ether way, it will extend the reach of your E2EE collaboration zones.
  
    It relays encrypted messages on behalf of offline team members, backs up files, and provides a private exit node to give your team ex-region Internet access.
  buttons:
  - title: SIGN UP
    url: "https://mk4kxqqc.paperform.co/"
    target: _blank
  - title: SCHEDULE A DEMO
    class: btn--blank btn--arrow
    url: "https://diodedemo.paperform.co/"
    target: _blank
  image:
    src: story/vault-full.webp
    class: vault-full


### Box: Our solutions
solutions:
  animated: true
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
  - title: CLI
    icon: "icons/cli.svg"
    content: The Diode App is for your team. Whether replacing a leaky chat app, sharing files E2EE, securing a server dashboard, or deploying advanced OT assets, our app unlocks the power of Diode for people.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/solutions/cli/"
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

{%- include box.liquid data="solutions" -%}