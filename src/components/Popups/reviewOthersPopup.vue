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
            Attendants
          </v-card-title>
        </v-row
        >
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  name: "reviewOthersPopup",
  data() {
    return {
      value: Boolean
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
