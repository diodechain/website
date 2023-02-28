---
title: Pricing
layout: new
class: header--white
permalink: /pricing/
redirect_from:
- /pricing/success.html


### Hero
hero:
  class: hero--rounded
  heading: Plans and pricing.
  subheading: Start today at the level you need.
  image: hero/pricing.webp

pricing:
  title: E2EE from the core
  heading: A fit for every team.

  include: Both free and paid plans include
  items:
  - E2EE file sharing
  - E2EE group chat and DMs
  - E2EE asset connectivity
  - Secure markdown editor
  - Browser upload/download
  - Unlimited storage
  - 10 team members

  plans:
  - title: Freelancer
    description: for independent professionals.
    price:
      yearly: 8
      year: 96
      monthly: 10
    features: |
      All free features plus:
      - File backup
      - Invitation codes
      - 3 chat channels
      - 20 web links
      - 10 free team members
      - Basic support
    button: Order
    id:
      yearly: "price_1IET4eEGYTHllVn0KLQTQOmk"
      monthly: "price_1IET4eEGYTHllVn0GJvaFrOP"

  - title: Business
    description: for teams collaborating on operations.
    price:
      yearly: 40
      year: 480
      monthly: 50
    features: |
      All Freelancer plus:
      - Custom web link brand
      - Private chat channels
      - Web3 secure sites
      - 10 chat channels
      - 100 web links
      - 20 free team members
      - $5 per additional team
      - Premium support
    button: Order
    id:
      yearly: "price_1IET4XEGYTHllVn0xPwXihpr"
      monthly: "price_1IET4XEGYTHllVn0rZD0UVlt"

  - title: Enterprise
    description: for organizations expanding their security perimeter.
    features: |
      All Business plus:
      - Asset management
      - Private invitation codes
      - Web2 regional proxies
      - DCO integrations
      - Port mapping policies
      - Unlimited chat channels
      - Unlimited web links
      - Custom support SLA
    button: Contact Us
    action: "https://contactdiode.paperform.co/"


note:
  subheading: |
    No purchase is necessary to download and start collaborating - every Zone is free when first created, and can be later upgraded by ordering one of the plans above.
    
    [Watch a video for how this works.](https://support.diode.io/article/pr3fytz8sq){:target="_blank"}
  buttons:
  - title: Download
    url: "/download/"

---

{%- include hero.liquid -%}

{%- include pricing.liquid -%}

{%- include download.liquid data="note" -%}