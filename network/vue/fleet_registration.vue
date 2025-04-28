<template id="fleet_registration">
  <div>
    <div class="title row" style="display: flex; flex-direction: column;">
      <div style="display: flex; align-items: center;">
        <h1>Account: <% account || "Connect MetaMask" %></h1>
        <button style="text-decoration: underline;" v-on:click="walletProvider.switchAccount()" class="button">Switch Account</button>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <h2>Gas token balance: <% formatAmount(balance) %> GLMR</h2>
        <h2 style="margin-left: 32px;">DIODE token balance: <% formatAmount(diodeBalance) %> DIODE</h2>
      </div>
    </div>
    <div class="content">
      <div class="info-blurb">
        App builders, enterprises, and other permissionless security systems can create their own Fleet Contract and underwrite their device / user traffic on the Diode Network. <a href="https://network.docs.diode.io/docs/features/what-is-a-fleet-contract/" target="_blank">Read more here.</a>
      </div>

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
              <i class="pe-7s-credit text-blue mr-2" style="font-size: 20px; color: #2d3e50;"></i>
              <h2 class="font-medium">Your Account</h2>
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

              <div class="flex-col">
                <span class="text-sm text-gray">Staked Tokens</span>
                <span class="font-medium"><% formatAmount(stakedTokens) %> DIODE</span>
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
          <div class="card">
            <h2 class="font-medium">Add Stake</h2>
            <div class="flex items-center">
              <input 
              style="margin-top: 8px; background-color: white; border-radius: 6px;"
                type="number" 
                v-model="stakeAmount" 
                placeholder="Amount of DIODE to stake" 
                class="form-input" 
                min="0"
                step="0.1"
              />
              <button 
                class="button button-primary ml-2" 
                v-on:click="addStake()"
                :disabled="!stakeAmount || stakeAmount <= 0 || submitStake"
              >
                <i class="pe-7s-plus mr-2" style="font-size: 16px;"></i>
                <span>Add Stake</span>
                <img
                  v-show="submitStake"
                  class="btn-loading"
                  src="images/spinning.gif"
                />
              </button>
            </div>
            <p v-if="stakeError" class="text-red-500 mt-2">{{ stakeError }}</p>
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
      diodeBalance: "0", 
      stakedTokens: "0",
      codehash: undefined,
      contracts: [],
      contract: null, 
      error: undefined,
      deviceId: undefined,
      clientId: undefined,
      devices: {},
      submitFleet: false,
      submitDevices: {},
      stakeAmount: "", 
      submitStake: false, 
      stakeError: "", 
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
      tableHeight: 300,
      contractsCount: 100,
      diodeRegistryAddress: "0xD78653669fd3df4dF8F3141Ffa53462121d117a4",
      fleetFactoryAddress: "0xa21D0a54dFee3Ff4B9f82959C09B538863744839"
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
        } catch (chainIdError) {
          console.warn("eth_chainId error:", chainIdError);
        }
        
        if (chainId && chainId !== moonbeamChainData[0].chainId) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: moonbeamChainData[0].chainId }],
            });
          } catch (switchError) {
            if (switchError.code === 4902 || switchError.message.includes("wallet_addEthereumChain")) {
              try {
                await window.ethereum.request({ 
                  method: 'wallet_addEthereumChain', 
                  params: moonbeamChainData 
                });
              } catch (addError) {
                alert("Could not add Moonbeam network to MetaMask. Please add it manually in your MetaMask settings.");
              }
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
            try {
              this.handleChainChanged(parseInt(chainId, 16));
            } catch (e) {
              console.error("Error handling chain change:", e);
            }
          });
          
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              this.account = accounts[0];
              this.getBalance();
              this.getContracts();
            } else {
              this.enabled = false;
            }
          });
          
          window.ethereum.on("disconnect", (error) => {
            this.enabled = false;
          });
        }
        
        await this.getBalanceWithRetry();
        await this.getDiodeBalanceWithRetry(); 
        if (this.contract) {
          await this.getStakedTokens();
        }
        
        const networkId = await window.ethereum.request({ method: 'net_version' });
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
          this.balance = balance;
          return;
        } catch (error) {
          attempt++;
          if (attempt >= retries) {
            this.balance = "0";
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
    },
    
    getDiodeBalanceWithRetry: async function(retries = 3) {
      let attempt = 0;
      while (attempt < retries) {
        try {
          const balance = await CallToken("balanceOf", [this.account]);
          this.diodeBalance = balance;
          return;
        } catch (error) {
          attempt++;
          if (attempt >= retries) {
            this.diodeBalance = "0";
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
    },
    
    onContractChange: function (event) {
      this.loadDevivesInMemory();
      this.getStakedTokens();
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

      try {
        try {
          const fleetCount = await CallFleetFactory("GetCreatorFleetContractCount", [this.account]);
          
          if (fleetCount && parseInt(fleetCount) > 0) {
            const count = parseInt(fleetCount);
            let fleets = [];
            
            for (let i = 0; i < count; i++) {
              try {
                const fleetAddress = await CallFleetFactory("GetCreatorFleetContract", [this.account, i]);
                if (fleetAddress && fleetAddress !== '0x0000000000000000000000000000000000000000') {
                  fleets.push(fleetAddress);
                }
              } catch (indexError) {
              }
            }
            
            this.contracts = fleets;
          } else {
            const operatorFleetCount = await CallFleetFactory("GetOperatorFleetContractCount", [this.account]);
            
            if (operatorFleetCount && parseInt(operatorFleetCount) > 0) {
              const count = parseInt(operatorFleetCount);
              let fleets = [];
              
              for (let i = 0; i < count; i++) {
                try {
                  const fleetAddress = await CallFleetFactory("GetOperatorFleetContract", [this.account, i]);
                  if (fleetAddress && fleetAddress !== '0x0000000000000000000000000000000000000000') {
                    fleets.push(fleetAddress);
                  }
                } catch (indexError) {
                }
              }
              
              this.contracts = fleets;
            }
            
            const accountantFleetCount = await CallFleetFactory("GetAccountantFleetContractCount", [this.account]);
            
            if (accountantFleetCount && parseInt(accountantFleetCount) > 0) {
              const count = parseInt(accountantFleetCount);
              let accountantFleets = [];
              
              for (let i = 0; i < count; i++) {
                try {
                  const fleetAddress = await CallFleetFactory("GetAccountantFleetContract", [this.account, i]);
                  if (fleetAddress && fleetAddress !== '0x0000000000000000000000000000000000000000' && 
                      !this.contracts.includes(fleetAddress)) {
                    accountantFleets.push(fleetAddress);
                  }
                } catch (indexError) {
                }
              }
              
              this.contracts = [...this.contracts, ...accountantFleets];
            }
          }
        } catch (factoryError) {
          throw factoryError;
        }
      } catch (error) {
        console.error("Error fetching fleet contracts:", error);
        this.contracts = [];
      }
      
      if (this.contracts.length > 0) {
        this.contract = this.contracts[0];
        this.loadDevivesInMemory();
        this.getStakedTokens();
      }
    },
    createFleet: async function () {
      this.submitFleet = true;
      
      try {
        try {
          const networkId = await window.ethereum.request({ method: 'net_version' });
          if (networkId !== "1284") { // Moonbeam is network ID 1284
            alert("Please switch to the Moonbeam network in MetaMask");
            this.submitFleet = false;
            return;
          }
        } catch (networkErr) {
        }
        
        try {
          const code = await MoonbeamWallet.web3().eth.getCode(this.fleetFactoryAddress);
          if (code.length <= 2) {
            throw new Error("Factory contract not found at specified address");
          }
        } catch (codeError) {
        }
        
        const methodAbi = fleetFactoryMethods["CreateFleetContract"];
        if (!methodAbi) {
          throw new Error("CreateFleetContract method not found in ABI definitions");
        }
        
        const methodCall = MoonbeamWallet.web3().eth.abi.encodeFunctionCall(
          methodAbi, [this.account, this.account]
        );
        
        const txParams = {
          from: this.account,
          to: this.fleetFactoryAddress,
          data: methodCall,
          gas: "1500000"
        };
        
        try {
          const gasEstimate = await window.ethereum.request({
            method: "eth_estimateGas",
            params: [txParams]
          });
          txParams.gas = gasEstimate;
        } catch (gasError) {
        }
        
        const tx = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [txParams],
        });
        
        if (tx) {
          let pendingTx = {
            hash: tx,
            type: 'createFleet',
            timestamp: Date.now()
          };
          this.storePendingTransaction(pendingTx);
          
          alert("Fleet creation transaction submitted! It may take a few minutes to confirm. You can refresh the page later to see your new fleet.");
          
          this.submitFleet = false;
          
          this.checkTransactionStatusInBackground(tx);
        } else {
          throw new Error("Failed to submit transaction");
        }
      } catch (err) {
        this.submitFleet = false;
        
        if (err.message && err.message.includes("connection not open")) {
          alert("Network connection to Moonbeam is unavailable. Please check your internet connection and try again later.");
        } else if (err.message && (err.message.includes("JsonRpcEngine") || err.message.includes("Internal JSON-RPC error"))) {
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

    checkTransactionStatusInBackground: function(txHash) {
      if (!this.backgroundChecks) {
        this.backgroundChecks = {};
      }
      
      if (this.backgroundChecks[txHash]) {
        return;
      }
      
      this.backgroundChecks[txHash] = true;
      
      let checkCount = 0;
      const maxChecks = 30; 
      let delay = 5000; 
      
      const checkReceipt = () => {
        if (checkCount >= maxChecks) {
          delete this.backgroundChecks[txHash];
          return;
        }
        
        checkCount++;
        
        setTimeout(() => {
          MoonbeamWallet.web3().eth.getTransactionReceipt(txHash)
            .then(receipt => {
              if (receipt) {
                clearInterval(checkInterval);
                
                if (receipt.status) {
                  if (receipt.contractAddress) {
                    if (!this.contracts.includes(receipt.contractAddress)) {
                      this.contracts.push(receipt.contractAddress);
                      this.contract = receipt.contractAddress;
                    }
                  }
                  
                  setTimeout(() => {
                    this.getContracts()
                      .then(() => {
                        alert("Fleet creation was successful! Your new fleet is now available in the dropdown.");
                      })
                      .catch(err => {
                      });
                  }, 5000);
                } else {
                  alert("Fleet creation failed on the blockchain. Please try again.");
                }
                
                delete this.backgroundChecks[txHash];
              } else {
                delay = Math.min(delay * 1.5, 60000); 
                setTimeout(checkReceipt, delay);
              }
            })
            .catch(err => {
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
        }
        
        let retryCount = 0;
        const maxRetries = 2;
        let success = false;
        let tx;
        
        while (!success && retryCount <= maxRetries) {
          try {
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
              txParams.gas = gasEstimate;
            } catch (gasError) {
            }
            
            tx = await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [txParams],
            });
            
            if (tx) {
              success = true;
            }
          } catch (err) {
            
            if (err.message && (
                err.message.includes("JsonRpcEngine") || 
                err.message.includes("connection not open"))) {
              retryCount++;
              if (retryCount <= maxRetries) {
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
              clearInterval(checkInterval);
              
              if (receipt.status) {
                this.reloadDevice(device);
              }
            }
          })
          .catch(err => {
          });
      }, 10000); 
      
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 300000);
    },
    addStake: async function() {
      if (!this.stakeAmount || this.stakeAmount <= 0) {
        this.stakeError = "Please enter a valid amount to stake";
        return;
      }
      
      if (!this.contract) {
        this.stakeError = "Please select a fleet contract first";
        return;
      }
      
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        this.stakeError = "MetaMask not available";
        return;
      }
      
      const stakeAmountWei = MoonbeamWallet.web3().utils.toWei(this.stakeAmount.toString(), 'ether');
      
      if (BigInt(stakeAmountWei) > BigInt(this.diodeBalance)) {
        this.stakeError = "Insufficient DIODE tokens in your wallet";
        alert("You don't have enough DIODE tokens to stake. You have " + this.formatAmount(this.diodeBalance) + " DIODE but you're trying to stake " + this.stakeAmount + " DIODE.");
        return;
      }
      
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0x504') { // Moonbeam
          this.stakeError = "Please switch to Moonbeam network in MetaMask";
          return;
        }
      } catch (error) {
      }
      
      this.submitStake = true;
      this.stakeError = "";
      
      try {
        const amountInWei = MoonbeamWallet.web3().utils.toWei(this.stakeAmount.toString(), 'ether');
        
        try {
          const allowanceMethod = erc20Abi.find(m => m.name === "allowance");
          if (!allowanceMethod) {
            throw new Error("Could not find allowance method in ERC20 ABI");
          }
          
          const allowanceCall = MoonbeamWallet.web3().eth.abi.encodeFunctionCall(
            allowanceMethod, 
            [this.account, this.diodeRegistryAddress]
          );
          
          const currentAllowance = await MoonbeamWallet.web3().eth.call({
            to: DiodeToken,
            data: allowanceCall
          });
          
          const decodedAllowance = MoonbeamWallet.web3().eth.abi.decodeParameter('uint256', currentAllowance);
          
          const needsApproval = BigInt(decodedAllowance) < BigInt(amountInWei);
          
          if (needsApproval) {
            const approveMethod = erc20Abi.find(m => m.name === "approve");
            if (!approveMethod) {
              throw new Error("Could not find approve method in ERC20 ABI");
            }
            
            const approveCall = MoonbeamWallet.web3().eth.abi.encodeFunctionCall(
              approveMethod, 
              [this.diodeRegistryAddress, amountInWei]
            );
            
            const approveTxParams = {
              from: this.account,
              to: DiodeToken,
              data: approveCall
            };
            
            try {
              const approveGasEstimate = await window.ethereum.request({
                method: "eth_estimateGas",
                params: [approveTxParams]
              });
              approveTxParams.gas = approveGasEstimate;
            } catch (gasError) {
              approveTxParams.gas = "100000";
            }
            
            alert("You'll need to approve two transactions. First to authorize token spending, then to complete the staking.");
            
            const approveTx = await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [approveTxParams]
            });
            
            const approvalReceipt = await this.waitForTransactionReceipt(approveTx);
            
            if (!approvalReceipt || !approvalReceipt.status) {
              throw new Error("Token approval transaction failed");
            }
          }
          
          const stakeMethod = registryMethods["ContractStake"];
          if (!stakeMethod) {
            throw new Error("Could not find ContractStake method in registryMethods");
          }
          
          const stakeData = MoonbeamWallet.web3().eth.abi.encodeFunctionCall(
            stakeMethod, 
            [this.contract, amountInWei]
          );
          
          const stakeTxParams = {
            from: this.account,
            to: this.diodeRegistryAddress,
            data: stakeData
          };
          
          try {
            const gasEstimate = await window.ethereum.request({
              method: "eth_estimateGas",
              params: [stakeTxParams]
            });
            stakeTxParams.gas = gasEstimate;
          } catch (gasError) {
            stakeTxParams.gas = "300000";
          }
          
          if (needsApproval) {
            alert("Now please confirm the second transaction to complete the staking process.");
          }
          
          const stakeTx = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [stakeTxParams]
          });
          
          let pendingTx = {
            hash: stakeTx,
            type: 'addStake',
            amount: this.stakeAmount,
            fleet: this.contract,
            timestamp: Date.now()
          };
          this.storePendingTransaction(pendingTx);
          
          alert(`Successfully initiated staking of ${this.stakeAmount} DIODE tokens to fleet ${this.abbreviateAddress(this.contract)}`);
          
          this.stakeAmount = "";
          
          await this.getDiodeBalanceWithRetry();
          await this.getStakedTokens();
          
        } catch (approvalError) {
          throw approvalError;
        }
      } catch (error) {
        this.stakeError = `Failed to stake tokens: ${error.message || "Unknown error"}`;
        
        if (error.message && error.message.includes("insufficient funds")) {
          this.stakeError = "Insufficient DIODE tokens for staking";
        } else if (error.message && error.message.includes("User denied")) {
          this.stakeError = "Transaction was rejected in your wallet";
        }
      } finally {
        this.submitStake = false;
      }
    },
    
    waitForTransactionReceipt: async function(txHash, maxAttempts = 30) {
      let attempts = 0;
      
      while (attempts < maxAttempts) {
        try {
          const receipt = await MoonbeamWallet.web3().eth.getTransactionReceipt(txHash);
          if (receipt) {
            return receipt;
          }
        } catch (error) {
        }
        
        attempts++;
        const delay = Math.min(1000 * Math.pow(1.5, attempts), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      return null;
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
      });
    },
    checkNetworkConnection: async function() {
      if (!window.ethereum) {
        return false;
      }
      
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        });
        
        if (accounts && accounts.length > 0) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
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
    },
    abbreviateAddress: function (address) {
      if (!address) return '';
      return address.slice(0, 6) + '...' + address.slice(-4);
    },
    handleChainChanged: function(chainId) {
      this.getContracts();
      this.getDiodeBalanceWithRetry();
      if (this.contract) {
        this.getStakedTokens();
      }
    },
    getStakedTokens: async function() {
      if (!this.contract || !this.account) {
        this.stakedTokens = "0";
        return;
      }
      
      try {
        const fleetData = await CallRegistry("GetFleet", [this.contract]);
        
        if (fleetData && fleetData[0] === true) { 
          const stakedAmount = fleetData[1]; 
          this.stakedTokens = stakedAmount;
        } else {
          this.stakedTokens = "0";
        }
      } catch (error) {
        this.stakedTokens = "0";
      }
    },
  },
});
</script>
