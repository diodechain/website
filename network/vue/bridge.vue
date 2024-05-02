<template id="bridge">
    <div class="bridge prenet">
        <div class="title row">
            <h1>Bridge Account: <% account || "Not connected" %>
            </h1>
        </div>
        <div class="page-content">
            <div v-if="txid == null" class="box"
                style="width: 600px; background-color: aliceblue; border: 3px solid gray; border-radius: 15px; margin: 2em auto auto auto; padding: 1em;">
                <div class="box-header">
                    <h3 class="box-title">Diode L1 => Moonbeam</h3>
                </div>

                <!-- Form showing Diode -> Moonbeam and allow to enter amount -->
                <form>
                    <label for="amount">You send</label>
                    <div style="position: relative">
                        <input type="number" step="0.1" id="amount_in" v-model="amount" class="form-control"
                            placeholder="Enter amount" />
                        <button style="position: absolute; transform: translate(-200%,50%);" class="button"
                            v-on:click="amount = web3.utils.fromWei(Wallet.balance)">Max</button>
                    </div>
                    <label for="amount">You receive</label>
                    <input type="text" id="amount_out" disabled :value="amount + ' DIODE'" />

                    <button v-if="enabled" v-on:click="bridge()" class="button">Bridge</button>
                    <button v-else v-on:click="Wallet.enable()" class="button">Connect Wallet</button>
                    <div v-if="error" v-html="error" class="error"></div>
                </form>
            </div>

            <div style="margin: 2em auto auto; width: 80%" v-else>
                <h3>Transaction: <% txid %>
                </h3>
                <p>Sender: <% txSender %>
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
                    style="width: 600px; background-color: aliceblue; border: 3px solid gray; border-radius: 15px; margin: 2em auto auto auto; padding: 1em;">
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
            account: null,
            enabled: false,
            amount: 0,
            error: null,
            balance: 0,
            txBlock: null,
            txStep: 0,
            txPending: 50,
            txSender: "(loading)",
            moonbeam: new Web3("wss://moonbeam.api.onfinality.io/ws?apikey=49e8baf7-14c3-4d0f-916a-94abf1c4c14a")
        };
    },

    created() {
        Wallet.subscribe(this);
        this.updateTxid(this.txid);
    },

    watch: {
        txid: async function (txid) {
            await this.updateTxid(txid);
        }
    },

    methods: {
        async updateTxid(txid) {
            this.txBlock = null;
            this.txSender = "(loading)";
            this.txStep = 0;
            this.txsLength = await async_call(bridgeOutMethods["txsLength"], "0x2c303A315a1Ee4c377E28121BaF30146e229731b", [1284]);

            if (txid == null || txid >= this.txsLength) {
                this.error = "Invalid bridge transaction number";
                return;
            }

            this.txStep = 2;
            this.tx = await async_call(bridgeOutMethods["txsAt"], "0x2c303A315a1Ee4c377E28121BaF30146e229731b", [1284, txid]);
            this.txBlock = Number(this.tx[4]);
            this.txSender = this.tx[0];
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

            let moonLen = await this.callMoonbeam("inTxsLength", [15]);
            if (moonLen > this.txid) {
                let moonTx = await this.callMoonbeam("inTxsAt", [15, this.txid]);
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
            if (this.amount < 0.1) {
                this.error = "Amount must be greater than 0.1";
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
                [this.account, 1284],
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

        async callMoonbeam(method, params) {
            let abi = bridgeInMethods[method];
            let call = this.moonbeam.eth.abi.encodeFunctionCall(abi, params)
            let data = await this.moonbeam.eth.call({
                to: "0xA32a9eD71fBF22e6D197c13725Ad61958e9a4499",
                data: call,
                gasPrice: 0
            })

            if (abi.outputs) {
                if (abi.outputs[0].components) {
                    data = this.moonbeam.eth.abi.decodeParameters(abi.outputs[0].components, data);
                } else {
                    data = this.moonbeam.eth.abi.decodeParameter(abi.outputs[0], data);
                }
            }
            return data;
        }
    },
});
</script>
