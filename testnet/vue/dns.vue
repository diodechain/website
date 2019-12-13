<template id="dns">
  <div>
    <div class="title">
      <h1>Testnet DNS</h1>
    </div>
    <div v-if="!enabled" class="column">
      <div>To use this you have to Enable MetaMask on this site.</div>
      <button v-on:click="enable()">Enable MetaMask</button>
      <div v-if="error" class="error"><% error %></div>
    </div>
    <div v-else class="column">
      <table class="data">
        <tr>
          <th>Your Account</th>
          <td>
            <account-link :hash="account" :length="50"></account-link>
          </td>
        </tr>
        <tr>
          <th class="fleet">Your Names</th>
          <td class="fleet">
            <table class="data">
              <tr>
                <th>Name</th>
                <th>Destination</th>
                <th>Owner</th>
              </tr>
              <tr v-for="name in names">
                <td><% name.name %></td>
                <td>
                  <% name.destination %>
                  <div
                    v-if="name.owner==account || name.owner=='0x0000000000000000000000000000000000000000' || name.owner==undefined"
                  >
                    <button
                      v-on:click="registerName(name.name, deviceId)"
                      :disabled="!web3.utils.isAddress(deviceId)"
                    >Register!</button>
                    <input type="text" v-model="deviceId" placeholder="0x1234556..." />
                  </div>
                </td>
                <td>Not yet implemented<% name.owner %></td>
              </tr>
            </table>
            <hr/>
            <div>
              <input type="text" v-model="newName" placeholder="some-name" />
              <button v-on:click="addName(newName)" :disabled="newName.length <= 7">Add Name</button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
var DNS = Vue.component("dns", {
  template: document.getElementById("dns").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      enabled: false,
      account: false,
      error: false,
      newName: "",
      deviceId: undefined,
      names: {}
    };
  },

  created: function() {
    if (localStorage.names) {
      let names = localStorage.names.split(",");
      for (name of names) {
        this.addName(name);
      }
    }
    setInterval(() => {
      if (!this.enabled && window.ethereum.selectedAddress != null) {
        this.enable();
      }
    }, 1000);
  },
  methods: {
    addName: function(name) {
      if (this.names[name]) return;
      let entry = {
        name,
        destination: undefined,
        owner: undefined
      };
      this.$set(this.names, name, entry);
      this.reloadName(name);
      let ids = [];
      for (name in this.names) {
        ids.push(name);
      }
      localStorage.names = ids.join(",");
    },
    reloadName: function(name) {
      this.resolve(name, dest => {
        this.names[name].destination = "0x" + dest.substring(dest.length - 40);
        this.$set(this.names, name, this.names[name]);
      });
    },
    enable: function() {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        this.error =
          "Please install <a href='https://metamask.io/'>MetaMask</a>";
        return;
      }
      window.ethereum.on("chainChanged", this.handleChainChanged);
      window.ethereum.enable().then((accounts, error) => {
        if (!accounts || error) {
          console.log("Enable error: ", error);
          this.error = "Enable error: " + error.toString();
          return;
        }
        // let currentChainId = null
        this.enabled = true;
        this.account = accounts[0];
        window.ethereum.on("chainChanged", chainId =>
          this.handleChainChanged(chainId)
        );
        // Until eth_chainId calls actually works...
        this.handleChainChanged(window.ethereum.networkVersion);
        // window.ethereum
        //   .send({ method: "eth_chainId" })
        //   .then((chainId) => this.handleChainChanged(chainId))
        //   .catch(err => console.error(err))
      });
    },
    handleChainChanged: function(chainId) {
      if (chainId != "41043") {
        this.error = "MetaMask is not connected to the Diode Network";
        this.enabled = false;
        return;
      }
      this.enabled = true;
    },
    resolve(name, callback) {
      CallDNS("Resolve", [name], callback);
    },
    registerName: async function(name, destination) {
      let call = web3.eth.abi.encodeFunctionCall(dnsMethods["Register"], [
        name,
        destination
      ]);
      window.ethereum.sendAsync(
        {
          method: "eth_sendTransaction",
          params: [
            { from: this.account, to: DNSAddr, data: call, gasPrice: 0 }
          ],
          from: this.account
        },
        (err, result) => {
          if (err) {
            console.log("registerName.error: ", name, destination, err);
            return;
          }
          this.reloadName(name);
        }
      );
    }
  }
});
</script>