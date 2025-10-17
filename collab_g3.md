---
title: Diode Collab&trade;
layout: page
class: header--white
permalink: /products/collab-g3/
noindex: true

### Hero
hero:
  class: hero--rounded hero--smaller
  animated: true
  heading: Secure Crisis Management Tool
  subheading: Protect global teams with secure incident reporting and automated emergency notification distribution to your Crisis Response Team
  buttons:
  - title: Request a Demo
    url: "https://diodedemo.paperform.co/"
    class: popup-open
    id: g3-demo
  image: hero/app.webp

### Story: For Teams  
story:
  animated: false
  class: story--next
  title: End-to-End Encrypted P2P Zero Trust Architecture
  heading: Security App Solution
  content: |
    Mitigate physical and cyber security risks for International Travelers and Residents (ITRs):
      1. Provide secure and reliable incident reporting by ITRs
      2. Securely log incidents
      3. Distribute incidents to the Crisis Response Team (CRT) for response
      4. Escalate incident alerts within the CRT until claimed
      5. Communicate existing and developing threat alerts to ITRs, leadership and stakeholders
      6. Geolocate ITRs in the case of emerging situations or active emergencies
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
  - title: Incident Report Zones
    content: |
      The Incident Reporting and Crisis Management Platform is designed to provide emerging situation alerts, real time incident response, training, advisory support, and follow-up for trainers, trainees and stakeholders. Each zone is configured accordingly:

      Incident Support Zone features:
        1. Up to 300 members
        2. Direct messaging between ITRs and CRT members
        3. General announcements from the CRT that are visible by all ITRs
        4. Topical conversation channels for all members
        5. Private conversation channels for CRT members only
        6. Private conversation channels as required by CRT and ITRs regions
        7. Private drives deployable by CRT and ITR regions
        8. Secure International Standard Operating Procedures and Knowledge Base
        9. Access by ITRs to files provided by the CRT
        10. Profile-secured safety pin code
        11. Secure tunneled access to Forms
        12. Automated incident intake bot
        13. Incident report logging
        14. Incident alert distribution to the CRT
        15. Incident claiming and escalation
        16. Geolocation statistics of ITRs
        17. Geolocation map dashboard of ITRs
    buttons:
    - title: REQUEST A DEMO
      class: btn--blank btn--arrow
      url: "https://diodedemo.paperform.co/"
      target: _blank
  - title: Access the Internet from Anywhere
    content: |
      Collaborating with Diode Collab is like using a VPN and collaboration tool built in one.  This allows your team to connect from anywhere in the world. And, if they happen to be in the same office, their devices direct-connect to carry on the conversation without even touching the Internet.
  - title: Secure Upload Sites
    content: |
      Sometimes you need to share, or collect, information with people who don't have Diode Collab installed - via a share link accessible from any web browser. This is a great way to exchange information securely with customers, partners, and vendors when operating in a regulated industry. Creating a secure upload site can be done with a single click on any file or folder you'd like to make available.
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
{%- include features.liquid -%}
{%- include box.liquid data="solutions" -%}
