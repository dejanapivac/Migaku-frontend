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
        <img
          class="mr-0 pa-0"
          src="./assets/navbar-logo.png"
          height="40"
          contain
        />
        <v-spacer></v-spacer>
        <!-- <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn> -->

        <!-- ne znam ovako :(  -->
        <!-- <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.icon" link>
            <v-list-item-icon>{{ item.icon }}</v-list-item-icon>
          </v-list-item>
        </v-list> -->

        <v-btn icon color=" #828282" to="/">
          <v-icon>mdi-home-outline</v-icon>
        </v-btn>

        <v-btn icon color=" #828282" to="/profile">
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>

        <v-btn icon color=" #828282" @click.stop="addEventOpen = true">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
        <CreateEventPopup v-model="addEventOpen" v-if="addEventOpen" />

        <!-- <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive> -->
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
export default {
  data: () => ({
    addEventOpen: false,
    items: [
      { icon: "mdi-home-outline" },
      { icon: "mdi-map-marker-outline" },
      { icon: "mdi-plus-circle-outline" },
      { icon: "mdi-account-circle-outline" },
    ],
  }),
  components: {
    CreateEventPopup,
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
