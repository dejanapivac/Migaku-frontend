<template>
  <v-card flat color="background ">
    <v-list class="py-0" subheader color="background">
      <!-- :class="$vuetify.breakpoint.name == 'xs' ? 'pt-0' : 'pt-0'" -->
      <v-list-item
        class="py-2"
        :class="$vuetify.breakpoint.name == 'xs' ? 'px-0' : 'px-16'"
      >
        <v-list-item-avatar size="55" class="align-self-start py-0">
          <v-img :alt="`${info.id} avatar`" :src="info.avatar"> </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="heaing-4 font-weight-bold py-0"
            v-text="info.username"
          ></v-list-item-title>
          <v-list-subtitle class="py-2">
            <v-icon color="primary" size="20"> mdi-star </v-icon>
            <v-list-subtitle class="pl-2 pt-2">5/5</v-list-subtitle>
          </v-list-subtitle>
          <v-list-item-subtitle
            v-text="info.text"
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
  name: "singleReview",
  props: ["info"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.wrap-text {
  white-space: normal;
}
</style>
