<template id="block">
  <div >
    <div class="title">
      <h1>Block Details <% number %></h1>
    </div>
    <div v-if="!block" class="column page-content">
      <div v-if="error" class="error"><% error %></div>
      <div v-else>Loading Block....</div>
    </div>
    <div v-else class="column page-content">
      <table class="data">
        <tr>
          <th>Block Hash</th>
          <td><% block.hash %></td>
        </tr>
        <tr>
          <th>Parent</th>
          <td v-if="validNumber">
            <router-link :to="`/block/${parentBlockNumber}`"><% parentBlockNumber %></router-link>
          </td>
          <td v-else>Genesis</td>
        </tr>
        <tr>
          <th>Timestamp</th>
          <td><% formatUnix(block.timestamp) %></td>
        </tr>
        <tr>
          <th>Miner</th>
          <td>
            <account-link :hash="block.miner" :length="50" :only-alias="false" />
          </td>
        </tr>
        <tr>
          <th>Transactions</th>
          <td v-if="block.transactions.length > 0">
            <div :key="tx" v-for="tx in block.transactions">
              <router-link :key="tx" :to="'/tx/' + tx"><% tx %></router-link>
            </div>
          </td>
          <td v-else>None</td>
        </tr>
        <tr>
          <th>Size</th>
          <td><% block.size %></td>
        </tr>
        <tr>
          <th>Gas Used</th>
          <td><% block.gasUsed %></td>
        </tr>
        <tr>
          <th>Gas Limit</th>
          <td><% block.gasLimit %></td>
        </tr>
        <tr>
          <th>Difficulty</th>
          <td><% block.difficulty %></td>
        </tr>
        <tr>
          <th>Total Difficulty</th>
          <td><% block.totalDifficulty %></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
var Block = Vue.component("block", {
  template: document.getElementById("block").innerHTML,
  props: { number: Number },
  delimiters: ["<%", "%>"],
  computed: {
    validNumber() {
      // see: https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getblockbynumber
      return this.number > 0 || this.number === "latest";
    },
    parentBlockNumber() {
      if (this.number === "latest") {
        return this.block.number - 1;
      } else {
        return this.number - 1;
      }
    }
  },
  data: () => {
    return { block: undefined, error: undefined };
  },
  created: function() {
    if (this.validNumber) {
      this.update();
    } else {
      this.$router.push("/");
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.number > 0 || to.params.number === "latest") {
      return next();
    }
    return next(false);
  },
  methods: {
    update: function() {
      this.block = undefined;
      web3.eth.getBlock(this.number, (err, block) => {
        this.err = undefined;
        if (err) this.error = err;
        else this.block = block;
      });
    }
  },
  watch: {
    number: function() {
      this.update();
    }
  }
});
</script>