<template id="dns_list">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Blockchain Name System v<% version %></h1>
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
        <p v-else>
          Reconnecting...
        </p>
      </div>
    </div>
    <div class="page-content">
      <div v-if="Object.entries(names).length == 0">
        <b class="loading">Loading...</b>
      </div>
      <table class="data" v-else-if="searchTerm && searchActivated">
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
      <div v-else class="row align-start">
        <account-info :height="tableHeight"></account-info>
        <div class="col-md-9 col-sm-9">
          <table class="data" v-if="Object.entries(names).length !== 0" id="blockchain-names">
            <caption>
              <div class="col-md-12 no-padding">
                Registered Blockchain Names
                <br />
                <br />
              </div>
              <div v-if="enabled" class="col-md-4 no-padding">
                <div class="input-button">
                  <input
                    type="text"
                    v-model.trim="newName"
                    placeholder="Enter Name to Register"
                    class="no-icon"
                  />
                  <button
                    class="button"
                    v-on:click="addName(newName)"
                    :disabled="newName.length <= 7"
                  >Add</button>
                </div>
              </div>
            </caption>
            <tr>
              <th>Name</th>
              <th>Destination</th>
              <th>Owner</th>
            </tr>
            <tr v-bind:key="name.name" v-for="name in sortedNames">
              <td>
                <router-link :to="'/dns/' + name.name"><% name.name %></router-link>
              </td>
              <td>
                <span v-if="isAddress(name.destination)">
                  <account-link :hash="valueToAddress(name.destination)" mode="address"></account-link>
                </span>
                <span v-else-if="!name.destination">Loading</span>
                <span v-else><% name.destination %></span>

                <bns-update :name="name.name" :owner="name.owner"></bns-update>
              </td>
              <td>
                <span v-if="isAddress(name.owner)">
                  <storage-value v-if="name.owner" :value="name.owner" />
                </span>
                <span v-else-if="!name.owner">Loading</span>
                <span v-else><% name.owner %></span>
              </td>
            </tr>
          </table>
          <table class="data" v-else style="width: 100%">
            <caption>No BNS available</caption>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var DNSList = Vue.component("dns_list", {
  template: document.getElementById("dns_list").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      base: "",
      enabled: false,
      account: "",
      error: false,
      newName: "",
      names: {},
      submitDns: false,
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
      balance: 0,
      tableHeight: 300,
      version: 0,
    };
  },

  computed: {
    sortedNames () {
      let ret = Object.entries(this.names).sort(([key1, value1], [key2, value2]) => {
          if (!value2 || !value1) {
            return false
          }
          if (value2.added != value1.added) {
              return value2.added
          }
          if (this.enabled) {
              let owner1 = valueToAddress(value1.owner)
              owner1 = owner1 == this.account || owner1 == undefined
              let owner2 = valueToAddress(value2.owner)
              owner2 = owner2 == this.account || owner2 == undefined
              if (owner1 != owner2) return owner2;
          }
          return key1 > key2
      });

      return Object.fromEntries(ret)
    }
  },

  created: function () {
    let self = this;
    getBase(function (base) {
      self.base = base;
    });

    CallDNS("Version", [], (vsn) => {
      this.version = web3.utils.hexToNumber(vsn);
    });

    this.refreshNames()
    Wallet.subscribe(this)
    setInterval(() => {
      this.refreshNames();
    }, 1000);
  },
  methods: {
    refreshNames: function () {
      for (key in DNSCache) {
        let name = DNSCache[key].name;
        let entry = {
          name,
          destination: valueToAddress(DNSCache[key].destination),
          owner: valueToAddress(DNSCache[key].owner),
        };
        this.$set(this.names, name, entry);
      }

      let mainTable = document.getElementById("blockchain-names");
      if (mainTable) {
        this.tableHeight = mainTable.clientHeight - mainTable.offsetTop;
      }
    },
    addName: function (name) {
      if (!name || this.names[name]) return;
      name = name.toLowerCase();

      let entry = {
        name,
        destination: "Not set yet",
        owner: "Not set yet",
        added: true
      };
      this.$set(this.names, name, entry);
    },
    reloadName: function (name) {
      this.resolve(name, (dest) => {
        this.names[name].destination = valueToAddress(dest);
        this.$set(this.names, name, this.names[name]);
      });
    },
    resolve(name, callback) {
      CallDNS("Resolve", [name], callback);
    },
    unregister(name) {
      if (!this.names[name.name]) return;
      this.$delete(this.names, name.name);
    }
  },
});
</script>
