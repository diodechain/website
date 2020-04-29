<template id="power_distribution">
  <div>
    <div class="title">
      <h1>Prenet Miner Distribution over the Last 500 Blocks</h1>
      <small>
        connected to
        <account-link :hash="base" :length="50" :only-alias="false" />
      </small>
    </div>
    <div style="display: flex; flex-direction: row; align-items: flex-start;">
      <div style="display: flex; flex-direction: column">
        <div class="headtable">
          <div class="doclet">
            <h2>DIO Free Flow</h2>
            <span><% totalSupply %></span>
          </div>
          <div class="doclet">
            <h2>Fleets</h2>
            <span><% totalFleets %></span>
          </div>
          <div class="doclet">
            <h2>Accounts</h2>
            <span><% totalAccounts %></span>
          </div>
          <div class="doclet">
            <h2>Miners</h2>
            <span><% totalMiners %></span>
          </div>
        </div>
        <!-- https://medium.com/@heyoka/scratch-made-svg-donut-pie-charts-in-html5-2c587e935d72 -->
        <figure>
          <div class="figure-content">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 42 42"
              class="donut"
              aria-labelledby="beers-title beers-desc"
              role="img"
            >
              <title id="beers-title">Block Stats</title>
              <desc id="beers-desc">Donut chart of the last <% blocks.length %> blocks.</desc>
              <circle
                class="donut-hole"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="#fff"
                role="presentation"
              />
              <circle
                class="donut-ring"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#d2d3d4"
                stroke-width="3"
                role="presentation"
              />

              <circle
                v-for="miner in shares"
                :key="miner.name"
                class="donut-segment"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                v-bind:stroke="miner.color"
                stroke-width="3"
                v-bind:stroke-dasharray="miner.stroke"
                v-bind:stroke-dashoffset="miner.offset"
                aria-labelledby="donut-segment-1-title donut-segment-1-desc"
              >
                <title id="donut-segment-1-title"><% miner.name %></title>
                <desc id="donut-segment-1-desc">Segment spanning <% miner.percent %>% of the whole</desc>
              </circle>
              <!-- unused 10% -->
              <g class="chart-text">
                <text x="50%" y="50%" class="chart-number"><% blocks.length %></text>
                <text x="50%" y="50%" class="chart-label">Last Blocks</text>
              </g>
            </svg>
          </div>
          <figcaption class="figure-key">
            <p class="sr-only">Donut chart showing <% blocks.length %> most recent blocks.</p>

            <ul class="figure-key-list" aria-hidden="true" role="presentation">
              <li v-for="miner in shares" :key="miner.name">
                <span class="shape-circle" v-bind:style="{ backgroundColor: miner.color }"></span>
                <div style="flow: flex; flex-layout: column;">
                  <div class="figure-title">
                    <account-link :hash="miner.name" :only-alias="true" :length="10"></account-link> <% miner.percent %>%
                  </div>
                  <div><% miner.count %> Blocks</div>
                  <div v-if="stakes[miner.name]"><% stakes[miner.name].value %> DIO</div>
                </div>
              </li>
            </ul>
          </figcaption>
        </figure>
      </div>
      <table class="data" style="width: auto">
        <tr>
          <th>Block</th>
          <th>Timestamp</th>
          <th>Miner</th>
          <th>Tx</th>
        </tr>
        <tbody is="transition-group" name="list-complete">
          <tr v-for="block in blocks" v-bind:key="block" class="list-complete-item">
            <td>
              <router-link :to="'/block/' + block.number"><% block.number %></router-link>
            </td>
            <td><% formatUnix(block.timestamp) %></td>
            <td>
              <account-link :hash="block.miner" :only-alias="true" :length="10"></account-link>
            </td>
            <td><% block.transactions.length %></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
var PowerDistribution = Vue.component("power_distribution", {
  template: document.getElementById("power_distribution").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      base: "",
      miners: [],
      blocks: [],
      stakes: {},
      targetSize: 500,
      totalFleets: "loading",
      totalMiners: "loading",
      totalAccounts: "loading",
      totalSupply: "loading"
    };
  },
  computed: {
    shares: function() {
      let groups = {};
      let size = this.blocks.length;
      this.blocks.forEach(block => {
        if (groups[block.miner]) {
          groups[block.miner].count++;
        } else {
          groups[block.miner] = {
            count: 1,
            address: block.miner,
            name: block.miner,
            color: "#" + block.miner.substr(3, 6),
            shape: "background-color(#" + block.miner.substr(3, 6) + ")"
          };
        }
      });

      let total = 0;
      groups = Object.values(groups);
      groups.forEach(miner => {
        if (total == 0) miner.offset = 25;
        else miner.offset = 100 - total + 25;
        miner.percent = Math.round((100 * miner.count) / this.blocks.length);
        total += miner.percent;
        miner.stroke = "" + miner.percent + " " + (100 - miner.percent);
        this.fetchStake(miner.address);
      });
      this.totalMiners = groups.length;
      return groups.sort((a, b) => a.count - b.count);
    }
  },
  created: function() {
    this.loader();
  },
  methods: {
    refresh: function() {
      web3.eth.totalSupply().then(supply => {
        let totalSupply = web3.utils.fromWei(web3.utils.toBN(supply)).toString();
        totalSupply -= 100000000;
        this.totalSupply = formatNumber(totalSupply) + ' DIO';
      });
      web3.eth.codeGroups().then(groups => {
        this.totalFleets = web3.utils.hexToNumber(groups[FleetHash]);
        this.totalAccounts = web3.utils.hexToNumber(groups[NullHash]);
      });
    },
    fetchStake: function(addr) {
      fetchStake(addr, value => {
        this.$set(this.stakes, addr, {
          name: addr,
          value: formatNumber(web3.utils.fromWei(web3.utils.toBN(value)))
        });
      });
    },
    loader: async function() {
      web3.eth.getCoinbase().then(base => {
        this.base = base;
        this.fetchStake(base);
      });
      let buffer = [];
      this.refresh();
      subscribe("newBlockHeaders", (error, block) => {
        if (error) {
          console.log("newBlockHeaders.subscription.error", error);
          return;
        }
        this.refresh();
        buffer.push(block);
      });
      setInterval(() => {
        if (buffer.length == 0) return;
        let blocks = this.blocks.slice();
        Array.prototype.unshift.apply(blocks, buffer);
        if (blocks.length > this.targetSize) {
          let size = blocks.length - this.targetSize;
          blocks.splice(-size, size);
        }
        this.blocks = blocks;
        buffer = [];
      }, 2000);

      let nr = await web3.eth.getBlockNumber();
      let batch = new web3.BatchRequest();
      let blocks = [];
      let size = this.targetSize > nr ? nr : this.targetSize;
      let cb = (error, block) => {
        if (error) {
          console.log(error);
          return;
        }
        blocks.push(block);
        if (blocks.length == size) {
          this.blocks = blocks;
        }
        if (!this.stakes[block.miner]) {
          this.$set(this.stakes, block.miner, {
            name: block.miner,
            value: "fetching.."
          });
          this.fetchStake(block.miner);
        }
      };
      for (let i = 0; i < size; i++) {
        batch.add(web3.eth.getBlock.request(nr - i, false, cb));
      }
      batch.execute();
    }
  }
});
</script>
