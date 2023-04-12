---
title: About
layout: page
class: header--dark
permalink: /about/
redirect_from:
- /resources/about/


### Hero
hero:
  animated: true
  heading: A little bit <br>about us.
  subheading: How we started, what we believe in, <br>and where we’re going.
  image: hero/about.webp


### Headline below Hero
headline:
  animated: true
  title: What drives us. Everyday.
  text: We’re governed by the belief that technology should help humans thrive. It should enhance our ability to operate, create, explore, educate, and innovate - unhindered.


### Top Story
story:
  animated: true
  title: The beginning of Diode
  heading: It all started with fixing a web2 leak.
  content: |
    Diode was born when co-founder Dominic Letz needed to solve for a Man in the Middle attack against Internet time - a prerequisite for a legacy Web2 PKI-based security issue that had bricked millions of devices.
    
    He found a solution by applying decentralized consensus to even the most resource constrained devices.
    
    The Diode team has been innovating ever since to make even the most fluid IT environments secure.
  image:
    src: story/about.svg


### Our Team
team:
  animated: true
  title: Our Team
  heading: The Diode team has collaborated for over 10 years on high availability software that helps organizations transform their industries.
  members:
  - name: Hans
    title: CEO and Co-Founder
    linkedin: "https://www.linkedin.com/in/hansrempel/"
    photo: team/hans.jpg

  - name: Dominic
    title: CTO and Co-Founder
    linkedin: "https://www.linkedin.com/in/dominic-letz/"
    photo: team/dominic.jpg

  - name: Zach
    title: Developer
    photo: team/zach.png

  - name: Eric
    title: Business Development
    photo: team/eric.jpg

  - name: Spiros
    title: Developer
    photo: team/spiros.jpg

  - name: Jon
    title: Brand and Market
    photo: team/jon.png


### Article: Our desire
article:
  animated: true
  heading: Our desire to upgrade the internet.
  content: |
    At Diode, we love how the Internet is a wonderful tool that can enable free, civil, and thriving collaboration. However, it is has become increasingly difficult to leverage the Internet’s benefits without risking privacy or sustainability. 
  
    Everything we do at Diode strives to enable teams and organizations with the means of secure and confidential operations.
  
    Today, the Diode team is busy developing next generation applications, expanding the capabilities of the Diode Network, and growing our base of customers, partners, and developers.

    If you’d like to find out more, or chat about how to best collaborate:
  buttons:
  - title: Get in Touch
    url: "https://contactdiode.paperform.co/"
    target: _blank

---

{%- include hero.liquid -%}

{%- include headline.liquid -%}

{%- include story.liquid -%}

{%- include team.liquid -%}

---

{%- include article.liquid data="article" -%}