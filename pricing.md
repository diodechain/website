---
title: Pricing
layout: page
class: header--dark
permalink: /pricing/
redirect_from:
- /pricing/success.html


### Hero
hero:
  animated: true
  class: hero--right
  heading: Plans and pricing
  subheading: Start today at the level that fits your team
  image: hero/pricing.webp

pricing:
  animated: false
  title: Privacy-first communication
  heading: Protect your collaboration
  include: <a href="https://app.docs.diode.io/docs/faq/what-can-i-do-with-the-free-version/" target="_blank">Free plans include</a>


  plans:
  - title: Group
    description: secure messaging
    price:
      yearly: 2.50
      year: 30
      monthly: 3
    features: |
      - Private invitation codes
      - New user moderation
      - Admin role
      - Private chat channels
      - Chat visibility policy
      - 10 chat channels
      - 10 web links
      - Standard support
    button: Order
    id:
      yearly: "/plans/group_yearly"
      monthly: "/plans/group_monthly"

  - title: Team
    description: secure messaging and files
    price:
      yearly: 8.50
      year: 100
      monthly: 10
    features: |
      All Group plus:
      - Member file collaboration
      - File sync policy
      - File backup
      - Team markdown docs
      - 20 web links
      - Standard support
    button: Order
    id:
      yearly: "/plans/team_yearly"
      monthly: "/plans/team_monthly"


  - title: Business
    description: secure messaging, files, and remote access
    price:
      yearly: 12.50
      year: 150
      monthly: 15
    features: |
      All Team plus:
      - Secure equipment access
      - Regional access tunnels
      - Custom endpoints
      - 100 chat channels
      - 100 web links
      - Standard support
    button: Order
    id:
      yearly: "/plans/business_yearly"
      monthly: "/plans/business_monthly"

note:
  animated: false
  subheading: |
    [Watch a video for how our plans work.](https://app.docs.diode.io/docs/features/pricing-and-plans/){:target="_blank"} 

    <a href="https://contactdiode.paperform.co/">Contact us for:</a><br>
      <br>Enterprise integrations
      <br>Full Diode Network access
      <br>OT/IT asset management
      <br>Whitelabeling
      <br>Premium supprt SLA
      <br>and more...

  buttons:
  - title: Get in Touch
    url: "https://contactdiode.paperform.co/"

---

{%- include hero.liquid -%}

{%- include pricing.liquid -%}

{%- include download.liquid data="note" -%}
