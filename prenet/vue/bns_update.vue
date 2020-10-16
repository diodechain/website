<template id="bns_update">
  <div v-if="enabled && editable">
    <div class="input-button white marginized-top">
      <input
        class="no-icon"
        type="text"
        v-model.trim="destination"
        placeholder="0x1234556..."
      />
      <button
        v-on:click="click(destination)"
        :disabled="!web3.utils.isAddress(destination) || spinning"
      >
        <img v-show="spinning" class="btn-loading" src="images/spinning.gif" />
        <span><% label %></span>
      </button>
    </div>
  </div>
</template>
<script>
Vue.component("bns-update", {
  template: document.getElementById("bns_update").innerHTML,
  delimiters: ["<%", "%>"],
  props: {
    name: { required: true },
    owner: { required: true },
    operation: { default: "update" },
    on_update: undefined,
  },
  data: () => {
    return {
      enabled: false,
      account: undefined,
      balance: 0,
      error: undefined,
      spinning: false,
      destination: undefined,
    };
  },
  computed: {
    editable: function () {
      let owner = valueToAddress(this.owner);
      let account = valueToAddress(this.account);
      return account == owner || owner == undefined;
    },
    label: function () {
      let op = this.operation 
      return op.charAt(0).toUpperCase() + op.slice(1);
    },
  },
  created: function () {
    Wallet.subscribe(this);
  },
  methods: {
    click: async function (destination) {
      this.spinning = true;
      await this.op(destination);
      this.spinning = false;
      if (this.on_update) {
        this.on_update();
      }
    },
    op: function (address) {
      switch (this.operation) {
        case "update":
          return Wallet.runDNS("Register", [this.name, address]);
        case "transfer":
          return Wallet.runDNS("TransferOwner", [this.name, address]);
        default:
          throw "invalid operation '" + this.operation + "'"
      }
    },
  },
});
</script>
