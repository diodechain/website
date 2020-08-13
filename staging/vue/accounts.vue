<template id="accounts">
  <div>
    <div class="title">
      <h1>Account Overview</h1>
    </div>
    <div class="column">
      <table class="data">
        <tr>
          <th>Account</th>
          <th>Type</th>
          <th>Balance</th>
          <th>Stake</th>
        </tr>
        <tr :key="id" v-for="(acc, id) in accounts">
          <td>
            <account-link :hash="id" />
          </td>
          <td><% acc["type"] %></td>
          <td><% valueToBalance(acc["balance"]) %></td>
          <td><% acc["stake"] %></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
var Accounts = Vue.component("accounts", {
  template: document.getElementById("accounts").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      accounts: {}
    };
  },
  computed: {
    type: function() {
      if (this.node) return "Miner";
      if (this.object) return "Device";
      if (this.code == "0x") return "User (Human or Miner or Device)";
      return "Contract";
    }
  },
  created: function() {
    this.update();
  },
  methods: {
    update: async function() {
      let accounts = await web3.eth.getAllAccounts();
      for (let id in accounts) {
          hash = accounts[id].codehash
          if (hash == FleetHash) accounts[id].type = 'Fleet';
          else if (hash == NullHash) accounts[id].type = 'Wallet';
          else accounts[id].type = 'Contract';

          accounts[id].stake = 'pending';
      }
      this.accounts = accounts;

      for (let id in accounts) {
        fetchStake(id, stake => {
          this.$set(this.accounts[id], "stake", valueToBalance(stake))
        })
      }
    }
  }
});
</script>