---
title: Go Client
category: Reference
---

Source [here](https://hackmd.io/OEZ26_WMQZS1fa_t2yLB4Q?both)

```bash
NAME
    diode - Diode network command line interfaces


SYNOPSIS
    diode [OPTIONS] COMMAND [ARG...]

OPTIONS
    -diodeaddrs [host]:[port][path],...
        Addresses of Diode node server

    -dbpath <file path>
        File path to db file (default "./db/private.db")

    -registry <HEX>
        Registry contract address
        Default: "0x5000000000000000000000000000000000000000"

    -fleet <HEX>
        Fleet contract address
        Default: "0x6000000000000000000000000000000000000000"

    -debug=true|false
        Enable debug mode. Default is false.
    
    -whitelists <ADDRESS>,...
        Addresses are allowed to connect to published resource (worked when blacklists is empty), default is empty
        
    -blacklists <ADDRESS>,...
        Addresses are not allowed to connect to published resource (worked when whitelists is empty), default is empty
        
    -timeout <int>
        Connection timeout to diode server, default is 5 seconds
        
    -retrytimes <int>
        Retry limit to connet to diode server, default is 3
        
    -retrywait <int>
        Wait seconds before next retry, default is 1 second
    
    -rlimit_nofile <int>
        Specify the file descriptor numbers that can be opened by this process
        
    -keepalive
        Enable TCP keepalive, default is true

COMMANDS

    publish
        This command is content providers, video cameras, web servers
        and such to publish their content to the Diode network.
        
        ARG 
            -public 
                Expose ports to public users, so that user could connect to.
                
            -protected
                Expose ports to protected users, so that user could connect to.
            
            -private
                Expose ports to private users, so that user could connect to.
        
        
        EXAMPLE: 
            Publishing a local web-server through diode
            diode publish -public 80:80

            Publishing SSL to everyone in fleet->accessWhitelist[_device][_client]
            diode publish -protected 22:22

            Publishing SSL only to specified addresses
            diode publish -private 22:22,0xpeter,0xdominic -private 8080:8080,0xpeter,0xdominic

    socksd
        This command enables a socks proxy on the local host for
        use with Browsers (Firefox), SSH, Java and other applications to
        communicate via the Diode Network.
        
        ARG
            -socksd_host
                Host of socks listening to, default is 127.0.0.1:1080
            
            -socksd_port
                Port of socks listening to, default is 1080
        
        EXAMPLE:
            diode socksd -socksd_port 8082 -socksd_host 127.0.0.1
    
    httpd
        This command enables a public http server as is used by the 
        "diode.link" website
        
        ARG

            -proxy_host
                Host of proxy server, default is 127.0.0.1

            -proxy_port
                Port of proxy server, default is 1080

            -socksd
                Enable socksd server

            -httpd_host
                Host of httpd listening to, default is 127.0.0.1

            -httpd_port
                Port of httpd listening to, default is 80

            -httpsd_host
                Host of httpd listening to, default is 127.0.0.1

            -httpsd_port
                Port of httpd listening to, default is 443

            -certpath
                Pem format of certificate file path of httpsd secure server
    <!-- TODO? -->
            -capath
                Pem format of ca file path of httpd secure server
    <!-- -->
            -privpath
                Pem format of private key file path of httpsd secure server

            -secure
                Enable httpsd server

            -allow_redirect
                Allow redirect all http transmission to httpsd
    
        EXAMPLE:
            diode httpd -httpd_port 8080 -httpsd_port 443 -certpath ./cert.pem -privpath ./priv.pem
  
    config
        This command allows configuration
        
        EXAMPLE:
            diode config set fleet=0x12345
            diode config set key=0x12345,test=0x1234
            diode config delete key,test
            ...
```