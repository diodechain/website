<template id="fleet_registration">
  <div>
    <div class="title">
      <h1>Prenet Fleet Registration</h1>
    </div>
    <div v-if="!enabled" class="column">
      <div>To manage your fleets have to Enable MetaMask on this site.</div>
      <button class="button" v-on:click="enable()">Enable MetaMask</button>
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
          <th>Your Balance</th>
          <td><% web3.utils.fromWei(balance) %> DIO</td>
        </tr>
        <tr>
          <th class="fleet">Your Fleet</th>
          <td class="fleet">
            <div v-if="contracts == undefined">Loading...</div>
            <div v-else-if="contracts.length == 0">
              No contracts identified.
              <button class="button" v-on:click="createFleet()"><img v-show="submitFleet" style="height:14px;margin-right:5px;" src="images/spinning.gif"/><span>Create New Fleet</span></button>
            </div>
            <div v-else>
              <div v-for="contract in contracts">
                Fleet Contract:
                <account-link :hash="contract" :length="50"></account-link>
                <hr />
                <div>
                  <h3>Known Fleet Devices</h3>
                  <table class="data">
                    <tr>
                      <th>Device ID</th>
                      <th>Client ID</th>
                      <th>Fleet Member</th>
                    </tr>
                    <tr v-for="device in devices" :key="device.id">
                      <td>
                        <% device.id %>
                        <!-- force rerender due to we didn't watch the device.access deeply -->
                        <span style="display:none"><% device.rerender %></span>
                      </td>
                      <td>
                        <p v-for="access in device.access" :key="access.id">
                          <% access.id %> &nbsp;
                          <% access.white %> &nbsp;
                          <button
                          class="button"
                          v-if="access.white==false"
                          v-on:click="accessDevice(device.id, access.id, true)"
                          :disabled="submitDevices[device.id+access.id]"
                          ><img v-show="submitDevices[device.id+access.id]" style="height:14px;margin-right:5px;" src="images/spinning.gif"/><span>Whitelist!</span></button>
                          <button
                            class="button"
                            v-else
                            v-on:click="accessDevice(device.id, access.id, false)"
                            :disabled="submitDevices[device.id+access.id]"
                            ><img v-show="submitDevices[device.id+access.id]" style="height:14px;margin-right:5px;" src="images/spinning.gif"/><span>Dewhitelist</span></button>
                        </p>
                        <input type="text" v-model="device.deviceId2" placeholder="0x1234556..." />
                        <button
                          class="button"
                          v-on:click="addProtectedAccess(device.id, device.deviceId2)"
                          :disabled="!web3.utils.isAddress(device.deviceId2)"
                        >Add Protected Access</button>
                      </td>
                      <td>
                        <% device.white %>&nbsp;
                        <button
                          class="button"
                          v-if="device.white==false"
                          v-on:click="whitelistDevice(device.id, true)"
                        ><img v-show="isDeviceSubmited(device)" style="height:14px;margin-right:5px;" src="images/spinning.gif"/><span>Whitelist!</span></button>
                        <button
                          class="button"
                          v-else
                          v-on:click="whitelistDevice(device.id, false)"
                          ><img v-show="submitDevices[device.id]" style="height:14px;margin-right:5px;" src="images/spinning.gif"/><span>Dewhitelist</span></button>
                      </td>
                    </tr>
                  </table>
                  <div>
                    <input type="text" v-model="deviceId" placeholder="0x1234556..." />
                    <button
                      class="button"
                      v-on:click="addDevice(deviceId)"
                      :disabled="!web3.utils.isAddress(deviceId)"
                    >Add Device</button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
