<template id="search-bar">
  <div class="search">
    <i v-on:click="selectInput" v-if="!searchdata.searchTerm" class="fa fa-search search-icon"></i>
    <i v-on:click="clearSearch" v-else class="fa fa-times-circle"></i>
    <input
      type="text"
      v-model="searchdata.searchTerm"
      ref="searchInput"
      placeholder="Search for accounts, blocks, etc."
      name="search"
    />
    <button type="submit" v-on:click="search">Search</button>
  </div>
</template>
<script>
var Search = Vue.component("search-bar", {
  template: document.getElementById("search-bar").innerHTML,
  delimiters: ["<%", "%>"],
  props: {
    // blocks: [],
    // // searchResults: Array,
    // searchTerm: String,
    // searchActivated: Boolean,
    // searchFinished: Boolean,
    // searchdata: Object
  },
  data: () => {
    return {
      searchdata: {
        searchTerm: "",
        searchActivated: false,
        searchFinished: false,
        blocks: [],
        searchResults: []
      },
      dnsNames: [],
    };
  },
  watch: {
    searchTerm: function (value, oldValue) {
      if (!value) {
        this.searchActivated = false;
      }
    },
  },
  methods: {
    search: async function () {
      if (!this.searchdata.searchTerm) { return; }

      this.searchdata.searchTerm = this.searchdata.searchTerm.trim();
      if (this.searchdata.searchTerm.length === 0) {
        return;
      }

      this.searchdata.searchFinished = false;
      this.searchdata.searchActivated = true;

      this.$emit('update:searchdata', this.searchdata);

      this.searchdata.searchResults.splice(0, this.searchdata.searchResults.length);

      if (this.dnsNames.length === 0) {
        this.loadDnsNames();
      }

      for (let i in this.dnsNames) {
        let matchId = this.dnsNames[i]["key"].indexOf(this.searchTerm);

        if (matchId === -1) continue;

        let hash = valueToAddress(this.dnsNames[i]["value"].owner);
        this.selectSearchItem(hash, this.dnsNames[i]["key"], null, "Address");
      }

      let accounts = await web3.eth.getAllAccounts();

      for (let id in accounts) {
        let matchId = id.indexOf(this.searchdata.searchTerm);

        if (matchId === -1) continue;

        let hash = accounts[id].codehash;
        this.selectSearchItem(id, null, hash);
      }

      let blockFound = false;

      for (let i in this.searchdata.blocks) {
        let blockNumber = this.searchdata.blocks[i].number.toString();
        let matchId = blockNumber.indexOf(this.searchdata.searchTerm);
        let matchedTerm = this.searchdata.blocks[i].number;

        if (matchId === NOT_FOUND_INDEX) {
          matchId = this.searchdata.blocks[i].hash.indexOf(this.searchdata.searchTerm);
          matchedTerm = this.blocks[i].hash;

          if (matchId === NOT_FOUND_INDEX) {
            continue;
          }
        }

        blockFound = true;
        this.selectSearchItem(blockNumber, matchedTerm, null, "Block");
      }

      let blockSearchTerm = parseInt(this.searchdata.searchTerm);

      if (!blockFound && !isNaN(blockSearchTerm)) {
        let self = this;

        if (self.searchdata.searchTerm.startsWith("0x")) {
          blockSearchTerm = self.searchdata.searchTerm;
        }

        try {
          await web3.eth.getBlock(blockSearchTerm, false, function (
            error,
            block
          ) {
            if (!error) {
              let matchedTerm = self.searchdata.searchTerm.startsWith("0x")
                ? block.hash
                : null;
              self.selectSearchItem(block.number, matchedTerm, null, "Block");
            }
          });
        } catch (err) {}
      }

      if (this.searchdata.searchTerm.startsWith("0x")) {
        let self = this;

        web3.eth.getTransaction(this.searchdata.searchTerm, function (error, tran) {
          if (!error) {
            console.log(tran);
            self.selectSearchItem(tran.hash, tran.hash, null, "Transaction");
          }
        });
      }

      this.searchdata.searchResults.sort(function (a, b) {
        return b.matchCompleteness - a.matchCompleteness;
      });

      this.searchdata.searchFinished = true;

      this.$emit('update:searchdata', this.searchdata);
    },
    selectInput: function () {
      this.$refs.searchInput.focus();
    },
    clearSearch: function (params) {
      this.searchTerm = "";
      this.searchActivated = false;
      this.searchResults.splice(0, this.searchResults.length);
    },
    loadDnsNames() {
      for (const key in DNSCache) {
        if (DNSCache.hasOwnProperty(key)) {
          const element = DNSCache[key];

          let item = {};
          item["value"] = element;

          if (isAddress(key)) {
            item["key"] = element.name;
          } else {
            item["key"] = key;
          }

          this.dnsNames.push(item);
        }
      }
    },
    selectSearchItem(id, matchedTerm, hash, type) {
      if (!matchedTerm) {
        matchedTerm = id;
      }

      let result = {};
      result.id = id;
      result.matchCompleteness =
        (this.searchTerm.length / matchedTerm.length) * 100;
      result.type = type;

      if (hash) {
        if (hash == FleetHash) {
          result.type = "Fleet";
        } else if (hash == NullHash) {
          result.type = "Wallet";
        } else {
          result.type = "Contract";
        }

        result.isAddress = true;
      }

      result.stake = "";
      result.BNS = DNSCache[id] ? DNSCache[id].name : undefined;

      if (matchedTerm === result.BNS) {
        result.BNS = "";
      }

      try {
        fetchStake(id, (stake) => {
          this.$set(result, "stake", valueToBalance(stake));
        });
      } catch (error) {}

      result.text = `${result.BNS ? result.BNS + "-" : ""}${matchedTerm}`;

      this.searchResults.push(result);
    },
  },
});
</script>


