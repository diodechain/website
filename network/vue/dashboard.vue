<template id="dashboard">
    <div class="dashboard prenet">
        <div class="title row">
            <h1>Epoch <span v-if="currentEpoch === '...'" class="loading-state">Loading</span><span v-else><% currentEpoch %></span> Dashboard</h1>
            <div class="subtitle">Registry Version <span v-if="registryVersion === '...'" class="loading-state">Loading</span><span v-else><% registryVersion %></span></div>
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
                    <div class="stat-value"><% formatBalance(totalBalance) %> DIODE</div>
                </div>
                <!--div class="stat-box">
                    <h3>Total Bandwidth</h3>
                    <div class="stat-value"><% formatBandwidth(totalScore) %></div>
                </div-->
            </div>

            <!-- Main Content Grid -->
            <div class="dashboard-grid">
                <!-- Left Column - Fleets -->
                <div class="fleet-column">
                    <h2>Active Fleets</h2>
                    <table class="scores">
                        <thead>
                            <tr>
                                <th>Fleet</th>
                                <th>Staked Balance</th>
                                <!--<th>Score</th>-->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="fleet in fleets" :key="fleet.address">
                                <td style="display: flex; align-items: center; gap: 10px; overflow: clip;">
                                    <img v-if="fleet.icon" :src="'network/' + fleet.icon" class="fleet-icon" style="width: 2em;"/>
                                    <a :href="'https://moonscan.io/address/' + fleet.address" target="_blank">
                                        <% fleet.name %>
                                    </a>
                                </td>
                                <td><% valueToBalance(fleet.currentBalance) %></td>
                                <!--<td><% formatNumber(fleet.score) %></td>-->
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Right Column - Relay Nodes -->
                <!-- div class="relay-column">
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
                </div -->
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
                    score: fleet.score,
                    icon: getFleet(fleetAddresses[index]).icon,
                    name: getFleet(fleetAddresses[index]).name
                })).sort((a, b) => b.currentBalance - a.currentBalance);

                // Calculate totals
                let totalBalance = this.fleets.reduce((sum, fleet) => 
                    sum.add(web3.utils.toBN(fleet.currentBalance)), web3.utils.toBN(0));
                
                this.totalBalance = web3.utils.fromWei(totalBalance.toString());

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
        },
        formatBalance(value) {
            // Format large numbers with proper thousands separators
            const num = parseFloat(value);
            if (num >= 1000000) {
                return (num / 1000000).toFixed(2) + 'M';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num.toFixed(2);
        },
        formatBandwidth(totalScore) {
            try {
                // Simple, safe calculation: divide by 1024^4 for TB
                const tb = totalScore.div(web3.utils.toBN(1024*1024*1024*1024));
                
                if (tb.gt(web3.utils.toBN(0))) {
                    // Use formatNumber for comma formatting
                    return this.formatNumber(tb.toString()) + ' TB';
                } else {
                    // Show in GB for smaller values
                    const gb = totalScore.div(web3.utils.toBN(1024*1024*1024));
                    return this.formatNumber(gb.toString()) + ' GB';
                }
            } catch (error) {
                console.error('Error formatting bandwidth:', error);
                return '0 TB';
            }
        }
    }
});
</script>

<style scoped>
.dashboard {
    max-width: 1400px;
    margin: 0 auto;

    .title {
        text-align: center;
        margin-bottom: 40px;
        padding: 20px 0;
        border-bottom: 1px solid #e0e0e0;
    }

    .title h1 {
        font-size: 2.5em;
        color: #1a2942;
        margin: 0;
        font-weight: 700;
    }

    .dashboard-grid {
        display: flex;
        x-display: grid;
        x-grid-template-columns: minmax(600px, 2fr) minmax(400px, 1fr);
        gap: 30px;
        margin-top: 30px;
    }

    @media (max-width: 1200px) {
        .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }
    }

    .fleet-column, .relay-column {
        background: #fff;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        border: 1px solid #f0f0f0;
        transition: box-shadow 0.3s ease;
    }

    .fleet-column:hover, .relay-column:hover {
        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }

    .stats-summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
        margin: 30px 0;
    }

    @media (max-width: 768px) {
        .stats-summary {
            grid-template-columns: 1fr;
        }
    }

    .stat-box {
        background: linear-gradient(135deg, #fff 0%, #f8f9fb 100%);
        padding: 32px 24px;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        border: 1px solid #f0f0f0;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .stat-box::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #4ECDC4, #45B7D1);
    }

    .stat-box:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    }

    .stat-box h3 {
        color: #1a2942;
        margin-bottom: 16px;
        font-size: 1.1em;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: #2c4167;
        line-height: 1.2;
    }

    .chart-container {
        margin: 20px 0;
        position: relative;
        text-align: center;
    }

    .fleet-score {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        margin: 4px 0;
        background: #f8f9fb;
        border-radius: 8px;
        font-size: 0.85em;
        border-left: 3px solid #4ECDC4;
        transition: all 0.2s ease;
    }

    .fleet-score:hover {
        background: #e8f4f8;
        transform: translateX(2px);
    }

    .fleet-label {
        font-weight: 500;
        color: #1a2942;
    }

    .score-value {
        color: #2c4167;
        font-weight: 600;
        font-family: 'Monaco', 'Consolas', monospace;
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
        margin-top: 20px;
        font-size: 0.95em;
        border-collapse: separate;
        border-spacing: 0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        border: 1px solid #f0f0f0;
    }

    table.scores th {
        background: linear-gradient(135deg, #1a2942 0%, #2c4167 100%);
        color: white;
        padding: 16px 20px;
        text-align: left;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        font-size: 0.9em;
        position: relative;
    }

    table.scores th::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, #4ECDC4, #45B7D1);
    }

    table.scores td {
        padding: 16px 20px;
        border-bottom: 1px solid #f5f5f5;
        background: #fff;
        transition: background-color 0.2s ease;
        vertical-align: top;
    }

    table.scores tr:last-child td {
        border-bottom: none;
    }

    table.scores tr:hover td {
        background: #f8f9fb;
    }

    table.scores td a {
        color: #45B7D1;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
    }

    table.scores td a:hover {
        color: #2c4167;
        text-decoration: underline;
    }

    h2 {
        margin: 0 0 20px 0;
        color: #1a2942;
        font-size: 1.8em;
        font-weight: 700;
        position: relative;
        padding-bottom: 10px;
    }

    h2::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50px;
        height: 3px;
        background: linear-gradient(90deg, #4ECDC4, #45B7D1);
        border-radius: 2px;
    }

    h3 {
        color: #1a2942;
        font-size: 1.3em;
        font-weight: 600;
        margin: 20px 0 15px 0;
    }

    .subtitle {
        color:rgb(224, 224, 224);
        font-size: 1em;
        margin-top: 8px;
        font-weight: 400;
    }

    .loading-state {
        display: inline-flex;
        align-items: center;
        color:rgb(224, 224, 224);
        font-style: italic;
    }

    .loading-state::after {
        content: '...';
        animation: loading-dots 1.5s infinite;
    }

    @keyframes loading-dots {
        0%, 20% { content: ''; }
        40% { content: '.'; }
        60% { content: '..'; }
        80%, 100% { content: '...'; }
    }
}
</style> 