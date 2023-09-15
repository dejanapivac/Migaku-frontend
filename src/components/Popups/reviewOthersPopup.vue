<template>
  <v-row>
    <v-dialog
      v-model="show"
      persistent
      max-width="600"
      @click:outside="show = false"
      class="body"
    >
      <v-card>
        <v-btn
          absolute
          right
          fab
          class="accent elevation-0 mt-3"
          @click="show = false"
          width="22.5"
          height="22.5"
        >
          <v-icon color="white" small>mdi-close</v-icon>
        </v-btn>
        <v-row class="ma-0 pt-6" justify="center">
          <v-card-title class="headline font-weight-bold pb-0">
            Review other volunteers
          </v-card-title>
        </v-row>

        <v-row
          v-if="reviewers.length"
          align="center"
          class="pt-3"
          color="background"
        >
          <v-col
            cols="12"
            v-for="reviewer in reviewers"
            :key="reviewer.id"
            class="py-0"
          >
            <ReviewSomeone
              :single-attendant="reviewer"
              @reviewFromChild="getSingleReview"
            />
          </v-col>
        </v-row>
        <v-card-actions xs3 md4 class="justify-center">
          <div class="text-center pb-4">
            <v-btn
              rounded
              class="px-15 mt-5 primary elevation-0 buttonText--text"
              @click="
                addReview();
                sendDeleteNotificationEvent();
                show = false;
              "
              >Add reviews
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ReviewSomeone from "@/components/Cards/ReviewSomeoneCard";
import { ReviewsService } from "@/services/reviewService";
import { DeedsService } from "@/services/deedsService";

export default {
  name: "reviewOthersPopup",
  components: { ReviewSomeone },
  props: ["deed_id"],
  data() {
    return {
      value: Boolean,
      newReview: null,
      grade: Number,
      review: "",
      reviewers: [],
      completeReviews: [],
    };
  },
  methods: {
    async addReview() {
      try {
        for (const singleReview of this.completeReviews) {
          await ReviewsService.addReview(
            singleReview.rating,
            singleReview.reviewText,
            singleReview.personReviewedId,
            this.deed_id
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getReviewers(id) {
      try {
        this.reviewers = await DeedsService.getReviewers(id);
      } catch (err) {
        console.log(err);
      }
    },
    getSingleReview(singleReview) {
      this.completeReviews.push(singleReview);
    },
    sendDeleteNotificationEvent() {
      this.$emit("deleteNotificationEvent", this.deed_id);
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  mounted() {
    this.getReviewers(this.deed_id);
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 0;
  display: inline !important;
}
</style>
