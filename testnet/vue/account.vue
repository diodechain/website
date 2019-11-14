<template id="account">
  <div>
    <div class="title">
      <h1>Account Details <% hash %></h1>
    </div>
    <div v-if="!balance" class="column">
      <div v-if="error" class="error"><% error %></div>
      <div v-else>Loading Account....</div>
    </div>
    <div v-else class="column">
      <table class="data">
        <tr>
          <th>Account Hash</th>
          <td><% formatAddr(hash, false, 50) %></td>
        </tr>
        <tr>
          <th>Type</th>
          <td v-if="code == '0x'">User/Device</td>
          <td v-else>Contract</td>
        </tr>
        <tr>
          <th>Balance</th>
          <td><% balance %></td>
        </tr>
        <tr v-if="code != '0x'">
          <th>Code Hash</th>
          <td><% codehash %></td>
        </tr>
        <tr v-if="code != '0x'">
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
      code: undefined,
      codehash: undefined
    };
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
      web3.eth.getCodeHash(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.codehash = ret;
      });
      web3.eth.getCode(this.hash, (err, ret) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.code = ret;
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