<template>
  <v-app id="inspire">
    <v-app-bar
      v-if="!$route.meta.hideNavbar"
      class="pa-0"
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
        <!-- <img class="mr-0 pa-0" src="./assets/Migaku.png" height="100" /> -->
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

        <v-btn icon color=" #828282" to="/map">
          <v-icon>mdi-map-marker-outline</v-icon>
        </v-btn>

        <v-btn icon color=" #828282">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>

        <v-btn icon color=" #828282" to="/profile">
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>

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
      <!-- <v-row>
        <v-spacer></v-spacer> -->
      <!-- <v-responsive max-width="260">
          <v-text-field
            class="mt-8 mr-10"
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive> -->
      <!-- </v-row> -->

      <!-- <v-container>
        <v-row>
          <v-col cols="1">           
          </v-col>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">              
            </v-sheet>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </v-container> -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: "mdi-home-outline" },
      { icon: "mdi-map-marker-outline" },
      { icon: "mdi-plus-circle-outline" },
      { icon: "mdi-account-circle-outline" },
    ],
  }),
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
