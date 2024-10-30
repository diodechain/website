---
title: For Teams
layout: page
class: header--dark
permalink: /usecases/
redirect_from:
- /teams/


### Hero
hero:
  animated: true
  heading: Protect assets and information
  subheading: How different teams are using Diode
  image: hero/teams.webp


### Teams
teams:
  animated: false
  list:
  - title: Remote OT / IoT access
    heading: Equipment access
    content: |
      Access and maintain remote equipment through easy to manage 256-bit end to end encrypted connections.
    buttons:
    - title: Read the case study
      class: btn--blank btn--arrow
      url: "https://docs.diode.io/docs/usecases/equipment_access/"
      target: _blank

  - title: Teams in sensitive regions
    heading: Sensitive Regions
    content: |
      Diode Collab is a secure replacement for Slack and Discord - it stores no data on a server and includes "ZTN" access for your team.  No self hosting required.
    buttons:
    - title: Read the case study
      class: btn--blank btn--arrow
      url: "https://docs.diode.io/docs/usecases/teams_in_sensitive_regions/"
      target: _blank

  - title: PII, HIPAA, and sensitive information
    heading: Regulated Data
    content: |
      Diode Collab is a great way to keep your current regulated environments intact, while providing remote access to your suppliers and extended team.
    buttons:
    - title: Read the case study
      class: btn--blank btn--arrow
      url: "https://docs.diode.io/docs/usecases/regulated_data/"
      target: _blank

  - title: Software entitlement provisioning 
    heading: License Management
    content: |
      Diode equips every software installation with its own self-custody encryption keys that can be used to provision and manage software licenses.  
    buttons:
    - title: Read the case study
      class: btn--blank btn--arrow
      url: "https://docs.diode.io/docs/usecases/license_provisioning/"
      target: _blank


  - title: Remove assets from the Internet
    heading: Isolated server systems
    content: |
      One of the largest sources of data breach is through a web portal.  Isolate your Wordpress site, business information dashboard, or other sensitive system yet provide full access to your users. 
    buttons:
    - title: Read the case study
      class: btn--blank btn--arrow
      url: "https://docs.diode.io/docs/usecases/isolated_server_assets/"
      target: _blank

  - title: Vet financial applications
    heading: Due dilligence
    content: |
      It is quick and easy to use Diode Collab for due dilligence on debt, equity, and insurance applications without exposing information to server environments that may retain it indefinitely.
    buttons:
    - title: Read the case study
      class: btn--blank btn--arrow
      url: "https://docs.diode.io/docs/usecases/financial_due_diligence/"
      target: _blank


[//]: # (old below)

  - title: Encrypt IP and customer information
    heading: Sensitive Data
    anchor: regulated
    content: |
      Limit your cloud data footprint and make your customers’ confident in your security by keeping sensitive content under your full control.
    
      Make sure critical information never touches another server that will be copied, get stale, and become a liability.
    
      #### PII, HIPAA, and Regulated Industries
      Give your team and suppliers an easy way to collaborate and share information without the liability of email or cloud data.
    image:
      src: "team/ip-and-content_big.webp"
      alt: Regulated Data
    buttons:
    - title: Diode makes compliance regimes easy
      class: btn--blank btn--arrow
      url: "https://contactdiode.paperform.co/"
      target: _blank

  - title: Secure remote asset management
    heading: Operational Technology
    anchor: OT
    content: |
      Give your team highly secure remote access to assets in hard-to-reach locations. Expand your OT security boundary without custom IT!
      
      #### GDPR and Data Compliance
      No matter where your assets are at in the world, Diode makes regionality and data compliance simple - all without IT setup or maintenance burden.
    image:
      src: "team/operational-technology_big.webp"
      alt: Operational Technology
    buttons:
    - title: Move on from complicated VPN projects
      class: btn--blank btn--arrow
      url: "https://contactdiode.paperform.co/"
      target: _blank
      
  - title: Protect world wide teams
    heading: Team Collaboration
    anchor: collaboration
    content: |
      Establish full custody of your organization's data and communications and eliminate data, identity, and behavioral leakages that could unintentionally violate regional data restrictions.
      
      #### Remove points of vulnerability
      Give your most vulnerable people the tools they need to operate securely in their persons, data, and communications.
    
    image:
      src: "team/default.webp"
      alt: Protect Team

    buttons:
    - title: Your team can be protected today
      class: btn--blank btn--arrow
      url: "https://contactdiode.paperform.co/"
      target: _blank

  - title: Provide access for stakeholders
    heading: DevSec Operations
    anchor: devsecops
    content: |
      Isolate server interfaces, dashboards, and network cyber operation tools from attack vectors while providing secure and easy access for the team and stakeholders.
      
      #### Perfect for On Premise and Hybrid
      On premise and managed cloud deployments just got a lot easier. Provision the server and ship product - Diode will connect you no matter where it lands.
    
    image:
      src: "team/developer-operations_big.webp"
      alt: Developer Operations

    buttons:
    - title: Remote APIs, SSH, Dashboards, and DCO integrations
      class: btn--blank btn--arrow
      url: "https://contactdiode.paperform.co/"
      target: _blank


  - title: Integrate in-house and 3rd party systems
    heading: Product Development
    anchor: products
    content: |
      Create highly secure connected products without needing a cloud service.  You can easily integrate partner components as your ecosystem matures - every piece of the system is explicitly identified and managed with Zero Trust security.
      
      #### Enterprise Security and Access Control
      Support multiple customers, integrate with enterprise security tools, and even reconfigure permissions later - all without changing your product.
    image:
      src: "team/product-development_big.webp"
      alt: Product Development

    buttons:
    - title: Connected products without a web service
      class: btn--blank btn--arrow
      url: "https://contactdiode.paperform.co/"
      target: _blank



---

{%- include hero.liquid -%}

{%- include teams.liquid -%}