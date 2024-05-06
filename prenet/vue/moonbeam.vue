<template id="moonbeam">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Moonbeam Accounts overview</h1>
      </div>
    </div>
    <div class="page-content">
      <div v-if="accounts.length == 0">
        <b class="loading">Loading...</b>
      </div>
      <div v-else class="row align-start">
        <div class="col-md-9 col-sm-9" v-if="accounts.length !== 0">
          <table class="data" id="blockchain-accounts">
            <caption>
              <div class="col-md-12 no-padding">
                Diode CallPermit TX Relay Nodes created a total of <% total %> transactions.
                  <br />
                  <br />
              </div>
            </caption>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Transactions</th>
              <th>Balance</th>
            </tr>
            <tr v-for="acc in accounts">
              <td>
                <% acc.name %>
              </td>
              <td><a :href="'https://moonscan.io/address/' + acc.address">
                  <% acc.address %>
                </a></td>
              <td>
                <% acc.nonce %>
              </td>
              <td v-if="(acc.balance + '').length == 21">
                <% acc.pbalance %> GLMR
              </td>
              <td v-else style="color: red">
                <% acc.pbalance %> GLMR
              </td>
            </tr>
          </table>
        </div>
        <div v-else class="col-md-9 col-sm-9">
          <table class="data" style="width: 100%">
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
var Moonbeam = Vue.component("moonbeam", {
  template: document.getElementById("moonbeam").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      total: '(loading)',
      seeds: {
        "0x937c492a77ae90de971986d003ffbc5f8bb2232c": "eu1",
        "0xae699211c62156b8f29ce17be47d2f069a27f2a6": "eu2",
        "0xceca2f8cf1983b4cf0c1ba51fd382c2bc37aba58": "us1",
        "0x7e4cd38d266902444dc9c8f7c0aa716a32497d0b": "us2",
        "0x68e0bafdda9ef323f692fc080d612718c941d120": "as1",
        "0x1350d3b501d6842ed881b59de4b95b27372bfae8": "as2",
        "0x7102533b13b950c964efd346ee15041e3e55413f": "migration",
      },
      accounts: [],
      web3: new Web3("wss://moonbeam.api.onfinality.io/ws?apikey=49e8baf7-14c3-4d0f-916a-94abf1c4c14a")
    };
  },

  created: async function () {
    for (let seed in this.seeds) {
      let node = {
        address: seed,
        name: this.seeds[seed],
        balance: await this.web3.eth.getBalance(seed),
        nonce: await this.web3.eth.getTransactionCount(seed),
      }
      node.pbalance = this.web3.utils.fromWei(node.balance, 'ether');
      this.accounts.push(node);
    }

    let total = 0;
    for (let i = 0; i < this.accounts.length; i++) {
      total += this.accounts[i].nonce;
    }
    this.total = total;
  },
});
</script>
