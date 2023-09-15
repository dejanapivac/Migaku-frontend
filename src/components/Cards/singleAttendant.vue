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
            <v-col class="align-center" align="right">
              <v-list-item-action align="right" v-if="showButton">
                <v-row
                  v-if="
                    info.metamask_wallet != null &&
                    info.metamask_wallet != currUserWallet
                  "
                  class="no-uppercase font-weight-bold"
                >
                  <p class="primaryText--text ma-1">Tip</p>
                  <v-text-field
                    v-model="tipAmount"
                    dense
                    type="number"
                    placeholder="0"
                    min="0"
                    hide-details
                    hide-spin-buttons
                    class="text-field-style"
                    size="x-small"
                  ></v-text-field>
                  <v-btn
                    @click="sendTipAmount()"
                    class="ml-1"
                    icon
                    small
                    color="primary"
                    elevation="0"
                    :disabled="buttonDisabled"
                    ><v-icon size="large" class="carmin--text"
                      >mdi-send</v-icon
                    ></v-btn
                  >
                </v-row>
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
    return {
      tipAmount: "",
      buttonDisabled: false,
    };
  },
  props: ["info", "showButton", "currUserWallet", "complete", "fillArray"],
  methods: {
    sendTipAmount() {
      this.$emit("singleAttendantTip", {
        attendantWallet: this.info.metamask_wallet,
        tipAmount: this.tipAmount,
      });
      this.buttonDisabled = true;
    },
  },
};
</script>

<style scoped>
.no-uppercase {
  text-transform: unset !important;
}

.text-field-style {
  width: 50px;
}
</style>
