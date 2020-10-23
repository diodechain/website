<template id="dns">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Name Detail</h1>
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
        <p v-if="base">
          connected to
          <account-link :hash="base" :length="15" :only-alias="true" />
        </p>
        <p v-else>Reconnecting...</p>
      </div>
    </div>
    <div class="page-content">
      <div v-if="data == undefined">
        <b class="loading">Loading...</b>
      </div>
      <table class="data" v-else-if="searchTerm && searchActivated">
        <caption>
          <% searchResults.length %> Search Results
        </caption>
        <tr v-if="searchResults.length">
          <th>Page</th>
          <th>Match Term</th>
        </tr>
        <tr v-else-if="searchFinished">
          <td>
            <div class="empty-search">
              Sorry, no results were found. The Diode Network explorer search
              function can search on full or partial matches on account
              addresses/hashes, block numbers, BNS names, and stake amounts, and
              full matches on transaction hashes and block hashes. Please check
              your search term and try again!
            </div>
          </td>
        </tr>
        <tbody
          v-if="searchResults.length"
          is="transition-group"
          name="list-complete"
        >
          <tr
            v-for="result in searchResults"
            v-bind:key="result"
            class="list-complete-item"
          >
            <td>
              <router-link
                v-if="result.type === 'Block'"
                :to="'/block/' + result.id"
                >Block</router-link
              >
              <router-link
                v-if="result.type === 'Address' || result.isAddress"
                :to="'/address/' + result.id"
                ><% result.type %></router-link
              >
              <router-link
                v-if="result.type === 'Transaction'"
                :to="'/tx/' + result.id"
                ><% result.type %></router-link
              >
            </td>
            <td>
              <% result.text %> <% result.stake ? '- ' + result.stake : ''%>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="row align-start">
        <account-info></account-info>
        <div class="col-md-9 col-sm-9">
          <table class="data" id="blockchain-names">
            <caption>
              <div class="col-md-12 no-padding">
                <h2><% this.name %>.diode</h2>
              </div>
            </caption>
            <tr>
              <th>Domain</th>
              <td>.diode</td>
            </tr>
            <tr>
              <th>Target(s)</th>
              <td>
                <table class="data">
                  <td v-for="dest in destinations">
                    <account-link :hash="dest" mode="address"></account-link>
                  </td>
                </table>
                <bns-update :name="name" :owner="data.owner" :destination="this.$route.query.new_target" :on_update="refresh"></bns-update>
              </td>
            </tr>
            <tr>
              <th>HTTP Gateway</th>
              <td>
                <a
                  target="_blank"
                  :href="'https://' + this.name + '.diode.link/'"
                  >https://<% this.name %>.diode.link/</a
                >
              </td>
            </tr>
            <tr>
              <th>WS Gateway</th>
              <td>wss://<% this.name %>.diode.ws/</td>
            </tr>
            <tr>
              <th>Lease End</th>
              <td><% formatEnd(data.leaseEnd) %></td>
            </tr>
            <tr>
              <th>Lock End</th>
              <td><% formatEnd(data.lockEnd) %></td>
            </tr>
            <tr>
              <th>Owner</th>
              <td>
                <account-link v-if="data.owner != NullAddr" :hash="data.owner"></account-link>
                <span v-else>Nobody</span>
                <bns-update operation="transfer" :name="name" :owner="data.owner" :on_update="refresh"></bns-update>
              </td>
            </tr>
            <tr v-if="editable">
              <th>
                Unregister
              </th>
              <td>
                <bns-update operation="unregister" :name="name" :owner="data.owner" :on_update="unregister.bind(this)"></bns-update>
              </td>
            </tr>
            <tr>
              <th>Properties</th>
              <td>
                <table v-if="data.properties.length" class="data">
                  <td v-for="prop in data.properties"><% prop %></td>
                </table>
                <span v-else>Empty</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var DNS = Vue.component("dns", {
  template: document.getElementById("dns").innerHTML,
  props: { name: String },
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      account: undefined,
      base: "",
      balance: 0,
      data: undefined,
      enabled: false,
      error: false,
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
      tableHeight: 300,
    };
  },
  created: function () {
    let self = this;
    getBase(function (base) {
      self.base = base;
    });
    this.refresh();
    Wallet.subscribe(this);
  },
  watch: {
    name: function() { this.refresh() }
  },
  computed: {
    editable: function () {
      let owner = valueToAddress(this.data.owner);
      let account = valueToAddress(this.account);
      if (account == owner) return true
      return false
    },
    destinations: function () {
      if (this.data.destinations.length == 0) return [this.data.destination];
      return this.data.destinations;
    },
  },
  methods: {
    formatEnd: function (block) {
      if (block == 0) return "Never";
      let date = formatDate(guessBlocktime(block));
      return "Block " + block + " (~" + date + ")";
    },
    refresh: function () {
      CallDNS("ResolveEntry", [this.name], (data, bla) => {
        this.data = data;
      });
    },
    unregister() {
      this.$router.push('/dns');
    }
  },
});
</script>
