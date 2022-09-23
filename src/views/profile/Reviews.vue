<template>
  <v-container flat color="background" size="500">
    <v-row
        v-if="reviews.length"
        :class="$vuetify.breakpoint.name === 'xs' ? 'px-0' : 'px-16'"
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
import { DeedsService } from "@/services/deedsService";

export default {
  name: "Reviews",
  data() {
    return {
      reviews: []
    };
  },
  components: { singleReview },
  methods: {
    async getAttendedDeeds(id) {
      try {
        let deeds = await DeedsService.getAttendedDeeds(id);
        this.getNumberOfDeeds(deeds.length);
      } catch (err) {
        console.log(err);
      }
    },
    getNumberOfDeeds(length) {
      let deedNumber = length;
      if (deedNumber === 0) {
        deedNumber = 0;
      }
      this.deedNumberEventBus(deedNumber);
    },
    deedNumberEventBus(deed_length) {
      this.$root.$emit("deedLengthEventReviews", deed_length);
    },
    async getReviews(id) {
      try {
        this.reviews = await ReviewsService.getReviews(id);
        this.getAvg(this.reviews);
      } catch (err) {
        console.log(err);
      }
    },
    getAvg(array) {
      let grades = array.map(review => review.grade);
      let sum = grades.reduce((prev, curr) => prev += curr, 0);
      let avg = sum / array.length;
      if (array.length === 0) {
        avg = 0;
      }
      this.gradeEventBus(avg);
    },
    gradeEventBus(grade) {
      this.$root.$emit("gradeEvent", grade);
    }
  },
  mounted() {
    this.getReviews(this.$route.params.id);
    this.getAttendedDeeds(this.$route.params.id);
  }
};
</script>
