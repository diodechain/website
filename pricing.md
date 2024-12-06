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
      yearly: 8.50
      year: 100
      monthly: 10
    features: |
      - Invitation codes
      - 10 chat channels
      - 20 web links
      - File backup 
      - File sync policy
      - Admin role
      - Standard support
    button: Order
    id:
      yearly: "/plans/team_yearly"
      monthly: "/plans/team_monthly"


  - title: Business
    description: secure collaboration and remote access
    price:
      yearly: 12.50
      year: 150
      monthly: 15
    features: |
      All Team plus:
      - 100 chat channels
      - 100 web links
      - Secure server access
      - Regional access tunnels
      - Custom endpoints
      - Standard support
    button: Order
    id:
      yearly: "/plans/business_yearly"
      monthly: "/plans/business_monthly"

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

    [Watch a video for how our plans work.](https://app.docs.diode.io/docs/features/pricing-and-plans/){:target="_blank"} 
    
  buttons:
  - title: Get in Touch
    url: "https://contactdiode.paperform.co/"

---

{%- include hero.liquid -%}

{%- include pricing.liquid -%}

{%- include download.liquid data="note" -%}
