---
title: Privacy-first Collaboration & Remote Access
layout: page
class: page--homepage header--dark
redirect_from:
- /newsletter/welcome.html


### Hero
hero:
  class: hero--homepage
  animated: true
  globe: true
  heading: Blockchain secured infrastructure
  #heading: Blockchain secured communication
  #heading: Blockchain secured ZTNA
  #heading: Blockchain secured networking
  subheading: Off-the-shelf WireGuard, private AI, messaging, files, and web tunneling
  #Lock down your network in the age of AI
  #Lock down your network in the age of AI
  buttons:
  - title: Signup
    target: _blank
    url: "https://ztna.diode.io"
    class: popup-open
  tagline: Upgrade your zero trust networking
  #tagline: Permissionless TCP/UDP relays with out-of-the box WireGuard, private AI, messaging, files, and more.
  image: hero/solutions.webp

### Headline below Hero
headline:
  animated: false
  title: Why blockchain?
  text: Blockchain eliminates vendor risk.  Diode's approach ensures your serverless control plane is private, highly secure, immutable, and self-custody.
  link_title: READ MORE
  link_url: /how-it-works/

### Box: Why Diode
#why-diode:
#  class: box--orange
#  animated: false
#  title: Protect your organization, and yourself, against risks from cyber threats
#  heading: "\"I trust Diode for private messaging and secure access to the web and corporate resources\" <br><br>- #VP, Multinational"
#  solutions:
#  - title: Guarantee Privacy
#    icon: icons/vault.svg
#    content: You collaborate with trusted advisors every day. In your line of work, it is essential that those #discussions and documents remain strictly private - from cybercriminals, nation-states, and other threat actors.
#    button:
#      title: Request Demo
#      class: "btn--blank btn--arrow"
#      url: "https://diodedemo.paperform.co/"
#  - title: Global Access
#    icon: icons/cli.svg
#    content: No matter where you go in the world, protected access to the Internet, corporate assets, and team #members is seamlessly delivered with Diode.  There are few things more frustrating than to lose access to your #team, tools, or family members when abroad.
#    button:
#      title: FIND OUT MORE
#      class: "btn--blank btn--arrow"
#      url: "/products/collab/"
#  - title: Regulated Data
#    icon: icons/app.svg
#    content: With privacy laws like GDPR and HIPAA, and oversight by regional regulatory authorities including the #SEC, HHS, and other geopolitical-specific bodies, it is key that you do everything possible to avoid a breach of vprotected data.
#    button:
#      title: CONTACT SALES
#      class: "btn--blank btn--arrow"
#      url: "https://contactdiode.paperform.co/"


#### Box: Designed
#designed:
#  class: "box--network"
#  animated: false
#  title: The network of automated TCP/UDP relays are choreographed by encrypted blockchain defined perimeters

### Story
wireguard:
  animated: false
  title: 
  heading: Zero Trust WireGuard
  content: |
    No server to host.  No vendor risk on the control plane.  Just P2P WireGuard.

    WireGuard was meant to be P2P.  Diode's automated network of UDP relays and encrypted blockchain control plane unleash WireGuard's full potential. 

    If you are in a regulated industry and need to ensure your routes are locked down to known IP addresses, it is as simple as adding one or more autonomous relays.  Automated, efficient, and extremely low maintenance.  
  image:
    src: story/wg-full.webp
    alt: Protected no matter what
  buttons:
    - title: Connect Assets Now
      url: "https://ztna.diode.io/"
      target: _blank


### Story
private-ai:
  animated: false
  title: 
  heading: Private AI
  content: |
    Prove value and innovate with AI without compromising confidentiality.

    Diode's end-to-end encrypted private AIs deliver performant LLM capabilities into sensitive operations.

    Diode can deliver a full private AI suite, including the LLM, pipeline, tools, and user interface.
  image:
    src: story/app-homepage.webp
    alt: Protected AI at every level
  mirrored: true
  buttons:
    - title: TRY IT OUT
      url: "https://privateaidemo.diode.link/"
      target: _blank


### Story
diode-collab:
#  class: "story--homepage"
  animated: false
  title:  
  heading: Private Team Collaboration
  content: |
    Diode Collab is a new take on messaging, file sharing, and VPN - everything needed for a team to stay securely connected, everywhere in the world.  

    It is a cross-platform app that has no data on servers.  Your devices tunnel to each other with nothing in the middle.

    Advanced physical security features bring peace of mind even in contested environments.
  image:
    src: story/app-full.webp
    alt: Diode Collab&trade;
  buttons:
    - title: GET THE APP
      url: "#download-app"
      class: popup-open
    - title: Learn more
      class: "btn--blank btn--arrow"
      url: "https://collab.diode.io/"
      target: _blank



### Box: reclaim
#reclaim:
#  class: "box--cta"
#  animated: false
#  title: Reclaim your digital sovereignty - download today 
#  buttons:
#  - title: GET THE APP
#    url: "#download-app"
#    class: popup-open


### Box: IT people
it-people:
  class: "box--cta"
  animated: false
  title: <br><br>Just want to use the relay network, or build your own app?
  buttons:
  - title: LEARN ABOUT THE NETWORK
    url: "/products/network/"
  - title: CLI DOCS
    url: "https://cli.docs.diode.io"


---

{%- include hero.liquid -%}

{%- include headline.liquid -%}
{% comment %}
{%- include box.liquid data="why-diode" -%}
{%- include box.liquid data="designed" -%}
{% endcomment %}

{%- include story.liquid data="wireguard" -%}

{%- include story.liquid data="private-ai" -%}

{%- include story.liquid data="diode-collab" -%}

{%- include box.liquid data="it-people" -%}

