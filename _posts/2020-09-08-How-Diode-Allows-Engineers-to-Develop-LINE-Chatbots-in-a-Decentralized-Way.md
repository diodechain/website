---
layout: post
title: "How Diode Allows Engineers to Develop LINE Chatbots in a Decentralized Way"
date: 2020-09-08 03:06
categories: [Diode]
tags: [Diode]
author: Yahsin Huang
image: diode_client_flow.png
imageclass: top
---


![alt_text](images/blog/diode_line_bot_feature.gif "image_tooltip")


[Diode](https://github.com/diodechain/diode_go_client) is an open-source, blockchain-based, peer-to-peer network that enables software developers to build valuable decentralized projects. It’s the first and only blockchain-based Ngrok alternative that we’re aware of. Written in Go, Diode was developed by German engineer Dominic Letz and a few Taiwan-based blockchain developers.

Why should you choose Diode over Ngrok? This is one of the questions we get asked a lot. We believe that you have, at the minimum, three reasons to use Diode. One is Diode is free to use. We’re still at the growing stage, and we would like to invite everyone to give it a go! This is something that’s unique because if you’re a user of Ngrok, you would know that it wouldn’t be that much of a useful tool if you hadn’t chosen to upgrade your plan to paid plan. A lot of important features such as custom domains aren’t available in Ngrok’s free plan. 



![alt_text](images/blog/diode_line_bot_02.png "image_tooltip")


The second important reason to use Diode is it allows you to create your unlimited, free subdomains, which we called BNS names. You’re able to see a list of the registered BNS names on Diode’s [prenet website](https://diode.io/prenet/#/dns). And the third reason is Diode has adopted the end-to-end encryption, which is a critical component if you’re looking for a censorship-resistance, privacy-preserving option.

We’d like to give everyone a better, more secure, fully decentralized option. Diode is the best tool in connecting LINE’s webhook. Your chatbot development experience would never be the same. Diode allows you to connect LINE’s message API through Diode’s peer-to-peer network and establish your LINE’s webhook within a few minutes.

We’ve been getting quite a lot of technical questions these past few months, and one of the key questions asked is how is it that the data transmitted through Diode wouldn’t be intercepted by others? So it is possible because TLS 1.2 and Bitcoin’s secp2561’s elliptic curve asymmetric encryption are used by default in Diode for a secure, privacy-preserving network connection between the client and the node.

To build your LINE chatbot with Diode, first you need to set up a LINE developer account. Once you’ve got it all set up, including setting up the LINE message API, what we’re going to do is to set up the LINE webhook with Diode using Diode’s LINE bot template [Github repo](https://github.com/diodechain/line-bot-template) that is written in Go programming language.

Here comes an important step. Publish your local web resources to the Diode Network. Once you’ve got your API all set up, the next step is to publish your local resources to Diode. This gives the LINE web servers a special access to call your webhook through the Diode gateway.



![alt_text](images/blog/diode_line_bot_03.png "image_tooltip")

Diode Diode: [https://diode.io/download/](https://diode.io/download/)

To install the Diode Client, use the curl command:

```
curl -Ssf https://diode.io/install.sh | sh
```

Or, you can build from source: [https://github.com/diodechain/diode_go_client](https://github.com/diodechain/diode_go_client)

Once you’ve got Diode Client up and running, use the following command to publish your webhook’s local port.


```
$ diode publish -public [line_bot_port]:80
```


 If everything is all set, LINE webhook’s URL would be `[DIODE GATEWAY ADDRESS]/callback`

The below screenshot is captured by our blockchain engineer Peter. His webhook’s URL was 

```
http://0x052bff7eaa8968f164466dc80daa8bc86c0c87d3.diode.link/callback
```


![alt_text](images/blog/diode_line_bot_01.png "image_tooltip")

You could got back to the LINE settings pages to set up Webhook URL ```[DIODE GATEWAY ADDRESS]/callback```

If you believe in the vast potential of a decentralized web, I invite you to join the Diode Telegram group. Follow our Twitter to get the latest development updates.
