<template>
  <v-card flat>
    <v-list>
      <v-list-item>
        <v-list-item-avatar size="45">
          <v-img :alt="`${info.id} avatar`" :src="info.profile_picture"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="d-flex align-center">
          <v-row>
            <v-col class="align-center" align-self="center">
              <v-list-item-title class="heaing-4 font-weight-bold">
                <router-link
                  :to="{
                    name: 'Reviews',
                    params: { id: info.id },
                  }"
                  class="font-weight-bold text--primary pointer"
                  style="text-decoration: none; font-size: 15px"
                  >{{ info.name }}
                </router-link>
              </v-list-item-title>
            </v-col>
            <v-col class="pa-0" align="right">
              <v-list-item-action align="right" v-if="showButton">
                <v-btn
                  v-if="info.metamask_wallet != null"
                  class="no-uppercase pl-3 pr-1 font-weight-bold"
                  color="primary"
                  rounded
                  outlined
                  elevation="0"
                  :disabled="complete"
                  @click="sendEth()"
                >
                  <p class="primaryText--text ma-0">Tip 0.001</p>

                  <v-icon class="carmin--text">mdi-ethereum</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "SingleAttendant",
  data() {
    return {};
  },
  props: ["info", "showButton", "currUserWallet", "complete"],
  methods: {
    async sendEth() {
      try {
        const result = await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.currUserWallet,
              to: this.info.metamask_wallet,
              value: "0x38D7EA4C68000",
              gasLimit: "0x5028",
              maxPriorityFeePerGas: "0x3b9aca00",
              maxFeePerGas: "0x2540be400",
            },
          ],
        });

        console.log("Transaction result:", result);
      } catch (error) {
        console.error("Transaction error:", error);
      }
    },
  },
};
</script>

<style scoped>
.no-uppercase {
  text-transform: unset !important;
}
</style>
