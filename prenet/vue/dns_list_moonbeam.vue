<template id="dns_list_mb">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>Moonbeam Blockchain Name System v<% version %></h1>
      </div>
    </div>
    <div class="page-content">
      <div v-if="Object.entries(names).length == 0">
        <b class="loading">Loading...</b>
      </div>
      <div v-else class="row align-start">
        <div class="col-md-9 col-sm-9" v-if="Object.entries(names).length !== 0">
          <table class="data" id="blockchain-names">
            <caption>
              <div class="col-md-12 no-padding">
                Registered Blockchain Names
                <br />
                <br />
              </div>
            </caption>
            <tr>
              <th>Name</th>
              <th>Destination</th>
              <th>Owner</th>
              <th>Registration</th>
            </tr>
            <tr v-for="name in names">
              <td><% name.name %></td>
              <td><% name.destination %></td>
              <td><% name.owner %></td>
              <td><% name.registration %></td>
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
var MDNSList = Vue.component("dns_list_mb", {
  template: document.getElementById("dns_list_mb").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      hashes: [],
      names: [],
      version: 0,
      web3: new Web3("wss://moonbeam.api.onfinality.io/ws?apikey=49e8baf7-14c3-4d0f-916a-94abf1c4c14a")
    };
  },

  created: async function () {
    this.version = web3.utils.hexToNumber(await this.callDNS("Version", []));
    
    let index = 0;
    let hash = "0x";
    do {
      hash = await this.callDNS("namesIndex", [index++]);
      this.hashes.push(hash);
      let name = await this.callDNS("names", [hash]);
      let block = await this.web3.eth.getBlock(name.leaseEnd - 518400);
      name.registration = new Date(block.timestamp * 1000).toLocaleString();
      this.names.push(name);
    } while (hash != "0x");
  },
  methods: {
    callDNS: async function (method, params, callback) {
      let abi = dnsMethods[method];
      let call = this.web3.eth.abi.encodeFunctionCall(abi, params)
      let data = await this.web3.eth.call({
          to: "0x8a093e3A83F63A00FFFC4729aa55482845a49294",
          data: call,
          gasPrice: 0
      })

      if (abi.outputs) {
        console.log(abi.outputs[0], data);
        if (abi.outputs[0].components) {
          data = this.web3.eth.abi.decodeParameters(abi.outputs[0].components, data);
        } else {
          data = this.web3.eth.abi.decodeParameter(abi.outputs[0], data);
        }
      }
      return data;
    },
  },
});
</script>
