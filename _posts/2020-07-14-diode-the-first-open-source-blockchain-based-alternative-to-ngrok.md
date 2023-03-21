---
layout: post
title: "Diode: The First Open-Source Blockchain-Based Alternative to Ngrok"
date: 2020-07-14 01:30
categories: [Diode]
tags: [Diode, Blockchain, Use case]
author: Yahsin Huang
image: diode_ngrok_alt_f.png
---

[Diode](https://github.com/diodechain/diode_go_client) is an open-source blockchain-based peer-to-peer network that enables developers to create applications for various decentralized projects. One of the popular applications that is being developed recently is using Diode as a blockchain implementation of [Ngrok](https://ngrok.com/).

To use Diode, the first open-source, blockchain-based Ngrok alternative, written in Go, install the Diode Client using the curl command: 

<code class="highlighter-rouge"><span class="noselect">$ </span>curl -Ssf https://diode.io/install.sh | sh</code>

Go to [/download//](/download//). 

Open a terminal window and run the curl command so that it installs the Diode Client. 

![](../assets/img/blog/diode_ngrok_1.png)


Or, you can build from source: [https://github.com/diodechain/diode_go_client](https://github.com/diodechain/diode_go_client) 

Here’s what it looks like after you installing the Diode Client: 

![](../assets/img/blog/diode_install_ngrok.gif)

Before we had a diode init command, at the moment we’ve made some changes and you no longer need the init command in client. Now you can simply publish or browse resources through the Diode network without any initialization.

If you visit Diode’s [prenet website](https://diode.io/prenet/#/dns), you can see a list of Diode fleet contracts that are already created. Fleet contracts are strings of letters and numbers. Protected resources are set in Diode’s fleet contracts (“protected” is governed by the fleet contract whitelist); private resources are set in your local machines (“private” is setup by the command). 

Then, you want to publish your local port to the Diode Network. In your terminal window, type: 

<code class="highlighter-rouge"><span class="noselect">$ </span>diode publish -public 3030:3030</code>

Here’s what the output looks like:
![](../assets/img/blog/gif_diode_publish.gif)

This binds your local port to a Diode port. We are publishing as “public” so anyone can view it (can also use “protected” or “private”) 

Now anyone can access your website through our gateway “[address].diode.link”!

![](../assets/img/blog/diode_ngrok_prenet.png)

Here’s a bonus -- your website address can use a human readable name. Register your Blockchain Name System (BNS) custom domain: [https://diode.io/prenet/#/dns](https://diode.io/prenet/#/dns). 

Check out the [Diode FAQs](https://github.com/diodechain/wiki/wiki/FAQs) to learn more about Diode. To learn more about the source code, check out [diodechain/diode_go_client](https://github.com/diodechain/diode_go_client) on Github.