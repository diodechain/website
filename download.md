---
title: Download
layout: new
class: header--white
permalink: /download/
redirect_from:
- /resources/download/


### Hero
hero:
  class: hero--rounded
  heading: Download Diode
  subheading: Download our zero trust collaboration App, asset management CLI, and network node.
  image: hero/how-it-works.webp


### Download: App
app:
  title: For your people
  heading: Get the App
  subheading: Chat, files, assets, and more - replace your leaky team collaboration app with Diode.
  buttons:
  - title: Download
    url: "#download-app"
    class: popup-open
  - title: Learn More
    url: "/solutions/app/"
    class: "btn--blank btn--arrow"


### Popup: App
popup:
  title: Get the App


### Download: CLI
cli:
  title: For your assets
  heading: Get the CLI
  subheading: Developers and IT admins can enable zero trust remote access for devices and servers so that the right people and systems can interact.
  install: true
  buttons:
  - title: Learn More
    url: "/solutions/cli/"
    class: "btn--blank btn--arrow"


### Download: Network
network:
  title: For your enterprise
  heading: Join the Network
  subheading: You can expand the Diode Network by hosting a node.
  buttons:
  - title: Download
    url: "https://support.diode.io/article/lsr4tkzz8t"
    target: _blank
  - title: Learn More
    url: "/solutions/network/"
    class: "btn--blank btn--arrow"

---

{%- include hero.liquid -%}

{%- include download.liquid id="app" data="app" -%}

{%- include download.liquid id="cli" data="cli" -%}

{%- include download.liquid id="network" data="network" -%}

{%- include download-popup.liquid id="download-app" -%}