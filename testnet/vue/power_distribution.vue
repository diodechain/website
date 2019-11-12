<template id="power_distribution">
  <div>
    <div class="title">
      <h1>Testnet Power Distribution</h1>
      <small>connected to <% base %></small>
    </div>
    <div style="display: flex; flex-direction: row; align-items: flex-start;">
      <table>
        <tr>
          <th>Miner</th>
          <th>Staked ETH</th>
        </tr>
        <tr v-for="miner in Object.values(stakes).sort()">
          <td><% miner.name %></td>
          <td class="ether-value"><% miner.value %></td>
        </tr>
      </table>
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
            <li v-for="miner in shares">
              <span class="shape-circle" v-bind:style="{ backgroundColor: miner.color }"></span>
              <% miner.name %> (<% miner.percent %>% / <% miner.count %> blocks)
            </li>
          </ul>
        </figcaption>
      </figure>
      <table>
        <tr>
          <th>Block</th>
          <th>Timestamp</th>
          <th>Miner</th>
          <th>Tx</th>
        </tr>
        <tbody is="transition-group" name="list-complete">
          <tr v-for="block in blocks" v-bind:key="block" class="list-complete-item">
            <td><% block.number %></td>
            <td><% formatUnix(block.timestamp) %></td>
            <td><% resolveName(block.miner) %></td>
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
      stakes: {}
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
            name: resolveName(block.miner),
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
        fetchStake(miner.address);
      });
      return groups.sort((a, b) => a.count - b.count);
    }
  },
  created: function() {
    this.loader(this);
  },
  methods: {
    loader: async function(Main) {
      web3.eth.getCoinbase().then(base => {
        Main.base = resolveName(base);
        fetchStake(Main, base);
      });
      let subscription = web3.eth.subscribe("newBlockHeaders", function(
        error,
        block
      ) {
        var buffer = [];
        if (!error) {
          buffer.push(block);
        } else {
          console.log("newBlockHeaders.subscription.error", error);
        }
        setInterval(() => {
          if (buffer.length == 0) return;
          // Array.prototype.unshift.apply(Main.blocks, buffer);
          // Main.blocks.splice(-buffer.length, buffer.length)
          let blocks = Main.blocks.slice();
          Array.prototype.unshift.apply(blocks, buffer);
          blocks.splice(-buffer.length, buffer.length);
          Main.blocks = blocks;
          buffer = [];
        }, 2000);
      });

      let nr = await web3.eth.getBlockNumber();
      let batch = new web3.BatchRequest();
      let blocks = [];
      let size = 500 > nr ? nr : 500;
      let cb = (error, block) => {
        if (error) {
          console.log(error);
          return;
        }
        blocks.push(block);
        if (blocks.length == size) {
          Main.blocks = blocks;
        }
        let name = resolveName(block.miner);
        if (!Main.stakes[name]) {
          Main.$set(Main.stakes, name, {
            name: name,
            value: "fetching.."
          });
          fetchStake(Main, block.miner);
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