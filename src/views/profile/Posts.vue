<template>
  <v-row class="my-10" justify="center">
    <v-row
      v-if="!this.posts.length"
      justify="center"
      class="caption mt-15 text-center"
    >
      No posts yet.
    </v-row>
  </v-row>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: "Posts",
  data() {
    return {
      posts: [],
    };
  },
};
</script>
