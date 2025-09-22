---
title: Diode Collab&trade;
layout: page
class: header--white
permalink: /products/collab-g2/
noindex: true

### Hero
hero:
  class: hero--rounded hero--smaller
  animated: true
  heading: Most secure team messaging
  subheading: Unlimited free users, no data on servers
  buttons:
  - title: Try Now
    url: "#download-app"
    class: popup-open
    id: g-download-2
  image: hero/app.webp
  
### Story: For Teams
story:
  animated: false
  class: story--next
  title: End-to-End Encrypted
  heading: No Personal Information Required
  content: |
    No compromises, secure messaging that works for your team. When it comes to business, there are two non-negotiables: the security of your data and the ease of communication for your team. That’s where Diode stands out. Unlike other messaging apps that either ask for personal details or lack full encryption, Diode gives you both—end-to-end encryption with no need for employees to share their phone numbers. It’s the secure messaging solution your business deserves. 
  
    The Diode Network&trade; ensures that not even Diode has access to your team’s communications, information, or activity.

  image:
    src: story/app-full.webp
    alt: App
    class: network-wide


### Features
features:
  animated: false
  after:
    src: story/protected.svg
  list:
  - title: Secure Chat and Files
    content: |
      Communications and structured information are at the core of everything teams do.  That’s why we built direct messaging, group chat, and file syncing into the core of Diode Collab. All capabilities are fully end-to-end encrypted, ensuring that your team operates at only the highest security level available. 

  - title: Use for
    content: |
      Chat, VPN, files, notes, wiki, secure sites, dashboards
  
      Communicate, reference, annotate, manage, and collaborate - everything a team working with real world sensitive data requires.
    buttons:
    - title: REQUEST A DEMO
      class: btn--blank btn--arrow
      url: "https://diodedemo.paperform.co/"
      target: _blank

  - title: Access the Internet from Anywhere
    content: |
      Collaborating with Diode Collab is like using a VPN and collaboration tool built in one.  This allows your team to connect from anywhere in the world. And, if they happen to be in the same office, their devices direct-connect to carry on the conversation without even touching the Internet.
      
  -

  - title: Secure Upload Sites
    content: |
      Sometimes you need to share, or collect, information with people who don't have Diode Collab installed - via a share link accessible from any web browser. This is a great way to exchange information securely with customers, partners, and vendors when operating in a regulated industry. Creating a secure upload site can be done with a single click on any file or folder you'd like to make available.
      
  -

  - title: Protected Identities
    content: |
      Diode Collab doesn’t require any personally identifiable information from you or your team to sign up and get going - all a Diode account requires is a pseudo anonymous username. Whether your team members use a single device or multiple linked devices, they can all be managed via self-custody credentials that are never stored on a server. 


### Box: Our solutions
solutions:
  animated: false
  class: box--orange
  title: No third parties means Zero&nbsp;Leakage&trade;
  heading: Our products
  solutions:
  - title: CLI
    icon: "icons/cli.svg"
    content: The Diode CLI is a headless tool for OT, IT, and IoT devices. It can be used stand-alone to secure autonomous systems, and/or in concert with team members using Diode Collab.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/products/cli/"
  - title: Vault
    icon: "icons/vault.svg"
    content: The Diode Vault is an autonomous tool that combines both App and CLI features in a small box or cloud appliance. 24-7 availability, backup, and geo-access for your team and assets.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/products/vault/"
  - title: Network
    icon: "icons/network.svg"
    content: The Diode Network is the world’s leading Smart Network - a new generation of zero trust software defined networks based on hardened blockchain technology. Think ad hoc E2EE perimeters.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/products/network/"

---

{%- include hero.liquid -%}

{%- include story.liquid -%}

---

{%- include features.liquid -%}

{%- include box.liquid data="solutions" -%}
