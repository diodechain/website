<template id="dashboard">
    <div class="dashboard prenet">
        <div class="title row">
            <h1>Epoch <% currentEpoch %> Dashboard</h1>
            <div class="subtitle">Registry Version <% registryVersion %></div>
        </div>
        <div class="page-content">
            <!-- Stats Summary -->
            <div class="stats-summary">
                <div class="stat-box">
                    <h3>Epoch Fleets</h3>
                    <div class="stat-value"><% fleets.length %></div>
                </div>
                <div class="stat-box">
                    <h3>Staked Fleet Balance</h3>
                    <div class="stat-value"><% totalBalance %> DIODE</div>
                </div>
                <div class="stat-box">
                    <h3>Total Bandwidth</h3>
                    <div class="stat-value"><% totalScore.div(web3.utils.toBN(1024*1024*1024*1024)).toString() %> TB</div>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="dashboard-grid">
                <!-- Left Column - Fleets -->
                <div class="fleet-column">
                    <h2>Active Fleets</h2>
                    <table class="scores">
                        <thead>
                            <tr>
                                <th>Fleet Address</th>
                                <th>Balance</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="fleet in fleets" :key="fleet.address">
                                <td>
                                    <a :href="'https://moonscan.io/address/' + fleet.address" target="_blank">
                                        <% formatAddr(fleet.address, 'full') %>
                                    </a>
                                </td>
                                <td><% valueToBalance(fleet.currentBalance) %></td>
                                <td><% formatNumber(fleet.score) %></td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Fleet Distribution Chart -->
                    <div class="chart-container">
                        <h3>Balance Distribution</h3>
                        <svg id="fleet-chart" width="100%" height="300">
                            <g :transform="'translate(' + width/3 + ',150)'">
                                <path v-for="(slice, index) in pieSlices" 
                                      :d="slice.path"
                                      :fill="getColor(index)"
                                      :key="index"
                                      @mouseover="showTooltip($event, slice)"
                                      @mouseout="hideTooltip()">
                                </path>
                            </g>
                        </svg>
                        <div class="tooltip" v-show="tooltipVisible" :style="tooltipStyle">
                            <div><% tooltipContent %></div>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Relay Nodes -->
                <div class="relay-column">
                    <h2>Relay Nodes</h2>
                    <table class="scores">
                        <thead>
                            <tr>
                                <th>Relay Address</th>
                                <th>Total Rewards</th>
                                <th>Fleet Scores</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="relay in relays" :key="relay.address">
                                <td>
                                    <a :href="'/network/#/node/' + relay.address" target="_blank">
                                        <% formatAddr(relay.address, 'full') %>
                                    </a>
                                </td>
                                <td><% valueToBalance(relay.rewards) %></td>
                                <td>
                                    <div v-for="score in relay.fleetScores" :key="score.fleet" class="fleet-score">
                                        <span class="fleet-label"><% formatAddr(score.fleet, 'short') %></span>
                                        <span class="score-value"><% formatNumber(score.score) %></span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var Dashboard = Vue.component("dashboard", {
    template: document.getElementById("dashboard").innerHTML,
    delimiters: ["<%", "%>"],
    data: () => {
        return {
            fleets: [],
            relays: [],
            totalBalance: 0,
            totalScore: web3.utils.toBN(0),
            registryVersion: '...',
            currentEpoch: '...',
            width: 600,
            height: 400,
            tooltipVisible: false,
            tooltipStyle: {
                left: '0px',
                top: '0px'
            },
            tooltipContent: '',
            colors: [
                '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
                '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
            ]
        }
    },

    computed: {
        pieSlices() {
            const total = this.fleets.reduce((sum, fleet) => 
                sum + web3.utils.fromWei(fleet.currentBalance), 0);
            
            let startAngle = 0;
            return this.fleets.map(fleet => {
                const value = web3.utils.fromWei(fleet.currentBalance);
                const angle = (value / total) * Math.PI * 2;
                
                const slice = this.calculateSlicePath(startAngle, startAngle + angle);
                startAngle += angle;
                
                return {
                    path: slice,
                    fleet: fleet,
                    percentage: ((value / total) * 100).toFixed(1)
                };
            });
        }
    },

    created: async function() {
        await this.loadData();
    },

    methods: {
        async loadData() {
            try {
                // Load version and epoch first
                this.registryVersion = await CallRegistry("Version", []);
                this.currentEpoch = await CallRegistry("Epoch", []);
                
                // Then load the rest of the data
                await this.loadFleets();
                await this.loadRelays();
            } catch (error) {
                console.error("Error loading registry data:", error);
            }
        },

        async loadFleets() {
            try {
                // Get fleet array
                console.log("Getting fleet array");
                const fleetAddresses = await CallRegistry("FleetArray", []);
                console.log(fleetAddresses);
                // Get details for each fleet
                const fleetPromises = fleetAddresses.map(address => 
                    CallRegistry("GetFleet", [address])
                );
                
                const fleetDetails = await Promise.all(fleetPromises);
                
                // Process fleet data
                this.fleets = fleetDetails.map((fleet, index) => ({
                    address: fleetAddresses[index],
                    exists: fleet.exists,
                    currentBalance: fleet.currentBalance,
                    withdrawRequestSize: fleet.withdrawRequestSize,
                    withdrawableBalance: fleet.withdrawableBalance,
                    currentEpoch: fleet.currentEpoch,
                    score: fleet.score
                }));

                // Calculate totals
                this.totalBalance = this.fleets.reduce((sum, fleet) => 
                    sum + web3.utils.fromWei(fleet.currentBalance), 0);
                this.totalScore = this.fleets.reduce((sum, fleet) => 
                    sum.add(web3.utils.toBN(fleet.score)), web3.utils.toBN(0));

            } catch (error) {
                console.error("Error loading fleet data:", error);
            }
        },

        async loadRelays() {
            try {
                // Get relay array
                const relayAddresses = await CallRegistry("RelayArray", []);
                console.log("Relays:", relayAddresses);

                // Get rewards and scores for each relay
                const relayData = await Promise.all(relayAddresses.map(async (address) => {
                    const rewards = await CallRegistry("RelayRewards", [address]);
                    
                    // Get scores from each fleet
                    const fleetScores = await Promise.all(this.fleets.map(async (fleet) => {
                        const nodeData = await CallRegistry("GetNode", [fleet.address, address]);
                        return {
                            fleet: fleet.address,
                            score: nodeData ? nodeData.score : '0'
                        };
                    }));

                    return {
                        address,
                        rewards,
                        fleetScores: fleetScores.filter(score => web3.utils.toBN(score.score).gt(web3.utils.toBN(0)))
                    };
                }));

                this.relays = relayData;
                console.log("Relay data:", this.relays);

            } catch (error) {
                console.error("Error loading relay data:", error);
            }
        },

        calculateSlicePath(startAngle, endAngle) {
            const radius = Math.min(this.width, this.height) / 3;
            const x1 = radius * Math.cos(startAngle);
            const y1 = radius * Math.sin(startAngle);
            const x2 = radius * Math.cos(endAngle);
            const y2 = radius * Math.sin(endAngle);
            
            const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
            
            return `M 0 0
                    L ${x1} ${y1}
                    A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
                    Z`;
        },

        getColor(index) {
            return this.colors[index % this.colors.length];
        },

        showTooltip(event, slice) {
            const rect = event.target.getBoundingClientRect();
            this.tooltipStyle = {
                left: `${event.clientX + 10}px`,
                top: `${event.clientY + 10}px`
            };
            this.tooltipContent = `
                Fleet: ${formatAddr(slice.fleet.address, 'full')}
                Balance: ${valueToBalance(slice.fleet.currentBalance)}
                Share: ${slice.percentage}%
            `;
            this.tooltipVisible = true;
        },

        hideTooltip() {
            this.tooltipVisible = false;
        },

        formatAddr(addr, mode, length) {
            return formatAddr(addr, mode, length);
        },
        valueToBalance(value) {
            return valueToBalance(value);
        },
        formatNumber(value) {
            return formatNumber(value);
        }
    }
});
</script>

