<template>
  <v-card flat>
    <v-list class="py-0" subheader>
      <v-list-item>
        <v-list-item-avatar size="45" class="align-self-start py-0">
          <v-img :alt="`${info.id} avatar`" :src="info.avatar"> </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="heaing-4 font-weight-bold py-0"
            v-text="info.username"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-text="info.text"
            class="wrap-text"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- 
    <v-list subheader>
      <v-list-item>
        <v-list-item-avatar class="align-self-start py-0">
          <v-img :alt="`${info.id} avatar`" :src="info.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="info.username"></v-list-item-title>
          <v-list-item-subtitle
            v-text="info.text"
            class="wrap-text"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list> -->
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "SingleComment",
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    device() {
      return this.$vuetify.breakpoint.name;
    },
  },
};
</script>

<style scoped>
.wrap-text {
  white-space: normal;
}
</style>
