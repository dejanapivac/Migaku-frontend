<template>
  <v-container flat color="background" size="500">
    <v-row
      v-if="reviews.length"
      :class="$vuetify.breakpoint.name == 'xs' ? 'px-0' : 'px-16'"
      justify="center"
    >
      <v-row v-if="reviews.length" align="center" class="pt-13 pb-5">
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
import { ReviewsService } from "@/services/reviewService";

export default {
  name: "Reviews",
  data() {
    return {
      reviews: []
    };
  },
  components: { singleReview },
  methods: {
    async getReviews(id) {
      try {
        this.reviews = await ReviewsService.getReviews(id);
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.getReviews(this.$route.params.id);
  }
};
</script>
