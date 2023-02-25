---
layout: new
class: header--white
permalink: /solutions/vault/
title: Diode Vault

### Hero
hero:
  class: hero--rounded
  heading: Diode <br>Vault.
  subheading: One tiny but powerful box that helps keep your remote teams connected.
  image: hero/vault.webp


### Story: Set and forget
story:
  title: Set and forget
  heading: Extend your reach.
  content: |
    The Diode Vault is a little box that extends the presence and reach of your team. Plug it into power and Ethernet in a secure location and it will extend the reach of your E2EE collaboration zones.
  
    It relays encrypted messages on behalf of offline team members, backs up files, and provides a private exit node to give your team ex-region Internet access.
  image:
    src: story/oval.webp
    class: oval

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