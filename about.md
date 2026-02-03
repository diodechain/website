---
title: About
layout: page
class: header--dark page--about
permalink: /about/
redirect_from:
- /resources/about/


### Hero
hero:
  animated: true
  heading: Not your keys,<br>not your data
  subheading: Reclaim your digital sovereignty
  image: hero/about.webp


### Headline below Hero
headline:
  animated: false
  title: What drives us. Everyday.
  text: We’re governed by the belief that technology should help humans thrive. It should enhance our ability to operate, create, explore, educate, and innovate.


### Top Story
story:
  animated: false
  title: The beginning of Diode
  heading: It all started with fixing a web2 leak
  content: |
    Diode was born when co-founder Dominic Letz needed to solve for a Man in the Middle attack against Internet time - a prerequisite for a legacy Web2 PKI-based security issue that had bricked millions of devices.
    
    He found a solution by applying decentralized consensus to even the most resource constrained devices.
    
    The Diode team has been innovating ever since to make even the most fluid IT environments secure.
  image:
    src: story/about.svg


### Our Team
#team:
#  animated: false
#  title: Our Team
#  heading: The Diode team has collaborated for over 10 years on high availability software that helps #organizations transform their industries
#  members:
#  - name: Hans
#    title: CEO and Co-Founder
#    linkedin: "https://www.linkedin.com/in/hansrempel/"
#    photo: team/hans.jpg
#
#  - name: Dominic
#    title: CTO and Co-Founder
#    linkedin: "https://www.linkedin.com/in/dominic-letz/"
#    photo: team/dominic.jpg
#
#  - name: Zach
#    title: Developer
#    photo: team/zach.png
#
#  - name: Eric
#    title: Business Development
#    photo: team/eric.jpg
#
#  - name: Spiros
#    title: Developer
#    photo: team/spiros.jpg
#
#  - name: Jon
#    title: Brand and Market
#    photo: team/jon.png


### Article: Our desire
article:
  animated: false
  heading: Our vision is to transform the Internet into everyone's private network
  content: |
    We love how easy the Internet makes it to stay connected - with people, with equipment, with information. However, as data and identities have become a commodoties, it is has become difficult to connect securely.  Every part of the tech stack you don't control can be used to attack your digital ecosystem.
    
    Diode is changing all that.  
    
    Just as Bitcoin uses "not your keys, not your coins" to secure financial transactions on highly available software infrastructure, Diode uses "not your keys, not your data" to secure indentities and control planes on highly available network infrastructure.  The convenience of SaaS, without the custodial risk.

    If you’d like to find out more, or chat about how to best collaborate:
  buttons:
  - title: Get in Touch
    url: "https://contactdiode.paperform.co/"
    target: _blank

---

{%- include hero.liquid -%}

{%- include headline.liquid -%}
{% comment %}
{%- include story.liquid -%}

{%- include team.liquid -%}

---
{% endcomment %}
{%- include article.liquid data="article" -%}
