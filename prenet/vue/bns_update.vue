<template id="bns_update">
  <div v-if="enabled && editable">
    <div v-if="notUnregister" class="input-button white marginized-top">
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
    <div v-else>
      <button
        v-on:click="click()"
        :disabled="spinning"
        class="button"
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
    destination: { default: "" },
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
    };
  },
  computed: {
    editable: function () {
      let owner = valueToAddress(this.owner);
      let account = valueToAddress(this.account);
      if (account == owner) return true
      if (this.operation == "update" && (owner == undefined || owner == NullAddr)) return true
      return false
    },
    label: function () {
      let op = this.operation 
      return op.charAt(0).toUpperCase() + op.slice(1);
    },
    notUnregister: function () {
      let op = this.operation.toLowerCase()
      return op !== 'unregister'
    }
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
        case "unregister":
          return Wallet.runDNS("Unregister", [this.name.name]);
        default:
          throw "invalid operation '" + this.operation + "'"
      }
    },
  },
});
</script>
