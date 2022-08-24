<template>
  <v-card flat>
    <v-list class="py-0" subheader>
      <v-list-item>
        <v-list-item-avatar size="45" class="align-self-start py-0">
          <v-img :alt="`${singleComment.comment_id} avatar`" :src="singleComment.profile_picture"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="heaing-4 font-weight-bold py-0">
            <router-link
                :to="{
              name: 'Reviews',
              params: { id: singleComment.comment_by_id }
            }"
                class="font-weight-bold text--primary pointer pt-5 mb-3 pt-1"
                style="text-decoration: none; font-size: 15px"
            >{{ singleComment.name }}
            </router-link
            >
          </v-list-item-title>
          <!--          <v-list-item-title-->
          <!--            class="heaing-4 font-weight-bold py-0"-->
          <!--            v-text="info.name"-->
          <!--          ></v-list-item-title>-->
          <v-list-item-subtitle
              v-text="singleComment.comment"
              class="wrap-text"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "SingleComment",
  props: ["singleComment"],
  data() {
    return {};
  },
  computed: {
    device() {
      return this.$vuetify.breakpoint.name;
    }
  }
};
</script>

<style scoped>
.wrap-text {
  white-space: normal;
}
</style>
