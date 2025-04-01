<template id="foundation">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Diode L1 Foundation Accounts overview</h1>
      </div>
    </div>
    <div class="page-content">
      <div v-if="accounts.length == 0">
        <b class="loading">Loading...</b>
      </div>
      <div v-else class="row align-start">
        <div class="col-md-12">
          <table class="data" id="blockchain-accounts">
            <caption>
              <div class="col-md-12 no-padding">
                Diode Foundation created a total of <% formatNumber(total) %> transactions
                and controls a total of <% formatNumber(totalTokens) %> DIODE on the Diode L1 chain.
              </div>
            </caption>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Transactions</th>
              <th>Balance</th>
              <th>Locked Stake</th>
              <th>Unlocked Stake</th>
            </tr>
            <tr v-for="acc in accounts">
              <td>
                <% acc.name %>
              </td>
              <td><a :href="'https://diode.io/prenet/#/address/' + acc.address">
                  <% acc.address %>
                </a></td>
              <td>
                <% acc.nonce %>
              </td>
              <td>
                <% formatNumber(acc.pbalance) %> DIODE
              </td>
              <td>
                <% formatNumber(Number(acc.stake[0]) + Number(acc.stake[1]) + Number(acc.stake[2])) %> DIODE
              </td>
              <td>
                <% formatNumber(acc.stake[3]) %> DIODE
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var Foundation = Vue.component("foundation", {
  template: document.getElementById("foundation").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      total: '(loading)',
      totalTokens: '(loading)',
      seeds: {
        "0x937c492a77ae90de971986d003ffbc5f8bb2232c": "EU 1",
        "0xae699211c62156b8f29ce17be47d2f069a27f2a6": "EU 2",
        "0xceca2f8cf1983b4cf0c1ba51fd382c2bc37aba58": "US 1",
        "0x7e4cd38d266902444dc9c8f7c0aa716a32497d0b": "US 2",
        "0x68e0bafdda9ef323f692fc080d612718c941d120": "AS 1",
        "0x1350d3b501d6842ed881b59de4b95b27372bfae8": "AS 2",
        "0xbada81fae68925fec725790c34b68b5faca90d45": "Faucet 1",
        "0x34e3961098de3348b465cc82791bd0f7ebce3ecd": "Faucet 2",
        "0xc0c416b326133d74335e6828d558efe315bd597e": "Faucet 3",
        "0x58cc80f5526594f07f33fd4be4aef153bab602b2": "Faucet 4",
        "0x45aa0730cf4216f7195fc1f5903a171a1faa5209": "Faucet 5",
        "0x96cde043e986040cb13ffafd80eb8ceac196fb84": "Fleet Accountant",
        "0x1000000000000000000000000000000000000000": "Foundation MultiSig",

      },
      accounts: [],
      web3: web3
    };
  },

  created: async function () {
    this.totalTokens = 0;
    for (let seed in this.seeds) {
      let node = {
        address: seed,
        name: this.seeds[seed],
        balance: await this.web3.eth.getBalance(seed),
        nonce: await this.web3.eth.getTransactionCount(seed),
        stake: [0, 0, 0, 0]
      }
      node.pbalance = Number(this.web3.utils.fromWei(node.balance, 'ether')).toFixed(0);
      this.totalTokens += Number(node.pbalance);
      for (let i = 0; i < 4; i++) {
        fetchStakeN(node.address, (stake) => { 
            node.stake[i] = this.web3.utils.fromWei(stake, 'ether'); 
            this.totalTokens += Number(node.stake[i]);
        }, i);
      }
      this.accounts.push(node);
    }

    let total = 0;
    for (let i = 0; i < this.accounts.length; i++) {
      total += this.accounts[i].nonce;
    }
    this.total = total;
  },

  methods: {
    formatNumber(num) {
      if (num == '(loading)') return num;
      let n = Number(num).toFixed(0);
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
});
</script>
