---
layout: new
permalink: /about/
title: About

### Hero
hero:
  heading: A little bit <br>about us.
  subheading: How we started, what we believe in and where&nbsp;we’re&nbsp;going.
  image: hero/about.webp


### Headline below Hero
headline:
  title: What drives us. Everyday.
  text: We’re governed by a strong set of ideals. Our belief that technology should help humans thrive – that it should allow us to explore, educate and innovate unhindered, drives what we create.


### Top Story
story:
  title: The beginning of Diode
  heading: It all started with fixing a web2 leak.
  content: |
    Diode was born when co-founder Dominic Letz needed to solve for a Man in the Middle attack against time - a prerequisite for a legacy Web2 PKI-based security issue that had bricked millions of devices.
  
    He found a solution by applying decentralized consensus to even the most resource constrained devices.
  
    The Diode team has been innovating ever since to make even the most fluid IT environments secure.
  image:
    src: story/oval.webp
    class: oval
    alt: alt


### Our Team
team:
  title: Our Team
  heading: The Diode team has collaborated for over 10 years on high availability software that helps organizations transform their industries.

  members:
  - name: Hans
    title: CEO and Co-Founder
    photo: team/default.webp

  - name: Dominic
    title: CTO and Co-Founder
    photo: team/default.webp

  - name: Zach
    title: Developer
    photo: team/default.webp

  - name: Eric
    title: Business Development
    photo: team/default.webp

  - name: Spiros
    title: Developer
    photo: team/default.webp

  - name: Jon
    title: Brand and Market
    photo: team/default.webp


### Article: Our desire
article:
  heading: Our desire to upgrade the internet.
  content: |
    At Diode, we believe the Internet is a wonderful tool that can enable free, civil, and thriving collaboration. However, it is has become increasingly difficult to leverage the Internet’s benefits without risking privacy or sustainability.
  
    Everything we do at Diode strives to enable individuals and organizations the means to private and secure collaboration.
  
    Today, the team is busy developing next generation applications, expanding the capabilities of the Diode Network, and growing our base of customers, partners, and developers.

    If you’d like to find out more, or chat about how to best collaborate:
  buttons:
  - title: Get in Touch
    url: "#"


---

{%- include hero.liquid -%}

{%- include headline.liquid -%}

{%- include story.liquid -%}

{%- include team.liquid -%}

---

{%- include article.liquid data="article" -%}