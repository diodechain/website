---
title: Remote SSH
category: Raspbery PI 
---

## Target Machine (Server)

On your Raspberry PI or other target machine install the most recent Diode client. First you need to ensure that a local ssh server (sshd) is already running on your pi. If you don't have it running yet [check the Raspberry PI docs on how to start a ssh server](https://www.raspberrypi.org/documentation/remote-access/ssh/)

After that and [installing](docs/getting-started.html) you can publish the ssh service through diode;

```bash
diode publish -public 22:22
```

From this command note down the presented __Client Address__. This is the primary identifier of your target device and will never change. You will need it in the next step.

!["Client Address"](images/docs/clientid.png)

If everything works fine we recommmend to setup diode to [start at boot time, so it's always up](docs/setting-up-systemd.html).

## SSH through Gateway (Client)

Now you can change to another machine and try to connect using your SSH client.

```bash
ssh -o 'ProxyCommand=nc -X 5 -x diode.link:1080 %h %p' pi@<client_address>.diode
```

Explainer: SSH  has no builting support for socks but instead offers a general __ProxyCommand__ facility that can be used to proxy through the diode network. Where it says __\<client_address\>__ you have to use the client address from the step before.

This command is pretty long with the tunnel option, so for often used destinations you can instead add the option flags to your __~/ssh/config__ file and create a connection alias:

```
Host raspberry
  User pi
  Hostname <client_address>.diode
  ProxyCommand=nc -X 5 -x diode.link:1080 %h %p
```

With this additional configuration entry logging in into your Raspberry PI becomes as easy as:

```bash
ssh raspberry
```

Of course you can choose any other name as well. If you're still using username/password authentication we recommend to instead use a public/private key:

```bash
ssh-copy-id raspberry
```

# SSH through local instance

This example routes the ssh connection first through our gateway at _diode.link_, this is a shortcut if you don't want to run another diode client on your desktop machine. It is also possible to run diode on your desktop machine instead and avoid using the public gateway. For this [checkout our guide on running a local gateway](docs/local-gateway.html).