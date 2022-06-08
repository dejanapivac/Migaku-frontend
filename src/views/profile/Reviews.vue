<template>
  <v-row class="my-10" justify="center">
    <v-row
      v-if="!this.reviews.length"
      justify="center"
      class="caption mt-15 text-center"
    >
      No reviews yet.
    </v-row>
    <v-row v-else>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        align="center"
        class="pa-6"
        v-for="recipe in this.recipes"
        :key="recipe._id"
      >
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
// import  from '@vue/composition-api'

export default {
  name: "Reviews",
  data() {
    return {
      reviews: [],
    };
  },
};
</script>
