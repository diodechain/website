<template id="vaccount">
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
          <account-link :hash="base" :length="15" :only-alias="true" />
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
          <td>
            <p><% valueToBalance(stake) %> Staked</p>
            <p v-if="notnull(stake1)"><% valueToBalance(stake1) %> Staking</p>
            <p v-if="notnull(stake2)"><% valueToBalance(stake2) %> Unstaking</p>
            <p v-if="notnull(stake3)"><% valueToBalance(stake3) %> Withdrawable</p>
          </td>
        </tr>
        <tr>
          <th>Nonce</th>
          <td><% nonce %></td>
        </tr>
        <!-- <tr>
          <th>Last Transaction (UTC)</th>
          <td><% JSON.stringify(transaction) %></td>
        </tr> -->
        <tr v-if="object">
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
                  <account-link :hash="object.server_id" />
                </td>
              </tr>
              <tr v-if="object.block_number">
                <th>Last Block</th>
                <td><% web3.utils.hexToNumber(object.block_number) %></td>
              </tr>
              <tr v-if="object.epoch">
                <th>Epoch</th>
                <td><% web3.utils.hexToNumber(object.epoch) %></td>
              </tr>
              <tr>
                <th>Fleet</th>
                <td>
                  <account-link :hash="object.fleet_contract" />
                </td>
              </tr>
              <tr>
                <th>Connections</th>
                <td><% web3.utils.hexToNumber(object.total_connections) %></td>
              </tr>
              <tr>
                <th>Bytes</th>
                <td><% web3.utils.hexToNumber(object.total_bytes) %></td>
              </tr>
              <tr>
                <th>Preferred Servers</th>
                <td><% object.local_address %></td>
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
var VAccount = Vue.component("account", {
  template: document.getElementById("vaccount").innerHTML,
  props: { hash: String },
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      base: "",
      error: undefined,
      balance: undefined,
      stake: undefined,
      stake1: undefined,
      stake2: undefined,
      stake3: undefined,
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
    notnull: function (amount) {
      return amount != undefined && amount != "0x0000000000000000000000000000000000000000000000000000000000000000";
    },
    update: function () {
      this.acc = undefined;
      web3.eth.getBalance(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.balance = ret;
      });
      web3.eth.getNode(this.hash, true, (err, ret) => {
        this.err = undefined;
        if (err || ret[0] != "server") {
          this.node = undefined;
          return;
        }
        this.node = ret;
      });
      web3.eth.getObject(this.hash, true, (err, ret) => {
        this.err = undefined;
        if (err || (ret[0] != "ticketv2" && ret[0] != "ticket")) return;

        switch (ret[0]) {
          case "ticketv2":
            this.object = {
              server_id: ret[1],
              chain_id: ret[2],
              epoch: ret[3],
              fleet_contract: ret[4],
              total_connections: ret[5],
              total_bytes: ret[6],
              local_address: ret[7],
              device_signature: ret[8],
              server_signature: ret[9],
            };
            break;
          case "ticket":
            this.object = {
              server_id: ret[1],
              block_number: ret[2],
              fleet_contract: ret[3],
              total_connections: ret[4],
              total_bytes: ret[5],
              local_address: ret[6],
              device_signature: ret[7],
              server_signature: ret[7],
            };
            break;
          default:
            this.object = undefined;
            break;
        }
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
        else this.storage = ret.sort();
      });
      web3.eth.getTransactionCount(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.nonce = ret;
      });
      fetchStakeN(this.hash, (stake) => { this.stake = stake; },  0);
      fetchStakeN(this.hash, (stake) => { this.stake1 = stake; }, 1);
      fetchStakeN(this.hash, (stake) => { this.stake2 = stake; }, 2);
      fetchStakeN(this.hash, (stake) => { this.stake3 = stake; }, 3);
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
