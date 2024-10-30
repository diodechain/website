---
title: Download Hub
layout: page
class: header--dark
permalink: /download/
redirect_from:
- /resources/download/


### Hero
hero:
  animated: true
  class: hero--right
  heading: Download Hub
  small: Your spot for downloading Diode's security solutions
  subheading: Download our zero trust collaboration app, asset management CLI, and network node below.
  scroll: "#app"
  image: hero/download.webp


### Download: App
app:
  animated: false
  title: For your people
  heading: Get Diode Collab
  subheading: Chat, files, assets, and more - replace your leaky team collaboration app with Diode Collab.
  buttons:
  - title: Download
    url: "#download-app"
    class: popup-open
  - title: Learn More
    url: "/products/collab/"
    class: "btn--blank btn--arrow"


### Popup: App
popup:
  title: Diode Collab


### Download: CLI
cli:
  animated: false
  title: For your assets
  heading: Get the CLI
  subheading: Developers and IT admins can enable zero trust remote access for devices and servers so that the right people and systems can interact.
  install: true
  buttons:
  - title: Learn More
    url: "/products/cli/"
    class: "btn--blank btn--arrow"


### Download: Network
network:
  animated: false
  title: For your enterprise
  heading: Join the Network
  subheading: You can deepen the security of your zero trust perimeters by hosting a node.
  buttons:
  - title: Run a Node
    url: "https://network.docs.diode.io/docs/"
    target: _blank
  - title: Learn More
    url: "/products/network/"
    class: "btn--blank btn--arrow"

---

{%- include hero.liquid -%}

{%- include download.liquid id="app" data="app" -%}

{%- include download.liquid id="cli" data="cli" -%}

{%- include download.liquid id="network" data="network" -%}
