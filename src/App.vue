<template>
  <v-app id="inspire">
    <v-app-bar
      v-if="!$route.meta.hideNavbar"
      class="pa-0 ma-0"
      app
      flat
      color="background"
    >
      <v-container
        class="pa-0 my-0 fill-height"
        fluid
        max-width="100%"
        style="border-bottom: 0.5px solid; border-color: #828282"
      >
        <v-row align="center" justify="space-between">
          <v-col xs="2" md="2">
            <v-btn
              max-width="100"
              depressed
              align-left
              class="pr-0"
              color="background"
              to="/"
              plain
            >
              <img
                class="mr-0 ml-5 pa-0"
                src="./assets/navbar-logo.png"
                height="40"
                contain
              />
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              v-if="isMetamaskSupported"
              class="custom-button font-weight-bold"
              color="primary"
              rounded
              outlined
              small
              elevation="0"
              @click="connectWallet() && addWalletAddress()"
            >
              <p
                v-if="isMetamaskSupported"
                class="no-uppercase primaryText--text mb-0"
              >
                Metamask wallet
              </p>
            </v-btn>
            <v-btn v-else disabled small rounded outlined
              >Download metamask extension to connect wallet</v-btn
            >
          </v-col>

          <v-spacer></v-spacer>

          <v-btn icon color=" #828282" to="/">
            <v-icon>mdi-home-outline</v-icon>
          </v-btn>

          <router-link
            :to="{
              name: 'Reviews',
              params: { id: user_id },
            }"
            class="font-weight-bold text--primary pointer"
            style="text-decoration: none; font-size: 15px"
          >
            <v-btn icon color=" #828282">
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-btn>
          </router-link>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-badge
                  :value="notificationNumber != 0"
                  icon
                  overlap
                  :content="notificationNumber"
                >
                  <v-icon>mdi-bell-outline</v-icon>
                </v-badge>
              </v-btn>
            </template>

            <v-list v-if="notificationNumber !== 0">
              <template v-for="notification in reviewNotifications">
                <v-list-item
                  :key="notification.id"
                  v-model="selectedNotification"
                  @click.stop="reviewOthersOpen = true"
                  v-if="notificationNumber != 0"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      >"{{ notification.name }}" event has ended. Review other
                      volunteers.
                    </v-list-item-title>
                  </v-list-item-content>
                  <reviewOthersPopup
                    :deed_id="notification.id"
                    v-model="reviewOthersOpen"
                    v-if="reviewOthersOpen && notificationNumber != 0"
                    @deleteNotificationEvent="deleteNotificationFromEvent"
                  />
                </v-list-item>
              </template>
              <v-divider></v-divider>
              <template v-for="notification in tipNotification">
                <v-list-item
                  :key="notification.id"
                  v-model="selectedNotification"
                  @click.stop="collectTips(notification.id)"
                  v-if="notificationNumber != 0"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      >Collect tip from "{{ notification.name }}" event.
                    </v-list-item-title>
                  </v-list-item-content>
                  <reviewOthersPopup
                    :deed_id="notification.id"
                    v-model="reviewOthersOpen"
                    v-if="reviewOthersOpen && notificationNumber != 0"
                    @deleteNotificationEvent="deleteNotificationFromEvent"
                  />
                </v-list-item>
              </template>
              <v-divider></v-divider>
            </v-list>
          </v-menu>

          <v-btn icon color=" #828282" @click.stop="addEventOpen = true">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
          <CreateEventPopup v-model="addEventOpen" v-if="addEventOpen" />
          <v-btn icon color=" #828282" @click="logout()">
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
    <ChangedWalletPopup
      v-if="accountChanged"
      :currentAccount="currentAccount"
    />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import CreateEventPopup from "@/components/Popups/CreateEventPopup";
import reviewOthersPopup from "@/components/Popups/reviewOthersPopup";
import { Auth } from "@/services/userService";
import { ReviewsService } from "@/services/reviewService";
import ChangedWalletPopup from "@/components/Popups/ChangedWalletPopup.vue";
import { ethers } from "ethers";
import TipAttendantsContract from "../artifacts/contracts/TipAttendantsContract.sol/TipAttendantsContract.json";

