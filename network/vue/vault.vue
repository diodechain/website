<template id="vault">
    <div class="vault prenet">
        <div class="title row" style="display: flex; flex-direction: column;">
            <div style="display: flex; align-items: center;">
                <h1>Account: <% account || "Connect MetaMask" %></h1>
                <button style="text-decoration: underline;" v-on:click="walletProvider.switchAccount()" class="button">Switch Account</button>
            </div>
            <h2>Gas token balance: <% formatAmount(balance) %> GLMR</h2>
        </div>
        <div class="page-content">
            <!-- Vault Information Box -->
            <div class="box" style="width: 80%; background-color: #f0f8ff; border: 1px solid black; margin: 2em auto auto auto; padding: 1em;">
                <div class="box-header">
                    <h3 class="box-title">Vault Properties</h3>
                </div>
                <div class="vault-properties" style="display: grid; grid-template-columns: 1fr 1fr;">
                    <div class="property">
                        <strong>Yield Rate:</strong> <% (vaultYieldRate / 100).toFixed(2) %>%
                    </div>
                    <div class="property">
                        <strong>Lock Period:</strong> <% formatDuration(vaultLockPeriod) %>
                    </div>
                    <div class="property">
                        <strong>Vesting Period:</strong> <% formatDuration(vaultVestingPeriod) %>
                    </div>
                    <div class="property">
                        <strong>Yield Reserve:</strong> <% formatAmount(vaultYieldReserve) %> <% tokenSymbol %>
                    </div>
                </div>
            </div>

            <!-- Create New Vault Form -->
            <div class="box" v-if="!pendingTx"
                style="width: 80%; background-color: aliceblue; border: 1px solid black; margin: 2em auto auto auto; padding: 1em;">
                <div class="box-header">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <h3 class="box-title">Create New <% tokenName %> Vault</h3>
                        <button v-if="!enabled" v-on:click="walletProvider.enable()" class="button">Connect to Moonbeam</button>
                    </div>
                </div>

                <form v-if="enabled">
                    <div style="margin-bottom: 10px;">
                        <strong>Your Balance:</strong> <% formatAmount(tokenBalance) %> <% tokenSymbol %>
                    </div>
                    
                    <label for="amount">Amount to lock</label>
                    <div style="position: relative">
                        <input type="number" step="0.1" id="amount" v-model="amount" class="form-control"
                            placeholder="Enter amount" />
                        <button style="position: absolute; transform: translate(-200%,0%);" class="button"
                            v-on:click="setMaxAmount" type="button">Max</button>
                    </div>

                    <!-- Projection Details -->
                    <div v-if="amount > 0" class="projection-details" style="margin-top: 1em; padding: 1em; background-color: #e6f7ff;">
                        <h4>Lock & Yield Projection</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5em;">
                            <div><strong>Lock Duration:</strong> <% formatDuration(vaultLockPeriod) %></div>
                            <div><strong>Vesting Duration:</strong> <% formatDuration(vaultVestingPeriod) %></div>
                            <div><strong>Total Duration:</strong> <% formatDuration(Number(vaultLockPeriod) + Number(vaultVestingPeriod)) %></div>
                            <div><strong>Projected Yield:</strong> <% calculateProjectedYield() %> <% tokenSymbol %></div>
                        </div>
                        <div style="margin-top: 0.5em;">
                            <strong>Timeline:</strong>
                            <div class="timeline" style="height: 30px; background-color: #ddd; position: relative; margin-top: 0.5em; overflow: hidden;">
                                <div class="lock-period" style="position: absolute; height: 100%; background-color: #ff9800; left: 0; width: 50%;" 
                                     :style="{ width: (vaultLockPeriod / (Number(vaultLockPeriod) + Number(vaultVestingPeriod)) * 100) + '%' }">
                                </div>
                                <div class="vesting-period" style="position: absolute; height: 100%; background-color: #4CAF50; left: 50%;" 
                                     :style="{ left: (vaultLockPeriod / (Number(vaultLockPeriod) + Number(vaultVestingPeriod)) * 100) + '%', width: (vaultVestingPeriod / (Number(vaultLockPeriod) + Number(vaultVestingPeriod)) * 100) + '%' }">
                                </div>
                                <div style="position: absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; color: white; font-weight: bold;">
                                    <span>Lock</span>
                                    <span>Vesting</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button v-on:click="createVault" class="button" :disabled="txPending" 
                        style="display: flex; align-items: center; margin-top: 1em;">
                        <span>Create Vault</span>
                        <div v-if="txPending" class="spinner"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg></div>
                    </button>
                    <div v-if="error" v-html="error" class="error"></div>
                </form>
            </div>

            <!-- Transaction Progress Modal -->
            <div v-if="pendingTx" class="box" 
                style="width: 80%; background-color: aliceblue; border: 1px solid black; margin: 2em auto auto auto; padding: 1em;">
                <h3>Creating Vault</h3>
                <div class="progress" style="margin: 2em auto auto;">
                    <div class="progress-track"></div>
                    <div id="step1" :class="{ 'progress-step': true, 'is-complete': txStep > 0, 'is-active': txStep === 0 }">
                        Sign Transaction
                    </div>
                    <div id="step2" :class="{ 'progress-step': true, 'is-complete': txStep > 1, 'is-active': txStep === 1 }">
                        Transaction Confirmed
                    </div>
                    <div id="step3" :class="{ 'progress-step': true, 'is-complete': txStep > 2, 'is-active': txStep === 2 }">
                        Complete
                    </div>
                </div>
                <div v-if="error" v-html="error" class="error"></div>
                <div style="margin-top: 1em; display: flex; justify-content: center;">
                    <button v-if="txStep === 2" v-on:click="pendingTx = false" class="button">
                        Close
                    </button>
                    <button v-if="error" v-on:click="retryTransaction" class="button">
                        Retry
                    </button>
                </div>
            </div>

            <!-- User's Vaults List -->
            <div v-if="vaults.length > 0" class="box" 
                style="width: 80%; background-color: aliceblue; border: 1px solid black; margin: 2em auto auto auto; padding: 1em;">
                <div class="box-header">
                    <h3 class="box-title">Existing Vaults</h3>
                </div>
                <div class="vault-list">
                    <div v-for="(vault, index) in vaults" :key="index" class="vault-item" 
                        style="margin-bottom: 1em; padding: 1em; border: 1px solid #ccc">
                        <h4>Vault #<% index + 1 %></h4>
                        <p>Address: <a :href="'/vesting/#/m1/' + vault.address"><% vault.address %></a></p>
                        <p>Locked Amount: <% formatAmount(vault.amount) %> <% tokenSymbol %></p>
                        <p>Creation: <% formatDate(vault.startTime) %></p>
                        <p>Vesting Start: <% formatDate(vault.vestingStartTime) %></p>
                        <p>Vesting End: <% formatDate(vault.endTime) %></p>
                    </div>
                </div>
            </div>
            <div v-else-if="vaultsLoaded && enabled" class="box" 
                style="width: 80%; background-color: aliceblue; border: 1px solid black; margin: 2em auto auto auto; padding: 1em; text-align: center;">
                <p>You don't have any vaults yet. Create your first one above!</p>
            </div>
        </div>
    </div>
