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
import { DeedsService } from "@/services/deedsService";

export default {
  components: { deedsCard },
  name: "Deeds",
  data() {
    return {
      deeds: []
    };
  },
  methods: {
    async getAttendedDeeds(id) {
      try {
        this.deeds = await DeedsService.getAttendedDeeds(id);
        this.deedNumberEventBus(this.deeds.length);
      } catch (err) {
        console.log(err);
      }
    },
    deedNumberEventBus(deed_length) {
      this.$root.$emit("deedLengthEvent", deed_length);
    }
  },
  mounted() {
    this.getAttendedDeeds(this.$route.params.id);
  }
};
</script>
