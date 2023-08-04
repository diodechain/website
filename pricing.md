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
  heading: Plans and pricing.
  subheading: Start today at the level you need.
  image: hero/pricing.webp

pricing:
  animated: false
  title: E2EE from the core
  heading: Secure your team today.

  blurb: <br/>Every Zone can use the "Nomad" plan when first created, and can be later upgraded as desired.

  plans:
  - title: Nomad
    description: a free plan for private collaboration.
    price:
      yearly: 0
      year: 0
      monthly: 0
    features: |
      - E2EE file sharing
      - E2EE group chat and DMs
      - E2EE asset connectivity
      - Browser upload/download
      - Unlimited storage
      - 5 team members
    button: Download
    action: "https://diode.io/download/#app"

  - title: Business
    description: for organizations securing their remote teams.
    price:
      yearly: 80
      year: 960
      monthly: 100
    features: |
      All Nomad plus:
      - Invitation codes
      - 10 chat channels
      - 20 web links
      - 20 team members
      - $5 per additional team
      - Standard support
    button: Order
    id:
      yearly: "https://buy.stripe.com/bIY5n6gzq42ycLufZ3"
      monthly: "https://buy.stripe.com/8wMeXGfvmfLgbHq28e"

  - title: Enterprise
    description: for enterprises expanding their security perimeter.
    features: |
      All Business plus:
      - Secure web browser
      - Regional access tunnels
      - Asset management
      - Whitelabeling
      - Enterprise integrations
      - Premium support SLA
    button: Contact Us
    action: "https://contactdiode.paperform.co/"


note:
  animated: false
  subheading: |
    [Watch a video for how this works.](https://support.diode.io/article/pr3fytz8sq){:target="_blank"} 

    Please connect with us if you don't see a good plan for your community! 
    
  buttons:
  - title: Get in Touch
    url: "https://contactdiode.paperform.co/"

---

{%- include hero.liquid -%}

{%- include pricing.liquid -%}

{%- include download.liquid data="note" -%}
