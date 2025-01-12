<template id="bridge_list">
    <div class="bridge_list prenet">
        <div class="title row">
            <h1>Bridge Transaction List</h1>
        </div>
        <div class="page-content">
            <table>
                <tr>
                    <th>Id</th>
                    <th>Timestamp</th>
                    <th>Sender</th>
                    <th>Destination</th>
                    <th>Amount</th>
                </tr>
                <tr v-for="tx in txs" style="margin: 2em auto auto; width: 80%">
                    <td><% tx.txid %></td>
                    <td><% formatDateTime(tx.timestamp, 'date') %></td>
                    <td><% tx.sender %></td>
                    <td><% tx.destination %></td>
                    <td>
                        <a :href="'https://moonbeam.moonscan.io/token/0x434116a99619f2B465A137199C38c1Aab0353913?a=' + tx.destination">
                            <% valueToBalance(tx.amount) %>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
        </div>
    </div>
</template>
<script>
var BridgeList = Vue.component("bridge_list", {
    template: document.getElementById("bridge_list").innerHTML,
    delimiters: ["<%", "%>"],
    data: () => {
        return {
            txs: [],
            error: null,
        };
    },

    created() {
        this.updateTxs();
    },

    methods: {
        async updateTxs() {
            this.txsLength = await async_call(bridgeOutMethods["txsLength"], "0x2c303A315a1Ee4c377E28121BaF30146e229731b", [1284]);

            this.txs = [];
            for (let i = this.txsLength; i > 0; i--) {
                let ret = await async_call(bridgeOutMethods["txsAt"], "0x2c303A315a1Ee4c377E28121BaF30146e229731b", [1284, i - 1]);
                let tx = {
                    txid: i,
                    sender: ret[0],
                    destination: ret[1],
                    amount: ret[2],
                    timestamp: ret[3],
                };
                console.log(tx);
                this.txs.push(tx);
            }
        },
    },
});
</script>
