<template>
  <v-card flat color="background ">
    <v-list class="py-0" subheader color="background">
      <!-- :class="$vuetify.breakpoint.name == 'xs' ? 'pt-0' : 'pt-0'" -->
      <v-list-item
          class="py-2"
          :class="$vuetify.breakpoint.name === 'xs' ? 'px-0' : 'px-16'"
      >
        <v-list-item-avatar size="55" class="align-self-start py-0">
          <v-img :alt="`${info.id} avatar`" :src="info.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="heaing-4 font-weight-bold py-0">
            <router-link
                :to="{
              name: 'Reviews',
              params: { id: info.user_id }
            }"
                class="font-weight-bold text--primary pointer pt-5 mb-3 pt-1"
                style="text-decoration: none; font-size: 15px"
            >{{ info.name }}
            </router-link
            >
          </v-list-item-title>
          <!-- <v-list-item-group> -->
          <!-- <v-list-subtitle class="py-2"> -->
          <div class="py-2">
            <v-icon class="d-inline" color="primary" size="20">
              mdi-star
            </v-icon>
            <v-list-item-subtitle class="d-inline pl-2 pt-2"
            >{{ info.grade }}/5
            </v-list-item-subtitle
            >
          </div>
          <!-- </v-list-item-group> -->
          <!-- </v-list-subtitle> -->
          <v-list-item-subtitle
              v-text="info.review"
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
