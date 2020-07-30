<template id="account">
  <div class="prenet">
    <div class="title">
      <h1>Account Details <% hash %></h1>
    </div>
    <div v-if="!balance" class="column page-content">
      <div v-if="error" class="error"><% error %></div>
      <div v-else>Loading Account....</div>
    </div>
    <div v-else class="column page-content">
      <table class="data">
        <tr>
          <th>Account</th>
          <td><% formatAddr(hash, false, 50) %></td>
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
        <tr v-if="object && object[0] == 'ticket'">
          <th>Device Data</th>
          <td>
            <table class="data">
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
          <td>
            <table class="data">
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
          <td class="big">
            <table class="data">
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
      error: undefined,
      balance: undefined,
      stake: undefined,
      rawcode: undefined,
      codehash: undefined,
      storage: [],
      node: undefined,
      object: undefined,
      nonce: undefined
    };
  },
  computed: {
    type: function() {
      if (this.node) return "Miner";
      if (this.object) return "Device";
      if (this.rawcode == "0x") return "User (Human or Miner or Device)";
      if (this.codehash == FleetHash) return "Fleet";
      return "Contract";
    },
    code: function() {
      if (this.rawcode != '0x') return this.rawcode
      return undefined
    }
  },
  created: function() {
    this.update();
  },
  methods: {
    update: function() {
      this.acc = undefined;
      web3.eth.getBalance(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.balance = ret;
      });
      web3.eth.getNode(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.node = ret;
      });
      web3.eth.getObject(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.object = ret;
      });
      web3.eth.getCodeHash(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.codehash = ret;
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
      fetchStake(this.hash, stake => {
        this.stake = stake;
      });
    }
  },
  watch: {
    hash: function() {
      this.update();
    }
  }
});
</script>