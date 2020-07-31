<template id="transactions">
  <div >
    <div class="title">
      <h1>Transaction Pool</h1>
    </div>
    <div class="column">
      <table class="data">
        <tr>
          <th>&nbsp;</th>
          <th>Value</th>
          <th>Gas Price</th>
          <th>Data</th>
          <th>Nonce</th>
        </tr>
        <tr :key="tx['hash']" v-for="tx in transactions">
          <td>
            <table class="inner">
              <tr>
                <th>Hash</th><td><% tx["hash"] %></td>
              </tr><tr>
                <th>From</th><td><account-link :hash="tx['from']" /></td>
              </tr><tr>
                <th>To</th><td><account-link :hash="tx['to']" /></td>
              </tr>
            </table>
          </td>
          <td><% tx["value"] %></td>
          <td><% tx["gasPrice"] %></td>
          <td class="big"><% tx["input"] %></td>
          <td><% tx["nonce"] %></td>
        </tr>
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
      transactions: []
    };
  },
  created: function() {
    this.update();
  },
  methods: {
    update: async function() {
      this.transactions = await web3.eth.getPool();
      console.log(this.transactions)
    }
  }
});
</script>