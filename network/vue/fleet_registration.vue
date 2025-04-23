<template id="fleet_registration">
  <div >
   
       <div class="title row" style="display: flex; flex-direction: column;">
            <div style="display: flex; align-items: center;">
                <h1>Account: <% account || "Connect MetaMask" %></h1>
                <button style="text-decoration: underline;" v-on:click="walletProvider.switchAccount()" class="button">Switch Account</button>
            </div>
            <h2>Gas token balance: <% formatAmount(balance) %> GLMR</h2>
        </div>
       <div class="content">
      <table class="data" v-if="searchTerm && searchActivated">
        <caption>
          <% searchResults.length %> Search Results
        </caption>
        <tr v-if="searchResults.length">
          <th>Page</th>
          <th>Match Term</th>
        </tr>
        <tr v-else-if="searchFinished">
          <td>
            <div class="empty-search">
              Sorry, no results were found. The Diode Network explorer search
              function can search on full or partial matches on account
              addresses/hashes, block numbers, BNS names, and stake amounts, and
              full matches on transaction hashes and block hashes. Please check
              your search term and try again!
            </div>
          </td>
        </tr>
        <tbody
          v-if="searchResults.length"
          is="transition-group"
          name="list-complete"
        >
          <tr
            v-for="result in searchResults"
            v-bind:key="result"
            class="list-complete-item"
          >
            <td>
              <router-link
                v-if="result.type === 'Block'"
                :to="'/block/' + result.id"
                >Block</router-link
              >
              <router-link
                v-if="result.type === 'Address' || result.isAddress"
                :to="'/address/' + result.id"
                ><% result.type %></router-link
              >
              <router-link
                v-if="result.type === 'Transaction'"
                :to="'/tx/' + result.id"
                ><% result.type %></router-link
              >
            </td>
            <td>
              <% result.text %> <% result.stake ? '- ' + result.stake : ''%>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-else class="grid">
        <div class="space-y">
          <div class="card">
            <div class="flex mb-4">
              <i class="pe-7s-credit text-blue mr-2" style="font-size: 20px; color: #2d3e50;  "></i>
              <h2 class="font-medium"  >Your Account</h2>
            </div>
            
            <div v-if="enabled" class="space-y">
              <div class="flex-col">
                <span class="text-sm text-gray">Name</span>
                <div class="account-name flex">
                  <span class="font-mono"><% account ? account.substring(0, 8) + '...' + account.substring(account.length - 6) : '' %></span>
                  <button 
                    class="copy-button"
                    @click="copyToClipboard(account)"
                  >
                    <i class="pe-7s-copy-file" style="font-size: 16px;"></i>
                  </button>
                </div>
              </div>
              
              <div class="flex-col">
                <span class="text-sm text-gray">Balance</span>
                <span class="font-medium"><% valueToBalance(balance) %> GLMR</span>
              </div>
            </div>
            <div v-else class="not-enabled">
              <button class="button button-primary" v-on:click="enable()">Enable MetaMask</button>
              <div v-if="error" v-html="error" class="error"></div>
              <div class="message">
                The Diode Network Explorer uses
                <a target="_blank" href="https://metamask.io">MetaMask</a> to
                authenticate your account. Please enable MetaMask to manage your
                settings. <br /><br />
                If you don't have MetaMask installed, follow
                <a
                  target="_blank"
                  href="https://network.docs.diode.io/docs/faq/configure-metamask/"
                >these instructions</a>
                to get started.
              </div>
            </div>
          </div>

          <div class="card" v-if="enabled">
            <h2 class="font-medium mb-4">Select Fleet</h2>
            
            <div class="dropdown">
              <select
                name="contracts-select"
                @change="onContractChange($event)"
                class="dropdown-button"
                v-model="contract"
              >
                <option value="" disabled>
                  {{ (!contracts || contracts.length === 0) ? 'No Fleets' : 'Select a fleet...' }}
                </option>
                
                <option v-for="c in contracts" v-bind:key="c" :value="c">
                  <% abbreviateAddress(c) %>
                </option>
              </select>
            </div>

            <button
                class="button button-primary" 
                style="margin-top: 1.5rem;"
              v-on:click="createFleet()"
            >
              <i class="pe-7s-plus mr-2" style="font-size: 16px;"></i>
              <span>Create New Fleet</span>
              <img
                v-show="submitFleet"
                class="btn-loading"
                src="images/spinning.gif"
              />
            </button>
          </div>
        </div>

        <div v-if="enabled && contracts && contracts.length > 0" class="card">
          <div class="mb-6">
            <h2 class="font-medium">Devices</h2>
            <p class="text-sm text-gray mt-4">
              Fleet: <span class="font-mono"><% contract ? contract.substring(0, 8) + '...' + contract.substring(contract.length - 6) : '' %></span>
            </p>
          </div>

          <div class="mb-6">
            <div class="flex">
              <input
                type="text"
                class="input"
                v-model="deviceId"
                placeholder="Enter Device ID"
                @input="validateDeviceId"
              />
              <button
                class="button"
                style="transition: all 0.2s; &:hover { box-shadow: none; }" 
                @click="addDeviceFromInput"
                :disabled="!deviceId || !isValidAddress(deviceId)"
                title="Enter a valid Ethereum address to enable this button"
              >
                Add Device
              </button>
            </div>
            <div v-if="deviceId && !isValidAddress(deviceId)" class="text-sm text-error mt-2">
              Please enter a valid Ethereum address (0x followed by 40 hexadecimal characters)
            </div>
            <div v-else-if="deviceId && isValidAddress(deviceId)" class="text-sm text-success mt-2">
              Valid Ethereum address ✓
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Device ID</th>
                <th>Canonical Member</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="device in devices" :key="device.id">
                <td class="font-mono text-sm">
                  <span><% device.id ? device.id.substring(0, 8) + '...' + device.id.substring(device.id.length - 6) : '' %></span>
                </td>
                <td>
                  <div class="device-actions" style="display: flex; align-items: center;">
                    <span :class="device.allowed ? 'badge badge-success' : 'badge badge-neutral'">
                      <% device.allowed ? 'Yes' : 'No' %>
                    </span>
                    <button
                      class="button button-primary ml-2"
                      v-if="device.allowed == false"
                      v-on:click="whitelistDevice(device.id, true)"
                    >
                      <img
                        v-show="isDeviceSubmited(device)"
                        class="btn-loading"
                        src="images/spinning.gif"
                      />
                      <span>Add</span>
                    </button>
                    <button
                      class="button ml-2"
                      v-else
                      v-on:click="whitelistDevice(device.id, false)"
                    >
                      <img
                        v-show="submitDevices[device.id]"
                        class="btn-loading"
                        src="images/spinning.gif"
                      />
                      <span>Remove</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="Object.keys(devices).length === 0">
                <td colspan="2" style="text-align: center; padding: 2rem;">
                  <span class="text-sm text-gray">No devices. Add devices above.</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-else-if="enabled" class="card">
          <div class="mb-6">
            <h2 class="font-medium">Devices</h2>
            <p class="text-sm text-gray mt-4">
              No Fleets available. Please create a new fleet.
            </p>
          </div>
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
    if (!localStorage.getObject) {
      Storage.prototype.getObject = function(key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
      };
    }
    
    if (!localStorage.setObject) {
      Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
      };
    }
    
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
      contractsCount: 100,
    };
  },

  created: function () {
    let self = this;
    getBase(function (base) {
      self.base = base;
    });
    
    try {
      if (typeof Wallet !== 'undefined') {
        Wallet.subscribe(this);
      } else {
        console.error("Wallet object not found. Fleet management may not work properly.");
      }
    } catch (e) {
      console.error("Error initializing with Wallet:", e);
    }
    
    if (window.ethereum && window.ethereum.isMetaMask) {
      setTimeout(() => {
        this.enable();
      }, 500);
    }
  },
  watch: {
    account: function () {
      this.getContracts();
    },
  },
  methods: {
    enable: async function () {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        this.error =
          "Please install <a href='https://metamask.io/'>MetaMask</a>";
        return;
      }
      
      try {
        let isConnected = false;
        try {
          isConnected = await window.ethereum._metamask.isUnlocked();
          console.log("MetaMask unlocked state:", isConnected);
        } catch (unlockError) {
          console.warn("Could not check MetaMask unlock state:", unlockError);
        }

        const moonbeamChainData = [{
          chainId: '0x504',
          chainName: 'Moonbeam',
          nativeCurrency: {
            name: 'Glimmer',
            symbol: 'GLMR',
            decimals: 18
          },
          rpcUrls: ['https://rpc.api.moonbeam.network', 'wss://wss.api.moonbeam.network'],
          blockExplorerUrls: ['https://moonbeam.moonscan.io/'],
          iconUrls: ['https://moonbeam.network/wp-content/uploads/2020/03/Moonbeam-Favicon-550px-1-32x32.png']
        }];
        
        let chainId = null;
        try {
          chainId = await window.ethereum.request({ method: 'eth_chainId' });
          console.log("Current chain ID from eth_chainId:", chainId);
        } catch (chainIdError) {
          console.warn("eth_chainId error:", chainIdError);
          
          try {
            const provider = window.ethereum;
            if (provider.networkVersion) {
              chainId = '0x' + parseInt(provider.networkVersion).toString(16);
              console.log("Chain ID from networkVersion:", chainId);
            }
          } catch (altChainError) {
            console.warn("Alternative chain ID detection failed:", altChainError);
          }
        }
        
        if (chainId && chainId !== moonbeamChainData[0].chainId) {
          console.log("Need to switch chains from", chainId, "to", moonbeamChainData[0].chainId);
          
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: moonbeamChainData[0].chainId }],
            });
            console.log("Successfully switched to Moonbeam chain");
          } catch (switchError) {
            if (switchError.code === 4902 || switchError.message.includes("wallet_addEthereumChain")) {
              try {
                await window.ethereum.request({ 
                  method: 'wallet_addEthereumChain', 
                  params: moonbeamChainData 
                });
                console.log("Successfully added Moonbeam chain");
              } catch (addError) {
                console.error("Error adding chain:", addError);
                alert("Could not add Moonbeam network to MetaMask. Please add it manually in your MetaMask settings.");
              }
            } else {
              console.error("Error switching chain:", switchError);
            }
          }
        }
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          .catch(e => {
            if (e.code === 4001) {
              this.error = "You need to allow MetaMask access to use this feature";
            } else {
              this.error = "There was an error connecting to MetaMask: " + e.message;
            }
            throw e;
          });
        
        if (!accounts || accounts.length === 0) {
          this.error = "No accounts found or access denied";
          return;
        }
        
        this.enabled = true;
        this.account = accounts[0];
        
        if (!this.initialized) {
          this.initialized = true;
          
          window.ethereum.on("chainChanged", (chainId) => {
            console.log("Chain changed to:", chainId);
            try {
              this.handleChainChanged(parseInt(chainId, 16));
            } catch (e) {
              console.error("Error handling chain change:", e);
            }
          });
          
          window.ethereum.on("accountsChanged", (accounts) => {
            console.log("Accounts changed:", accounts);
            if (accounts.length > 0) {
              this.account = accounts[0];
              this.getBalance();
              this.getContracts();
            } else {
              this.enabled = false;
              console.log("No accounts available after account change");
            }
          });
          
          window.ethereum.on("disconnect", (error) => {
            console.log("MetaMask disconnected:", error);
            this.enabled = false;
          });
        }
        
        await this.getBalanceWithRetry();
        
        const networkId = await window.ethereum.request({ method: 'net_version' });
        console.log("Current network ID:", networkId);
        if (networkId !== "1284") { // Moonbeam is network ID 1284
          alert("Please switch to the Moonbeam network in MetaMask");
          this.submitFleet = false;
          return;
        }
        
        let finalChainId;
        try {
          finalChainId = await window.ethereum.request({ method: 'eth_chainId' });
          this.handleChainChanged(parseInt(finalChainId, 16));
        } catch (chainError) {
          console.warn("Could not get final chainId:", chainError);
        }
        
      } catch (error) {
        console.error("MetaMask connection error:", error);
        
        if (error.code === -32002) {
          this.error = "MetaMask connection request already pending. Please open MetaMask.";
        } else if (error.code === 4001) {
          this.error = "You rejected the connection request. Please try again.";
        } else {
          this.error = error.message || "Failed to connect to MetaMask";
        }
      }
    },
    
    getBalanceWithRetry: async function(retries = 3) {
      let attempt = 0;
      while (attempt < retries) {
        try {
          const balance = await MoonbeamWallet.web3().eth.getBalance(this.account);
          console.log("Account balance:", balance);
          this.balance = balance;
          return;
        } catch (error) {
          console.warn(`Balance fetch attempt ${attempt + 1} failed:`, error);
          attempt++;
          if (attempt >= retries) {
            console.error("Failed to get balance after multiple attempts");
            this.balance = "0";
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
    },
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
    addDeviceFromInput: function () {
      if (this.deviceId && this.isValidAddress(this.deviceId)) {
        this.addDevice(this.deviceId, true);
        this.deviceId = "";
      }
    },
    isValidAddress: function (address) {
      return web3.utils.isAddress(address);
    },
    validateDeviceId: function () {
    },
    reloadDevice: function (id) {
      this.isWhiteListed(id, (allowed) => {
        this.devices[id].allowed = web3.utils.hexToNumber(allowed)
          ? true
          : false;
        this.$set(this.devices, id, this.devices[id]);
      });
    },
    loadDevivesInMemory: function () {
      this.devices = {};

      let devicesIds = localStorage.getObject(this.contract);

      if (!devicesIds) {
        return;
      }

      for (id of devicesIds) {
        this.addDevice(id, false);
      }
    },
    setDeviceInStorage: function (id) {
      let devices = localStorage.getObject(this.contract);

      if (!devices) {
        devices = [id];
      } else {
        devices.push(id);
      }

      localStorage.setObject(this.contract, devices);
    },
    getContracts: async function () {
      this.contracts = [];
      if (!this.account) return;
      let proms = [];
      let addrs = [];
      for (let i = 0; i < this.contractsCount; i++) {
        let addr = this.generateContractAddress(i);
        proms.push(MoonbeamWallet.web3().eth.getCode(addr));
        addrs.push(addr);
      }

      let fleets = await Promise.all(proms);
      
      let uniqueContracts = new Set(); 
      
      for (let i = 0; i < fleets.length; i++) {
        if (fleets[i] && fleets[i].length > 2) {
          console.log(`Valid fleet found at ${addrs[i]}`);
          uniqueContracts.add(addrs[i]); 
        }
      }
      
      this.contracts = Array.from(uniqueContracts);
      console.log(`Found ${this.contracts.length} unique fleet contracts`);

      if (this.contracts.length > 0) {
        this.contract = this.contracts[0];
      }

      this.loadDevivesInMemory();
    },
    generateContractAddress: function (nonce) {
      // This hack only works for nonces <= 16

      let hex = "0xd694" + this.account.substr(2);
      if (nonce == 0) {
        hex += "80";
      }
      else if (nonce > 15) {
          hex += web3.utils.toHex(nonce).substr(2);
      }
       else {
        hex += "0" + web3.utils.toHex(nonce).substr(2);
      }

      return (addr = "0x" + web3.utils.keccak256(hex).slice(12).substring(14));
    },
    createFleet: async function () {
      let contract =
        "0x608060405234801561001057600080fd5b506040516060806102d383398101604090815281516020830151919092015160018054600160a060020a03938416600160a060020a03199182161790915560008054948416948216949094179093556002805492909116919092161790556102568061007d6000396000f3006080604052600436106100775763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633c5f7d46811461007c5780634ef1aee4146100a45780634fb3ccc5146100df578063504f04b714610110578063570ca7351461013c578063d90bd65114610151575b600080fd5b34801561008857600080fd5b506100a2600160a060020a03600435166024351515610172565b005b3480156100b057600080fd5b506100cb600160a060020a036004358116906024351661019d565b604080519115158252519081900360200190f35b3480156100eb57600080fd5b506100f46101bd565b60408051600160a060020a039092168252519081900360200190f35b34801561011c57600080fd5b506100a2600160a060020a036004358116906024351660443515156101cc565b34801561014857600080fd5b506100f4610206565b34801561015d57600080fd5b506100cb600160a060020a0360043516610215565b600160a060020a03919091166000908152600660205260409020805460ff1916911515919091179055565b600760209081526000928352604080842090915290825290205460ff1681565b600254600160a060020a031681565b600160a060020a03928316600090815260076020908152604080832094909516825292909252919020805460ff1916911515919091179055565b600154600160a060020a031681565b60066020526000908152604090205460ff16815600a165627a7a723058208df217001cef7e510f8f0352585a03e46b30eba1feaeaf76becbe261832a627f0029";

      let args = [Registry, this.account, this.account];
      let constructor = MoonbeamWallet.web3().eth.abi.encodeParameters(
        ["address", "address", "address"],
        args
      );
      let code = contract + constructor.substr(2);
      this.submitFleet = true;
      
      try {
        try {
          const networkId = await window.ethereum.request({ method: 'net_version' });
          console.log("Current network ID:", networkId);
          if (networkId !== "1284") { // Moonbeam is network ID 1284
            alert("Please switch to the Moonbeam network in MetaMask");
            this.submitFleet = false;
            return;
          }
        } catch (networkErr) {
          console.warn("Could not verify network:", networkErr);
        }
        
        let retryCount = 0;
        const maxRetries = 2;
        let success = false;
        let tx;
        
        while (!success && retryCount <= maxRetries) {
          try {
            console.log(`Attempt ${retryCount + 1} to send transaction...`);
            
            const txParams = {
              from: this.account,
              data: code,
            };
            
            try {
              const gasEstimate = await window.ethereum.request({
                method: "eth_estimateGas",
                params: [txParams]
              });
              console.log("Gas estimate:", gasEstimate);
              txParams.gas = gasEstimate;
            } catch (gasError) {
              console.warn("Gas estimation failed:", gasError);
            }
            
            console.log("Sending transaction with params:", txParams);
            tx = await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [txParams],
            });
            
            if (tx) {
              success = true;
              console.log("Transaction hash:", tx);
            }
          } catch (err) {
            console.error(`Attempt ${retryCount + 1} failed:`, err);
            
            if (err.message && err.message.includes("JsonRpcEngine")) {
              retryCount++;
              if (retryCount <= maxRetries) {
                console.log(`Retrying in 1 second... (${retryCount}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
              }
            } else {
              throw err;
            }
          }
        }
        
        if (success && tx) {
          let pendingTx = {
            hash: tx,
            type: 'createFleet',
            timestamp: Date.now()
          };
          this.storePendingTransaction(pendingTx);
          
          alert("Transaction submitted! It may take a few minutes to confirm. You can refresh the page later to see your new fleet.");
          
          this.submitFleet = false;
          
          this.checkTransactionStatusInBackground(tx);
        } else {
          throw new Error("Failed to submit transaction after multiple attempts");
        }
      } catch (err) {
        console.error("[SubmitFleet] Send error: ", err);
        this.submitFleet = false;
        
        if (err.message && err.message.includes("connection not open")) {
          alert("Network connection to Moonbeam is unavailable. Please check your internet connection and try again later.");
        } else if (err.message && err.message.includes("JsonRpcEngine")) {
          alert("Network issue detected. Your transaction may still be processed. Please wait a few minutes and check if your fleet appears. If not, please try again.");
        } else if (err.message && err.message.includes("insufficient funds")) {
          alert("Your account doesn't have enough funds to create a fleet. You need some GLMR tokens in your account.");
        } else if (err.message && err.message.includes("User denied")) {
          alert("Transaction was rejected in your wallet. Please try again and approve the transaction.");
        } else {
          alert("Transaction failed: " + (err.message || "Unknown error") + ". Please try again later.");
        }
      }
    },
    loadNewFleet: async function () {
      let addr = this.generateContractAddress(this.contractsCount);
      
      try {
        let code = await MoonbeamWallet.web3().eth.getCode(addr);
        
        if (code && code.length > 2) {
          if (!this.contracts.includes(addr)) {
            this.contracts.push(addr);
          }
          
          this.contract = addr;
          this.loadDevivesInMemory();
          this.contractsCount += 1;
          localStorage.fleetsCount = this.contractsCount;
        } else {
          console.log("No code found at address, skipping");
        }
      } catch (error) {
        console.error("Error checking new fleet:", error);
      }
    },
    isWhiteListed(device, callback) {
      if (!this.contracts[0]) return;
      CallFleet("deviceWhitelist", this.contracts[0], [device], callback);
    },
    whitelistDevice: async function (device, allowed) {
      let contract = this.contracts[0];
      let call = MoonbeamWallet.web3().eth.abi.encodeFunctionCall(
        fleetMethods["SetDeviceWhitelist"],
        [device, allowed]
      );
      this.$set(this.submitDevices, device, true);
      
      try {
        const isConnected = await this.checkNetworkConnection();
        if (!isConnected) {
          console.warn("Network connectivity check failed");
        }
        
        let retryCount = 0;
        const maxRetries = 2;
        let success = false;
        let tx;
        
        while (!success && retryCount <= maxRetries) {
          try {
            console.log(`Whitelist attempt ${retryCount + 1} for device ${device}...`);
            
            const txParams = {
              from: this.account,
              to: contract,
              data: call,
            };
            
            try {
              const gasEstimate = await window.ethereum.request({
                method: "eth_estimateGas",
                params: [txParams]
              });
              console.log("Gas estimate for whitelist:", gasEstimate);
              txParams.gas = gasEstimate;
            } catch (gasError) {
              console.warn("Gas estimation failed for whitelist:", gasError);
            }
            
            console.log("Sending whitelist transaction:", txParams);
            tx = await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [txParams],
            });
            
            if (tx) {
              success = true;
              console.log("Whitelist transaction hash:", tx);
            }
          } catch (err) {
            console.error(`Whitelist attempt ${retryCount + 1} failed:`, err);
            
            if (err.message && (
                err.message.includes("JsonRpcEngine") || 
                err.message.includes("connection not open"))) {
              retryCount++;
              if (retryCount <= maxRetries) {
                console.log(`Retrying whitelist in 1 second... (${retryCount}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
              }
            } else {
              throw err;
            }
          }
        }
        
        if (success && tx) {
          let pendingTx = {
            hash: tx,
            type: 'whitelist',
            device: device,
            allowed: allowed,
            timestamp: Date.now()
          };
          this.storePendingTransaction(pendingTx);
          
          alert(`Device ${allowed ? 'added to' : 'removed from'} whitelist! It may take a few minutes to confirm.`);
          
          this.$set(this.submitDevices, device, false);
          
          this.checkWhitelistTransactionInBackground(tx, device);
        } else {
          throw new Error("Failed to submit whitelist transaction after multiple attempts");
        }
      } catch (err) {
        console.error("[WhitelistDevice] send error:", err);
        this.$set(this.submitDevices, device, false);
        
        if (err.message && err.message.includes("connection not open")) {
          alert("Network connection to Moonbeam is unavailable. Please check your internet connection and try again later.");
        } else if (err.message && err.message.includes("JsonRpcEngine")) {
          alert("Network issue detected. Your whitelist operation may still be processed. Please wait a few minutes and check the device status again.");
        } else if (err.message && err.message.includes("insufficient funds")) {
          alert("Your account doesn't have enough funds for this operation. You need some GLMR tokens in your account.");
        } else if (err.message && err.message.includes("User denied")) {
          alert("Transaction was rejected in your wallet. Please try again and approve the transaction.");
        } else {
          alert("Whitelist operation failed: " + (err.message || "Unknown error") + ". Please try again later.");
        }
      }
    },
    checkWhitelistTransactionInBackground(txHash, device) {
      const checkInterval = setInterval(() => {
        MoonbeamWallet.web3().eth.getTransactionReceipt(txHash)
          .then(receipt => {
            if (receipt) {
              console.log("Whitelist transaction confirmed in background:", receipt);
              clearInterval(checkInterval);
              
              if (receipt.status) {
                this.reloadDevice(device);
              }
            }
          })
          .catch(err => {
            console.log("Background whitelist check error (can be ignored):", err);
          });
      }, 10000); 
      
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 300000);
    },
    execAfter: function (callback, time) {
      return new Promise(function (resolve, reject) {
        window.setTimeout(() => {
          resolve(callback());
        }, time);
      });
    },
    isTxConfirmed: function (txHash) {
      return new Promise(
        function (resolve, reject) {
          if (
            !txHash ||
            txHash.length != 66 ||
            !/^0x[0-9a-f]{64}$/i.test(txHash)
          ) {
            reject(false);
          }
          MoonbeamWallet.web3().eth
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
    copyToClipboard: function (text) {
      navigator.clipboard.writeText(text).then(function () {
        alert('Address copied to clipboard!');
      }).catch(function (err) {
        console.error('Could not copy text: ', err);
      });
    },
    checkNetworkConnection: async function() {
      if (!window.ethereum) {
        console.warn("MetaMask not detected");
        return false;
      }
      
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        });
        
        if (accounts && accounts.length > 0) {
          console.log("Network connection test succeeded");
          return true;
        } else {
          console.warn("Network connection test failed - no accounts available");
          return false;
        }
      } catch (error) {
        console.warn("Network connection test failed:", error);
        return false;
      }
    },
    formatAmount(amountWei) {
      return web3.utils.fromWei(amountWei);
    },
    valueToBalance(value) {
      if (!value) return "0";
      return parseFloat(web3.utils.fromWei(value)).toFixed(4);
    },
    storePendingTransaction: function(tx) {
      let pendingTxs = JSON.parse(localStorage.getItem('pendingTransactions') || '[]');
      pendingTxs.push(tx);
      localStorage.setItem('pendingTransactions', JSON.stringify(pendingTxs));
      console.log("Stored pending transaction in local storage:", tx);
    },
    
    checkTransactionStatusInBackground: function(txHash) {
      console.log("Starting background check for transaction:", txHash);
      
      if (!this.backgroundChecks) {
        this.backgroundChecks = {};
      }
      
      if (this.backgroundChecks[txHash]) {
        console.log("Background check already running for this transaction");
        return;
      }
      
      this.backgroundChecks[txHash] = true;
      
      let checkCount = 0;
      const maxChecks = 30; 
      let delay = 5000; 
      
      const checkReceipt = () => {
        if (checkCount >= maxChecks) {
          console.log("Abandoning background check after maximum attempts");
          delete this.backgroundChecks[txHash];
          return;
        }
        
        checkCount++;
        console.log(`Background check attempt ${checkCount}/${maxChecks} for tx: ${txHash}`);
        
        setTimeout(() => {
          MoonbeamWallet.web3().eth.getTransactionReceipt(txHash)
            .then(receipt => {
              if (receipt) {
                console.log("Transaction confirmed:", receipt);
                
                if (receipt.status) {
                  this.loadNewFleet()
                    .then(() => {
                      console.log("New fleet loaded successfully");
                    })
                    .catch(err => {
                      console.error("Error loading new fleet:", err);
                    });
                } else {
                  console.error("Transaction failed on-chain");
                }
                
                delete this.backgroundChecks[txHash];
              } else {
                delay = Math.min(delay * 1.5, 60000); 
                setTimeout(checkReceipt, delay);
              }
            })
            .catch(err => {
              console.warn("Error checking transaction receipt:", err);
              
              if (err.message && (
                  err.message.includes("connection not open") || 
                  err.message.includes("JsonRpcEngine"))) {
                setTimeout(checkReceipt, 10000); 
              } else {
                delay = Math.min(delay * 1.5, 60000);
                setTimeout(checkReceipt, delay);
              }
            });
        }, 0);
      };
      
      checkReceipt();
    },
    abbreviateAddress: function (address) {
      if (!address) return '';
      return address.slice(0, 6) + '...' + address.slice(-4);
    },
    handleChainChanged: function(chainId) {
      this.getContracts();
    },
  },
});
</script>
