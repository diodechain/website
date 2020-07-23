---
layout: docs
category: Introduction
title: Useful Links
tagline: >-
  Developer and User resources will be published here. 
  Let us know any questions via <a href="https://t.me/diode_chain">Telegram</a>

docs:
- title: 'Getting Started'
  description: >-
    Quickly dive into using diode to publish a local web server or service.
  link: docs/getting-started.html

- title: 'FAQ'
  description: >-
    Our list of frequently asked questions is steadily beeing updated and a good resource for all common questions regarding Diode.
  link: https://github.com/diodechain/wiki/wiki/FAQs

- title: 'Blockquick Paper'
  description: >-
    The blockquick paper - our flux compensator that made connecting small devices to the blockchain possible.
  link: https://eprint.iacr.org/2019/579.pdf

- title: 'Network Status'
  description: >-
    Check the current prenet uptime for two of our client devices in Berlin in Taipei
  link: https://status.diode.io

- title: 'Presentations'
  description: >-
    Review some of our recent presentation decks. We will keep publishing new ones from time to time.
  link: https://github.com/diodechain/presentations

- title: '[Developer] Diode Server Documentation'
  description: >-
    Learn more about the inner workings of the Ethereum compatible reference node
  link: docs/index.html

- title: '[Developer] Diode Client Documentation'
  description: >-
    If you plan on start hacking in the go reference client this is your place to go
  link: https://github.com/diodechain/diode_go_client/blob/master/README.MD

- title: '[Developer] Ethereum RPC Documentation'
  description: >-
    Diode is Ethereum RPC API compatible and hosts listen by default on port :8443. 
    Try any of them against testnet.diode.io:8443
  link: https://eth.wiki/json-rpc/API
---


<div class="docets row">
    <!-- Section Content -->
    {% for doc in page.docs %}
    <div class="doc-outer col-md-4 col-sm-6">
        <a href="{{ doc.link }}">
            <div class="doc">
                <h3>
                    {{ doc.title }}
                </h3>
                <span>
                    {{ doc.description }}
                </span>
            </div>
        </a>
    </div>
    {% endfor %}
</div>
