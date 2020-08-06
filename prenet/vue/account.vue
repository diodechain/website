<template id="account">
  <div>
    <div class="title row">
      <div class="col-md-2  ">
        <h1>Account Detail</h1>
      </div>
      <div class="col-md-3">
        <search-bar
          v-bind:results.sync="searchResults"
          v-model="searchTerm"
          v-bind:activated.sync="searchActivated"
          v-bind:finished.sync="searchFinished"
        />
      </div>
      <div class="col-md-4  col-md-offset-3">
        <p>
          connected to
          <account-link :hash="base" :length="50" :only-alias="false" />
        </p>
      </div>
    </div>
    <div v-if="!balance" class="column page-content">
      <div v-if="error" class="error"><% error %></div>
      <div v-else>Loading Account....</div>
    </div>
    <div v-else class="column page-content">
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
      <table v-else class="data transposed">
        <tr>
          <th colspan="2">Account: <% formatAddr(hash, false, 50) %> </th>
        </tr>
        <tr>
          <th>Type</th>
          <td><% type %></td>
        </tr>
        <tr>
          <th>Balance</th>
          <td><% valueToBalance(balance) %></td>
        </tr>
        <tr>
          <th>Stake</th>
          <td><% valueToBalance(stake) %></td>
        </tr>
        <tr>
          <th>Nonce</th>
          <td><% nonce %></td>
        </tr>
        <!-- <tr>
          <th>Last Transaction (UTC)</th>
          <td><% JSON.stringify(transaction) %></td>
        </tr> -->
        <tr v-if="object && object[0] == 'ticket'">
          <th>Device Data</th>
          <td class="big">
            <table class="data nested">
              <tr>
                <th>Gateway link</th>
                <td>
                  <a
                    :href="'https://' + resolveName(hash) + '.diode.link'"
                  >https://<%resolveName(hash)%>.diode.link</a>
                </td>
              </tr>
              <tr>
                <th>Last Relay</th>
                <td>
                  <account-link :hash="object[1]" />
                </td>
              </tr>
              <tr>
                <th>Last Block</th>
                <td><% web3.utils.hexToNumber(object[2]) %></td>
              </tr>
              <tr>
                <th>Fleet</th>
                <td>
                  <account-link :hash="object[3]" />
                </td>
              </tr>
              <tr>
                <th>Connections</th>
                <td><% web3.utils.hexToNumber(object[4]) %></td>
              </tr>
              <tr>
                <th>Bytes</th>
                <td><% web3.utils.hexToNumber(object[5]) %></td>
              </tr>
              <tr>
                <th>Address</th>
                <td><% object[6] %></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr v-if="node">
          <th>Miner Data</th>
          <td class="big">
            <table class="data nested">
              <tr>
                <th>Host</th>
                <td><% node[1] %></td>
              </tr>
              <tr>
                <th>Edge Port</th>
                <td><% web3.utils.hexToNumber(node[2]) %></td>
              </tr>
              <tr>
                <th>Peer Port</th>
                <td><% web3.utils.hexToNumber(node[3]) %></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr v-if="code">
          <th>Code Hash</th>
          <td><% codehash %></td>
        </tr>
        <tr v-if="code">
          <th>Storage</th>
          <td class="big" :style="{ height : ((storage.length * 50) + 140) + 'px' }">
            <table class="data nested">
              <tr>
                <th>Address</th>
                <th>Value</th>
              </tr>
              <tr :key="kv[0]" v-for="kv in storage">
                <td>
                  <nobr :title="kv[0]"><% formatStorageKey(kv[0]) %></nobr>
                </td>
                <td>
                  <storage-value :value="kv[1]" />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr v-if="code">
          <th>Code</th>
          <td class="big"><% code %></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
var Account = Vue.component("account", {
  template: document.getElementById("account").innerHTML,
  props: { hash: String },
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      base: "",
      error: undefined,
      balance: undefined,
      stake: undefined,
      rawcode: undefined,
      codehash: undefined,
      storage: [],
      node: undefined,
      object: undefined,
      nonce: undefined,
      transaction: undefined,
      searchTerm: "",
      searchActivated: false,
      searchFinished: false,
      searchResults: [],
    };
  },
  computed: {
    type: function () {
      if (this.node) return "Miner";
      if (this.object) return "Device";
      if (this.rawcode == "0x") return "User (Human or Miner or Device)";
      if (this.codehash == FleetHash) return "Fleet";
      return "Contract";
    },
    code: function () {
      if (this.rawcode != "0x") return this.rawcode;
      return undefined;
    },
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
      this.acc = undefined;
      web3.eth.getBalance(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.balance = ret;
      });
      web3.eth.getNode(this.hash, true, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.node = ret;
      });
      web3.eth.getObject(this.hash, true, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.object = ret;
      });
      web3.eth.getCodeHash(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.codehash = ret;

        //  web3.eth.getBlock(this.hash, 0, (err, ret) => {
        //   this.err = undefined;
        //   if (err) this.error = err;
        //   else this.transaction = ret;
        // });
      });
      web3.eth.getCode(this.hash, (err, ret) => {
        this.err = undefined;
        this.rawcode = undefined;
        if (err) this.error = err;
        else this.rawcode = ret;
      });
      web3.eth.getStorage(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.storage = ret;
      });
      web3.eth.getTransactionCount(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.nonce = ret;
      });
      fetchStake(this.hash, (stake) => {
        this.stake = stake;
      });
    },
  },
  watch: {
    hash: function () {
      this.searchTerm = "";
      this.searchActivated = false;
      this.searchFinished = false;
      this.searchResults = [];

      this.update();
    },
  },
});
</script>
