<template>
  <v-container justify-center class="pt-8" max-width="100px">
    <v-row class="pb-3">
      <v-col cols="6" sm="2" xl="1" align="center">
        <v-img
          class="rounded-circle"
          src="@/assets/vedrana.jpg"
          alt="profilePic"
          max-width="150px"
          lazy-src
          contain
        />
      </v-col>
      <v-col cols="6" sm="6" md="4" xl="4">
        <v-col class="pb-0">
          <div class="text-h5 font-weight-bold">
            marija.marijic
            <v-icon
              size="100%"
              class="px-5 primary--text"
              @click.stop="editProfileOpen = true"
              >mdi-square-edit-outline</v-icon
            >

            <div class="text-subtitle-1 pt-1">Marija Marijic</div>
            <v-row class="pl-3 pt-4">
              <v-col cols="2" sm="4" class="pa-0 text-subtitle-1">
                <v-icon size="100%" class="green--text"
                  >fa-hand-holding-heart</v-icon
                >
                5
              </v-col>
              <v-col cols="2" sm="4" class="pa-0 text-subtitle-1">
                <v-icon size="100%" class="green--text">mdi-star</v-icon> 5/5
              </v-col>
              <v-col cols="4" sm="4" class="pa-0 text-subtitle-1">
                <v-icon size="100%" class="green--text">mdi-map-marker</v-icon>
                Zagreb
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <EditProfilePopup v-model="editProfileOpen" v-if="editProfileOpen" />
    <v-spacer></v-spacer>
    <v-row justify="center">
      <v-col class="pr-2" cols="3" sm="2" align="right">
        <router-link
          :to="{
            name: 'Reviews',
          }"
          class="py-3 transparent elevation-0 text-caption"
          >Reviews</router-link
        ></v-col
      >

      <v-col class="pl-2" cols="3" sm="2" align="center">
        <router-link
          :to="{
            name: 'Posts',
          }"
          class="py-3 transparent elevation-0 text-caption"
          >Posts</router-link
        ></v-col
      >

      <v-col class="pl-2" cols="3" sm="2" align="left">
        <router-link
          :to="{
            name: 'Deeds',
          }"
          class="py-3 transparent elevation-0 text-caption"
          >Deeds</router-link
        ></v-col
      >
    </v-row>
    <router-view :key="$route.fullPath"></router-view>
    <!-- potrebno da mi pokaze sto se nalazi na reviews/posts/deeds -->
  </v-container>
</template>

<script>
import EditProfilePopup from "@/components/Popups/EditProfilePopup.vue";
export default {
  name: "Profile",
  components: { EditProfilePopup },
  data() {
    return {
      user: {},
      editProfileOpen: false,
    };
  },
};
</script>

<style scoped>
a {
  color: #445462 !important;
  text-decoration: none;
}
a.router-link-active {
  background: #fffefb;
  color: #445462;
  font-weight: bold;
  border-bottom: 5px solid #f8ac42;
  text-decoration: underline #f8ac42;
  text-underline-offset: 4px;
}
</style>
