<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="600"
      @click:outside="show = false"
    >
      <v-card>
        <v-row class="ma-0 pb-0">
          <v-col class="pb-0">
            <v-btn
              absolute
              right
              fab
              class="accent elevation-0 mt-3 primary"
              @click="show = false"
              width="22.4"
              height="22.4"
              ><v-icon color="white" small>mdi-close</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <v-img
          src="@/assets/Poloj.jpg"
          height="300"
          class="justify-end ma-0"
          align="end"
        >
        </v-img>
        <v-card-title class="headline font-weight-bold pb-0">
          {{ event.name }}
        </v-card-title>
        <v-row justify="space-between" class="mx-1">
          <v-col cols="12" sm="4" class="pa-0">
            <v-card-subtitle>
              <router-link
                :to="{
                  name: 'Profile',
                }"
                class="caption font-weight-bold primaryText--text"
                style="text-decoration: none; cursor: pointer"
                >@{{ event.username }}
              </router-link></v-card-subtitle
            >
          </v-col>
          <v-col cols="12" sm="4" align="right">
            <v-btn class="no-uppercase" text @click="goingToEvent"
              >Going
              <v-checkbox :input-value="event.going"></v-checkbox>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="mx-4"></v-divider>

        <v-card-text class="pb-0">
          <v-row class="mt-2">
            <v-col cols="12" sm="5" class="pb-0">
              <v-row class="mt-2">
                <v-col cols="1" class="pr-0 ma-0">
                  <v-icon size="100%" class="carmin--text">mdi-shape</v-icon>
                </v-col>
                <v-col cols="11" sm="10" class="pl-3">
                  <p
                    class="twoLineText font-weight-bold primaryText--text ma-0"
                  >
                    {{ event.category }}
                  </p>
                </v-col>
              </v-row>

              <v-row class="mt-2">
                <v-col cols="1" class="pr-0 ma-0">
                  <v-icon size="100%" class="carmin--text"
                    >mdi-map-marker</v-icon
                  >
                </v-col>
                <v-col cols="11" sm="10" class="pl-3">
                  <p
                    class="twoLineText font-weight-bold primaryText--text ma-0"
                  >
                    {{ event.location }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="mt-2">
                <v-col cols="1" class="pr-0 ma-0">
                  <v-icon size="100%" class="carmin--text"
                    >mdi-clock-time-ten</v-icon
                  >
                </v-col>
                <v-col cols="11" sm="10" class="pl-3">
                  <p
                    class="twoLineText font-weight-bold primaryText--text ma-0"
                  >
                    {{ event.time }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="mt-4">
                <v-btn
                  class="no-uppercase pl-3 font-weight-bold"
                  color="primaryLighter"
                  rounded
                  elevation="0"
                >
                  <v-icon size="100%" class="carmin--text"
                    >mdi-account-multiple</v-icon
                  >
                  <p class="primaryText--text pt-3 pl-2">
                    Attendants: {{ event.attendants }}
                  </p>
                </v-btn>

                <!-- <v-btn
                  class="no-uppercase pl-3 font-weight-bold"
                  color="primary"
                  rounded
                  outlined
                  elevation="0"
                >
                  <v-icon size="100%" class="carmin--text"
                    >mdi-account-multiple</v-icon
                  >
                  <p class="primaryText--text pt-3 pl-2">Attendants:</p>
                </v-btn> -->
              </v-row>
            </v-col>
            <v-col cols="12" sm="7" class="pt-0 pb-0">
              <v-col class="pt-3">
                <p class="pt-3">
                  {{ event.description }}
                </p>
              </v-col>
            </v-col>
          </v-row>
        </v-card-text>
        <v-col align="center" class="pt-3">
          <p>
            <v-btn class="no-uppercase" transparent text align="center"
              >Comments</v-btn
            >
          </p>
        </v-col>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<v-btn class="no-uppercase" text align="center">Attendants:
                    </v-btn>

<script>
export default {
  name: "ExpandedEventPopup",
  props: ["event"],
  data() {
    return {
      loaded: false,
      events: {},
      value: Boolean,
    };
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
  methods: {
    async goingToEvent() {
      this.event.going = !this.event.going;
      if (!this.event.going) {
        this.event.attendants -= 1;
        console.log("Brisem atendee");
      } else {
        this.event.attendants += 1;
        console.log("dodajem atendee");
      }
    },
  },
};
</script>

<style scoped>
.twoLineText {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.no-uppercase {
  text-transform: unset !important;
}
.buttonText {
  background: none;
  font-weight: bold;
  border-bottom: 5px solid #f8ac42;
  text-decoration: underline #f8ac42;
  text-underline-offset: 4px;
}
</style>
