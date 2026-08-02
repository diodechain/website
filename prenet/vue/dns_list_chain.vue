<template id="dns_list_chain">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1><% title %> v<% version %></h1>
      </div>
    </div>
    <div class="page-content">
      <div v-if="error">
        <b class="loading"><% error %></b>
      </div>
      <div v-else-if="names.length == 0">
        <b class="loading">Loading...</b>
      </div>
      <div v-else class="row align-start">
        <div class="col-md-9 col-sm-9">
          <table class="data" id="blockchain-names">
            <caption>
              <div class="col-md-12 no-padding">
                Registered Blockchain Names (<% names.length %>/<% size %>)
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
      </div>
    </div>
  </div>
</template>
<script>
var CHAIN_DNS_CALL_GAS = 50000000;
var CHAIN_DNS_INDEX_BATCH = 20;
var CHAIN_DNS_RESOLVE_BATCH = 10;

function createChainDNSList(options) {
  return Vue.component(options.componentName, {
    template: document.getElementById("dns_list_chain").innerHTML,
    delimiters: ["<%", "%>"],
    data: () => {
      return {
        title: options.title,
        contractAddress: options.contractAddress,
        blocks: {},
        names: [],
        version: 0,
        size: "loading",
        error: null,
        web3: new Web3(options.rpcUrl),
      };
    },

    created: async function () {
      try {
        this.version = web3.utils.toBN(await this.callDNS("Version", [])).toNumber();
        await this.loadNames();
      } catch (e) {
        console.error(options.title + " load failed:", e);
        this.error = "Failed to load BNS names";
      }
    },
    methods: {
      loadNames: async function () {
        let length = web3.utils.toBN(await this.callDNS("AllNamesLength", [])).toNumber();
        this.size = length;
        // Newest registrations are appended to namesIndex; load from the end first.
        for (let end = length; end > 0; end -= CHAIN_DNS_INDEX_BATCH) {
          let start = Math.max(0, end - CHAIN_DNS_INDEX_BATCH);
          let batch = [];
          for (let j = end - 1; j >= start; j--) {
            batch.push(this.callDNS("namesIndex", [j]));
          }
          let hashes = await Promise.all(batch);
          await this.resolve(hashes);
        }
      },
      resolve: async function (hashes) {
        for (let i = 0; i < hashes.length; i += CHAIN_DNS_RESOLVE_BATCH) {
          let chunk = hashes.slice(i, i + CHAIN_DNS_RESOLVE_BATCH);
          for (let hash of chunk) {
            let name = await this.callDNS("names", [hash]);
            let nr = name.leaseEnd - 518400;
            let block = this.blocks[nr];
            if (!block) block = this.blocks[nr] = await this.web3.eth.getBlock(nr);
            name.registration = new Date(block.timestamp * 1000).toLocaleString();
            this.names.push(name);
          }
        }
      },
      callDNS: async function (method, params) {
        let abi = dnsMethods[method];
        let call = this.web3.eth.abi.encodeFunctionCall(abi, params);
        let data = await this.web3.eth.call({
          to: this.contractAddress,
          data: call,
          gas: CHAIN_DNS_CALL_GAS,
          gasPrice: 0,
        });

        if (abi.outputs) {
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
}

var BDNSList = createChainDNSList({
  componentName: "dns_list_base",
  title: "Base Blockchain Name System",
  rpcUrl: "wss://base.gateway.tenderly.co",
  contractAddress: "0x87C1D1304944a9EA16aF18CB777E3CeE0D3dACEa",
});

var MDNSList = createChainDNSList({
  componentName: "dns_list_mb",
  title: "Moonbeam Blockchain Name System",
  rpcUrl: "wss://eu-e84146e5.dedicated-rpc-nodes.com/api/ffef1787-e88a-48b2-97ba-c0959d79fb33",
  contractAddress: "0x8a093e3A83F63A00FFFC4729aa55482845a49294",
});

var OasisDNSList = createChainDNSList({
  componentName: "dns_list_oasis",
  title: "Oasis Sapphire Blockchain Name System",
  rpcUrl: "wss://sapphire.oasis.io/ws",
  contractAddress: "0x6cbf10355F8a16F7cd2F7aa762c08374959cE1bD",
});
</script>
