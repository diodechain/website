---
layout: new
class: page--homepage
title: Reclaim Your Digital Sovereignty


### Hero
hero:
  class: hero--homepage
  title: Securing team operations in fluid IT environments is _complicated_.
  heading: Zero&nbsp;Trust, <br>Off the Shelf
  subheading: For teams whose communications and asset connectivity require both agility and security.
  buttons:
  - title: FIND OUT MORE
    url: "#"
  - title: DOWNLOAD Diode<span>&trade; FOR MacOS</span>
    class: btn--bordered
    url: "#"
  image: hero/default.webp


### Headline below Hero
headline:
  title: Today’s Security Conundrum
  text: Today’s collaboration and connectivity tools require either self-hosting or third-party involvement - burdening the team with either cost/complexity or security compromises. Diode has a better way.


### Story: What is Diode
what-is:
  title: What is Diode
  heading: An asset connectivity network built for teams.
  content: |
    Diode’s Smart Network is intuitive to use - your team can quickly secure access to each other and their managed assets, no matter where they are at in the world.
  
    Team members can chat, work on files, and hand off work-in-process to those best suited to take action.
  buttons:
  - title: Read More
    url: "#"
  gallery:
  - image: story/screen.webp
    alt: Screenshot
  - image: story/screen.webp
    alt: Screenshot
  - image: story/screen.webp
    alt: Screenshot


### Story: Anywhere. Whenever.
anywhere:
  title: Anywhere. Whenever.
  heading: Protected no matter what.
  content: |
    Eliminate third parties from your IT environment, making it more secure than any managed SSE or Cloud VPN solution.
  
    IT, OT, and IoT assets can be remotely managed whether they are on-premise, in the cloud, or deployed in a hybrid environment - all without leaking data, identifiers, or application / telemetry flows.
  buttons:
  - title: Find Out More
    url: "#"
  image:
    src: story/protected.svg
    class: circle
    alt: Protected no matter what
  mirrored: true


### Story: Operate protected
protected:
  title: Operate protected
  heading: For teams just like yours.
  content: |
    By using Diode, your team can move fast and operate at or above the security level that your assets and IP require.
  
    Zero Trust perimeters that ring-fence digital operations, and that allow partners to securely interoperate, can be created and provisioned in seconds without burdening the IT team.
  buttons:
  - title: Find Out More
    url: "#"
  - title: Schedule a Demo
    class: btn--blank
    url: "#"
  teams:
  - title: Operational Technology <br>Asset Management
    photo: team/operational-technology.webp
    alt: Operational Technology
  - title: Product Development <br>Partner Interop
    photo: team/product-development.webp
    alt: Product Development
  - title: Developer Operations <br>Stakeholde Access
    photo: team/developer-operations.webp
    alt: Developer Operations
  - title: IP and Sensitive Content <br>Customer Portals
    photo: team/ip-and-content.webp
    alt: IP and Sensitive Content


### Box: Our solutions
solutions:
  class: box--orange
  title: No third parties means zero leakage.
  heading: Our solutions.
  solutions:
  - title: App
    icon: "icons/app.svg"
    content: The Diode App is for all your teams. Whether replacing a leaky chat app, sharing files E2EE, securing a simple dashboard, or deploying advanced OT assets, this app unlocks the power of Diode for people.
    button:
      label: Find Out More
      class: btn--blank
      url: "/solutions/app/"
  - title: CLI
    icon: "icons/cli.svg"
    content: The Diode CLI is a headless tool for OT, IT, and IoT devices. It can be used stand-alone or in concert with Zones created in the Diode App. Connect the edge here.
    button:
      label: Find Out More
      class: btn--blank
      url: "/solutions/cli/"
  - title: Vault
    icon: "icons/vault.svg"
    content: The Diode Vault is a Diode hardware appliance that combines both the App features and the CLI features in a small box. 24-7 availability, backup, and geo-access for your team and assets.
    button:
      label: Find Out More
      class: btn--blank
      url: "/solutions/vault/"


### Box: Our network
our-network:
  class: "box--network"
  icon: "icons/network.svg"
  title: A better way
  heading: Our network.
  content: |
    The Diode Network is the world’s leading Smart Network - a new generation of zero trust software defined networks based on hardened blockchain technology. Think ad hoc E2EE perimeters.


### Box: What teams are saying
testimonials:
  title: What teams are saying
  blockquote: Diode is sweet, this is an amazing technology and product.
  caption: Erich, CEO Compendium


### Box: How Diode works
how-works:
  class: box--orange
  title: Behind the scenes
  heading: How Diode works.
  content: |
    Diode uses Blockchain Defined Perimeters&trade; to enable end-to-end encrypted application zones without managed servers.
  
    We’ve patented this fundamental Web3-enablement technology in the EU, China and here in the States and it’s become the foundation for our Zero Trust toolset.


### Partners
partners:
  title: World changing collaborations
  heading: Our Partners
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

---

{%- include hero.liquid -%}

{%- include headline.liquid -%}

{%- include story.liquid data="what-is" -%}

{%- include story.liquid data="anywhere" -%}

{%- include story.liquid data="protected" -%}

{%- include box.liquid data="solutions" -%}

{%- include box.liquid data="our-network" -%}

{%- include box.liquid data="testimonials" -%}

{%- include box.liquid data="how-works" -%}

{%- include partners.liquid -%}