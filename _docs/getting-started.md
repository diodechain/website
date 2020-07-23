---
category: Introduction
title: Getting Started
---

# Install diode

Run this in a _terminal_

```bash
  curl -Ssf https://diode.io/install.sh | sh
```


# Publish your local webserver

Diode is a swiss army knife of web3 capabilities. For starters it allows you to publish local services through web3 and on our gateway domains. To publish you http service run this:

```bash
  diode publish -public 80:80
```

This will publish a web server running on localhost port 80. If you're running a Elixir development server the default port would be 4000 and you would publish that with:

```bash
  diode publish -public 4000:80
```

And with nodejs typically port 3000 is the default:
```bash
  diode publish -public 3000:80
```

Once you run this command _diode_ will you show information about the connectivity and your published ports similiar to this:

```
07/23/2020 20:01:44 [INFO] Diode Client version : v0.4.6                                                                           
07/23/2020 20:01:44 [INFO] Checking for updates... 
07/23/2020 20:01:44 [INFO] No updates 
07/23/2020 20:01:44 [INFO] Last valid block     : 541386 0x000026a67190d70c7700b42cd1f1a51a0beda0232b8efed72733fea42705d132        
07/23/2020 20:01:44 [INFO] Client address       : 0x55c8ee625db628b493b1d084afe25e962a570cdf                                       
07/23/2020 20:01:44 [INFO] Fleet address        : 0x979d4824fefd8910c6db45ac45e956678fb04ed0                                       
07/23/2020 20:01:45 [INFO] Connected to host: europe.testnet.diode.io:41046, validating... 
07/23/2020 20:01:47 [INFO] Network is validated, last valid block number: 546981 
07/23/2020 20:01:47 [INFO]                      :                                                                                  
07/23/2020 20:01:47 [INFO] Http Gateway Enabled : http://0x55c8ee625db628b493b1d084afe25e962a570cdf.diode.link/                    
07/23/2020 20:01:47 [INFO] Port      <name>     : <extern>     <mode>    <protocol>     <allowlist>                                
07/23/2020 20:01:47 [INFO] Port       4000      :       80      public       tls             
```

Note the line _Http Gateway Enabled_ that shows the url under which your web server is exposed. You can use that to test and share that url. 

# Reserve a subdomain

_http://0x55c8ee625db628b493b1d084afe25e962a570cdf.diode.link/_ is not an easy to remember subdomain. So we register a human readable name instead with diode

```
diode bns -register my-example-name
```

This will register the name and create a registry entry on the blockchain. It might take a couple of minutes before the initial registration is complete. Afterwards you can use your domain under _https://my-example-name.diode.link/

__The registration binds the the subdomain to your local wallet. Ensure to keep a backup of your wallet file at ~/.config/diode/private.db so you won't loose access to the domain__

Have fun with this, and let use know in our [telegram](https://t.me/diode_chain) channel any feature requests you have!