---
layout: new
class: header--white
permalink: /solutions/app/
title: Diode App

### Hero
hero:
  class: hero--rounded
  heading: Team collaboration on&nbsp;Diode App.
  subheading: Secure collaboration around IT/OT/IP work product.
  buttons:
  - title: DOWNLOAD APP
    url: "/download/#app"
  image: hero/app.webp


### Story: For teams
story:
  title: Operate protected
  heading: For teams.
  content: |
    The Diode App is like a VPN that has built-in team collaboration and asset management features. It is a decentralized “local first” solution that doesn’t rely on third party servers - your team will be operating in one of the most protected environments possible.
  
    The Diode Network ensures that not even Diode has access to your team’s communications, information, or activity.
  buttons:
  - title: See how teams are using the app
    class: btn--blank
    url: "#"
  image:
    src: story/app-full.webp
    alt: App
    class: network-wide


### Features
features:
  image:
    src: story/for-teams.webp
  after:
    src: story/protected.svg
  list:
  - title: Secure Chat and Files
    content: |
      Communications and structured information are at the core of everything teams do.  That’s why we built direct messaging, group chat, and file syncing into the core of the Diode App.All capabilities are fully end-to-end encrypted, ensuring that your team operates at only the highest security level available. 

  - title: Use for
    content: |
      Chat, files, notes, wiki, secure web access
  
      Communicate, reference, annotate, manage, and collaborate - everything a team working with real world IT, OT, or web assets requires.
    buttons:
    - title: DOWNLOAD
      url: "/download/#app"
    - title: SCHEDULE A DEMO
      class: btn--blank btn--arrow
      url: "https://contactdiode.paperform.co/"
      target: _blank

  - title: Connect From Anywhere
    content: |
      Collaborating with Diode is like using a VPN and collaboration tool built in one.  This allows your team to connect from anywhere in the world. And, if they happen to be in the same office, their devices direct-connect to carry on the conversation without even touching the Internet.

  -

  - title: Protected Identities
    content: |
      Diode doesn’t require any personally identifiable information from you or your team to sign up and get going - all a Diode account requires is a pseudo anonymous username. Whether your team members use a single device or multiple linked devices, they can all be managed via self-custody credentials that are never stored on a server. 


### Box: Our solutions
solutions:
  class: box--orange
  title: No third parties means Zero&nbsp;Leakage&trade;
  heading: Our solutions.
  solutions:
  - title: CLI
    icon: "icons/cli.svg"
    content: The Diode CLI is a headless tool for OT, IT, and IoT devices. It can be used stand-alone to secure autonomous systems, and/or in concert with team members using the Diode App.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/solutions/cli/"
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

---

{%- include features.liquid -%}

{%- include box.liquid data="solutions" -%}