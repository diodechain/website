<template id="dns">
  <div>
    <div class="title row">
      <div class="col-md-2">
        <h1>Account Detail</h1>
      </div>
      <div class="col-md-6">
        <search-bar
          v-bind:results.sync="searchResults"
          v-model="searchTerm"
          v-bind:activated.sync="searchActivated"
          v-bind:finished.sync="searchFinished"
        />
      </div>
      <div class="col-md-4">
        <p>
          connected to
          <account-link :hash="base" :length="50" :only-alias="false" />
        </p>
      </div>
    </div>
    <div v-if="!enabled" class="column">
      <div>To register a new name or change an existing registration you have to Enable MetaMask on this site.</div>
      <button class="button" v-on:click="enable()">Enable MetaMask</button>
      <div v-if="error" class="error"><% error %></div>
    </div>
    <div class="column">
      <div v-if="Object.entries(names).length == 0">
        <b style="font-size: 150%">Loading...</b>
      </div>
      <table class="data" style="width: auto" v-else-if="searchTerm && searchActivated">
        <caption><% searchResults.length %> Search Results</caption>
        <tr v-if="searchResults.length">
          <th>Page</th>
          <th>Match Term</th>
        </tr>
        <tr v-else-if="searchFinished">
          <td>
            <div class="empty-search">
              Sorry, no results were found. The Diode Network explorer search function can search on full or partial matches on account addresses/hashes, block numbers,
              BNS names, and stake amounts, and full matches on transaction hashes and block hashes. Please check your search term and try again!
            </div>
          </td>
        </tr>
        <tbody v-if="searchResults.length" is="transition-group" name="list-complete">
          <tr v-for="result in searchResults" v-bind:key="result" class="list-complete-item">
            <td>
              <router-link v-if="result.type==='Block'" :to="'/block/' + result.id">Block</router-link>
              <router-link
                v-if="result.type==='Address' || result.isAddress"
                :to="'/address/' + result.id"
              ><% result.type %></router-link>
              <router-link
                v-if="result.type==='Transaction'"
                :to="'/tx/' + result.id"
              ><% result.type %></router-link>
            </td>
            <td><% result.text %> <% result.stake ? '- ' + result.stake : ''%></td>
          </tr>
        </tbody>
      </table>
      <table v-else class="data">
        <tr>
          <th>Your Account</th>
          <td>
            <account-link :hash="account" :length="50"></account-link>
          </td>
        </tr>
        <tr>
          <th class="fleet">Known Names</th>
          <td class="fleet">
            <table class="data">
              <tr>
                <th>Name</th>
                <th>Destination</th>
                <th>Owner</th>
              </tr>
              <tr v-bind:key="name.name" v-for="name in names">
                <td><% name.name %></td>
                <td>
                  <storage-value :value="name.destination"></storage-value>
                  <div
                    v-if="enabled && (valueToAddress(name.owner)==account || valueToAddress(name.owner) == undefined)"
                  >
                    <button
                      class="button"
                      v-on:click="registerName(name.name, deviceId[name.name])"
                      :disabled="!web3.utils.isAddress(deviceId[name.name])"
                    >
                      <img
                        v-show="submitDns==name.name"
                        style="height:14px;margin-right:5px;"
                        src="images/spinning.gif"
                      />
                      <span>Register!</span>
                    </button>
                    <input
                      type="text"
                      v-model.trim="deviceId[name.name]"
                      placeholder="0x1234556..."
                    />
                  </div>
                </td>
                <td>
                  <storage-value :value="name.owner" />
                </td>
              </tr>
            </table>
            <hr />
            <div v-if="enabled">
              <input type="text" v-model.trim="newName" placeholder="some-name" />
              <button
                class="button"
                v-on:click="addName(newName)"
                :disabled="newName.length <= 7"
              >Add Name</button>
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
      base: "",
      enabled: false,
      account: false,
      error: false,
      newName: "",
      deviceId: {},
      names: {},
      submitDns: false,
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
    };
  },

  created: function () {
    this.refreshNames();
    setInterval(() => {
      if (
        !this.enabled &&
        window.ethereum &&
        window.ethereum.selectedAddress != null
      ) {
        this.enable();
      }
      this.refreshNames();
    }, 1000);
  },
  methods: {
    refreshNames: function () {
      for (key in DNSCache) {
        let name = DNSCache[key].name;
        let entry = {
          name,
          destination: DNSCache[key].destination,
          owner: DNSCache[key].owner,
        };
        this.$set(this.names, name, entry);
      }
      for (key in this.names) {
        if (this.names[key].destination == "loading") {
          this.names[key].destination = "undefined";
          this.names[key].owner = "undefined";
          this.$set(this.names, key, this.names[key]);
        }
      }
    },
    addName: function (name) {
      if (!name || this.names[name]) return;
      let entry = {
        name,
        destination: "loading",
        owner: "loading",
      };
      this.$set(this.names, name, entry);
    },
    reloadName: function (name) {
      this.resolve(name, (dest) => {
        this.names[name].destination = "0x" + dest.substring(dest.length - 40);
        this.$set(this.names, name, this.names[name]);
      });
    },
    enable: function () {
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
        window.ethereum.on("chainChanged", (chainId) =>
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
    handleChainChanged: function (chainId) {
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
    registerName: async function (name, destination) {
      let call = web3.eth.abi.encodeFunctionCall(dnsMethods["Register"], [
        name,
        destination,
      ]);
      this.submitDns = name;
      window.ethereum.sendAsync(
        {
          method: "eth_sendTransaction",
          params: [
            { from: this.account, to: DNSAddr, data: call, gasPrice: 0 },
          ],
          from: this.account,
        },
        (err, ret) => {
          if (err) {
            this.submitDns = false;
            console.log("[RegisterName] error: ", name, destination, err);
            return;
          }
          if (ret.result) {
            let { result } = ret;
            this.isTxConfirmed(result)
              .then(
                function (tx) {
                  this.submitDns = false;
                }.bind(this)
              )
              .catch(
                function (err) {
                  this.submitDns = false;
                  console.log("[RegisterName] error: ", name, destination, err);
                }.bind(this)
              );
            return;
          }
          this.submitDns = false;
        }
      );
    },
    execAfter: function (callback, time) {
      return new Promise(function (resolve, reject) {
        window.setTimeout(() => {
          resolve(callback());
        }, time);
      });
    },
    isTxConfirmed: function (txHash) {
      // const self = this
      return new Promise(
        function (resolve, reject) {
          if (
            !txHash ||
            txHash.length != 66 ||
            !/^0x[0-9a-f]{64}$/i.test(txHash)
          ) {
            reject(false);
          }
          web3.eth
            .getTransactionReceipt(txHash)
            .then(
              function (tx) {
                if (tx) {
                  if (tx.status === true) {
                    return resolve(tx);
                  }
                  return reject(new Error("tx was failed"));
                }
                resolve(
                  this.execAfter(this.isTxConfirmed.bind(this, txHash), 1000)
                );
              }.bind(this)
            )
            .catch(
              function (err) {
                resolve(
                  this.execAfter(this.isTxConfirmed.bind(this, txHash), 1000)
                );
              }.bind(this)
            );
        }.bind(this)
      );
    },
  },
});
</script>
