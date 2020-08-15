<template id="blocks">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Block Explorer</h1>
      </div>
      <div class="col-md-3">
        <search-bar
          v-bind:blocks.sync="blocks"
          v-bind:results.sync="searchResults"
          v-model="searchTerm"
          v-bind:activated.sync="searchActivated"
          v-bind:finished.sync="searchFinished"
        />
      </div>
      <div class="col-md-4 col-md-offset-2">
        <p>
          connected to
          <account-link :hash="base" :length="50" Overview:only-alias="false" />
        </p>
      </div>
    </div>
    <div class="page-content" style=" flex-direction: row; align-items: flex-start;">
      <div v-if="searchTerm && searchActivated">
        <table class="data">
          <caption><% searchResults.length %> Search Results</caption>
          <tr v-if="searchResults.length">
            <th>Page</th>
            <th>Match Term</th>
          </tr>
          <tr v-else-if="searchFinished">
            <td>
              <div class="empty-search">
                Sorry, no results were found. The Diode Network explorer search function can search on full or partial matches on account addresses/hashes, block numbers,
                BNS names, and stake amounts, and full matches on transaction hashes and block hashes. Please check your search term and try again!
              </div>
            </td>
          </tr>
          <tbody v-if="searchResults.length" is="transition-group" name="list-complete">
            <tr v-for="result in searchResults" v-bind:key="result" class="list-complete-item">
              <td>
                <router-link v-if="result.type==='Block'" :to="'/block/' + result.id">Block</router-link>
                <router-link
                  v-if="result.type==='Address' || result.isAddress"
                  :to="'/address/' + result.id"
                ><% result.type %></router-link>
                <router-link
                  v-if="result.type==='Transaction'"
                  :to="'/tx/' + result.id"
                ><% result.type %></router-link>
              </td>
              <td><% result.text %> <% result.stake ? '- ' + result.stake : ''%></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="graphs headtable full-width">
          <!-- TODO
            https://codepen.io/team/css-tricks/pen/Zbervy
          https://codepen.io/team/css-tricks/pen/cb00290fb3ee28378498eca296d7c395

          -->
          <figure>
            <div class="row">
              <div class="col-md-12">
                <h2>Transactions count - Last 100 Blocks</h2>
              </div>
              <div class="col-md-12">
                <svg viewBox="-30 -10 800 181" class="line-chart">
                  <g class="grid x-grid" id="xGrid">
                    <line x1="0" x2="0" y1="0" y2="151" />
                  </g>
                  <g class="grid y-grid" id="yGrid">
                    <line x1="0" x2="900" y1="150" y2="150" />
                  </g>
                  <g class="labels x-labels">
                    <text
                      v-for="time in lineTimes"
                      v-bind:key="time"
                      v-bind:x="time.x"
                      y="165"
                    ><% time.value %></text>
                  </g>
                  <g class="labels y-labels">
                    <text
                      v-for="item in lineYValues"
                      v-bind:key="item"
                      v-bind:y="item.y"
                      x="-5"
                    ><% item.value %></text>
                  </g>
                  <polyline fill="none" stroke="#3498db" stroke-width="1" v-bind:points="points" />
                </svg>
              </div>
            </div>
          </figure>
        </div>

        <table class="data">
          <caption>Last 100 Blocks</caption>
          <tr>
            <th>Block</th>
            <th>Timestamp (UTC)</th>
            <th>Miner</th>
            <th>Transactions</th>
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
  </div>
</template>
<script>
var Blocks = Vue.component("blocks", {
  template: document.getElementById("blocks").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      base: "",
      blocks: [],
      stakes: {},
      targetSize: 100,
      totalMiners: undefined,
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
      lineTimes: [],
      lineYValues: [],
    };
  },
  computed: {
    points: function () {
      let groups = {};
      if (!this.blocks.length) {
        return "";
      }

      this.blocks.forEach((block) => {
        let timeStamp = Math.round((block.timestamp / 1000) * 1000);

        if (groups[timeStamp]) {
          groups[timeStamp] += block.transactions.length;
        } else {
          groups[timeStamp] = block.transactions.length;
        }
      });

      let lineChartData = Object.values(groups);

      let lineChartDataKeys = Object.keys(groups);

      this.lineTimes = [];

      for (let i = 0; i < lineChartDataKeys.length; i++) {
        if (
          i === 0 ||
          i === lineChartDataKeys.length - 1 ||
          i === Math.round(lineChartDataKeys.length / 2)
        ) {
          this.lineTimes.push({
            value: formatUnix(lineChartDataKeys[i]),
            x: this.lineTimes.length * 360 + 20,
          });
        }
      }

      let maxValue = Math.max(...lineChartData);

      let yMiddleValue = 3;
      let yHeight = 150;

      this.lineYValues = [{ value: 0, y: yHeight }];

      let diff = Math.round(maxValue / yMiddleValue);
      let diffHeight = yHeight / (yMiddleValue + 1);

      let maxAdded = false;

      for (let i = 0; i < yMiddleValue; i++) {
        let value = i * diff + diff;
        let item = { value: value, y: yHeight - (i + 1) * diffHeight };
        this.lineYValues.push(item);

        if (value === maxValue) {
          maxAdded = true;
        }
      }

      if (!maxAdded) {
        this.lineYValues.push({ value: maxValue, y: 0 });
      }

      var points = "";
      for (let i = 0; i < lineChartData.length; i++) {
        points +=
          (i * 20).toString().padStart(2, "0") +
          "," +
          (150 - lineChartData[i] * 20).toString().padStart(2, "0") +
          " ";
      }

      return points.trim();
    },
  },
  created: function () {
    this.loader();
  },
  methods: {
    fetchStake: function (addr) {
      fetchStake(addr, (value) => {
        this.$set(this.stakes, addr, {
          name: addr,
          value: formatNumber(web3.utils.fromWei(web3.utils.toBN(value))),
        });
      });
    },
    loader: async function () {
      let self = this;
      getBase(function (base) {
        self.base = base;
      });

      let buffer = [];
      subscribe("newBlockHeaders", (error, block) => {
        if (error) {
          console.log("newBlockHeaders.subscription.error", error);
          return;
        }

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
            value: "fetching..",
          });
          this.fetchStake(block.miner);
        }
      };
      for (let i = 0; i < size; i++) {
        batch.add(web3.eth.getBlock.request(nr - i, false, cb));
      }
      batch.execute();
    },
  },
});
</script>