</template>
<script>
var Vault = Vue.component("vault", {
    template: document.getElementById("vault").innerHTML,
    delimiters: ["<%", "%>"],
    props: { address: String },
    data: () => {
        return {
            // Set by wallet provider
            walletProvider: MoonbeamWallet,
            account: null,
            balance: null,
            error: null,
            enabled: false,

            // Controlled by vue component
            amount: '0',
            pendingTx: false,
            tokenContractAddress: null,
            tokenDecimals: null,
            tokenName: null,
            tokenSymbol: null,
            tokenBalance: "0",
            txPending: false,
            txStep: 0,
            vaultBalance: "0",
            vaultContractAddress: "0x475C7B4dec01F9F524D96Ad1baB8c06558118A97",
            vaultLockPeriod: "0",
            vaults: [],
            vaultsLoaded: false,
            vaultOwner: null,
            vaultVestingPeriod: "0",
            vaultYieldRate: "0",
            vaultYieldReserve: "0"

        };
    },

    async created() {
        this.walletProvider.subscribe(this);
        await this.loadVaultContract();
        if (this.address && !this.account) {
            this.account = web3.utils.toChecksumAddress(this.address);
        }
    },

    watch: {
        account: async function() {
            if (this.account) {
                if (this.address && web3.utils.toChecksumAddress(this.address) != this.account) {
                    this.$router.push(`/vault/`);
                } 
                await this.loadUser();
            } else {
                this.vaults = [];
                this.vaultsLoaded = false;
            }
        },
        '$route': async function() {
            console.log("Address: " + this.$route.params.address);
            
            this.address = this.$route.params.address;
            if (this.address && !this.enabled) {
                this.account = web3.utils.toChecksumAddress(this.address);
            }
        },
    },

    methods: {
        async setMaxAmount() {
            if (this.enabled) {
                try {
                    this.amount = web3.utils.fromWei(this.tokenBalance);
                } catch (error) {
                    this.error = "Failed to get max balance: " + error.message;
                }
            }
        },

        async createVault() {
            this.error = null;
            this.txPending = true;
            this.pendingTx = true;
            this.txStep = 0;

            try {
                if (this.amount <= 0) {
                    throw new Error("Amount must be greater than 0");
                }

                if (this.amount > this.tokenBalance) {
                    throw new Error("Amount must be less than your balance");
                }

                const amountWei = web3.utils.toWei(this.amount.toString());

                // Check if we need to approve the token transfer
                let allowance = await this.callTokenMethod("allowance", [this.account, this.vaultContractAddress]);
                if (web3.utils.toBN(allowance).lt(web3.utils.toBN(amountWei))) {
                    let tx = await this.sendTokenTransaction("approve", [this.vaultContractAddress, amountWei]);
                    await MoonbeamWallet.isTxConfirmed(tx);
                }
                
                allowance = await this.callTokenMethod("allowance", [this.account, this.vaultContractAddress]);
                if (web3.utils.toBN(allowance).lt(web3.utils.toBN(amountWei))) {
                    throw new Error("Insufficient allowance");
                }

                // Create the vault transaction
                const tx = await this.sendVaultTransaction("createVestingContract", [amountWei]);
                this.txStep = 1;
                
                // Wait for confirmation
                if (tx) {
                    await MoonbeamWallet.isTxConfirmed(tx);
                    this.txStep = 2;
                    await this.awaitNewUserVault(this.vaults.length);
                    this.txStep = 3;
                }
            } catch (error) {
                this.error = "Transaction failed: " + error.message;
            } finally {
                this.txPending = false;
            }
        },

        async awaitNewUserVault(size) {
            await this.loadUserVaults();
            if (this.vaults.length == size) {
                await new Promise(resolve => {
                    setTimeout(resolve, 1000);
                    this.awaitNewUserVault(size);
                });
            }
        },

        async sendVaultTransaction(method, params) {
            const abi = yieldvaultAbi.find(m => m.name === method);
            if (!abi) {
                throw new Error(`Method ${method} not found in ABI`);
            }
            
            let [ok, ret] = await MoonbeamWallet.runTransaction('YieldVault.' + method, abi, this.vaultContractAddress, params);
            if (!ok) {
                throw new Error("Failed to send vault transaction: " + ret);
            }
            return ret;
        },

        async sendTokenTransaction(method, params) {
            const abi = erc20Abi.find(m => m.name === method);
            if (!abi) {
                throw new Error(`Method ${method} not found in ABI`);
            }

            let [ok, ret] = await MoonbeamWallet.runTransaction('Token.' + method, abi, this.tokenContractAddress, params);
            if (!ok) {
                throw new Error("Failed to send token transaction: " + ret);
            }
            return ret;
        },

        async callVaultMethod(method, params = []) {
            const abi = yieldvaultAbi.find(m => m.name === method);
            if (!abi) {
                throw new Error(`Method ${method} not found in ABI`);
            }
            
            let ret = await callMoonbeam(abi, this.vaultContractAddress, params);
            console.log("vault." + method + "() = " + ret);
            return ret;
        },

        async callVestingMethod(address, method, params = []) {
            const abi = vestingAbi.find(m => m.name === method);
            if (!abi) {
                throw new Error(`Method ${method} not found in ABI`);
            }
            
            let ret = await callMoonbeam(abi, address, params);
            console.log("vault." + method + "() = " + ret);
            return ret;
        },

        async callTokenMethod(method, params = []) {
            const abi = erc20Abi.find(m => m.name === method);
            if (!abi) {
                throw new Error(`Method ${method} not found in ABI`);
            }
            
            let ret = await callMoonbeam(abi, this.tokenContractAddress, params);
            console.log("token." + method + "() = " + ret);
            return ret;
        },

        async loadUser() {
            await this.loadUserVaults();
            this.tokenBalance = await this.callTokenMethod("balanceOf", [this.account]);
        },

        async loadVaultContract() {
            await this.loadTokenContract();
            // Convert to number safely using web3.utils.toBN
            this.vaultLockPeriod = web3.utils.toBN(await this.callVaultMethod("lockPeriod")).toNumber();
            this.vaultOwner = await this.callVaultMethod("owner");
            this.vaultVestingPeriod = web3.utils.toBN(await this.callVaultMethod("vestingPeriod")).toNumber();
            this.vaultYieldRate = web3.utils.toBN(await this.callVaultMethod("yieldRate"));
            this.vaultYieldReserve = web3.utils.toBN(await this.callVaultMethod("yieldReserve"));
        },

        async loadTokenContract() {
            this.tokenContractAddress = await this.callVaultMethod("token");
            this.tokenName = await this.callTokenMethod("name");
            this.tokenSymbol = await this.callTokenMethod("symbol");
            this.tokenDecimals = await this.callTokenMethod("decimals");
        },

        async loadUserVaults() {
            try {
                // Get the count of user's vaults
                const count = await this.callVaultMethod("getUserVestingContractsCount", [this.account]);
                
                if (count == 0) {
                    this.vaults = [];
                    this.vaultsLoaded = true;
                    return;
                }
                
                // Get the addresses of user's vaults
                const addresses = await this.callVaultMethod("getUserVestingContracts", [this.account]);
                
                // For each vault, get its details
                const vaults = [];
                for (const address of addresses) {
                    // You would need specific methods to get vault details
                    // This is a placeholder - you'll need to adapt based on your contract
                    const vaultDetails = await this.getVaultDetails(address);
                    vaults.push(vaultDetails);
                }
                
                this.vaults = vaults;
                this.vaultsLoaded = true;
            } catch (error) {
                this.error = "Failed to load vaults: " + error.message;
                this.vaultsLoaded = true;
            }
        },

        async getVaultDetails(address) {
            const lockEndTime = await this.callVestingMethod(address, "start");
            const startTime = Number(lockEndTime) - Number(this.vaultLockPeriod);
            const duration = await this.callVestingMethod(address, "duration");
            const endTime = Number(lockEndTime) + Number(duration);
            
            return {
                address: address,
                // These would be actual calls to the contract
                amount: await this.getVaultAmount(address),
                startTime: startTime,
                vestingStartTime: lockEndTime,
                endTime: endTime
            };
        },

        async getVaultAmount(address) {
            return await this.callTokenMethod("balanceOf", [address]);
        },

        formatAmount(amountWei) {
            return web3.utils.fromWei(amountWei);
        },

        formatDate(timestamp) {
            return new Date(timestamp * 1000).toLocaleString();
        },

        formatDuration(seconds) {
            const days = Math.floor(seconds / 86400);
            const hours = Math.floor((seconds % 86400) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            
            if (days > 0) {
                return `${days} day${days !== 1 ? 's' : ''}${hours > 0 ? ` ${hours} hr${hours !== 1 ? 's' : ''}` : ''}`;
            } else if (hours > 0) {
                return `${hours} hour${hours !== 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} min${minutes !== 1 ? 's' : ''}` : ''}`;
            } else {
                return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
            }
        },
        
        calculateProjectedYield() {
            if (!this.amount || isNaN(this.amount) || this.amount <= 0) {
                return "0";
            }
            
            const amountWei = web3.utils.toWei(this.amount.toString());
            // Calculate yield based on yield rate (which is stored as basis points)
            const yield = (BigInt(amountWei) * BigInt(this.vaultYieldRate)) / BigInt(10000);
            return this.formatAmount(yield.toString());
        },

        async retryTransaction() {
            this.error = null;
            this.txPending = false;
            this.pendingTx = false;
            this.txStep = 0;
        }
    }
});
</script> 