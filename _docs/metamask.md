---
title: Configure Metamask
category: Desktop
---

When you want to interact with the Diode prenet from within your browser, you can do so on the <a href="https://diode.io/prenet">prenet browser</a>. To make MetaMask recognize this prenet you have to add it to your MetaMask installation through these steps.

# Get Metamask

If you're not sure head over to https://metamask.io/ and get metamask from there. 

# Add Network Settings

After install metamask let's there should be a little fox icon in the top right of your browser window. Clicking on that you should see the main metamask interface as show below.

!["MetaMask network start"](images/docs/metamask_start.png)

Clicking on the top right circle you should see the MetaMask "My Accounts" page where you can find the 'Settings' at the very bottom.

!["MetaMask network settings"](images/docs/metamask_settings.png)

Click on the 'Settings' entry and scroll to the very bottom again. There you will fine the 'Networks' entry and click that.

!["MetaMask networks"](images/docs/metamask_networks.png)

Finally at the bottom of the Networks settings there is big blue button called 'Add Network' click that and enter the Diode Prenet values there as below:

!["MetaMask diode settings"](images/docs/metamask_diode.png)

<table>
  <tr>
    <th>Network Name</th><td>Diode</td>
  </tr><tr>
    <th>New RPC URL</th><td>https://testnet.diode.io:8443</td>
  </tr><tr>
    <th>ChainID</th><td>41043</td>
  </tr><tr>
    <th>Symbol</th><td>DIO</td>
  </tr><tr>
    <th>Block Explorer URL</th><td>https://diode.io/prenet/#</td>
  </tr>
</table>

When everything worked out well you should now be able to [register a BNS name](/prenet/#/dns) or deploy your own fleet contract via the prenet explorer. 