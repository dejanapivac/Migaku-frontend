<template>
  <v-container flat color="background" size="500">
    <v-row
      v-if="reviews.length"
      :class="$vuetify.breakpoint.name == 'xs' ? 'px-0' : 'px-16'"
      justify="center"
    >
      <v-row v-if="reviews.length" align="center" class="pt-13">
        <v-col
          cols="12"
          v-for="review in reviews"
          :key="review.id"
          class="py-0"
        >
          <singleReview :info="review" />
        </v-col>
      </v-row>
    </v-row>
    <v-row v-else justify="center" class="caption mt-15 text-center">
      No reviews yet.
    </v-row>
  </v-container>
</template>

<script>
import singleReview from "@/components/Cards/SingleReview.vue";

export default {
  name: "Reviews",
  data() {
    return {
      reviews: [
        {
          id: 1,
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          username: "fiki",
          text: "jako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osobajako draga i super osoba",
        },
        {
          id: 2,
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          username: "buddy",
          text: "ma odlina je",
        },
        {
          id: 3,
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          username: "dona",
          text: "woho",
        },
      ],
    };
  },
  components: { singleReview },
};
</script>
