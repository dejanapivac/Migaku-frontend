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
        <v-btn depressed color="background" to="/" plain>
          <img
              class="mr-0 pa-0"
              src="./assets/navbar-logo.png"
              height="40"
              contain
          />
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn icon color=" #828282" to="/">
          <v-icon>mdi-home-outline</v-icon>
        </v-btn>


        <router-link
            :to="{
              name: 'Reviews',
              params: { id: user_id }
            }"
            class="font-weight-bold text--primary pointer   "
            style="text-decoration: none; font-size: 15px">
          <v-btn icon color=" #828282">
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-btn>
        </router-link>

        <!-- ako zelim maknut elevation na v-emnu - content-class="elevation-0" -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-badge icon overlap :content="notificationCount()">
                <v-icon>mdi-bell-outline</v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-list>
            <template v-for="(item, index) in items">
              <v-list-item
                  :key="index"
                  v-model="selectedNotification"
                  @click.stop="reviewOthersOpen = true"
              >
                <!-- <v-list-item-grup v-model="selectedNotification"> -->
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold"
                  >"{{ item.title }}"
                  </v-list-item-title
                  >
                  event has ended. Review other volunteers.
                </v-list-item-content>
                <!-- </v-list-item-grup> -->
              </v-list-item>
            </template>
          </v-list>


          <reviewOthersPopup
              v-model="reviewOthersOpen"
              v-if="reviewOthersOpen"
          />

          <!-- <v-list color="background">
            <template v-for="(item, index) in items">
              <v-list-item-group :key="index" v-model="selectedNotification">
                <v-list-item>
                  <template>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold"
                        >"{{ item.title }}" </v-list-item-title
                      >event has ended. Review other volunteers.
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list-item-group> -->
          <!-- daje error da se ponavljaju indexi -->
          <!-- <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider> -->
          <!-- <v-divider></v-divider> -->
          <!-- </template>
          </v-list> -->
        </v-menu>

        <v-btn icon color=" #828282" @click.stop="addEventOpen = true">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
        <CreateEventPopup v-model="addEventOpen" v-if="addEventOpen" />
        <v-btn icon color=" #828282" @click="logout()">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- ostavila conatiner jos ne znam zelim li ga -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import CreateEventPopup from "@/components/Popups/CreateEventPopup";
import reviewOthersPopup from "@/components/Popups/reviewOthersPopup";
import { Auth } from "@/services/userService";

export default {
  data: () => ({
    addEventOpen: false,
    reviewOthersOpen: false,
    selectedNotification: 0,
    user_id: "",
    items: [
      //maknula sam index: 1, index: 2.... jer index sam postavi od 0
      { title: "Čišćenje poloja" },
      { title: "Košenje trave didici" },
      { title: "Šetanje pasa umoirovljenika" },
      { title: "Čišćenje kupališta" },
      { title: "Čišćenje kupališta" }
    ]
  }),
  components: {
    CreateEventPopup,
    reviewOthersPopup
  },
  methods: {
    notificationCount() {
      return this.items.length;
    },
    handleClick(index) {
      this.items[index].click.call(this);
    },
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
    }
  },
  mounted() {
    this.getCurrentUserId();
    console.log(this.user_id);
  }
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
</style>
