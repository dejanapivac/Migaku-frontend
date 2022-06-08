<template>
  <v-container>
    <v-row v-if="this.deeds.length" class="my-10" justify="center">
      <v-col
        cols="12"
        md="6"
        align="left"
        class="pa-8"
        v-for="deed in this.deeds"
        :key="deed.name"
      >
        <deedsCard :info="deed" />
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

export default {
  components: { deedsCard },
  name: "Deeds",
  data() {
    return {
      deeds: [
        {
          image: "@/assets/Poloj.jpg",
          name: "Čišćenje PolojaČišćenje PolojaČišćenje PolojaČišćenje Polojas",
          category: "Cleaning, Environment",
          location: "ŠRC Poloj, Slavonski Brod",
          time: "14.04.2022., 09:00",
          username: "Filip",
        },
        {
          image: "@/assets/Poloj.jpg",
          name: "<wefgeagr",
          category: "Cleaning, Environment",
          location: "ŠRC Poloj, Slavonski Brod",
          time: "14.04.2022., 09:00",
          username: "Filip",
        },
        {
          image: "@/assets/Poloj.jpg",
          name: "bkafjkad",
          category: "Cleaning, Environment",
          location: "ŠRC Poloj, Slavonski Brod",
          time: "14.04.2022., 09:00",
          username: "Filip",
        },
      ],
    };
  },
};
</script>
