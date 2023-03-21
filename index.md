---
title: Reclaim Your Digital Sovereignty
layout: new
class: page--homepage header--dark
redirect_from:
- /joinzone/
- /newsletter/welcome.html


### Hero
hero:
  class: hero--homepage
  heading: Diode is Zero Trust For Teams.
  subheading: For operations requiring both agility and security.
  buttons:
  - title: FIND OUT MORE
    url: "/solutions/"
  - title: DOWNLOAD
    class: btn--bordered
    url: "/download/"
  image: hero/default.webp


### Headline below Hero
headline:
  title: Today’s digital security dilemma.
  text: Today’s collaboration and connectivity tools require self-hosting or third-party involvement - burdening teams with cost, complexity and security compromises. <br>Diode has a better way.
  buttons:
  - title: Find Out More
    class: btn--blank btn--arrow
    url: "/solutions/app/"


### Story: What is Diode
app:
  class: "story--homepage"
  title: What is Diode
  heading: A zero trust connectivity network–built for teams.
  content: |
    Diode’s Smart Network is intuitive and easy to use, allowing your teams access to each other and their assets – quickly and securely – no matter where they are in the world.
    
    Teams can collaborate and access assets and other secure systems without the fear of loss of valuable IP or data.
  buttons:
  - title: Read More
    url: "/solutions/app/"
  image:
    src: story/app-homepage.webp
    alt: Diode App


### Story: Fort Knox protection
protected:
  title: Fort Knox protection
  heading: For teams just like yours.
  content: |
    By using Diode, your team can move fast – and operate above the security level that your organization requires.    
    
    It’s easy to create Zero Trust zones that protect your digital operations and allow your partners to securely interoperate.  Get up and running quickly without burdening your IT team.
  buttons:
  - title: Find Out More
    url: "/teams/"
  teams:
  - title: Operational Technology <br>Asset Management
    photo: team/operational-technology.webp
    alt: Operational Technology
  - title: Product Development <br>Partner Interop
    photo: team/product-development.webp
    alt: Product Development
  - title: Developer Operations <br>Stakeholder Access
    photo: team/developer-operations.webp
    alt: Developer Operations
  - title: IP and Sensitive Content <br>Customer Portals
    photo: team/ip-and-content.webp
    alt: IP and Sensitive Content


### Story: From anywhere, whenever
anywhere:
  title: From anywhere, whenever
  heading: Protected no matter what.
  content: |
    Eliminate third parties from your IT environment, making it more secure than any managed SSE or Cloud VPN solution.
  
    With Diode, IT, OT, and IoT assets can be remotely managed whether they are on-site, in the cloud, or set up in a hybrid environment – all without leaking data, identifiable information, or behaviors.
  buttons:
  - title: Find Out More
    url: "/how-it-works/"
  image:
    src: story/around.svg
    class: circle
    alt: Protected no matter what
  mirrored: true


### Box: What teams are saying
testimonials:
  class: box--testimonials
  title: What teams are saying
  quotes:
  - quote: Diode is an amazing technology and product - it unlocks our software for use in regulated and sensitive environments.
    author: Erich, CEO Compendium
  - quote: I like very much the approach you are following at **diode.io** and am migrating to diode to have full remote control via ssh.
    author: Ettoire, Modosmart
  - quote: Diode's response to my support requests makes me know they really care about all of their customers.
    author: Krista, RPG
  - quote: Diode just works.
    author: Joey, Exosite
  - quote: Diode has changed the way we do business - we are able to deploy MES components and environments fully GDPR compliant and have created a Diode-based product line.
    author: Omer, Dera Technologies
  - quote: We are now using Diode for both our administration of the network and for our financial interactions with portfolio companies.  This tool has changed how we do business.
    author: Eric, Global Enterprise Network
  - quote: Diode allows us to move quickly while achieving the level of information protection for the communities and industries we serve.
    author: Josh, YetiCGI


### Box: Our solutions
solutions:
  class: box--orange
  title: No third parties means Zero&nbsp;Leakage&trade;
  heading: Our solutions.
  solutions:
  - title: App
    icon: icons/app.svg
    content: The Diode App is for your team. Whether replacing a leaky chat app, sharing files E2EE, securing a server dashboard, or deploying advanced OT assets, our app unlocks the power of Diode for people.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/solutions/app/"
  - title: CLI
    icon: icons/cli.svg
    content: The Diode CLI is a headless tool for OT, IT, and IoT devices. It can be used stand-alone to secure autonomous systems, and/or in concert with team members using the Diode App.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/solutions/cli/"
  - title: Vault
    icon: icons/vault.svg
    content: The Diode Vault is an autonomous tool that combines both App and CLI features in a small box or cloud appliance. 24-7 availability, backup, and geo-access for your team and assets.
    button:
      title: Find Out More
      class: "btn--blank btn--arrow"
      url: "/solutions/vault/"


### Box: Our Network
our-network:
  class: "box--network"
  icon: icons/network.svg
  title: A better way
  heading: Our network.
  content: |
    The Diode Network is the world’s leading Smart Network - a new generation of zero trust software defined networks based on hardened blockchain technology. Think ad hoc E2EE perimeters.
  buttons:
  - title: Find Out More
    url: "/solutions/network/"


### Box: How Diode works
how-works:
  class: "box--orange box--how"
  title: Behind the scenes
  heading: How Diode works.
  content: |
    Diode uses Blockchain Defined Perimeters™ that define and enforce end-to-end encrypted application zones without managed servers.
  buttons:
  - title: Find Out More
    class: "btn--bordered"
    url: "/how-it-works/"


### Partners
partners:
  title: World-changing collaborations
  heading: Our Partners.
  logos:
  - image: partners/YETi-CGI.svg
    alt: YETi CGI
    url: "http://yeticgi.com"

  - image: partners/compendium.svg
    alt: Compendium

  - image: partners/GEN.svg
    alt: Global Enterprise Network

  - image: partners/deraconnect.svg
    alt: Deraconnect
    url: "https://deraconnect.com"

  - image: partners/iPS.svg
    alt: iPS

  - image: partners/context.svg
    alt: Context

  - image: partners/exosite.svg
    alt: Exosite
    url: "https://www.exosite.com"

---

{%- include hero.liquid -%}

{%- include headline.liquid -%}

{%- include story.liquid data="app" -%}

{%- include story.liquid data="protected" -%}

{%- include story.liquid data="anywhere" -%}

{%- include box.liquid data="testimonials" -%}

{%- include box.liquid data="solutions" -%}

{%- include box.liquid data="our-network" -%}

{%- include box.liquid data="how-works" -%}

{%- include partners.liquid -%}