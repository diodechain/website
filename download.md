---
layout: new
class: header--white
permalink: /download/
title: Download

### Hero
hero:
  class: hero--rounded
  heading: Download Diode
  subheading: Download our highly-secure collaboration App, asset management CLI, or network node.
  image: hero/how-it-works.webp

### Download: App
app:
  title: For your people
  heading: Get the App
  subheading: Chat, files, assets, and more - replace your leaky team collaboration app with Diode.
  buttons:
  - title: Download
    url: "#"
  - title: Learn More
    url: "/solutions/app/"
    class: "btn--blank btn--arrow"

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
  title: For your community
  heading: Join the Network
  subheading: You can expand the Diode Network by hosting a node.
  buttons:
  - title: Download
    url: "#"
  - title: Learn More
    url: "/solutions/network/"
    class: "btn--blank btn--arrow"

---

{%- include hero.liquid -%}

{%- include download.liquid id="app" data="app" -%}

{%- include download.liquid id="cli" data="cli" -%}

{%- include download.liquid id="network" data="network" -%}