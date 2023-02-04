---
layout: new
permalink: /solutions/
title: Solutions


hero:
  heading: defewar <br>dasfasf
  subheading: For teams who care about the security of their&nbsp;operations.
  image: hero/default.webp


app:
  title: sdfddsf
  heading: App
  content: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex

    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
    #### Use for
    Short list/describe use cases here.

  buttons:
  - title: Find Out More
    url: "./diode-drive/"
  - title: Download
    url: "/download/"
  image:
    src: story/orange.webp
    class: oval
    alt: alt


cli:
  title: sdfddsf
  heading: CLI
  content: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex

    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
    #### Use for
    Short list/describe use cases here.

  buttons:
  - title: Find Out More
    url: "./diode-cli/"
  - title: Download
    url: "/download/"
  image:
    src: story/orange.webp
    class: oval
    alt: alt


network:
  title: sdfddsf
  heading: Network
  content: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex

    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
    #### Use for
    Short list/describe use cases here.

  buttons:
  - title: Find Out More
    url: "./diode-cli/"
  - title: Download
    url: "/download/"
  image:
    src: story/orange.webp
    class: oval
    alt: alt

---

{%- include hero.liquid -%}

{%- include story.liquid data="app" -%}

{%- include stories.liquid data="cli,network" -%}