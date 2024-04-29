<template id="bridge">
    <div class="bridge prenet">
        <div class="title row">
            <h1>Bridge Account: <% account || "Not connected" %>
            </h1>
        </div>
        <div class="page-content">
            <div class="box"
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
        </div>
    </div>
</template>
<script>
var Bridge = Vue.component("bridge", {
    template: document.getElementById("bridge").innerHTML,
    delimiters: ["<%", "%>"],
    data: () => {
        return {
            account: null,
            enabled: false,
            amount: 0,
            error: null,
            balance: 0,
        };
    },

    created: function () {
        Wallet.subscribe(this);
    },
    methods: {
        async bridge() {
            const tx = await Wallet.runTransaction(
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
            console.log(tx);
        },
    },
});
</script>
