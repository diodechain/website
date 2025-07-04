<template id="icp">
  <div>
    <div class="title row">
      <div class="col-md-3 no-padding">
        <h1>ICP Zone Availability Canister Overview</h1>
      </div>
    </div>
    <div class="page-content">
      <div v-if="accounts.length == 0">
        <b class="loading">Loading...</b>
      </div>
      <div v-else class="row align-start">
        <div class="col-md-9 col-sm-9">
          <table class="data" id="blockchain-accounts">
            <caption>
              <div class="col-md-12 no-padding">
                There are a total of <% total %> Zone Availability Canisters.
                  <br />
                  <br />
              </div>
            </caption>
            <tr>
              <th width="10%">Nr</th>
              <th width="40%">Canister</th>
              <th width="40%">Address</th>
              <th width="10%">Version</th>
            </tr>
            <tr v-for="acc in accounts">
              <td>
                <% acc.nr %>
              </td>
              <td><a :href="'https://dashboard.internetcomputer.org/canister/' + acc.address">
                  <% acc.address %>
              </a></td>
              <td>
                <% acc.zone_id %>
              </td>
              <td>
                <% acc.version %>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var ICP = Vue.component("icp", {
  template: document.getElementById("icp").innerHTML,
  delimiters: ["<%", "%>"],
  data: () => {
    return {
      canisters: [],
      accounts: [],
      total: '(loading)',
    };
  },

  created: async function () {
    this.canisters = await CanisterFactory.get_cycles_manager_children();
    this.canisters = this.canisters.reverse();
    this.total = this.canisters.length;
    for (let i in this.canisters) {
      let can = this.canisters[i];
      let canister_id = can.toString();
      let zac = ZoneAvailabilityCanister(canister_id)
      let version;
      let zone_id;

      try {
        version = await zac.get_version();
      } catch (e) {
        version = "Unknown";
      }
      try {
        zone_id = await zac.get_zone_id();
      } catch (e) {
        zone_id = "Unknown";
      }
      this.accounts.push({ 
        nr: this.total - i,
        name: can.toString(), 
        address: can.toString() ,
        version: version,
        zone_id: zone_id,
      });
    }
  },
});
</script>
