<template>
  <v-card
    @click.stop="eventDialog = true"
    class="rounded-xl white"
    style="cursor: pointer"
  >
    <v-row>
      <v-col cols="12" sm="5" class="py-0">
        <v-img
            :alt="`${info.id} picture`"
            :src="info.image"
            width="100%"
            height="230px"
            class="rounded-xl"
        >
        </v-img>
      </v-col>

      <v-col
        cols="12"
        sm="7"
        :class="
          this.$vuetify.breakpoint.name == 'xs' ? 'py-0 pl-4' : 'pl-0 pt-0'
        "
      >
        <div class="cardTtile font-weight-bold pa-0 mx-2 mb-4 mt-2 title">
          {{ info.deedname }}
        </div>

        <v-row justify="space-between" class="pa-0 mx-2">
          <v-col cols="1" class="pl-0 pb-0 pt-1">
            <v-icon size="100%" class="carmin--text">mdi-shape</v-icon>
          </v-col>
          <v-col cols="11" class="pl-0 pb-0 pt-1">
            <v-card-subtitle
              class="type font-weight-bold primaryText--text pl-1 pb-0 pt-1"
            >
              {{ info.category }}
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row justify="space-between" class="pa-0 mx-2">
          <v-col cols="1" class="pl-0 pb-0 pt-1">
            <v-icon size="100%" class="carmin--text">mdi-map-marker</v-icon>
          </v-col>
          <v-col align="start" cols="11" class="pl-1 pb-0 pt-2">
            <v-card-subtitle
              class="text-truncate type font-weight-bold primaryText--text pa-0"
            >
              {{ info.street + ", " + info.zipcode + ", " + info.deedcity + ", " + info.deedcountry }}
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row justify="space-between" class="pa-0 mx-2">
          <v-col cols="1" class="pl-0 pb-0 pt-1">
            <v-icon size="100%" class="carmin--text">mdi-clock-time-ten</v-icon>
          </v-col>
          <v-col cols="11" align="start" class="pl-0 pb-0 pt-1">
            <v-card-subtitle
              class="type font-weight-bold primaryText--text pl-1 pb-0 pt-1"
            >
              {{ timestampToTime(info.start_time) }}
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row
          class="pa-0 mx-2"
          :class="
            this.$vuetify.breakpoint.name == 'xs' ? 'pr-8 mt-3' : 'pr-8 mt-0'
          "
          justify="space-between"
        >
          <router-link
              :to="{
              name: 'Reviews',
              params: { id: info.user_id }
            }"
              class="font-weight-bold text--primary pointer pt-5 mb-3 pt-1"
              style="text-decoration: none; font-size: 15px"
          >By @{{ info.name }}
          </router-link
          >
        </v-row>
      </v-col>
    </v-row>
    <ExpandedEventPopup
      v-model="eventDialog"
      v-if="eventDialog"
      :event="info"
    />
  </v-card>
</template>

<script>
import ExpandedEventPopup from "../Popups/ExpandedEventPopup.vue";
import moment from "moment";

export default {
  name: "deedsCard",
  props: ["info"],
  data() {
    return {
      eventDialog: false
    };
  },
  components: {
    ExpandedEventPopup
  },
  methods: {
    timestampToTime(start_time) {
      return moment(start_time).format("LLLL");
    }
  },
  computed: {
    device() {
      return this.$vuetify.breakpoint.name;
    }
  }
};
</script>

<style scoped>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
}
/* .tags {
  height: 100px;
} */
.type {
  font-size: 15px;
}

.cardTtile {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
