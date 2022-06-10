<template>
  <v-row justify="center">
    <v-dialog :value="true" max-width="600" @click:outside="show = false">
      <v-card>
        <v-img
          src="@/assets/Poloj.jpg"
          height="300"
          class="justify-end"
          align="end"
        >
        </v-img>
        <v-card-title class="headline font-weight-bold pb-0">
          {{ event.name }}
        </v-card-title>
        <v-row justify="space-between" class="mx-1">
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
        </v-row>
        <v-divider class="mx-4"></v-divider>

        <v-card-text>
          <v-row class="mt-2">
            <v-col cols="12" sm="5">
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
            </v-col>
            <v-col cols="12" sm="7" class="pt-0">
              <v-col class="pt-3">
                <p class="pt-3">
                  {{ event.description }}
                </p>
              </v-col>
              <v-col justify="center" class="pt-3">
                <p justify="center">
                  <v-btn text align="center">Comments</v-btn>
                </p>
              </v-col>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ExpandedEventPopup",
  props: ["event"],
  data() {
    return {
      loaded: false,
      events: {},
    };
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
</style>
