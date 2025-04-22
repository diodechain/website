<template id="account_info">
  <div class="col-md-3 col-sm-3 padding-right-10">
    <table class="data" :style="'width: 100%;min-height:' + tableHeight + 'px'">
      <caption>
        <div class="marginized-bottom" style="font-size: 1.5rem; font-weight: bold;">Your Account</div>
        <div v-if="enabled">
          <div class="marginized">
            <strong>Name:</strong>
            <account-link :hash="account" :length="20"></account-link>
          </div>
            <div class="marginized"><strong>Balance:</strong> <% valueToBalance(balance) %></div> 
          <slot></slot>
        </div>
        <div class="not-enabled" v-else>
          <button class="button" v-on:click="Wallet.enable()">Enable MetaMask</button>
          <div v-if="error" v-html="error" class="error"></div>
          <div class="message">
            The Diode Network Explorer uses
            <a target="_blank" href="https://metamask.io">MetaMask</a> to
            authenticate your account. Please enable MetaMask to manage your
            settings. <br /><br />
            If you don’t have MetaMask installed, follow
            <a
              target="_blank"
              href="https://network.docs.diode.io/docs/faq/configure-metamask/"
              >these instructions</a
            >
            to get started.
          </div>
        </div>
      </caption>
    </table>
  </div>
</template>
<script>
Vue.component("account-info", {
  template: document.getElementById("account_info").innerHTML,
  delimiters: ["<%", "%>"],
  props: { tableHeight: { default: 300 } },
  data: () => {
    return {
      enabled: false,
      account: false,
      balance: "0",
      error: undefined,
    };
  },
  created: function () {
    Wallet.subscribe(this);
  },
});
</script>
