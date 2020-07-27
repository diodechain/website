---
category: Introduction
title: Start on boot
---

# Running diode on boot

When you use Diode to publish web content from a Raspberry Pi you will want to make the persist. So if you reboot your device, or it suffers an accidential power loss it should reboot and serve again. 

Raspberry Pi's as well as most other Linux distributions such as Debian and Linux nowadys use _systemd_ for controlling services and startup applications.

So let's get started with systemd configuration. We have prepared a simple configuration file that is publishing port 80 for http, port 22 for ssh and port 3030 for an additional service. You can copy paste the source below and store it in a _diode.service_ file or grab it [here](https://diode.io/diode.service)

```ruby
[Unit]
Description=Diode blockchain network client

[Service]
Type=simple
ExecStart=/home/pi/opt/diode/diode publish -public 22:22,80:80,3030:3030
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```

**!ATTENTION** The example file assumes that diode is installed for the _pi_ user on a Raspberry Pi. When running on Ubuntu or another distribution ensure that the username matches the user who installed diode:

ExecStart=/home/_username_/opt/diode/diode publish -public 22:22,80:80,3030:3030

and here:

User=_username_

And if you haven't installed diode yet run:

```
curl -Ssf https://diode.io/install.sh | sh
```


# Installing the config file

Best is to move the file to _/etc/systemd/system/_ so in the order:

```bash
wget https://diode.io/diode.service
# ... make your modifications ...
sudo cp diode.server /etc/systemd/system/
```

Now all left to do is to start and check the service:

```bash
sudo systemctl start diode
systemctl status diode
```

After the second call you should see something like:

```bash
 diode.service - Diode blockchain network client
   Loaded: loaded (/etc/systemd/system/diode.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-07-27 13:29:51 CEST; 1h 53min ago
 Main PID: 259 (diode)
   CGroup: /system.slice/diode.service
           └─259 /home/pi/opt/diode/diode publish -public 22:22,80:80,3030:3030

Jul 27 13:30:12 betahaus-berlin diode[259]: 07/27/2020 13:30:12 [INFO] Network is validated, last valid block number: 563440
Jul 27 13:30:12 betahaus-berlin diode[259]: 07/27/2020 13:30:12 [INFO]                      :
Jul 27 13:30:12 betahaus-berlin diode[259]: 07/27/2020 13:30:12 [INFO] Http Gateway Enabled : http://0xc206e1255cbace8ba904daa259d7a5b7f90e2d50.diod
Jul 27 13:30:12 betahaus-berlin diode[259]: 07/27/2020 13:30:12 [INFO] Port      <name>     : <extern>     <mode>    <protocol>     <allowlist>
Jul 27 13:30:12 betahaus-berlin diode[259]: 07/27/2020 13:30:12 [INFO] Port         22      :       22      public       any
Jul 27 13:30:12 betahaus-berlin diode[259]: 07/27/2020 13:30:12 [INFO] Port         80      :       80      public       any
Jul 27 13:30:12 betahaus-berlin diode[259]: 07/27/2020 13:30:12 [INFO] Port       3030      :     3030      public       any
```

# Permanently Enable it

Finally if everything worked well be sure to enable the service for good, so that on the next start it will be automatically launched:

```bash
sudo systemctl enable diode
```

You're all set! Diode will now run on every system start!

Have fun with this, and let use know in our [telegram](https://t.me/diode_chain) channel any feature requests you have!