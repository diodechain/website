<template id="power_distribution">
  <div >
    <div class="title row">
      <div class="col-md-2">
        <h1>Prenet Overview</h1>
      </div>
      <div class="col-md-6">
        <div class="search">
          <i v-on:click="selectInput" v-if="!searchTerm" class="fa fa-search search-icon"></i>
          <i v-on:click="clearSearch" v-else class="fa fa-times-circle"></i>
          <input
            type="text"
            v-model="searchTerm"
            ref="searchInput"
            placeholder="Search for accounts, blocks, etc."
            name="search"
          />
          <button type="submit" v-on:click="search">Search</button>
        </div>
      </div>
      <div class="col-md-4">
        <p>
          connected to
          <account-link :hash="base" :length="50" :only-alias="false" />
        </p>
      </div>
    </div>
    <div class="page-content" style=" flex-direction: row; align-items: flex-start;">
      <div v-if="searchTerm && searchActivated">
        <table class="data" style="width: auto">
          <caption><% searchResults.length %> Search Results</caption>
          <tr v-if="searchResults.length">
            <th>Page</th>
            <th>Match Term</th>
          </tr>
          <tr v-else-if="searchFinished">
            <td>
              <div class="empty-search">
               
              Sorry, no results were found. The Diode Network explorer search function can search on full or parital matches on account addresses, 
              block numbers, BNS names, and stake amounts. Please check your search term and try again!
               </div>
            </td>
          </tr>
          <tbody v-if="searchResults.length" is="transition-group" name="list-complete">
            <tr v-for="result in searchResults" v-bind:key="result" class="list-complete-item">
              <td>
                <router-link v-if="result.type==='Block'" :to="'/block/' + result.id">Blocks</router-link>
                <router-link v-if="result.isAddress" :to="'/address/' + result.id"><% result.type %></router-link>
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
                <router-link :class="'no-decoration'"  :to="'/fleets/'"><% totalFleets %></router-link>
              </div>
            </div>
            <div class="doclet">
              <h2>Accounts</h2>
              <div class="link">
                <router-link :class="'no-decoration'" :to="'/address?filter=all'"><% totalAccounts %></router-link>
              </div>
            </div>
            <div class="doclet">
              <h2>Miners</h2>
              <div class="link">
                <router-link :class="'no-decoration'" :to="'/address?filter=contracts'"><% totalMiners %></router-link>
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
              <div class="col-md-3 col-md-offset-1">
                <figcaption class="figure-key">
                  <ul class="figure-key-list" aria-hidden="true" role="presentation">
                    <li v-for="miner in shares" :key="miner.name">
                      <span class="shape-square" v-bind:style="{ backgroundColor: miner.color }"></span>
                      <div style="flow: flex; flex-layout: column;">
                        <div class="figure-title">
                          <account-link :hash="miner.name" :only-alias="true" :length="10"></account-link>
                        </div>
                        <div class="ul1"><% miner.count %> Blocks</div>
                      </div>
                    </li>
                  </ul>
                </figcaption>
              </div>
              <div class="col-md-7">
                <div class="figure-content" v-if="totalMiners">
                  <svg width="400" height="140">
                    <g transform="translate(40,20)">
                      <g class="x axis" transform="translate(0,100)">
                        <g
                          v-for="(miner, index) in shares"
                          :key="miner.name"
                          class="tick"
                          :transform="'translate(' + (27 + (index * 70)) + ',0)'"
                          style="opacity: 1;"
                        >
                          <line y2="6" x2="0" />
                          <text
                            fill="#F15C2E"
                            dy=".71em"
                            y="9"
                            x="10"
                            style="text-anchor: middle;"
                          ><% formatAddr(miner.name, true, 10) %></text>
                        </g>
                        <path class="domain" d="M0,2V0H350V2" />
                      </g>
                      <g class="y axis">
                        <path class="domain" d="M-2,0H0V102H-2" />
                      </g>
                      <g v-for="(miner, index) in shares" :key="miner.name">
                        <rect
                          class="bar"
                          :x="(10 + (index * 70))"
                          width="45"
                          :y="100 - miner.scaledCount"
                          :height="miner.scaledCount"
                          :style="'fill:' + miner.color"
                        />
                        <text
                          dy=".71em"
                          :y="100 - miner.scaledCount - 15"
                          :x="(27 + (index * 70))"
                          style="text-anchor: middle;"
                        ><% miner.count %></text>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </figure>
          </div>
        </div>

        <table class="data" style="width: auto">
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
      totalAccounts: "loading",
      totalSupply: "loading",
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
    };
  },
  watch: {
    searchTerm: function(value, oldValue) {
      if (!value) {
        this.searchActivated = false;
      }
    }
  },
  computed: {
    shares: function () {
      let groups = {};
      let size = this.blocks.length;
      let minerIndex = 0;

      this.blocks.forEach((block) => {
        if (groups[block.miner]) {
          groups[block.miner].count++;
        } else {
          let color = PredefinedMinersColors[minerIndex];
          
          if (!color) { color = "#"+((1<<24)*Math.random()|0).toString(16); }

          groups[block.miner] = {
            count: 1,
            address: block.miner,
            name: block.miner,
            color: color,
            shape: "background-color(" + color + ")",
          };

          minerIndex += 1;
        }
      });

      this.miners.splice(0, this.miners.length);

      groups = Object.values(groups);

      let total = 0;
      groups.forEach((miner) => {
        this.miners.push(miner);

        if (total == 0) miner.offset = 25;
        else miner.offset = 100 - total + 25;

        miner.percent = Math.round((100 * miner.count) / this.blocks.length);
        total += miner.percent;
        miner.stroke = "" + miner.percent + " " + (100 - miner.percent);

        this.fetchStake(miner.address);
      });

      this.totalMiners = groups.length;
      var result = groups.sort((b, a) => a.count - b.count);

      if (this.totalMiners) {
        var topMiner = groups[0];
        var scaleFactor = 100 / topMiner.count;

        groups.forEach((miner) => {
          miner.scaledCount = miner.count * scaleFactor;
        });
      }

      return result;
    },
  },
  created: function () {
    this.loader();
  },
  methods: {
    search: async function () {
      this.searchFinished = false;
      this.searchActivated = true;

      this.searchResults.splice(0, this.searchResults.length);

      let accounts = await web3.eth.getAllAccounts();

      for (let id in accounts) {
        let matchId = id.indexOf(this.searchTerm);

        if (matchId === -1) continue;

        let hash = accounts[id].codehash;
        this.selectSearchItem(id, hash);
      }

      let blockFound = false;

      for (let i in this.blocks) {
        let blockNumber = this.blocks[i].number.toString();
        let matchId = blockNumber.indexOf(this.searchTerm);

        if (matchId === -1) continue;

        blockFound = true;
        this.selectSearchItem(blockNumber, null, 'Block');
      }

      let exactBlockNumber = parseInt(this.searchTerm);

      if (!blockFound && !isNaN(exactBlockNumber)) {
        let self = this;

        let block = await web3.eth.getBlock(exactBlockNumber, false, function(error, block) {
          if (!error) {
            self.selectSearchItem(block.number, null, 'Block');
          }
        });
      }
      
      this.searchResults.sort(function(a, b){ return b.matchCompleteness - a.matchCompleteness; });
      this.searchFinished = true;
    },
    selectInput: function () {
      this.$refs.searchInput.focus();
    },
    clearSearch: function (params) {
      this.searchTerm = "";
      this.searchActivated = false;
      this.searchResults.splice(0, this.searchResults.length);
    },
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
      web3.eth.getCoinbase().then((base) => {
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
    selectSearchItem(id, hash, type) {
        let result = {};
        result.id = id;

        result.matchCompleteness = (this.searchTerm.length / id.length) * 100;

        result.type = type;

        if (hash) {
          if (hash == FleetHash) { result.type = "Fleet"; }
          else if (hash == NullHash) { result.type = "Wallet"; }
          else { result.type = "Contract"; }

          result.isAddress = true;
        }
        
        result.stake = "";
        result.BNS = DNSCache[id] ? DNSCache[id].name : undefined;

        try {
          fetchStake(id, (stake) => {
            this.$set(result, "stake", valueToBalance(stake));
          });
        } catch (error) {}
        

        result.text = `${result.BNS ? result.BNS + "-" : ""}${id}`;

        this.searchResults.push(result);
    }
  },
});
</script>


