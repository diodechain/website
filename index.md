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
  heading: Privacy-first collaboration
  subheading: Messaging and remote access for ops teams, executives, and expats - for when security is essential.
  buttons:
  - title: GET THE APP
    url: "#download-app"
    class: popup-open
  image: hero/home.webp


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


### Box: Designed
designed:
  class: "box--network"
  animated: false
  title: Designed for collaboration where security is essential.
  

### Story: Fort Knox protection
protected:
  class: "story--homepage"
  animated: false
  title: 
  heading: World's most secure team messaging app
  content: |
    Your team can chat, share files, and browse securely in a private network whose only data exposure is on your end devices. 

    No servers or phone numbers are needed, and all data is end-to-end encrypted and fully controlled by you.

    Whether working remotely or in the same room, your collaborations stay private and digitally sovereign.
  image:
    src: story/app-homepage.webp
    alt: Protected no matter what


### Story: From anywhere, whenever
anywhere:
  animated: false
  title: 
  heading: Private and secure file sharing
  content: |
    Send and receive sensitive files directly without uploading to third party servers.  Files travel only between you and the recipient, fully end-to-end encrypted.

    Diode is different - even your team membership, permissions, and other access controls are fully under your - and only your - control.

    Start in minutes - no IT setup, no maintenance, and no compromises on privacy.
  image:
    src: story/file_sharing.webp
    alt: Protected no matter what
  mirrored: true


### Story: From anywhere, whenever
developers:
  class: "story--homepage"
  animated: false
  title:  
  heading: Safer than a VPN for accessing tools
  content: |
    Remotely access applications, servers, and OT assets without exposing data, or even session information, to the Internet.  
    
    Diode works in every region.  You can connect end-to-end encrypted to your tools, or use a safe "regional exit" - all from bookmarks in your Zone. 

    No matter if your tool is remote equipment, or a SaaS app like Microsoft Teams, secure access for the team is just one click away.
  image:
    src: story/network-full.webp
    alt: Diode Collab&trade;


### Box: reclaim
reclaim:
  class: "box--cta"
  animated: false
  title: Reclaim your digital sovereignty - download today 
  buttons:
  - title: GET THE APP
    url: "#download-app"
    class: popup-open



### Box: What teams are saying
testimonials:
  class: box--testimonials
  animated: false
  title: What teams are saying
  quotes:
  - quote: Diode unlocks our training software for use in regulated and sensitive environments.
    author: Erich, CEO Compendium
  - quote: I am migrating to Diode to have secure remote control capabilities for our building systems.
    author: Ettoire, Modosmart
  - quote: Diode's response to my support requests highlights how much they really care about all of their customers.
    author: Krista, RPG
  - quote: Diode just works.
    author: Joey, Exosite
  - quote: We are able to deploy remote MES components and equipment that are fully GDPR compliant and have now created a Diode-based product line.
    author: Omer, Dera Technologies
  - quote: We use Diode to securely administrate our network and for financial interactions with portfolio companies.
    author: Eric, Global Enterprise Network
  - quote: Diode allows us to move quickly while protecting the communities and industries we serve.
    author: Josh, YetiCGI


### Box: CTAS
reluctant-ctas:
  class: "box--cta"
  animated: false
  title: 
  buttons:
  - title: HOW IT WORKS
    url: "/how-it-works/"
  - title: GET A DEMO
    url: "https://diodedemo.paperform.co/"


### Box: Our solutions
solutions:
  class: box--orange
  animated: false
  heading: What makes Diode different?
  solutions:
  - title: Works in every region
    icon: icons/app.svg
    content: Diode works everywhere, even in sensitive regions.  Your team can operate securely when traveling and when interacting with regional partners no matter their location.  Encryption on disk and safety profiles provide physical security.
  - title: Only you have access to your data
    icon: icons/cli.svg
    content: Unlike other team messaging apps that break encryption at the server, Diode Collab uses end-to-end encryption for message, files, and connections.  Not even Diode has access to your data, accounts, or configurations.
  - title: Anonymous accounts
    icon: icons/vault.svg
    content: Diode Collab only requires a username - no phone number, email, or any personal details are required.  Access is managed through decentralized credentials that you control - it is full digital ownership from day one.


---

{%- include hero.liquid -%}

{% comment %}
{%- include box.liquid data="why-diode" -%}
{% endcomment %}

{%- include box.liquid data="designed" -%}

{%- include story.liquid data="protected" -%}

{%- include story.liquid data="anywhere" -%}

{%- include story.liquid data="developers" -%}

{%- include box.liquid data="reclaim" -%}

{%- include box.liquid data="testimonials" -%}

{%- include box.liquid data="reluctant-ctas" -%}

{%- include box.liquid data="solutions" -%}

