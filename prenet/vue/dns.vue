<template id="dns">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Blockchain Name System v<% version %></h1>
      </div>
      <div class="col-md-3">
        <search-bar
          v-bind:results.sync="searchResults"
          v-model="searchTerm"
          v-bind:activated.sync="searchActivated"
          v-bind:finished.sync="searchFinished"
        />
      </div>
      <div class="col-md-4 col-md-offset-2">
        <p v-if="base">
          connected to
          <account-link :hash="base" :length="15" :only-alias="true" />
        </p>
        <p v-else>
          Reconnecting...
        </p>
      </div>
    </div>
    <div class="page-content">
      <div v-if="Object.entries(names).length == 0">
        <b class="loading">Loading...</b>
      </div>
      <table class="data" v-else-if="searchTerm && searchActivated">
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
      <div v-else class="row align-start">
        <div class="col-md-3">
          <table class="data" :style="'width: 100%;min-height:' + tableHeight + 'px'">
            <caption>
              <div class="marginized-bottom">Your Account</div>
              <div v-if="enabled">
                <div class="marginized">
                   Name:
                  <account-link :hash="account" :length="20"></account-link>
                </div >
                <div class="marginized">Balance: <% valueToBalance(balance) %></div>
              </div>
              <div class="not-enabled" v-else>
                    <button class="button" v-on:click="enable()">Enable MetaMask</button>
                    <div v-if="error" v-html="error" class="error"></div>
                    <div class="message">
                     The Diode Network Explorer uses <a target="_blank" href="https://metamask.io">MetaMask</a> to authenticate your account.
                    Please enable MetaMask to manage your settings. <br><br>
                   If you don’t have MetaMask installed, follow <a target="_blank" href="https://diode.io/docs/metamask.html">these instructions</a>
                   to get started.
                     </div>
                  </div>
            </caption>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-9">
          <table class="data" v-if="Object.entries(names).length !== 0" id="blockchain-names">
            <caption>
              <div class="col-md-12 no-padding">
                Registered Blockchain Names
                <br />
                <br />
              </div>
              <div v-if="enabled" class="col-md-4 no-padding">
                <div class="input-button">
                  <input
                    type="text"
                    v-model.trim="newName"
                    placeholder="Enter Name to Register"
                    class="no-icon"
                  />
                  <button
                    class="button"
                    v-on:click="addName(newName)"
                    :disabled="newName.length <= 7"
                  >Add</button>
                </div>
              </div>
            </caption>
            <tr>
              <th>Name</th>
              <th>Destination</th>
              <th>Owner</th>
            </tr>
            <tr v-bind:key="name.name" v-for="name in names">
              <td><% name.name %></td>
              <td>
                <span v-if="name.destination !== 'undefined' && name.destination !== 'loading'">
                  <storage-value :value="name.destination"></storage-value>
                </span>
                <span v-else>Loading</span>

                <div
                  v-if="enabled && (valueToAddress(name.owner)==account || valueToAddress(name.owner) == undefined)"
                >
                  <div class="input-button white marginized-top">
                    <input
                      class="no-icon"
                      type="text"
                      v-model.trim="deviceId[name.name]"
                      placeholder="0x1234556..."
                    />
                    <button
                      v-on:click="registerName(name.name, deviceId[name.name])"
                      :disabled="!web3.utils.isAddress(deviceId[name.name])">
                      Update
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <span v-if="name.owner !== 'undefined' && name.owner !== 'loading'">
                  <storage-value v-if="name.owner" :value="name.owner" />
                </span>
                <span v-else>Loading</span>
              </td>
            </tr>
          </table>
          <table class="data" v-else style="width: 100%">
            <caption>No BNS available</caption>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
      account: "",
      error: false,
      newName: "",
      deviceId: {},
      names: {},
      submitDns: false,
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
      balance: 0,
      tableHeight: 300,
      version: 0,
    };
  },

  created: function () {
    let self = this;
    getBase(function (base) {
      self.base = base;
    });

    CallDNS("Version", [], (vsn) => {
      this.version = web3.utils.hexToNumber(vsn);
    });

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

    if (this.$route.query.enableMetaMask) { this.enable(); }
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

      let mainTable = document.getElementById("blockchain-names");
      if (mainTable) {
        this.tableHeight = mainTable.clientHeight - mainTable.offsetTop;
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

        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts, error) => {
            if (!accounts || error) {
              this.error = "Enable error: " + error.toString();
              return;
            }
            this.enabled = true;
            this.account = accounts[0];

            window.ethereum.on("chainChanged", (chainId) => {
              this.handleChainChanged(chainId)
            });

            this.handleChainChanged(window.ethereum.networkVersion);
          })
          .catch((error) => {
            if (document.location.href.indexOf('enableMetaMask') === -1) {
                window.location.href = document.location.href + '?enableMetaMask=true';
            }

            window.location.reload();
            // window.alert('Pleast login to MetaMask first');
          });
    },
    handleChainChanged: function (chainId) {
      if (chainId != CHAIN_ID) {
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
