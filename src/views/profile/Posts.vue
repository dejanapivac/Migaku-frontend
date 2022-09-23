<template>
  <v-container class="mx-auto">
    <v-row v-if="posts.length" class="my-10" justify="center">
      <v-col
          cols="12"
          md="6"
          align="left"
          class="pa-8"
          v-for="post in posts"
          :key="post.id"
      >
        <deedsCard :info="post" />
      </v-col>

      <v-spacer cols="12" md="6"></v-spacer>
    </v-row>
    <v-row v-else justify="center" class="caption mt-15 text-center">
      No deeds yet.
    </v-row>
    <!-- </v-row> -->
  </v-container>
</template>

<script>
import deedsCard from "@/components/Cards/deedsCard.vue";
import { DeedsService } from "@/services/deedsService";

export default {
  name: "Posts",
  data() {
    return {
      posts: []
    };
  },
  components: { deedsCard },
  methods: {
    async getPostedDeeds(id) {
      try {
        this.posts = await DeedsService.getPostedDeeds(id);
      } catch (err) {
        console.log(err);
      }
    }
  },
  // TODO ddati primanje event busa
  mounted() {
    this.getPostedDeeds(this.$route.params.id);
    this.$root.$on("deedAdded", (deed) => {
      this.posts.push(deed);
    });
  }
};
</script>
