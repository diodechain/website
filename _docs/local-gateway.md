---
title: Run a local gateway
category: Guides
---

We are providing a public web gateway into the diode network under https://<address>.diode.link
This gateway is convinent for demos but also publicly accessible and so _private_ and _protected_ modes can not be used. 
To fully decentralize you can run your own gatway locally and get the full benefit of secure and private connections through the diode network.

# Start the socks server

```
diode socksd
```

This will start a local socks proxy server. By default it is launched on port 1080.

# Configure your Apps

Now that your local proxy server is running, let's connect to it. Many applications have builtin support for socks proxy servers. To enable your local browser check your network settings. You need to use _socks version 5_ and _proxy DNS requests_ through socks as well for diode to work.

## Firefox

In Firefox go to the network settings and select __manual proxy configuration__. Set as proxy server __localhost__ and port __1080__. Ensure it's using __SOCKS v5__ and check __Proxy DNS when using SOCKS v5__.

!["Firefox Network Settings"](images/docs/firefox_settings.png)

## Secure Shell (SSH)

SSH  has no builting support for socks but instead offers a general __ProxyCommand__ facility that can be used to proxy ssh through the socks proxy. 

This can be enabled by adding the options __ProxyCommand=nc -X 5 -x localhost:1080__ to the connection command. __-X 5__ hereby means SOCKS v5 and __-x localhost:1080__ is the local diode socks proxy. 

```bash
ssh -o 'ProxyCommand=nc -X 5 -x localhost:1080 %h %p' pi@pi-taipei.diode
```

For often used destinations this option flags can also be added to the __~/ssh/config__ file for clients in the diode network to create a connection shortcut:

```
Host pi-taipei
  User pi
  Hostname pi-taipei.diode
  ProxyCommand=nc -X 5 -x localhost:1080 %h %p
```

so the call just becomes

```
ssh pi-taipei
```

## Curl

The curl command line tool has builtin support for socks5 and dns proxying with the __--proxy__ or __-x__ short option. So loading downloading a file from the decentral network with curl works like this:

```
curl -x socks5h://localhost:1080 pi-taipei.diode
```

## VideoLAN Client (VLC)

VLC has only partial support for SOCKS v5 and lacks support for hostname resolution through SOCKS v5, but can be tricked to accept SOCKS v5 connections through the __nc__ command line tool.

```
nc -X 5 -x localhost:1080 <name>.diode.link <port> | vlc - 
```

