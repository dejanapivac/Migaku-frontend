<template>
  <v-container justify-center class="pt-8" max-width="100px">
    <v-row class="pb-3" align="center">
      <v-col cols="12" sm="auto" class="d-flex justify-center">
        <v-avatar size="130" class="align-self-start py-0">
          <v-img :alt="`${user.id} avatar`" :src="user.profile_picture"></v-img>
        </v-avatar>
      </v-col>
      <v-col sm="auto">
        <v-row class="pl-5 pt-4 center-items">
          <div class="text-h5 font-weight-bold">
            {{ user.name }}
            <v-icon
              size="100%"
              class="px-5 primary--text"
              @click.stop="editProfileOpen = true"
              >mdi-square-edit-outline
            </v-icon>
          </div>
        </v-row>
        <v-row class="pt-5 center-items">
          <v-col cols="auto" class="pl-5 justify-start">
            <v-icon size="100%" class="green--text"
              >fa-hand-holding-heart
            </v-icon>
            {{ deedNumber }}
          </v-col>
          <v-col cols="auto" class="pl-5 justify-start">
            <v-icon size="100%" class="green--text">mdi-star</v-icon>
            {{ avgGrade }}/5
          </v-col>
          <v-col cols="auto" class="pl-5 justify-start">
            <v-icon size="100%" class="green--text">mdi-map-marker</v-icon>
            {{ user.city + ", " + user.country }}
          </v-col>
        </v-row>
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
      editProfileOpen: false,
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
    },
  },
  computed: {},
  mounted() {
    this.getUserById(this.$route.params.id);
    this.$root.$on("deedLengthEvent", (deed_length) => {
      this.deedNumber = deed_length;
    });
    this.$root.$on("gradeEvent", (grade) => {
      let multipleDecimal = grade;
      let twoDecimal = multipleDecimal.toFixed(1);
      this.avgGrade = twoDecimal;
    });
    this.$root.$on("deedLengthEventReviews", (deed_length) => {
      this.deedNumber = deed_length;
    });
  },
  watch: {
    $route(to, _) {
      this.getUserById(to.params.id);
    },
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

#rounded-card {
  border-radius: 50%;
  min-height: 500px;
  min-width: 500px;
}

.center-items {
  display: flex;
  justify-content: center;

  @media (min-width: 599px) {
    justify-content: left;
  }
}
</style>