<style scoped>
.dashboard { 

    .dashboard-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 30px;
        margin-top: 30px;
    }

    .fleet-column, .relay-column {
        background: #fff;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .fleet-column {
        min-width: 300px;
    }

    .relay-column {
        min-width: 600px;
    }

    .stats-summary {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin: 20px 0;
    }

    .stat-box {
        background: #fff;
        padding: 24px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: transform 0.2s;
    }

    .stat-box:hover {
        transform: translateY(-2px);
    }

    .stat-box h3 {
        color: #1a2942;
        margin-bottom: 10px;
        font-size: 1.1em;
    }

    .stat-value {
        font-size: 28px;
        font-weight: bold;
        color: #2c4167;
    }

    .chart-container {
        margin: 20px 0;
        position: relative;
        text-align: center;
    }

    .fleet-score {
        display: flex;
        justify-content: space-between;
        padding: 2px 0;
        font-size: 0.9em;
    }

    .fleet-label {
        margin-right: 10px;
    }

    .score-value {
        color: #2c3e50;
    }

    .tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 4px;
        font-size: 14px;
        pointer-events: none;
        z-index: 100;
        white-space: pre-line;
    }

    table.scores {
        width: 100%;
        margin-top: 10px;
        font-size: 0.9em;
        border-collapse: separate;
        border-spacing: 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    table.scores th {
        background: #1a2942;
        color: white;
        padding: 12px;
        text-align: left;
        font-weight: 600;
        letter-spacing: 0.5px;
        border-bottom: 2px solid #2c4167;
        text-transform: uppercase;
        font-size: 1.1em;
    }

    table.scores thead tr {
        background: #1a2942;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    table.scores td {
        padding: 12px;
        border-bottom: 1px solid #eee;
        background: #fff;
    }

    table.scores tr:last-child td {
        border-bottom: none;
    }

    table.scores tr:hover td {
        background: #f8f9fa;
    }

    h2 {
        margin: 0;
        color: #2c3e50;
        font-size: 1.5em;
    }

    h3 {
        color: #2c3e50;
        font-size: 1.2em;
    }

    .subtitle {
        color: #666;
        font-size: 0.8em;
        margin-left: 15px;
    }
}
</style> 