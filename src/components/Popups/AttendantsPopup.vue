<template>
  <v-row>
    <v-dialog
        class="body ma-0"
        v-model="show"
        persistent
        max-width="400"
        eager
        @click:outside="show = false"
    >
      <v-card class="body">
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
        <v-row v-if="attendees.length" align="center" class="mb-1" color="background">
          <v-col cols="12" v-for="attendant in atttendantsArray" :key="attendant.id" class="py-0">
            <SingleAttendant :info="attendant" />
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import SingleAttendant from "@/components/Cards/singleAttendant";

export default {
  name: "AttendantsPopup",
  components: { SingleAttendant },
  props: ["atttendantsArray"],
  data() {
    return {
      value: Boolean,
      attendees: [

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
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    closeDialog() {
      this.clear();
      this.show = false;
    }
  }
};
</script>

<style>
.body {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
