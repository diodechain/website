<template id="bridge">
    <div class="bridge prenet">
        <div class="title row">
            <h1>Bridge Account: <% account || "Connect MetaMask" %>
            </h1>
        </div>
        <div class="page-content">
            <div v-if="txid == null" class="box"
                style="width: 600px; background-color: aliceblue; border: 1px solid black; margin: 2em auto auto auto; padding: 1em;">
                <div class="box-header">
                    <h3 class="box-title">Diode L1 => Moonbeam</h3>
                </div>

                <!-- Form showing Diode -> Moonbeam and allow to enter amount -->
                <form>
                    <label for="amount">You send</label>
                    <div style="position: relative">
                        <input type="number" step="0.1" id="amount_in" v-model="amount" class="form-control"
                            placeholder="Enter amount" />
                        <button style="position: absolute; transform: translate(-200%,0%);" class="button"
                            v-on:click="amount = web3.utils.fromWei(Wallet.balance)">Max</button>
                    </div>
                    <label for="amount">Destination receives</label>
                    <input type="text" id="amount_out" disabled :value="amount + ' DIODE'" />

                    <label for="destination">You send to</label>
                    <div style="position: relative">
                        <input :disabled="samedestination" step="0.1" id="destination" v-model="destination" class="form-control"
                            placeholder="Destination" />
                        <div style="display: inline-flex; position: absolute; transform: translate(-110%,25%);">
                            <input id="samedestination" type="checkbox" class="button" v-model="samedestination" />
                            <label for="samedestination">Yourself</label>
                        </div>
                    </div>
                    
                    <button v-if="enabled" v-on:click="bridge()" class="button" :disabled="pending" style="display: flex; align-items: center;">
                        <span v-if="txStep == 0">Bridge</span>
                        <span v-else-if="txStep == 1">Signing</span>
                        <span v-else-if="txStep == 2">Confirming</span>
                        <span v-else-if="txStep == 3">Awaiting</span>
                        <span v-else>Complete</span>
                        <div v-if="pending" class="spinner"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg></div>
                    </button>
                    <button v-else v-on:click="Wallet.enable()" class="button">Connect Wallet</button>
                    <div v-if="error" v-html="error" class="error"></div>
                </form>
            </div>

            <div style="margin: 2em auto auto; width: 80%" v-else>
                <h3>Transaction: <% txid %>
                </h3>
                <p>Sender: <% txSender %>
                <p>Destination: <% txDestination %>
                <p>Amount: <% valueToBalance(txAmount) %>
                </p>
                <div v-if="error" v-html="error" class="error"></div>

                <div class="progress" style="margin: 2em auto auto;">

                    <div class="progress-track"></div>

                    <div id="step1"
                        :class="{ 'progress-step': true, 'is-complete': 0 < txStep, 'is-active': 0 == txStep }">
                        Sign Transaction
                    </div>

                    <div id="step2"
                        :class="{ 'progress-step': true, 'is-complete': 1 < txStep, 'is-active': 1 == txStep }">
                        Transaction Confirmed
                    </div>

                    <div id="step3"
                        :class="{ 'progress-step': true, 'is-complete': 2 < txStep, 'is-active': 2 == txStep }">
                        Awaiting Bridge Confirmation (Delay: <% txPending %>)
                    </div>

                    <div id="step4"
                        :class="{ 'progress-step': true, 'is-complete': 3 < txStep, 'is-active': 3 == txStep }">
                        Complete
                    </div>
                </div>

                <div v-if="txStep == 4" class="box"
                    style="width: 600px; background-color: aliceblue; border: 1px solid black; margin: 2em auto auto auto; padding: 1em;">
                    <a :href="'https://moonbeam.moonscan.io/token/0x434116a99619f2B465A137199C38c1Aab0353913?a=' + this.tx[0]">See on Moonscan</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var Bridge = Vue.component("bridge", {
    template: document.getElementById("bridge").innerHTML,
    delimiters: ["<%", "%>"],
    props: { txid: Number },
    data: () => {
        return {
            samedestination: true,
            destination: null,
            account: null,
            enabled: false,
            amount: 0,
            error: null,
            balance: 0,
            pending: false,
            txBlock: null,
            txStep: 0,
            txPending: 50,
            txSender: "(loading)"
        };
    },

    created() {
        Wallet.subscribe(this);
        this.updateTxid(this.txid);
    },

    watch: {
        txid: async function (txid) {
            await this.updateTxid(txid);
        },
        account: async function () {
            this.samedestination = true;
            this.destination = this.account || "Connect MetaMask";
        },
        samedestination: async function () {
            if (this.samedestination) {
                this.destination = this.account || "Connect MetaMask";
            } else {
                this.destination = "";
            }
        }
    },

    methods: {
        async updateTxid(txid) {
            this.txBlock = null;
            this.txSender = "(loading)";
            this.txStep = 0;
            this.txsLength = await async_call(bridgeOutMethods["txsLength"], "0x2c303A315a1Ee4c377E28121BaF30146e229731b", [1284]);

            if (txid == null) return;
            if (txid >= this.txsLength) {
                this.error = "Invalid bridge transaction number";
                return;
            }

            this.txStep = 2;
            this.tx = await async_call(bridgeOutMethods["txsAt"], "0x2c303A315a1Ee4c377E28121BaF30146e229731b", [1284, txid]);
            this.txBlock = Number(this.tx[4]);
            this.txSender = this.tx[0];
            this.txDestination = this.tx[1];
            this.txAmount = this.tx[2];
            this.currentBlock = await web3.eth.getBlockNumber();
            await this.updateTxPending();
        },

        async updateTxPending() {
            let txPending = Math.max(50 - (this.currentBlock - this.txBlock), 0);
            if (txPending > 0) {
                setTimeout(() => { this.updateTxPending() }, 15000);
            }
            this.txPending = "~" + Math.floor(txPending * 12 / 60) + " minutes";
            console.log("currentBlock", this.currentBlock, "txBlock", this.txBlock, "txPending", this.txPending);

            let moonLen = await this.callBridge("inTxsLength", [15]);
            if (moonLen > this.txid) {
                let moonTx = await this.callBridge("inTxsAt", [15, this.txid]);
                console.log(moonTx.historyHash, this.tx[5]);
                if (moonTx.historyHash == this.tx[5]) {
                    this.txStep = 4;
                } else {
                    this.error = "Bridge transaction history hash mismatch";
                }
            }

        },

        async bridge() {
            this.error = null;
            this.pending = true;
            try {
                await this.doBridge();
            } catch (error) {
                this.error = error;
                // pass
            }
            this.pending = false;
        },

        async doBridge() {
            if (this.amount < 0.1) {
                this.error = "Amount must be greater than 0.1";
                return;
            }
            if (!web3.utils.isAddress(this.destination)) {
                this.error = "Invalid destination address";
                return;
            }
            let [ok, ret] = await Wallet.runTransaction(
                "bridgeOut",
                {
                    name: "bridgeOut",
                    type: "function",
                    inputs: [{ type: "address", name: "destination" }, { type: "uint256", name: "destinationChain" }]
                },
                "0x2c303A315a1Ee4c377E28121BaF30146e229731b",
                [this.destination, 1284],
                web3.utils.numberToHex(web3.utils.toWei(this.amount))
            );

            if (ok) {
                this.txStep = 1;
                this.txsLength = await async_call(bridgeOutMethods["txsLength"], "0x2c303A315a1Ee4c377E28121BaF30146e229731b", [1284]);
                let confirmed = await Wallet.isTxConfirmed(ret);
                if (confirmed) {
                    let newTxsLength = await async_call(bridgeOutMethods["txsLength"], "0x2c303A315a1Ee4c377E28121BaF30146e229731b", [1284]);
                    if (newTxsLength > this.txsLength) {
                        this.txid = newTxsLength - 1;
                        router.push('/bridge/' + this.txid);
                    }
                } else {
                    this.error = "Transaction not confirmed";
                }
            } else {
                this.error = ret;
            }
        },

        async callBridge(method, params) {
            let abi = bridgeInMethods[method];
            return await callMoonbeam(abi, "0xA32a9eD71fBF22e6D197c13725Ad61958e9a4499", params);
        }
    },
});
</script>
