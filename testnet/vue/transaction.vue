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
          <td><% formatAddr(tx.to) %></td>
        </tr>
        <tr>
          <th>Value</th>
          <td><% tx.value %> DIO</td>
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
    return { tx: undefined, error: undefined };
  },
  created: function() {
    this.update();
  },
  methods: {
    update: function() {
      this.tx = undefined;
      web3.eth.getTransaction(this.hash, (err, tx) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.tx = tx;
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