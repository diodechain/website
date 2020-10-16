<template id="account_info">
  <div class="col-md-3 col-sm-3 padding-right-10">
    <table class="data" :style="'width: 100%;min-height:' + tableHeight + 'px'">
      <caption>
        <div class="marginized-bottom">Your Account</div>
        <div v-if="enabled">
          <div class="marginized">
            Name:
            <account-link :hash="account" :length="20"></account-link>
          </div>
          <div class="marginized">Balance: <% valueToBalance(balance) %></div>
          <slot></slot>
        </div>
        <div class="not-enabled" v-else>
          <button class="button" v-on:click="enable()">Enable MetaMask</button>
          <div v-if="error" v-html="error" class="error"></div>
          <div class="message">
            The Diode Network Explorer uses
            <a target="_blank" href="https://metamask.io">MetaMask</a> to
            authenticate your account. Please enable MetaMask to manage your
            settings. <br /><br />
            If you don’t have MetaMask installed, follow
            <a
              target="_blank"
              href="https://support.diode.io/article/uec3mloh9z-metamask"
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
