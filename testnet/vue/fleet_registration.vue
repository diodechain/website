<template id="fleet_registration">
  <div>
    <div class="title">
      <h1>Testnet Fleet Registration</h1>
    </div>
    <div v-if="!enabled" class="column">
      <div>To use this you have to Enable MetaMask on this site.</div>
      <button v-on:click="enable()">Enable MetaMask</button>
      <div v-if="error" class="error"><% error %></div>
    </div>
    <div v-else class="column">
      <div>Account: <% account %></div>
      <div>Balance: <% balance %></div>
      <div v-if="contracts == undefined">Loading...</div>
      <div v-else-if="contracts.length == 0">
        No contracts identified.
        <button v-on:click="createFleet()">Create New Fleet</button>
      </div>
      <div v-else>
        Found Fleet Contract: <% contracts[0] %>
        <ul>
          <li v-for="device in devices">Device: <% device %></li>
          <div>
            <input type="text" v-model="deviceId" placeholder="0x1234556..." />
            <button
              v-on:click="registerDevice()"
              :disabled="!web3.utils.isAddress(deviceId)"
            >Whitelist Device</button>
          </div>
        </ul>
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
      enabled: false,
      account: false,
      balance: undefined,
      contracts: undefined,
      error: undefined,
      deviceId: undefined,
      devices: []
    };
  },

  created: function() {
    if (localStorage.devices) {
      this.devices = localStorage.devices.split(",");
    }
    setInterval(() => {
      if (!this.enabled && window.ethereum.selectedAddress != null) {
        this.enable();
      }
    }, 1000);
  },
  methods: {
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
      const FleetHash =
        "0x7e9d94e966d33cff302ef86e2337df8eaf9a6388d45e4744321240599d428343";
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
      console.log("account: ", this.account);
      let ret = await window.ethereum.sendAsync({
        method: "eth_sendTransaction",
        params: [{ from: this.account, data: code, gasPrice: 0 }],
        from: this.account
      });

      console.log("createFleet: ", ret);
    },
    registerDevice: async function() {
      let contract = this.contracts[0];
      let device = this.deviceId;
      let call = web3.eth.abi.encodeFunctionCall(
        {
          name: "SetDeviceWhitelist",
          type: "function",
          inputs: [
            {
              type: "address",
              name: "device"
            },
            {
              type: "bool",
              name: "allowed"
            }
          ]
        },
        [device, true]
      );
      window.ethereum.sendAsync(
        {
          method: "eth_sendTransaction",
          params: [
            { from: this.account, to: contract, data: call, gasPrice: 0 }
          ],
          from: this.account
        },
        (err, result) => {
          if (err) {
            console.log("registerDevice.error: ", err);
            return;
          }
          console.log("registerDevice.ret: ", result);
          if (this.devices.indexOf(device) == -1) {
            this.devices.push(device);
            localStorage.devices = this.devices.join(",");
          }
        }
      );
    }
  }
});
</script>