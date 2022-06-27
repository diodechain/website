<template id="accounts">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Account Browser</h1>
      </div>
      <div class="col-md-3">
        <search-bar
          v-bind:results.sync="searchResults"
          v-model="searchTerm"
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
    <div class="column page-content">
      <div v-if="filter === ACCOUNTS_ALL_FILTER" class="graphs">
        <figure>
          <div class="row">
            <div class="col-md-12">
              <h2 class="headline">Top Accounts by Balance</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-md-offset-1">
              <figcaption class="figure-key">
                <ul class="figure-key-list long" aria-hidden="true" role="presentation">
                  <li v-for="acc in accountsByBalance" :key="acc.balanceValue">
                    <span class="shape-square" v-bind:style="{ backgroundColor: acc.color }"></span>
                    <div class="figure-legend">
                      <div class v-if="acc.id">
                        <account-link :hash="acc.id" :only-alias="true" :length="10"></account-link>
                      </div>
                      <span class="ul1" v-if="acc.name"><% acc.name %></span>
                      <span class="ul2"><% Math.round(acc.balanceValue) %> DIODE</span>
                    </div>
                  </li>
                </ul>
              </figcaption>
            </div>
            <div class="figure-content col-md-5">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 42 42"
                class="donut"
                aria-labelledby="beers-title beers-desc"
                role="img"
              >
                <title class="graph-title">Accounts balances Stats</title>
                <desc class="graph-desc">Donut chart of the top accounts</desc>
                <circle
                  v-for="acc in accountsByBalance"
                  :key="acc.balanceValue"
                  class="donut-segment"
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  v-bind:stroke="acc.color"
                  stroke-width="32"
                  v-bind:stroke-dasharray="acc.stroke"
                  v-bind:stroke-dashoffset="acc.offset"
                  aria-labelledby="donut-segment-1-title donut-segment-1-desc"
                >
                  <title id="donut-segment-1-title"><% acc.id || acc.name %></title>
                  <desc id="donut-segment-1-desc">Segment spanning <% acc.percent %>% of the whole</desc>
                </circle>
              </svg>
            </div>
          </div>
        </figure>
      </div>
      <table class="data" v-if="searchTerm && searchActivated">
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
      <table v-else class="data small-margin">
        <caption>
          Accounts
          <br />
          <select
            name="filterType"
            @change="onFilterChange($event)"
            class="form-control"
            v-model="filter"
          >
            <option value="All">All accounts</option>
            <option value="Fleet">Fleets</option>
            <option value="Contract">Contracts</option>
            <option value="Wallet">Wallets</option>
          </select>
        </caption>

        <tr>
          <th style="width:500px">Account</th>
          <th >Type</th>
          <th>Balance</th>
        </tr>
        <tr :key="id" v-for="(acc, id) in accounts">
          <td>
            <account-link :hash="id" />
          </td>
          <td><% acc["type"] %></td>
          <td><% acc["balanceFormatted"] %></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
var VAccounts = Vue.component("accounts", {
  template: document.getElementById("accounts").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      base: "",
      accounts: {},
      accountsByBalance: [],
      accountsByStake: [],
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
      filter: "",
    };
  },
  computed: {
    type: function () {
      if (this.node) return "Miner";
      if (this.object) return "Device";
      if (this.code == "0x") return "User (Human or Miner or Device)";
      return "Contract";
    },
  },
  created: function () {
    this.filter =
      ACCOUNTS_FILTER_MAP[this.$route.query.filter] || ACCOUNTS_ALL_FILTER;

    this.update();

    let self = this;
    getBase(function (base) {
      self.base = base;
    });
  },
  watch: {
    $route(to, from) {
      this.searchTerm = "";
      this.searchActivated = false;
      this.searchFinished = false;
      this.searchResults = [];

      if (to.path.indexOf('address') === -1) { return; }
        this.filter = ACCOUNTS_FILTER_MAP[this.$route.query.filter] || ACCOUNTS_ALL_FILTER;
        this.update();
      }
  },
  methods: {
    update: async function () {
      let accounts = await web3.eth.getAllAccounts();
      let accountsCopy = [];
      this.accountsByBalance = [];
      this.accountsByStake = [];

      for (let id in accounts) {
        if (id === Registry || id === "0x000000000000000000000000000000000000dead") { continue; }
        hash = accounts[id].codehash;
        if (hash == FleetHash) accounts[id].type = "Fleet";
        else if (hash == NullHash) accounts[id].type = "Wallet";
        else accounts[id].type = "Contract";

        if (
          this.filter !== ACCOUNTS_ALL_FILTER &&
          this.filter !== accounts[id].type
        ) {
          delete accounts[id];
          continue;
        }

        accounts[id].stake = "pending";
        accounts[id].balanceFormatted = valueToBalance(accounts[id].balance);
        accounts[id].balanceValue = balanceStringToValue(accounts[id].balance);

        accounts[id].id = id;
        accountsCopy.push(accounts[id]);
      }

      this.accounts = accounts;

      let accountsLength = accountsCopy.length;
      let balanceGraphSize = accountsLength < 9 ? accountsLength : 9;

      accountsCopy.sort(function (a, b) {
        return b.balanceValue - a.balanceValue;
      });

      this.selectGraphicsData(
        accountsCopy,
        balanceGraphSize,
        "balanceValue",
        this.accountsByBalance
      );

      let lazyLoadIndex = 0;

      for (let id in []) { //accounts) {
        fetchStake(id, (stake) => {
          this.$set(this.accounts[id], "stake", valueToBalance(stake));
          this.$set(
            this.accounts[id],
            "stakeValue",
            balanceStringToValue(stake)
          );
          lazyLoadIndex++;

          if (lazyLoadIndex == accountsLength - 1) {
            accountsCopy.sort(function (a, b) {
              return b.stakeValue - a.stakeValue;
            });

            this.selectGraphicsData(
              accountsCopy,
              balanceGraphSize,
              "stakeValue",
              this.accountsByStake
            );
          }
        });
      }
    },
    selectGraphicsData: function (accounts, graphSize, property, result) {
      let sumAllOthers = 0;
      let totalSum = 0;

      for (let i = 0; i < accounts.length; i++) {
        const acc = accounts[i];
        let value = Number(acc[property]) || 0;

        totalSum += value;

        if (i < graphSize) {
          result.push(Object.assign({}, acc));
          continue;
        }

        console.log(value);
        sumAllOthers += value;
      }

      var allOthers = { name: "All others" };
      allOthers[property] = sumAllOthers;

      result.push(allOthers);

      let total = 0;

      for (let i = 0; i < result.length; i++) {
        const item = result[i];

        if (total == 0) item.offset = 25;
        else item.offset = 100 - total + 25;

        item.percent = (item[property] / totalSum) * 100;

        // HACK - tweak the pie if percent is less than 0 - I set it to 1, and
        // remove the diff from the first element
        if (item.percent > 0 && item.percent < 1) {
          item.percent = 1;
        } else if (item.percent > 100 - graphSize) {
          item.percent = 100 - graphSize;
        }

        total += item.percent;

        item.stroke = "" + item.percent + " " + (100 - item.percent);
        item.color = PredefinedGraphicColors[i] || getRandomColor();
      }

      result.sort(function (a, b) {
        return b[property] - a[property];
      });
    },
    onFilterChange: function (event) {
      this.update();
    },
  },
});
</script>
