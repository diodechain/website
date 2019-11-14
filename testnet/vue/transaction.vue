<template id="transaction">
  <div>
    <div class="title">
      <h1>Transaction Details <% hash %></h1>
    </div>
    <div v-if="!tx" class="column">
      <div v-if="error" class="error"><% error %></div>
      <div v-else>Loading Transaction....</div>
    </div>
    <div v-else class="column">
      <table class="data">
        <tr>
          <th>Transaction Hash</th>
          <td><% tx.blockHash %></td>
        </tr>
        <tr>
          <th>Block</th>
          <td>
            <router-link :to="'/block/' + tx.blockNumber"><% tx.blockNumber %></router-link>
          </td>
        </tr>
        <tr>
          <th>From</th>
          <td><account-link :hash="tx.from"/></td>
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
          <th>Input</th>
          <td class="big"><% tx.input %></td>
        </tr>
        <tr>
          <th>Nonce</th>
          <td><% tx.nonce %></td>
        </tr>
        <tr>
          <th>To</th>
          <td><account-link :hash="tx.to" :only-alias="false" :length="50"></account-link></td>
        </tr>
        <tr>
          <th>Value</th>
          <td><% tx.value %> DIO</td>
        </tr>
        <tr>
          <th>Status</th>
          <td><% receipt.status %></td>
        </tr>
        <tr v-if="receipt.contractAddress">
          <th>New Contract Address</th>
          <td><account-link :hash="receipt.contractAddress" :onlyAlias="false" :length="50"></account-link></td>
        </tr>
        <tr>
          <th>Gas Used</th>
          <td><% receipt.gasUsed %></td>
        </tr>
        <tr>
          <th>Logs</th>
          <td class="big"><% receipt.logs %></td>
        </tr>
        <tr>
          <th>Cumulative Gas Used</th>
          <td><% receipt.cumulativeGasUsed %></td>
        </tr>
        <tr>
          <th>Transaction Index</th>
          <td><% receipt.transactionIndex %></td>
        </tr>
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
    return { tx: undefined, error: undefined, receipt: {} };
  },
  created: function() {
    this.update();
  },
  methods: {
    update: function() {
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
    }
  },
  watch: {
    hash: function() {
      this.update();
    }
  }
});
</script>