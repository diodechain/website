<template id="fleet_registration">
  <div>
    <div class="title row">
      <div class="col-md-2">
        <h1>Fleets Management</h1>
      </div>
      <div class="col-md-3">
        <search-bar
          v-bind:results.sync="searchResults"
          v-model="searchTerm"
          v-bind:activated.sync="searchActivated"
          v-bind:finished.sync="searchFinished"
        />
      </div>
      <div class="col-md-4 col-md-offset-3">
        <p>
          connected to
          <account-link :hash="base" :length="50" :only-alias="false" />
        </p>
      </div>
    </div>
    <div class="page-content">
      <table class="data" v-if="searchTerm && searchActivated">
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
          <table class="data" :style="'min-height:' + tableHeight + 'px'">
            <caption>
              Your account
              <br />
              <br />

              <div v-if="enabled">
                <div class="marginized">
                  Name:
                  <account-link :hash="account" :length="20"></account-link>
                </div>
                <div class="marginized">Balance: <% balance %> DIO</div>
                <div v-if="contracts" class="marginized">
                  Select Fleet:
                  <br />
                  <select
                    name="contracts-select"
                    @change="onContractChange($event)"
                    class="full-width"
                    v-model="contract"
                  >
                    <option v-for="c in contracts" v-bind:key="c" :value="c"><% c %></option>
                  </select>
                </div>
                <div class="text-centered">
                  <button class="button" v-on:click="createFleet()">
                    <img v-show="submitFleet" class="btn-loading" src="images/spinning.gif" />
                    <span>Create New Fleet</span>
                  </button>
                </div>
              </div>
              <div class="not-enabled" v-else>
                <button class="button" v-on:click="enable()">Enable MetaMask</button>
                <div v-if="error" v-html="error" class="error"></div>
                <div class="message">
                  The Diode Network Explorer uses MetaMask to authenticate your account. Please enable MetaMask to manage your Fleets.
                  If you don’t have MetaMask installed, follow instructions at https://diode.io/docs/metamask.html to get started.
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
          <table class="data" v-if="enabled">
            <caption>
              <span v-if="contracts && contracts.length > 0">
                <div class="col-md-12">
                  Fleet:
                  <account-link :hash="contract" :length="50"></account-link>
                </div>
                <div class="col-md-5">
                  <div class="input-button marginized-top">
                    <input
                      type="text"
                      class="no-icon"
                      v-model="deviceId"
                      placeholder="Enter Device ID"
                    />
                    <button
                      class="button"
                      v-on:click="addDevice(deviceId, true)"
                      :disabled="!web3.utils.isAddress(deviceId)"
                    >Add</button>
                  </div>
                </div>
              </span>
              <span v-else>Your Fleet</span>
            </caption>
            <tr>
              <th>Device ID</th>
              <th>Canonical Member</th>
            </tr>

            <tr v-for="device in devices" :key="device.id">
              <td>
                <account-link :hash="device.id" :length="50"></account-link>
              </td>
              <td>
                &nbsp;&nbsp;
                <% device.allowed ? 'Yes' : 'No' %>&nbsp;
                <button
                  class="button"
                  v-if="device.allowed==false"
                  v-on:click="whitelistDevice(device.id, true)"
                >
                  <img
                    v-show="isDeviceSubmited(device)"
                    class="btn-loading"
                    src="images/spinning.gif"
                  />
                  <span>Add</span>
                </button>
                <button class="button" v-else v-on:click="whitelistDevice(device.id, false)">
                  <img
                    v-show="submitDevices[device.id]"
                    class="btn-loading"
                    src="images/spinning.gif"
                  />
                  <span>Remove</span>
                </button>
              </td>
            </tr>
            <tr v-if="Object.keys(devices).length === 0">
              <td colspan="2">No devices. Add devices above.</td>
            </tr>
          </table>
          <table class="data" v-else>
            <caption>No Fleets available</caption>
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
var FleetRegistration = Vue.component("fleet_registration", {
  template: document.getElementById("fleet_registration").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      base: "",
      enabled: false,
      account: false,
      balance: undefined,
      codehash: undefined,
      contracts: [],
      contract: null,
      error: undefined,
      deviceId: undefined,
      clientId: undefined,
      devices: {},
      submitFleet: false,
      submitDevices: {},
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
      tableHeight: 300,
      contractsCount: localStorage.fleetsCount || 10,
    };
  },

  created: function () {
    let self = this;
    getBase(function (base) {
      self.base = base;
    });

    setInterval(() => {
      if (!this.enabled && window.ethereum.selectedAddress != null) {
        this.enable();
      }
    }, 1000);
  },
  methods: {
    onContractChange: function (event) {
      this.loadDevivesInMemory();
    },
    addDevice: function (id, saveInStorage) {
      if (this.devices[id] || !web3.utils.isAddress(id)) return;

      let dev = {
        id,
        allowed: undefined,
        deviceId2: undefined,
        rerender: false,
      };

      this.$set(this.devices, id, dev);
      this.reloadDevice(id);

      let ids = [];

      for (dev in this.devices) {
        ids.push(dev);
      }

      if (saveInStorage) {
        this.setDeviceInStorage(id);
      }
    },
    reloadDevice: function (id) {
      this.isWhiteListed(id, (allowed) => {
        this.devices[id].allowed = web3.utils.hexToNumber(allowed)
          ? true
          : false;
        this.$set(this.devices, id, this.devices[id]);
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
      this.getBalance();
      this.getContracts();
    },
    loadDevivesInMemory: function() {
      this.devices = {};

      let devicesIds = localStorage.getObject(this.contract);

      if (!devicesIds) { return; }

      for (id of devicesIds) {
        this.addDevice(id, false);
      }
    },
    setDeviceInStorage: function(id) {
      let devices = localStorage.getObject(this.contract);

      if (!devices) {
        devices = [id]
      } else {
        devices.push(id);
      }

      localStorage.setObject(this.contract, devices);
    },
    getBalance: async function () {
      this.balance = await web3.eth.getBalance(this.account);
    },
    getContracts: async function () {
      this.contracts = [];
      let proms = [];

      for (let i = 0; i < this.contractsCount; i++) {
        let addr = this.generateContractAddress(i);
        proms.push(web3.eth.getCodeHash(addr));
      }

      let fleets = await Promise.all(proms);
      let indexDefaultHash = fleets.indexOf(FleetHash);



      for (let i = 0; i < fleets.length; i++) {
        this.contracts.push(this.generateContractAddress(i));
      }

      // for (id in this.devices) {
      //   this.reloadDevice(id);
      // }

      this.contract = this.contracts[indexDefaultHash];

      this.loadDevivesInMemory()
      // if (ret.indexOf(FleetHash) >= 0) {
      //   this.contracts = [this.generateContractAddress(ret.indexOf(FleetHash))];

      //   for (id in this.devices) {
      //     this.reloadDevice(id);
      //   }

      //   this.contract = this.contracts[0];
      // } else {
      //   this.contracts = [];
      // }
    },
    generateContractAddress: function (nonce) {
      // This hack only works for nonces <= 16
      let hex = "0xd694" + this.account.substr(2);
      if (nonce == 0) {
        hex += "80";
      } else {
        hex += "0" + web3.utils.toHex(nonce).substr(2);
      }
      return (addr = "0x" + web3.utils.keccak256(hex).slice(12).substring(14));
    },
    createFleet: async function () {
      let contract =
        "0x608060405234801561001057600080fd5b506040516060806102d383398101604090815281516020830151919092015160018054600160a060020a03938416600160a060020a03199182161790915560008054948416948216949094179093556002805492909116919092161790556102568061007d6000396000f3006080604052600436106100775763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633c5f7d46811461007c5780634ef1aee4146100a45780634fb3ccc5146100df578063504f04b714610110578063570ca7351461013c578063d90bd65114610151575b600080fd5b34801561008857600080fd5b506100a2600160a060020a03600435166024351515610172565b005b3480156100b057600080fd5b506100cb600160a060020a036004358116906024351661019d565b604080519115158252519081900360200190f35b3480156100eb57600080fd5b506100f46101bd565b60408051600160a060020a039092168252519081900360200190f35b34801561011c57600080fd5b506100a2600160a060020a036004358116906024351660443515156101cc565b34801561014857600080fd5b506100f4610206565b34801561015d57600080fd5b506100cb600160a060020a0360043516610215565b600160a060020a03919091166000908152600660205260409020805460ff1916911515919091179055565b600760209081526000928352604080842090915290825290205460ff1681565b600254600160a060020a031681565b600160a060020a03928316600090815260076020908152604080832094909516825292909252919020805460ff1916911515919091179055565b600154600160a060020a031681565b60066020526000908152604090205460ff16815600a165627a7a723058208df217001cef7e510f8f0352585a03e46b30eba1feaeaf76becbe261832a627f0029";

      let args = [Registry, this.account, this.account];
      let constructor = web3.eth.abi.encodeParameters(
        ["address", "address", "address"],
        args
      );
      let code = contract + constructor.substr(2);
      this.submitFleet = true;
      window.ethereum.sendAsync(
        {
          method: "eth_sendTransaction",
          params: [{ from: this.account, data: code, gasPrice: 0 }],
          from: this.account,
        },
        (err, ret) => {
          if (err) {
            console.log("[SubmitFleet] error: ", err);
            this.submitFleet = false;
          }
          if (ret.result) {
            this.isTxConfirmed(ret.result)
              .then(
                function (tx) {
                  this.loadNewFleet();

                  this.submitFleet = false;
                }.bind(this)
              )
              .catch(
                function (err) {
                  console.log("[SubmitFleet] error: ", err);
                  this.submitFleet = false;
                }.bind(this)
              );
            return;
          }
          this.submitFleet = false;
        }
      );
    },
    loadNewFleet: async function() {
      let addr = this.generateContractAddress(this.contractsCount);
      let promise = web3.eth.getCodeHash(addr);

      let fleet = await Promise.resolve(promise);

      this.contracts.push(this.generateContractAddress(this.contractsCount));

      this.contract = this.contracts[this.contractsCount];
      this.loadDevivesInMemory();
      this.contractsCount+=1;
      localStorage.fleetsCount = this.contractsCount;
    },
    isWhiteListed(device, callback) {
      if (!this.contracts[0]) return;
      CallFleet("deviceWhitelist", this.contracts[0], [device], callback);
    },
    whitelistDevice: async function (device, allowed) {
      let contract = this.contracts[0];
      let call = web3.eth.abi.encodeFunctionCall(
        fleetMethods["SetDeviceWhitelist"],
        [device, allowed]
      );
      this.$set(this.submitDevices, device, true);
      window.ethereum.sendAsync(
        {
          method: "eth_sendTransaction",
          params: [
            { from: this.account, to: contract, data: call, gasPrice: 0 },
          ],
          from: this.account,
        },
        (err, ret) => {
          if (err) {
            console.log("[WhitelistDevice] error: ", err);
            this.$set(this.submitDevices, device, false);
            return;
          }
          if (ret.result) {
            let { result } = ret;
            this.isTxConfirmed(result)
              .then(
                function (tx) {
                  this.$set(this.submitDevices, device, false);
                  this.reloadDevice(device);
                }.bind(this)
              )
              .catch(
                function (err) {
                  console.log("[WhitelistDevice] error: ", err);
                  this.$set(this.submitDevices, device, false);
                }.bind(this)
              );
            return;
          }
          this.$set(this.submitDevices, device, false);
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
    isDeviceSubmited: function (device) {
      return this.submitDevices[device.id];
    },
  },
});
</script>