export default {
  data: () => ({
    addEventOpen: false,
    reviewOthersOpen: false,
    selectedNotification: 0,
    user_id: "",
    reviewNotifications: [],
    tipNotification: [],
    notificationNumber: 0,
    isMetamaskSupported: false,
    isLoggedIn: false,
    currentAccount: "",
    metamask_wallet: "",
    accountChanged: false,
  }),
  components: {
    CreateEventPopup,
    reviewOthersPopup,
    ChangedWalletPopup,
  },
  methods: {
    logout() {
      Auth.logout();
      this.$router.go();
    },
    async getCurrentUserId() {
      try {
        let user = await Auth.getCurrentUser();
        this.user_id = user.id;
      } catch (err) {
        console.log(err);
      }
    },
    async getNotifications() {
      try {
        const notifications = await ReviewsService.getNotifications();
        this.reviewNotifications = notifications.reviews;
        this.tipNotification = notifications.tips;
        this.notificationNumber =
          this.reviewNotifications.length + this.tipNotification.length;
      } catch (err) {
        console.log(err);
      }
    },
    deleteNotificationFromEvent(deed_id) {
      this.notifications = this.reviewNotifications.filter(
        (notification) => notification.id != deed_id
      );
      this.notificationNumber = this.reviewNotifications.length;
    },
    checkMetamaskSupport() {
      this.isMetamaskSupported = typeof window.ethereum !== "undefined";
    },

    openMetamask() {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(this.handleAccountsChanged)
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log("Metamask extension not available.");
      }
    },

    handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
      } else if (accounts[0] !== this.currentAccount) {
        this.accountChanged = true;
        this.currentAccount = accounts[0];
        console.log(this.currentAccount);
        this.addWalletAddress(this.currentAccount);
      }
    },

    async connectWallet() {
      const accounts = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .catch((err) => {
          console.error(err);
          alert(
            "An error occurred while connecting to the wallet. Please try again later."
          );
        });

      this.currentAccount = accounts[0];
      console.log(this.currentAccount);
      this.addWalletAddress(this.currentAccount);

      window.ethereum.on("accountsChanged", this.handleAccountsChanged);
    },

    isWalletConnected() {
      window.ethereum.request({ method: "eth_accounts" }).catch((err) => {
        console.error(err);
      });
      // window.ethereum.on("accountsChanged", handleAccountsChanged);
    },

    async addWalletAddress(metamask_wallet) {
      try {
        await Auth.addWallet(metamask_wallet);
        console.log("Wallet address added:", metamask_wallet);
      } catch (err) {
        console.error(err);
      }
    },

    async collectTips(notificationId) {
      try {
        this.tipNotification = this.tipNotification.filter(
          (notification) => notification.id != notificationId
        );
        this.notificationNumber = this.notificationNumber - 1;

        const provider = new ethers.providers.Web3Provider(this.getEth());
        const contract = new ethers.Contract(
          "0x5fbdb2315678afecb367f032d93f642f64180aa3",
          TipAttendantsContract.abi,
          provider.getSigner()
        );

        const transactionResponse = await contract.receiveTip();
        this.listenForTransaction(transactionResponse, provider);
      } catch (error) {
        console.error("Transaction error:", error);
      }
    },
    async listenForTransaction(transactionResponse, provider) {
      console.log(`Mining ${transactionResponse.hash}`);
      return new Promise((resolve, reject) => {
        try {
          provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
              `Completed with ${transactionReceipt.confirmations} confirmations. `
            );
            resolve();
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    getEth() {
      const eth = window.ethereum;
      if (!eth) {
        throw new Error("no metamask");
      }
      return eth;
    },
  },
  mounted() {
    this.getCurrentUserId();
    this.getNotifications();
    this.checkMetamaskSupport();
  },
  watch: {
    $route(to, _) {
      this.getCurrentUserId();
      this.getNotifications();
      this.isWalletConnected();
    },
  },
};
</script>

<style lang="scss">
@import "./src/sass/variables.scss";

::v-deep .v-app-bar {
  padding: $base-padding;
  margin: $base-margin;
}

::v-deep .v-toolbar__content {
  padding: 0px !important;
}

.custom-button.v-btn--outlined {
  color: #ffebd0;
  border-width: 2px;
}

.logo-and-button-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 $base-margin;
}

.no-uppercase {
  text-transform: unset !important;
}
</style>
