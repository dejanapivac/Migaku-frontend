<template>
  <v-row>
    <v-dialog
        v-model="show"
        persistent
        max-width="600"
        @click:outside="show = false"
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
        </v-btn
        >
        <v-row class="ma-0 pt-6" justify="center">
          <v-card-title class="headline font-weight-bold pb-0">
            Review other volunteers
          </v-card-title>
        </v-row
        >

        <v-row v-if="people.length" align="center" class="pt-3" color="background">
          <v-col cols="12" v-for="attendant in attendees" :key="attendant.id" class="py-0">
            <ReviewSomeone :single-attendant="attendant" />
          </v-col>
        </v-row>
        <v-card-actions xs3 md4 class="justify-center">
          <div class="text-center pb-4">
            <v-btn
                rounded
                class="px-15 mt-5 primary elevation-0 buttonText--text"
                @click="addReview()"
            >Add reviews
            </v-btn
            >
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
  props: ["reviewInfo"],
  data() {
    return {
      value: Boolean,
      newReview: null,
      grade: Number,
      review: "",
      attendees: [],
      people: [
        {
          id: 1, avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Jason Oner"
        },
        {
          id: 2, avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "Mike Carlson"
        },
        {
          id: 3, avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Cindy Baker"
        }
      ]
    };
  },
  methods: {
    async addReview(id) {
      try {
        this.newReview = await ReviewsService.addReview(this.grade, this.review);
      } catch (err) {
        console.log(err);
      }
    },
    async getAttendees(id) {
      try {
        this.attendees = await DeedsService.getAttendees(id);
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
    //zatamni ekran
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  mounted() {
    this.getAttendees(this.reviewInfo);
  }
};
</script>
