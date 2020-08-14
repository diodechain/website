<template id="transactions">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Pending Transactions</h1>
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
          <account-link :hash="base" :length="50" :only-alias="false" />
        </p>
      </div>
    </div>
    <div class="page-content">
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
      <table v-else class="data" style="table-layout:fixed;">
        <caption>Transaction</caption>
        <tr>
          <th>Hash</th>
          <th>From</th>
          <th>To</th>
          <th>Value</th>
        </tr>
        <tbody>
          <tr :key="tx['hash']" v-for="tx in transactions" >
            <!-- <td> <router-link :to="'/tx/' + tx['hash']"> <% tx['hash'] %></router-link> </td> -->
            <td class="one-forth">
              <div class="ellipsis"><% tx['hash'] %></div>
            </td>

            <td class="one-forth">
              <account-link :hash="tx['from']" :length="30" />
            </td>
            <td class="one-forth">
              <account-link :hash="tx['to']" :length="30" />
            </td>
            <td class="one-forth"><% tx["value"] %></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
var Transactions = Vue.component("transactions", {
  template: document.getElementById("transactions").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      base: "",
      transactions: [],
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
    update: async function () {
      this.transactions = await web3.eth.getPool();
      console.log(this.transactions);
    },
  },
});
</script>
