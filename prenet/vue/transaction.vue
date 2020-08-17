<template id="transaction">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Transaction Detail</h1>
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
    <div v-if="!tx" class="page-content">
      <div v-if="error" class="error"><% error %></div>
      <div v-else>Loading Transaction....</div>
    </div>
    <div v-else class="page-content">
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
      <table v-else class="data side-bordered">
        <caption>Transaction: <% tx.hash %></caption>
        <tbody>
          <tr>
            <th>Block</th>
            <td v-if="tx.blockNumber">
              <router-link :to="'/block/' + tx.blockNumber"><% tx.blockNumber %></router-link>
            </td>
            <td v-else>Not yet Mined</td>
            <td rowspan="12" class="tran-logs">
              Logs:
              <br /><br />
              <pre v-if="receipt != null" class="logs-data"><% receipt.logs %></pre>
              <span v-else>NA</span>
            </td>
          </tr>
          <tr>
            <th>From</th>
            <td>
              <account-link :hash="tx.from" />
            </td>
          </tr>
          <tr>
            <th>To</th>
            <td>
              <account-link :hash="tx.to" :only-alias="false" :length="50"></account-link>
            </td>
          </tr>
          <tr>
            <th>Value</th>
            <td><% valueToBalance(tx.value) %></td>
          </tr>
          <tr>
            <th>Gas Limit</th>
            <td><% tx.gas %></td>
          </tr>
          <tr>
            <th>Gas Price</th>
            <td><% tx.gasPrice %></td>
          </tr>
          <tr>
            <th>Gas Used</th>
            <td v-if="receipt"><% receipt.gasUsed %></td>
            <td v-else>NA</td>
          </tr>
          <tr>
            <th>Cumulative Gas Used</th>
            <td v-if="receipt"><% receipt.cumulativeGasUsed %></td>
            <td v-else>NA</td>
          </tr>

          <tr>
            <th>Nonce</th>
            <td><% tx.nonce %></td>
          </tr>

          <tr>
            <th>Status</th>
            <td v-if="receipt"><% receipt.status %></td>
            <td v-else>NA</td>
          </tr>

          <tr>
            <th>Transaction Index</th>
            <td v-if="receipt"v-if="receipt"v-if="receipt"><% receipt.transactionIndex %></td>
            <td v-else>NA</td>
          </tr>
          <tr>
            <th>Input</th>
            <td class="big"><% tx.input %></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
var Transaction = Vue.component("transaction", {
  template: document.getElementById("transaction").innerHTML,
  props: { hash: String },
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      base: "",
      tx: undefined,
      error: undefined,
      receipt: {},
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

    this.update();
  },
  methods: {
    update: function () {
      this.tx = undefined;
      web3.eth.getTransaction(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.tx = ret;
      });
      web3.eth.getTransactionReceipt(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.receipt = ret;
      });
      // 0xd8e3e2e81319f6af36533bee63bc9b129ba6b0d7d607560f76fc291e2507a405
    },
  },
  watch: {
    hash: function () {
      this.update();
    },
  },
});
</script>
