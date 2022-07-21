<template>
  <v-container class="mx-auto">
    <v-row v-if="deeds.length" class="my-10" justify="center">
      <v-col
        cols="12"
        md="6"
        align="left"
        class="pa-8"
        v-for="deed in deeds"
        :key="deed.id"
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
          id: 1,
          image: "@/assets/Poloj.jpg",
          name: "Čišćenje Poloja Čišćenje Poloja Čišćenje PolojaČišćenje Polojas",
          category: "Cleaning, Environment",
          location: "ŠRC Poloj, Slavonski Brods<f<sefagfaergfaergefa<wefFwefe",
          time: "14.04.2022., 09:00",
          username: "Filippp",
          description:
            "Traže se dobre duše koje bi pomogle starijem gospodinu urediti dvorište " +
            "i okućnicu. Potrebam je netko s kosilicom." +
            "Traže se dobre duše koje bi pomogle starijem gospodinu urediti dvorište " +
            "i okućnicu. Potrebam je netko s kosilicom." +
            "Traže se dobre duše koje bi pomogle starijem gospodinu urediti dvorište " +
            "i okućnicu. Potrebam je netko s kosilicom." +
            "Traže se dobre duše koje bi pomogle starijem gospodinu urediti dvorište " +
            "i okućnicu. Potrebam je netko s kosilicom.",
          going: false,
          attendants: 3,
        },
        {
          id: 2,
          image: "@/assets/Poloj.jpg",
          name: "<wefgeagr",
          category: "Cleaning, Environment",
          location: "ŠRC Poloj, Slavonski Brod",
          time: "14.04.2022., 09:00",
          username: "Filip",
          going: false,
          attendants: 0,
        },
        {
          id: 3,
          image: "@/assets/Poloj.jpg",
          name: "bkafjkad",
          category: "Cleaning, Environment",
          location: "ŠRC Poloj, Slavonski Brod",
          time: "14.04.2022., 09:00",
          username: "Filip",
          going: false,
        },
      ],
    };
  },
};
</script>
