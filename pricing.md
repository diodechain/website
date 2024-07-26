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
  subheading: Start today at the level that fits your organization
  image: hero/pricing.webp

pricing:
  animated: false
  title: Privacy-first collaboration and remote access
  heading: Protect executives and teams
  include: All plans include


  plans:
  - title: Team
    description: secure collaboration for executives and teams
    price:
      yearly: 100
      year: 1200
      monthly: 100
    features: |
      - Invitation codes
      - 10 chat channels
      - 20 web links
      - 10 team members
      - $10 per additional team
      - Standard support
    button: Order
    id:
      yearly: "https://buy.stripe.com/4gwaHq5UM2YueTC6oP"
      monthly: "https://buy.stripe.com/28o16Q3ME1UqbHq3cx"


  - title: Business
    description: secure collaboration and remote access
    price:
      yearly: 150
      year: 1800
      monthly: 150
    features: |
      All Team plus:
      - Secure server access
      - Regional access tunnels
      - $15 per additional team
      - Standard support
    button: Order
    id:
      yearly: "https://buy.stripe.com/6oE7ve1Ew2YufXGaF4"
      monthly: "https://buy.stripe.com/fZe2aU82U7eK3aUeVi"

  - title: Enterprise
    description: expanded security perimeters and integrations
    features: |
      All Business plus:
      - OT/IT asset management
      - Application and fleet management
      - Whitelabeling
      - Enterprise integrations
      - Premium support SLA
    button: Contact Us
    action: "https://contactdiode.paperform.co/"


note:
  animated: false
  subheading: |
    Did you know there is a free plan?  <a href="https://app.docs.diode.io/docs/faq/what-can-i-do-with-the-free-version/">See here</a>.

    [Watch a video for how our plans work.](https://support.diode.io/article/pr3fytz8sq){:target="_blank"} 
    
  buttons:
  - title: Get in Touch
    url: "https://contactdiode.paperform.co/"

---

{%- include hero.liquid -%}

{%- include pricing.liquid -%}

{%- include download.liquid data="note" -%}
