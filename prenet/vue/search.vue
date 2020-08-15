<template id="search-bar">
  <div class="input-button">
    <i v-on:click="selectInput" v-if="!value" class="fa fa-search search-icon"></i>
    <i v-on:click="clearSearch" v-else class="fa fa-times-circle"></i>
    <input
      type="text"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      ref="searchInput"
      placeholder="Search for accounts, blocks, etc."
      name="search"
    />
    <button type="submit" name="search" v-on:click="search">Search</button>
  </div>
</template>
<script>
var Search = Vue.component("search-bar", {
  template: document.getElementById("search-bar").innerHTML,
  delimiters: ["<%", "%>"],
  props: {
    blocks: [],
    results: Array,
    value: String,
    activated: Boolean,
    finished: Boolean,
  },
  data: () => {
    return {
      value: "",
      activated: false,
      finished: false,
      dnsNames: [],
      blocks: [],
      results: [],
    };
  },
  watch: {
    value: function (value, oldValue) {
      if (!value) {
        this.activated = false;
      }
    },
  },
  methods: {
    search: async function () {
      if (!this.value) {
        return;
      }

      this.value = this.value.trim();
      if (this.value.length === 0) {
        return;
      }

      this.finished = false;
      this.activated = true;

      this.$emit("update:finished", this.finished);
      this.$emit("update:activated", this.activated);

      this.results.splice(0, this.results.length);

      if (this.dnsNames.length === 0) {
        this.loadDnsNames();
      }

      for (let i in this.dnsNames) {
        let matchId = this.dnsNames[i]["key"].indexOf(this.value);

        if (matchId === -1) continue;

        let hash = valueToAddress(this.dnsNames[i]["value"].owner);
        this.selectSearchItem(hash, this.dnsNames[i]["key"], null, "Address");
      }

      let accounts = await web3.eth.getAllAccounts();

      for (let id in accounts) {
        let matchId = id.indexOf(this.value);

        if (matchId === -1) continue;

        let hash = accounts[id].codehash;
        this.selectSearchItem(id, null, hash);
      }

      let blockFound = false;

      for (let i in this.blocks) {
        let blockNumber = this.blocks[i].number.toString();
        let matchId = blockNumber.indexOf(this.value);
        let matchedvalue = this.blocks[i].number;

        if (matchId === NOT_FOUND_INDEX) {
          matchId = this.blocks[i].hash.indexOf(this.value);
          matchedvalue = this.blocks[i].hash;

          if (matchId === NOT_FOUND_INDEX) {
            continue;
          }
        }

        blockFound = true;
        this.selectSearchItem(blockNumber, matchedvalue, null, "Block");
      }

      let blockvalue = parseInt(this.value);

      if (!blockFound && !isNaN(blockvalue)) {
        let self = this;

        if (self.value.startsWith("0x")) {
          blockvalue = self.value;
        }

        try {
          await web3.eth.getBlock(blockvalue, false, function (error, block) {
            if (!error) {
              let matchedvalue = self.value.startsWith("0x")
                ? block.hash
                : null;
              self.selectSearchItem(block.number, matchedvalue, null, "Block");
            }
          });
        } catch (err) {}
      }

      if (this.value.startsWith("0x")) {
        let self = this;

        web3.eth.getTransaction(this.value, function (error, tran) {
          if (!error) {
            console.log(tran);
            self.selectSearchItem(tran.hash, tran.hash, null, "Transaction");
          }
        });
      }

      this.results.sort(function (a, b) {
        return b.matchCompleteness - a.matchCompleteness;
      });

      this.finished = true;

      this.$emit("update:finished", this.finished);
    },
    selectInput: function () {
      this.$refs.searchInput.focus();
    },
    clearSearch: function (params) {
      this.value = "";
      this.activated = false;
      this.results.splice(0, this.results.length);

      this.$emit("update:activated", this.activated);
      this.$emit("input", this.value);
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
    selectSearchItem(id, matchedvalue, hash, type) {
      if (!matchedvalue) {
        matchedvalue = id;
      }

      let result = {};
      result.id = id;
      result.matchCompleteness =
        (this.value.length / matchedvalue.length) * 100;
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

      if (matchedvalue === result.BNS) {
        result.BNS = "";
      }

      try {
        fetchStake(id, (stake) => {
          this.$set(result, "stake", valueToBalance(stake));
        });
      } catch (error) {}

      result.text = `${result.BNS ? result.BNS + "-" : ""}${matchedvalue}`;

      this.results.push(result);
    },
  },
});
</script>


