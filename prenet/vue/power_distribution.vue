<template id="power_distribution">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Network Overview</h1>
      </div>
      <div class="col-md-3">
        <search-bar v-bind:blocks.sync="blocks" v-bind:results.sync="searchResults" v-model="searchTerm"
                    v-bind:activated.sync="searchActivated"
                    v-bind:finished.sync="searchFinished"
        />
      </div>
      <div class="col-md-4 col-md-offset-2">
        <p>
          connected to
          <account-link :hash="base" :length="15" :only-alias="true" />
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
        <div style="display: flex;">
          <div class="headtable">
            <div class="doclet">
              <h2>Free Flow</h2>
              <div class="link">
                <router-link :class="'no-decoration'" :to="'/address/'"><% totalSupply %></router-link>
              </div>
            </div>
            <div class="doclet">
              <h2>Fleets</h2>
              <div class="link">
                <router-link :class="'no-decoration'" :to="'/address?filter=fleets'"><% totalFleets %></router-link>
              </div>
            </div>
            <div class="doclet">
              <h2>Accounts</h2>
              <div class="link">
                <router-link
                  :class="'no-decoration'"
                  :to="'/address?filter=all'"
                ><% totalAccounts %></router-link>
              </div>
            </div>
            <div class="doclet">
              <h2>Contracts</h2>
              <div class="link">
                <router-link
                  :class="'no-decoration'"
                  :to="'/address?filter=contracts'"
                ><% totalContracts %></router-link>
              </div>
            </div>
          </div>

          <div class="headtable">
            <figure>
              <div class="row">
                <div class="col-md-12">
                  <h2>Top Miners over Last 100 Blocks</h2>
                </div>
              </div>
              <div class="col-md-12" id='pie-chart'>
                <span v-if="shares"></span>
              </div>
            </figure>
          </div>
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
var PowerDistribution = Vue.component("power_distribution", {
  template: document.getElementById("power_distribution").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      base: "",
      miners: [],
      blocks: [],
      stakes: {},
      targetSize: 100,
      totalFleets: "loading",
      totalMiners: "loading",
      totalContracts: "loading",
      totalAccounts: "loading",
      totalSupply: "loading",
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: []
    };
  },
  computed: {
    shares: function () {
      let groups = {};
      let size = this.blocks.length;
      let minerIndex = 0;

      this.blocks.forEach((block) => {
        if (groups[block.miner]) {
          groups[block.miner].value++;
        } else {
          let color = PredefinedGraphicColors[minerIndex];

          if (!color) {
            color = getRandomColor();
          }

          groups[block.miner] = {
            value: 1,
            address: block.miner,
            label: block.miner,
            color: color,
            shape: "background-color(" + color + ")",
          };

          minerIndex += 1;
        }
      });

      this.miners.splice(0, this.miners.length);

      groups = Object.values(groups);

      // let total = 0;
      // groups.forEach((miner) => {
      //   this.miners.push(miner);

      //   if (total == 0) miner.offset = 25;
      //   else miner.offset = 100 - total + 25;

      //   miner.percent = Math.round((100 * miner.count) / this.blocks.length);
      //   total += miner.percent;
      //   miner.stroke = "" + miner.percent + " " + (100 - miner.percent);

      //   this.fetchStake(miner.address);
      // });

      if (!document.getElementById("pie-chart")) { return; }


      if (!document.getElementById("minersDonut")) {
          var svg = d3.select("#pie-chart").append("svg").attr("width",700).attr("height",300);

          svg.append("g").attr("id","minersDonut");
          svg.append("g").attr("class", "labels");
          svg.append("g").attr("class", "lines");

          Donut3D.draw("minersDonut", groups, 150, 150, 130, 100, 30, 0.4);
      } else {
          Donut3D.transition("minersDonut", groups, 130, 100, 30, 0.4);
      }

      function randomData(){
        return salesData.map(function(d){
          return {label:d.label, value:1000*Math.random(), color:d.color};});
      }

      this.totalMiners = groups.length;
      // var result = groups.sort((b, a) => a.count - b.count);

      // if (this.totalMiners) {
      //   var topMiner = groups[0];
      //   var scaleFactor = 100 / topMiner.count;

      //   groups.forEach((miner) => {
      //     miner.scaledCount = miner.count * scaleFactor;
      //   });
      // }

      return groups;
    },
  },
  created: function () {
    this.loader();
  },
  watch: {
    $route(to, from) {
      this.searchTerm = "";
      this.searchActivated = false;
      this.searchFinished = false;
      this.searchResults = [];
    }
  },
  methods: {
    refresh: function () {
      web3.eth.totalSupply().then((supply) => {
        let totalSupply = web3.utils
          .fromWei(web3.utils.toBN(supply))
          .toString();
        totalSupply -= 100000000;
        this.totalSupply = formatNumber(totalSupply);
      });
      web3.eth.codeGroups().then((groups) => {
        this.totalFleets = web3.utils.hexToNumber(groups[FleetHash]);
        this.totalAccounts = web3.utils.hexToNumber(groups[NullHash]);

        this.totalContracts = 0;
        for (const id in groups) {
          if (id !== FleetHash && id !== NullHash) {
            this.totalContracts += 1;
          }
        }


      });
    },
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
      getBase(function(base) {
        self.base = base;
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
            value: "fetching..",
          });
          this.fetchStake(block.miner);
        }
      };
      for (let i = 0; i < size; i++) {
        batch.add(web3.eth.getBlock.request(nr - i, false, cb));
      }
      batch.execute();
    }
  },

});
</script>


