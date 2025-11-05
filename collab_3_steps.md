---
title: Diode Collab&trade;
layout: page
class: header--white
permalink: /products/collab-3-steps/
noindex: true

### Hero
hero:
  class: hero--rounded hero--smaller
  animated: true
  heading: 3 Easy Steps to Get Started
  subheading: Today’s the day — get your family connected securely!
  buttons:
  - title: Read more
    class: btn--blank btn--arrow
    url: "#for-families"
  image: hero/app.webp

### 3 Easy Steps
story:
  class: story--next
  heading: 3 Easy Steps
  subheading: Set up your private family zone in minutes.
  blocks:
    - image: story/protected.svg
      title: Step 1: Download the App
      text: >
        Get Diode Collab for your device and sign in securely. Available for macOS, Windows, Linux, iOS, and Android.
      buttons:
        - title: Download Now
          url: "#download-app"
          class: btn btn--secondary

    - image: story/protected.svg
      title: Step 2: Create Your Zone
      text: >
        Set up your first private zone. It’s your family’s own encrypted network — no data ever stored on servers.

    - image: story/protected.svg
      title: Step 3: Upgrade and Invite Your Family
      text: >
        Upgrade your plan for expanded storage and group features. Then send your join code to your family and start sharing securely.
      buttons:
        - title: Read the Docs
          url: "https://diode.io/docs/getting-started/"
          class: btn btn--primary

### Story: For Families
story:
  animated: false
  class: story--next
  title: Keep your information private
  heading: For families
  id: for-families
  content: |
    Some things matter more than convenience. Safeguarding your family's digital life is worth investing in, every day.

    Your family's conversations and files shouldn't be stored or scanned by outside servers. With Diode, everything stays securely on your own devices. Share photos, coordinate schedules, and exchange private details knowing they never leave your control.

    Diode is a break-through decentralized technology that allows your devices to communicate without servers - your data is locked down at the source.

    No cloud storage, no tracking, no leaks.
  buttons:
  - title: Secure your family for $3/member
    class: btn--blank btn--arrow
    url: "https://diode.io/pricing/"
    target: _blank
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
  - title: Unlimited private storage
    content: |
      Diode offers unlimited storage for your family to share photos, documents, and information together, without limits or extra fees. Unlike traditional cloud based storage services, everything stays private and under your control, with no corporate access or monitoring. Enjoy all the benefits of sharing and storage, but without the restrictions and risks.

  - title: Use For
    content: |
      Photos, messages, documents, passwords
    
      Some things matter more than convenience. Safeguarding your family's digital life is worth investing in, every day.
    buttons:
    - title: Family group plan
      class: btn--blank btn--arrow
      url: "https://diode.io/pricing/"
      target: _blank

  - title: No Servers, Only On Your Devices
    content: |
      Diode keeps your family's data off third-party servers.  Information is stored and shared only across your own devices. Photos, messages, and files never leave your private network, so you control exactly where information lives and who accesses it. Enjoy total privacy and security, powered by your devices and protected by decentralized technology.
  -

  - title: Better and More Secure
    content: |
      Unlike communication apps such as Signal and WhatsApp, Diode doesn't require phone numbers or personal identifiers. Your family connects privately without exposing contact details. Where the other apps keep messages on centralized servers, Diode ensures all communication is end-to-end encrypted and stored only on your devices.  No one outside your group can ever access your conversations.
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
