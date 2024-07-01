<template id="diode_node">
    <div class="diode_node prenet">
        <div class="title row">
            <h1>Node: <% nodeid %>
            </h1>
        </div>
        <div class="page-content">
            <table class="node_stats">
                <tr>
                    <th>Balance</th>
                    <td v-if="typeof (balance) == 'string'">
                        <% balance %>
                    </td>
                    <td v-else>
                        <% valueToBalance(balance) %>
                    </td>
                </tr>
                <tr>
                    <th>IP</th>
                    <td v-if="typeof (node) == 'string'">
                        <% node %>
                    </td>
                    <td v-else>
                        <% node[1] %>:<% node[2] %>
                    </td>
                </tr>
                <tr>
                    <th>Version</th>
                    <td v-if="typeof (node) == 'string'">
                        <% node %>
                    </td>
                    <td v-else>
                        <% node[4] %>
                    </td>
                </tr>
                <tr>
                    <th>Nonce</th>
                    <td>
                        <% nonce %>
                    </td>
                </tr>
                <tr>
                    <th>Stake</th>
                    <td v-if="stake == 'loading'">
                        <% stake %>
                    </td>
                    <td v-else>
                        <% valueToBalance(stake) %>
                    </td>
                </tr>
                <tr>
                    <th>Connected Devices</th>
                    <td v-if="typeof (usage) == 'string'">
                        <% usage %>
                    </td>
                    <td v-else>
                        <% number(usage["devices"]) %>
                    </td>
                </tr>
                <tr>
                    <th>Epoch</th>
                    <td v-if="typeof (traffic) == 'string'">
                        <% traffic %>
                    </td>
                    <td v-else>
                        <% formatDateTime(number(traffic["epoch_time"]), 'date' ) %>
                            <% number(traffic["epoch"]) %>
                    </td>
                </tr>
                <tr>
                    <th>Epoch Fleets</th>
                    <td v-if="typeof (traffic) == 'string'">
                        <% traffic %>
                    </td>
                    <td v-else>
                        <table>
                            <tr>
                                <th>Fleet</th>
                                <th>Tickets</th>
                                <th>Bytes</th>
                                <th>Connections</th>
                                <th>Value</th>
                            </tr>
                            <tr v-for="fleet in traffic['fleets']">
                                <td>
                                    <% fleet["fleet"] %>
                                </td>
                                <td>
                                    <% number(fleet["total_tickets"]) %>
                                </td>
                                <td>
                                    <% number(fleet["total_bytes"]) %>
                                </td>
                                <td>
                                    <% number(fleet["total_connections"]) %>
                                </td>
                                <td>
                                    <% fleet["value"] %>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <th>Usage History</th>
                    <td v-if="typeof (usageHistory) == 'string'">
                        <% usageHistory %>
                    </td>
                    <td v-else>
                        <svg id="head" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1" font-family="Helvetica, Arial" width="760" height="401"
                            viewBox="-28 0 692 401"
                            >

                            <!-- image background -->
                            <rect id="imagebackground" x="0" y="0" width="692" height="401" stroke-width="1"
                                stroke="none" fill="white" />

                            <defs>
                                <!-- x-axis grid lines, vertical -->
                                <pattern id="x-gridline" x="0" y="0" height="350" width="83.333"
                                    patternUnits="userSpaceOnUse">
                                    <line x1="0" y1="0" x2="0" y2="350" class="gridline" />
                                </pattern>
                                <!-- y-axis grid lines, horizontal -->
                                <pattern id="y-gridline" x="0" y="0" height="21.875" width="500"
                                    patternUnits="userSpaceOnUse">
                                    <line x1="0" y1="0" x2="500" y2="0" class="gridline" />
                                </pattern>
                            </defs>

                            <g transform="scale(1, -1) translate(54, -362)">
                                <rect id="x-gridline-area" x="0" y="0" width="505" height="350"
                                    fill="url(#x-gridline)" />
                                <rect id="y-gridline-area" x="0" y="0" width="500" height="353.5"
                                    fill="url(#y-gridline)" />
                            </g>

                            <!-- == axis marks == -->

                            <defs>
                                <!-- x-axis mark -->
                                <pattern id="x-axismark-main" x="0" width="83.333" height="6"
                                    patternUnits="userSpaceOnUse">
                                    <line x1="0" y1="0" x2="0" y2="6" class="axismark-main" />
                                </pattern>

                                <!-- y-axis mark -->
                                <pattern id="y-axismark-main" y="0" width="6" height="21.875"
                                    patternUnits="userSpaceOnUse">
                                    <line x1="-1" y1="0" x2="6" y2="0" class="axismark-main" />
                                </pattern>
                            </defs>

                            <g transform="scale(1, -1) translate(54, -362)">
                                <rect id="x-axismark" x="0" y="-6" width="505" height="6"
                                    fill="url(#x-axismark-main)" />
                                <rect id="y-axismark" x="-6" y="0" width="6" height="353.5"
                                    fill="url(#y-axismark-main)" />
                            </g>

                            <!-- == axis texts == -->

                            <g id="axis-x-values" class="axisnumber-x" transform="translate(54, 389)"
                                text-anchor="middle">
                                <text v-for="i in [...Array(7).keys()]" :x="chart.scale(0, 500, i/6)"><% chart.time(i/6) %></text>
                            </g>

                            <g id="axis-y-values" class="axisnumber-y" transform="translate(42, 367)" text-anchor="end">
                                <text v-for="i in [...Array(17).keys()]" :y="-chart.scale(0, 350, i/16)"><% chart.value(i/16) %></text>
                            </g>
                            <g id="axis-y-values2" class="axisnumber-y" transform="translate(554, 367)" text-anchor="start">
                                <text v-for="i in [...Array(17).keys()]" :y="-chart.scale(0, 350, i/16)"><% deviceChart.value(i/16) %></text>
                            </g>


                            <!-- == graph bars and lines == -->

                            <g id="graphs" transform="scale(1, -1) translate(54, -362)">
                                <polyline id="graph2" class="series-lines-general series2" :points="chart.points" />
                                <polyline id="graph1" class="series-lines-general series1" :points="deviceChart.points" />
                            </g>

                            <!-- == axis lines == -->

                            <g transform="scale(1, -1) translate(54, -362)">
                                <line id="x-axis" x1="0" y1="0" x2="500" y2="0" class="axisline-x" />
                                <line id="y-axis" x1="0" y1="0" x2="0" y2="350" class="axisline-y" />
                            </g>

                            <!-- == legend == -->

                            <g id="legend" transform="translate(563, 47)">
                                <rect id="legend-background" class="legendbox" x="0" y="0" width="123" height="54" />

                                <polyline id="legend-line1" class="series-lines-general series1"
                                    transform="scale(1, -1)" points="6,-14 21,-14 36,-14" />
                                <text id="legend-text1" class="legendtext" x="42" y="21">Devices</text>

                                <polyline id="legend-line2" class="series-lines-general series2"
                                    transform="scale(1, -1)" points="6,-35 21,-35 36,-35" />
                                <text id="legend-text2" class="legendtext" x="42" y="42">Bandwidth</text>
                            </g>

                        </svg>
                    </td>
                </tr>
            </table>
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
            balance: 'loading',
            node: 'loading',
            node: 'loading',
            nonce: 'loading',
            stake: 'loading',
            usageHistory: 'loading',
            usage: 'loading',
            traffic: 'loading',
            // moonbeam: new Web3("wss://moonbeam.api.onfinality.io/ws?apikey=49e8baf7-14c3-4d0f-916a-94abf1c4c14a")
        };
    },

    created: async function () {
        this.nodeid = await web3.eth.getCoinbase()
        this.updateNode(this.nodeid);
    },

    watch: {
        // nodeid: async function () {
        //     await this.updateNode(nodeid);
        // },
    },

    methods: {
        number(hex) {
            return web3.utils.hexToNumber(hex)
        },

        async updateNode(nodeid) {
            this.balance = await web3.eth.getBalance(nodeid);
            this.node = await web3.eth.getNode(nodeid);
            this.nonce = await web3.eth.getTransactionCount(nodeid);
            this.stake = await async_call(registryMethods['MinerValue'], Registry, [0, nodeid])

            from = Math.floor(Date.now() / 1000) - (60 * 60 * 8);
            to = Math.floor(Date.now() / 1000);
            this.usage = await web3.eth.usage();
            this.traffic = await web3.eth.traffic(15);
            console.log(this.traffic);
            let usageHistory = Object.entries(await web3.eth.usageHistory(from, to, 60 * 5)).sort();
            let chartData = usageHistory.map(([time, value]) => ({time, value: this.number(value["edge_traffic_in"]) + this.number(value["edge_traffic_out"])}));
            this.chart = {
                maxTime: Math.max(...chartData.map(({time}) => time)),
                minTime: Math.min(...chartData.map(({time}) => time)),
                maxValue: Math.max(...chartData.map(({value}) => value)) * 1.1,
                minValue: 0,
                data: chartData,
                time: (p) => formatTime(this.chart.scale(this.chart.minTime, this.chart.maxTime, p), 'time'),
                value: (p) => Math.round(this.chart.scale(this.chart.minValue, this.chart.maxValue, p) / 10000) + ' KB/s',
                scale: (min, max, p) => min + (max - min) * p,
            }

            this.chart.points = this.chart.data.map(({time, value}) => {
                let x = this.chart.scale(0, 500, (time - this.chart.minTime) / (this.chart.maxTime - this.chart.minTime));
                let y = this.chart.scale(0, 350, (value - this.chart.minValue) / (this.chart.maxValue - this.chart.minValue));
                return `${x},${y}`;
            }).join('\n');

            let deviceData = usageHistory.map(([time, value]) => ({time, value: value["devices"]}));
            this.deviceChart = {
                maxValue: Math.max(...deviceData.map(({value}) => value)) * 1.1,
                minValue: 0,
                value: (p) => Math.round(this.chart.scale(this.deviceChart.minValue, this.deviceChart.maxValue, p)),
            }

            this.deviceChart.points = deviceData.map(({time, value}) => {
                let x = this.chart.scale(0, 500, (time - this.chart.minTime) / (this.chart.maxTime - this.chart.minTime));
                let y = this.chart.scale(0, 350, (value - this.deviceChart.minValue) / (this.deviceChart.maxValue - this.deviceChart.minValue));
                return `${x},${y}`;
            }).join('\n');

            this.usageHistory = usageHistory;
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
        },
    },
});
</script>