var FleetRegistration = Vue.component("fleet_registration", {
  template: document.getElementById("fleet_registration").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      enabled: false,
      account: false,
      balance: undefined,
      codehash: undefined,
      contracts: [],
      error: undefined,
      deviceId: undefined,
      clientId: undefined,
      devices: {},
      accesses: {},
      // accessesIds: {},
      submitFleet: false,
      submitDevices: {},
    };
  },

  created: function() {
    if (localStorage.devices) {
      let devices = localStorage.devices.split(",");
      for (id of devices) {
        this.addDevice(id);
      }
    }
    if (localStorage.accesses) {
      this.accesses = JSON.parse(localStorage.accesses);
      for (deviceId in this.accesses) {
        for (clientId of this.accesses[deviceId]) {
          this.addProtectedAccess(deviceId, clientId);
        }
      }
    }
    setInterval(() => {
      if (!this.enabled && window.ethereum.selectedAddress != null) {
        this.enable();
      }
    }, 1000);
  },
  methods: {
    addDevice: function(id) {
      if (this.devices[id] || !web3.utils.isAddress(id)) return;
      let dev = {
        id,
        access: {},
        white: undefined,
        deviceId2: undefined,
        rerender: false
      };
      this.$set(this.devices, id, dev);
      this.reloadDevice(id);
      let ids = [];
      for (dev in this.devices) {
        ids.push(dev);
      }
      localStorage.devices = ids.join(",");
    },
    addProtectedAccess: function(deviceId, clientId) {
      if (!this.devices[deviceId] || !web3.utils.isAddress(deviceId) || !web3.utils.isAddress(clientId) || deviceId === clientId) return;
      let access = {
        id: clientId,
        white: undefined,
        submitted: false
      };
      let device = this.devices[deviceId]
      if (device.access[clientId.toLowerCase()]) {
        return;
      }
      let dev;
      device.access[clientId.toLowerCase()] = access;;
      device.rerender = !device.rerender;
      this.$set(this.devices, deviceId, device);
      this.reloadProtectedAccess(deviceId, clientId);
      let ids = [];
      for (dev in device.access) {
        ids.push(dev);
      }
      this.accesses[deviceId] = ids;
      localStorage.accesses = JSON.stringify(this.accesses);
    },
    reloadDevice: function(id) {
      this.isWhiteListed(id, white => {
        this.devices[id].white = web3.utils.hexToNumber(white) ? true : false;
        this.$set(this.devices, id, this.devices[id]);
      });
    },
    reloadProtectedAccess: function(deviceId, clientId) {
      this.isAccessWhiteListed(deviceId, clientId, white => {
        let device = this.devices[deviceId];
        device.access[clientId].white = web3.utils.hexToNumber(white) ? true : false;
        device.rerender = !device.rerender;
        this.$set(this.devices, deviceId, device);
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
      this.getBalance();
      this.getContracts();
    },
    getBalance: async function() {
      this.balance = await web3.eth.getBalance(this.account);
    },
    getContracts: async function() {
      let proms = [];
      let candidates = [];
      for (let i = 0; i < 10; i++) {
        let addr = this.generateContractAddress(i);
        proms.push(web3.eth.getCodeHash(addr));
        candidates.push(addr);
      }
      ret = await Promise.all(proms);
      if (ret.indexOf(FleetHash) >= 0) {
        this.contracts = [this.generateContractAddress(ret.indexOf(FleetHash))];
        for (id in this.devices) this.reloadDevice(id);
        for (deviceId in this.accesses) {
          for (clientId of this.accesses[deviceId]) {
            this.reloadProtectedAccess(deviceId, clientId);
          }
        }
      } else {
        this.contracts = [];
      }
    },
    generateContractAddress: function(nonce) {
      // This hack only works for nonces <= 16
      let hex = "0xd694" + this.account.substr(2);
      if (nonce == 0) {
        hex += "80";
      } else {
        hex += "0" + web3.utils.toHex(nonce).substr(2);
      }
      return (addr =
        "0x" +
        web3.utils
          .keccak256(hex)
          .slice(12)
          .substring(14));
    },
    createFleet: async function() {
      let contract =
        "0x608060405234801561001057600080fd5b506040516060806102d383398101604090815281516020830151919092015160018054600160a060020a03938416600160a060020a03199182161790915560008054948416948216949094179093556002805492909116919092161790556102568061007d6000396000f3006080604052600436106100775763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633c5f7d46811461007c5780634ef1aee4146100a45780634fb3ccc5146100df578063504f04b714610110578063570ca7351461013c578063d90bd65114610151575b600080fd5b34801561008857600080fd5b506100a2600160a060020a03600435166024351515610172565b005b3480156100b057600080fd5b506100cb600160a060020a036004358116906024351661019d565b604080519115158252519081900360200190f35b3480156100eb57600080fd5b506100f46101bd565b60408051600160a060020a039092168252519081900360200190f35b34801561011c57600080fd5b506100a2600160a060020a036004358116906024351660443515156101cc565b34801561014857600080fd5b506100f4610206565b34801561015d57600080fd5b506100cb600160a060020a0360043516610215565b600160a060020a03919091166000908152600660205260409020805460ff1916911515919091179055565b600760209081526000928352604080842090915290825290205460ff1681565b600254600160a060020a031681565b600160a060020a03928316600090815260076020908152604080832094909516825292909252919020805460ff1916911515919091179055565b600154600160a060020a031681565b60066020526000908152604090205460ff16815600a165627a7a723058208df217001cef7e510f8f0352585a03e46b30eba1feaeaf76becbe261832a627f0029";

      let args = [Registry, this.account, this.account];
      let constructor = web3.eth.abi.encodeParameters(
        ["address", "address", "address"],
        args
      );
      let code = contract + constructor.substr(2);
      this.submitFleet = true;
      window.ethereum.sendAsync({
        method: "eth_sendTransaction",
        params: [{ from: this.account, data: code, gasPrice: 0 }],
        from: this.account
      }, (err, ret) => {
        if (err) {
          console.log("[SubmitFleet] error: ", err);
          this.submitFleet = false;
        }
        if (ret.result) {
          this.isTxConfirmed(ret.result)
          .then(function(tx) {
            this.submitFleet = false;
          }.bind(this))
          .catch(function(err) {
            console.log("[SubmitFleet] error: ", err);
            this.submitFleet = false;
          }.bind(this));
          return
        }
        this.submitFleet = false;
      });
    },
    isWhiteListed(device, callback) {
      if (!this.contracts[0]) return;
      CallFleet("deviceWhitelist", this.contracts[0], [device], callback);
    },
    isAccessWhiteListed(device, clientId, callback) {
      if (!this.contracts[0]) return;
      CallFleet("accessWhitelist", this.contracts[0], [device, clientId], callback);
    },
    whitelistDevice: async function(device, white) {
      let contract = this.contracts[0];
      let call = web3.eth.abi.encodeFunctionCall(
        fleetMethods["SetDeviceWhitelist"],
        [device, white]
      );
      this.$set(this.submitDevices, device, true);
      window.ethereum.sendAsync(
        {
          method: "eth_sendTransaction",
          params: [
            { from: this.account, to: contract, data: call, gasPrice: 0 }
          ],
          from: this.account
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
              .then(function(tx) {
                this.$set(this.submitDevices, device, false);
                this.reloadDevice(device);
              }.bind(this))
              .catch(function(err) {
                console.log("[WhitelistDevice] error: ", err);
                this.$set(this.submitDevices, device, false);
              }.bind(this));
              return;
          }
          this.$set(this.submitDevices, device, false);
        }
      );
    },
    accessDevice: async function(device, client, white) {
      let contract = this.contracts[0];
      let call = web3.eth.abi.encodeFunctionCall(
        fleetMethods["SetAccessWhitelist"],
        [device, client, white]
      );
      let dev = this.devices[device];
      this.$set(this.submitDevices, device+client, true);
      window.ethereum.sendAsync(
        {
          method: "eth_sendTransaction",
          params: [
            { from: this.account, to: contract, data: call, gasPrice: 0 }
          ],
          from: this.account
        },
        (err, ret) => {
          if (err) {
            console.log("[AccessDevice] error: ", err);
            this.$set(this.submitDevices, device+client, false);
            return;
          }
          if (ret.result) {
            let { result } = ret;
            this.isTxConfirmed(result)
              .then(function(tx) {
                this.$set(this.submitDevices, device+client, false);
                this.reloadProtectedAccess(device, client);
              }.bind(this))
              .catch(function(err) {
                console.log("[AccessDevice] error: ", err);
                this.$set(this.submitDevices, device+client, false);
              }.bind(this));
              return;
          }
          this.$set(this.submitDevices, device+client, false);
        }
      );
    },
    execAfter: function(callback, time) {
      return new Promise(function(resolve, reject) {
        window.setTimeout(() => {
          resolve(callback())
        }, time)
      })
    },
    isTxConfirmed: function(txHash) {
      // const self = this
      return new Promise(function(resolve, reject) {
        if (!txHash || txHash.length != 66 || !/^0x[0-9a-f]{64}$/i.test(txHash)) {
          reject(false)
        }
        web3.eth.getTransactionReceipt(txHash)
          .then(function(tx) {
            if (tx) {
              if (tx.status === true) {
                return resolve(tx)
              }
              return reject(new Error('tx was failed'))
            }
            resolve(this.execAfter(this.isTxConfirmed.bind(this, txHash), 1000))
          }.bind(this))
          .catch(function(err) {
            resolve(this.execAfter(this.isTxConfirmed.bind(this, txHash), 1000))
          }.bind(this))

      }.bind(this))
    },
    isDeviceSubmited: function (device) {
      return this.submitDevices[device.id]
    }
  }
});
</script>