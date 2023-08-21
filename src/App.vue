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
                Connect Metamask wallet
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
              <template v-for="notification in notifications">
                <v-list-item
                  :key="notification.id"
                  v-model="selectedNotification"
                  @click.stop="reviewOthersOpen = true"
                  v-if="notificationNumber != 0"
                >
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >"{{ notification.name }}"
                    </v-list-item-title>
                    event has ended. Review other volunteers.
                  </v-list-item-content>
                  <reviewOthersPopup
                    :deed_id="notification.id"
                    v-model="reviewOthersOpen"
                    v-if="reviewOthersOpen && notificationNumber != 0"
                    @deleteNotificationEvent="deleteNotificationFromEvent"
                  />
                </v-list-item>
              </template>
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

export default {
  data: () => ({
    addEventOpen: false,
    reviewOthersOpen: false,
    selectedNotification: 0,
    user_id: "",
    notifications: [],
    notificationNumber: 0,
    isMetamaskSupported: false,
    isLoggedIn: false,
    currentAccount: "",
    metamask_wallet: "",
  }),
  components: {
    CreateEventPopup,
    reviewOthersPopup,
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
        this.notifications = await ReviewsService.getNotifications();
        this.notificationNumber = this.notifications.length;
      } catch (err) {
        console.log(err);
      }
    },
    deleteNotificationFromEvent(deed_id) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id != deed_id
      );
      this.notificationNumber = this.notifications.length;
    },
    checkMetamaskSupport() {
      this.isMetamaskSupported = typeof window.ethereum !== "undefined";
    },

    async connectWallet() {
      const accounts = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .catch((err) => {
          console.error(err);
        });

      this.currentAccount = accounts[0];
      console.log(this.currentAccount);
    },

    // handleAccountsChanged(accounts) {
    //   if (accounts.length === 0) {
    //     console.log("Please connect to MetaMask.");
    //   } else if (accounts[0] !== this.currentAccount) {
    //     this.currentAccount = accounts[0];
    //     showAccount.innerHTML = currentAccount;
    //   }
    // },

    isWalletConnected() {
      window.ethereum.request({ method: "eth_accounts" }).catch((err) => {
        console.error(err);
      });
      // window.ethereum.on("accountsChanged", handleAccountsChanged);
    },

    async addWalletAddress(metamask_wallet) {
      try {
        await Auth.addWallet(metamask_wallet);
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.getCurrentUserId();
    this.getNotifications();
    this.checkMetamaskSupport();
  },
  // beforeDestroy() {
  //   window.ethereum.removeListener(
  //     "accountsChanged",
  //     this.handleAccountsChanged
  //   );
  // },
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
