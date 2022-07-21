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

        <v-btn icon color=" #828282" to="/profile/reviews">
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>

        <!-- ako zelim maknut elevation na v-emnu - content-class="elevation-0" -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-badge icon overlap :content="notificationCount()">
                <v-icon>mdi-bell-outline</v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-list color="background">
            <template v-for="(item, index) in items">
              <v-list-item :key="index">
                <template>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >"{{ item.title }}" </v-list-item-title
                    >event has ended. Review other volunteers.
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-menu>

        <v-btn icon color=" #828282" @click.stop="addEventOpen = true">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
        <CreateEventPopup v-model="addEventOpen" v-if="addEventOpen" />
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
import NotificationBell from "vue-notification-bell";
export default {
  data: () => ({
    addEventOpen: false,
    items: [
      { index: 1, title: "Čišćenje poloja" },
      { index: 2, title: "Košenje trave didici" },
      { index: 3, title: "Šetanje pasa umoirovljenika" },
      { index: 4, title: "Čišćenje kupališta" },
    ],
  }),
  components: {
    CreateEventPopup,
    NotificationBell,
  },
  methods: {
    notificationCount() {
      return this.items.length;
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
</style>
