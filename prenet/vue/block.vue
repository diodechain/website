<template id="block">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Block Detail</h1>
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
    <div v-if="!block" class="column page-content">
      <div v-if="error" class="error"><% error %></div>
      <div v-else>Loading Block....</div>
    </div>
    <div v-else class="column page-content">
      <table class="data" v-if="searchTerm && searchActivated">
        <caption><% searchResults.length %> Search Results</caption>
        <tr v-if="searchResults.length">
          <td>Page</td>
          <td>Match Term</td>
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
              <router-link v-if="result.type==='Block'" :to="'/block/' + result.id" @mousedown.native="clearSearch">Block</router-link>
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
      <table class="data side-bordered" v-else>
        <caption>
          Block: <% block.number %>
        </caption>
        <tr>
          <td>Block Hash</td>
          <td><% block.hash %></td>
        </tr>
        <tr>
          <td>Parent</td>
          <td v-if="validNumber">
            <router-link :to="`/block/${parentBlockNumber}`"><% parentBlockNumber %></router-link>
          </td>
          <td v-else>Genesis</td>
        </tr>
        <tr>
          <td>Timestamp</td>
          <td><% formatDateTime(block.timestamp) %></td>
        </tr>
        <tr>
          <td>Miner</td>
          <td>
            <account-link :hash="block.miner" :length="50" :only-alias="false" />
          </td>
        </tr>
        <tr>
          <td>Transactions</td>
          <td v-if="block.transactions.length > 0">
            <div :key="tx" v-for="tx in block.transactions">
              <router-link :key="tx" :to="'/tx/' + tx"><% tx %></router-link>
            </div>
          </td>
          <td v-else>None</td>
        </tr>
        <tr>
          <td>Size</td>
          <td><% block.size %></td>
        </tr>
        <tr>
          <td>Gas Used</td>
          <td><% block.gasUsed %></td>
        </tr>
        <tr>
          <td>Gas Limit</td>
          <td><% block.gasLimit %></td>
        </tr>
        <tr>
          <td>Difficulty</td>
          <td><% block.difficulty %></td>
        </tr>
        <tr>
          <td>Total Difficulty</td>
          <td><% block.totalDifficulty %></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
var Block = Vue.component("block", {
  template: document.getElementById("block").innerHTML,
  props: { number: Number },
  delimiters: ["<%", "%>"],
  computed: {
    validNumber() {
      // see: https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getblockbynumber
      return this.number > 0 || this.number === "latest";
    },
    parentBlockNumber() {
      if (this.number === "latest") {
        return this.block.number - 1;
      } else {
        return this.number - 1;
      }
    },
  },
  data: () => {
    return {
      block: undefined,
      error: undefined,
      base: "",
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
    };
  },
  created: function () {
    let self = this;

    getBase(function (base) {
      self.base = base;
    });

    if (this.validNumber) {
      this.update();
    } else {
      this.$router.push("/");
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.number > 0 || to.params.number === "latest") {
      return next();
    }
    return next(false);
  },
  methods: {
    update: function () {
      this.block = undefined;
      web3.eth.getBlock(this.number, (err, block) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.block = block;
      });
    },
    clearSearch() {
      this.searchTerm = "";
      this.searchActivated = false;
    },
  },
  watch: {
    number: function () {
      this.searchTerm = "";
      this.searchActivated = false;
      this.searchFinished = false;
      this.searchResults = [];

      this.update();
    },
  },
});
</script>
