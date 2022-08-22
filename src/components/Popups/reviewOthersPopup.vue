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
          <v-col cols="12" v-for="item in people" :key="item.id" class="py-0">
            <ReviewSomeone :info="item" />
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import ReviewSomeone from "@/components/Cards/ReviewSomeoneCard";

export default {
  name: "reviewOthersPopup",
  components: { ReviewSomeone },
  data() {
    return {
      value: Boolean,
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
  }
};
</script>
