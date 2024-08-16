<template id="diode_node">
    <div class="diode_node prenet">
        <div class="title row">
            <h1>Node: <% nodeid %></h1>
            <h3 v-if="node == 'invalid'"> - Invalid node address</h3>
        </div>
        <div v-if="node != 'invalid'" class="page-content">
            <div style="display: flex">
                <div class="headtable" style="width: 45%;">
                    <div class="doclet">
                        <h2>Name</h2>
                        <div style="margin-top: 11px">
                            <% name %>
                        </div>
                    </div>
                    <div class="doclet">
                        <h2>Version</h2>
                        <div style="margin-top: 11px" v-if="typeof (node) != 'string'">
                            <% node[4] %>
                        </div>
                    </div>
                    <div class="doclet">
                        <h2>Address</h2>
                        <div style="margin-top: 11px">
                            <% nodeid %>
                        </div>
                    </div>
                    <div class="doclet">
                        <h2>Primary Edge Address</h2>
                        <div style="margin-top: 11px" v-if="typeof (node) != 'string'">
                            <% node[1] %>:<% number(node[2]) %>
                        </div>
                    </div>
                    <div class="doclet">
                        <h2>Epoch</h2>
                        <div style="margin-top: 11px" v-if="typeof (traffic) != 'string'">
                            <% formatDateTime(number(traffic["epoch_time"]), 'date' ) %>
                                <% number(traffic["epoch"]) %>
                        </div>
                    </div>
                    <div class="doclet">
                        <h2>Balance</h2>
                        <div class="link"><a target="_blank" :href="'https://moonscan.io/token/0x434116a99619f2B465A137199C38c1Aab0353913?a=' + nodeid" class="no-decoration">
                            <% balance %>
                        </a></div>
                    </div>
                    <div class="doclet">
                        <h2>Uptime</h2>
                        <div style="margin-top: 11px">
                            <nobr><% uptime %></nobr>
                        </div>
                    </div>
                </div>
                <div class="headtable" style="width: 55%">
                    <svg v-if="typeof (usageHistory) != 'string'" id="head" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" font-family="Helvetica, Arial"
                        width="750" height="391" viewBox="-65 -35 672 436">

                        <!-- image background -->
                        <rect id="imagebackground" x="-75" y="0" width="682" height="391" stroke-width="1" stroke="none"
                            fill="white" />

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
                            <rect id="x-gridline-area" x="0" y="0" width="505" height="350" fill="url(#x-gridline)" />
                            <rect id="y-gridline-area" x="0" y="0" width="500" height="353.5" fill="url(#y-gridline)" />
                        </g>

                        <!-- == axis marks == -->

                        <defs>
                            <!-- x-axis mark -->
                            <pattern id="x-axismark-main" x="0" width="83.333" height="6" patternUnits="userSpaceOnUse">
                                <line x1="0" y1="0" x2="0" y2="6" class="axismark-main" />
                            </pattern>

                            <!-- y-axis mark -->
                            <pattern id="y-axismark-main" y="0" width="6" height="21.875" patternUnits="userSpaceOnUse">
                                <line x1="-1" y1="0" x2="6" y2="0" class="axismark-main" />
                            </pattern>
                        </defs>

                        <g transform="scale(1, -1) translate(54, -362)">
                            <rect id="x-axismark" x="0" y="-6" width="505" height="6" fill="url(#x-axismark-main)" />
                            <rect id="y-axismark" x="-6" y="0" width="6" height="353.5" fill="url(#y-axismark-main)" />
                        </g>

                        <!-- == axis texts == -->

                        <g id="axis-x-values" class="axisnumber-x" transform="translate(54, 389)" text-anchor="middle">
                            <text v-for=" i  in  [...Array(7).keys()] " :x="chart.scale(0, 500, i / 6)">
                                <% chart.time(i/6) %>
                            </text>
                        </g>

                        <g id="axis-y-values" class="axisnumber-y" transform="translate(42, 367)" text-anchor="end">
                            <text v-for=" i  in  [...Array(17).keys()] " :y="-chart.scale(0, 350, i / 16)">
                                <% chart.value(i/16) %>
                            </text>
                        </g>
                        <g id="axis-y-values2" class="axisnumber-y" transform="translate(561, 367)" text-anchor="start">
                            <text v-for=" i  in  [...Array(17).keys()] " :y="-chart.scale(0, 350, i / 16)">
                                <% deviceChart.value(i/16) %>
                            </text>
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

                        <g id="legend" transform="translate(250, -25)">
                            <rect id="legend-background" class="legendbox" x="0" y="0" width="126" height="54" />

                            <polyline id="legend-line1" class="series-lines-general series1" transform="scale(1, -1)"
                                points="6,-14 21,-14 36,-14" />
                            <text id="legend-text1" class="legendtext" x="42" y="21">Devices</text>

                            <polyline id="legend-line2" class="series-lines-general series2" transform="scale(1, -1)"
                                points="6,-35 21,-35 36,-35" />
                            <text id="legend-text2" class="legendtext" x="42" y="42">Bandwidth</text>
                        </g>
                    </svg>
                </div>
            </div>

            <div v-if="typeof (traffic) != 'string' && prev_traffic != null">
                <table class="data">
                    <caption>Current Epoch Fleet Activity</caption>
                    <tr>
                        <th>Fleet</th>
                        <th>Devices</th>
                        <th>Ticket Score</th>
                        <th>Fleet Score</th>
                        <th>Estimated Reward</th>
                    </tr>
                    <tr v-for="fleet in traffic['fleets'] ">
                        <td>
                            <% fleet["fleet"] %>
                        </td>
                        <td>
                            <% number(fleet.total_tickets) %>
                        </td>
                        <td>
                            <% bn(fleet.total_score).toString() %>
                        </td>
                        <td>
                            <% fleet_score(fleet) %>
                        </td>
                        <td v-if="last_score(fleet).gt(bn(fleet.total_score))">
                            <% estimated_value(fleet) %> *Estimate based on previous epoch
                        </td>
                        <td v-else>
                            <% estimated_value(fleet) %> *Estimate is inaccurate as the previous epoch showed
                                much less or no activity
                        </td>
                    </tr>
                </table>
            </div>
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
            nodeid: this.nodeid,
            usageHistory: 'loading',
            usage: 'loading',
            traffic: 'loading',
            uptime: 'loading',
            name: this.nodeid,
            prev_traffic: null,
            // moonbeam: new Web3("wss://moonbeam.api.onfinality.io/ws?apikey=49e8baf7-14c3-4d0f-916a-94abf1c4c14a")
        };
    },

    created: async function () {
        this.updateNode(this.nodeid);
    },

    watch: {
        nodeid: async function () {
            await this.updateNode(this.nodeid);
        },
    },

    methods: {
        number(hex) { return web3.utils.hexToNumber(hex) },
        bn(hex) { return web3.utils.toBN(hex) },
        last_score(fleet) {
            let id = fleet["fleet"]
            let prev_fleet = this.prev_traffic["fleets"][id]
            if (prev_fleet) {
                return this.bn(prev_fleet["state"]["score"])
            } else {
                return this.bn(0)
            }
        },

        fleet_score(fleet) {
            let score = this.bn(fleet["state"]["score"])
            return web3.utils.BN.max(score, this.last_score(fleet))
        },

        estimated_value(fleet) {
            let score = this.fleet_score(fleet)
            let total_score = this.bn(fleet["total_score"])
            if (total_score.gt(score)) {
                // If the score of all collected tickets is higher than the fleet score
                // then the estimate is basically garbage - we're reducing the output
                total_score = score.div(this.bn(6))
            }
            let estimate = total_score.mul(this.bn(fleet["state"]["currentBalance"])).div(score.mul(this.bn(100)));
            let percentage = total_score.mul(this.bn(100)).div(score).toString()
            return valueToBalance(estimate) + " (" + percentage + "%)"
        },

        async updateNode(nodeid) {
            if (web3.utils.isAddress(nodeid)) {
                await this.doUpdateNode(nodeid);
            } else {
                this.balance = 'invalid';
                this.node = 'invalid';
                this.usage = 'invalid';
                this.traffic = 'invalid';
                this.prev_traffic = 'invalid';
            }
        },

        async doUpdateNode(nodeid) {
            console.log("Updating node", nodeid);
            this.balance = await web3.eth.getBalance(nodeid);
            let node = await web3.eth.getNode(nodeid);
            let extra = {};

            if (node) {
                this.node = node;
                for (let [key, value] of node[5]) {
                    extra[key] = value;
                }
                console.log(extra)
            } else {
                this.node = 'unable to load';
            }

            let from = Math.floor(Date.now() / 1000) - (60 * 60 * 8)
            let to = Math.floor(Date.now() / 1000)

            let usage = await web3.eth.usage(nodeid)
            if (usage && usage["uptime"] != null) {
                let seconds = Math.floor(this.number(usage["uptime"])/1000)
                this.uptime = uptime(seconds)
            } else {
                this.uptime = 'unable to load';
            }

            if (usage && usage["name"] != null) {
                this.name = usage["name"];
            } else {
                this.uptime = extra["name"] || 'unable to load';
            }

            let traffic = await web3.eth.traffic(nodeid, 1284);
            if (traffic) {
                this.traffic = traffic;
            } else {
                this.traffic = 'unable to load';
            }

            let prev_traffic = await web3.eth.traffic2(nodeid, 1284, this.number(this.traffic["epoch"]) - 1)
            if (prev_traffic) {
                this.prev_traffic = prev_traffic;
            } else {
                this.prev_traffic = null;
                return;
            }

            let usageHistory = Object.entries(await web3.eth.usageHistory(nodeid, from, to, 60 * 5)).sort();
            console.log(usageHistory)
            let chartData = usageHistory.map(([time, value]) => ({ time, value: this.number(value["edge_traffic_in"]) + this.number(value["edge_traffic_out"]) }));
            this.chart = {
                maxTime: Math.max(...chartData.map(({ time }) => time)),
                minTime: Math.min(...chartData.map(({ time }) => time)),
                maxValue: Math.max(...chartData.map(({ value }) => value)) * 1.1,
                minValue: 0,
                data: chartData,
                time: (p) => formatTime(this.chart.scale(this.chart.minTime, this.chart.maxTime, p), 'time'),
                value: (p) => Math.round(this.chart.scale(this.chart.minValue, this.chart.maxValue, p) / 10000) + ' KB/s',
                scale: (min, max, p) => min + (max - min) * p,
            }

            this.chart.points = this.chart.data.map(({ time, value }) => {
                let x = this.chart.scale(0, 500, (time - this.chart.minTime) / (this.chart.maxTime - this.chart.minTime));
                let y = this.chart.scale(0, 350, (value - this.chart.minValue) / (this.chart.maxValue - this.chart.minValue));
                return `${x},${y}`;
            }).join('\n');

            let deviceData = usageHistory.map(([time, value]) => ({ time, value: value["devices"] }));
            this.deviceChart = {
                maxValue: Math.max(...deviceData.map(({ value }) => value)) * 1.1,
                minValue: 0,
                value: (p) => Math.round(this.chart.scale(this.deviceChart.minValue, this.deviceChart.maxValue, p)),
            }

            this.deviceChart.points = deviceData.map(({ time, value }) => {
                let x = this.chart.scale(0, 500, (time - this.chart.minTime) / (this.chart.maxTime - this.chart.minTime));
                let y = this.chart.scale(0, 350, (value - this.deviceChart.minValue) / (this.deviceChart.maxValue - this.deviceChart.minValue));
                return `${x},${y}`;
            }).join('\n');

            this.usageHistory = usageHistory;
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
