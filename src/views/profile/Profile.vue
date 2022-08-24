<template>
  <v-container justify-center class="pt-8" max-width="100px">
    <v-row class="pb-3" align="center">
      <v-col cols="6" sm="2" xl="1" align="center">
        <v-img
            class="profile_picture"
            :alt="`${user.id} avatar`"
            :src="user.profile_picture"
            max-width="150px"
            max-height="150px"
            lazy-src
            contain
        />
      </v-col>
      <v-col cols="6" sm="7" md="4" xl="5">
        <v-col class="">
          <div class="text-h5 font-weight-bold">
            {{ user.name }}
            <v-icon
                size="100%"
                class="px-5 primary--text"
                @click.stop="editProfileOpen = true"
            >mdi-square-edit-outline
            </v-icon
            >

            <v-row class="pl-3 pt-4">
              <v-col cols="1" sm="3" class="pa-0 text-subtitle-1">
                <v-icon size="100%" class="green--text"
                >fa-hand-holding-heart
                </v-icon
                >
                {{ deedNumber }}
              </v-col>
              <v-col cols="1" sm="3" class="pa-0 text-subtitle-1">
                <v-icon size="100%" class="green--text">mdi-star</v-icon>
                {{ avgGrade }}/5
              </v-col>
              <v-col cols="6" sm="6" class="pa-0 text-subtitle-1">
                <v-icon size="100%" class="green--text">mdi-map-marker</v-icon>
                {{ user.city + ", " + user.country }}
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
  </v-container>
</template>

<script>
import EditProfilePopup from "@/components/Popups/EditProfilePopup.vue";
import { Auth } from "@/services/userService";

export default {
  name: "Profile",
  components: { EditProfilePopup },
  data() {
    return {
      user: {},
      deedNumber: 0,
      avgGrade: 0,
      editProfileOpen: false
    };
  },
  methods: {
    async getUserById(id) {
      try {
        let user = await Auth.getUserById(id);
        this.user = user[0];
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.getUserById(this.$route.params.id);
    this.$root.$on("deedLengthEvent", (deed_length) => {
      this.deedNumber = deed_length;
    });
    this.$root.$on("gradeEvent", (grade) => {
      this.avgGrade = grade;
    });
  },
  watch: {
    $route(to, _) {
      this.getUserById(to.params.id);
    }
  }
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

.profile_picture {

#rounded-card {
  border-radius: 50%;
  min-height: 500px;
  min-width: 500px;
}

}
</style>
