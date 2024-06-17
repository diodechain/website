<template id="diode_node">
    <div class="diode_node prenet">
        <div class="title row">
            <h1>Node: <% nodeid %></h1>
        </div>
        <div class="page-content">

        </div>
    </div>
</template>
<script>
var DiodeNode = Vue.component("diode_node", {
    template: document.getElementById("diode_node").innerHTML,
    delimiters: ["<%", "%>"],
    props: { nodeid: String },
    data: () => {
        return {
            amount: 0,
            error: null,
            moonbeam: new Web3("wss://moonbeam.api.onfinality.io/ws?apikey=49e8baf7-14c3-4d0f-916a-94abf1c4c14a")
        };
    },

    created() {
        this.updateNode(this.nodeid);
    },

    watch: {
        nodeid: async function () {
            await this.updateNode(nodeid);
        },
    },

    methods: {
        async updateNode(nodeid) {
            this.txBlock = null;
            this.txSender = "(loading)";
            this.txStep = 0;
            this.txsLength = await async_call(bridgeOutMethods["txsLength"], "0x2c303A315a1Ee4c377E28121BaF30146e229731b", [1284]);

            if (nodeid == null) return;
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
