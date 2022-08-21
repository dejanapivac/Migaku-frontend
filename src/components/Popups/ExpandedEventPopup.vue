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
          {{ event.deedname }}
        </v-card-title>
        <v-row justify="space-between" class="mx-1">
          <v-col cols="12" sm="4" class="pa-0">
            <v-card-subtitle>
              <router-link
                  :to="{
                  name: 'Reviews',
                  params: { id: event.user_id }
                }"
                  class="caption font-weight-bold primaryText--text"
                  style="text-decoration: none; cursor: pointer"
              >@{{ event.name }}
              </router-link>
            </v-card-subtitle
            >
          </v-col>
          <v-col cols="12" sm="4" align="right">
            <v-btn class="no-uppercase" text @click="attendEvent(event.deed_id)"
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
                    {{ event.street + ", " + event.zipcode + ", " + event.city + ", " + event.country }}
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
                    {{ event.start_time }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="mt-4 pb-5">
                <v-btn
                    class="no-uppercase pl-3 font-weight-bold"
                    color="primary"
                    rounded
                    outlined
                    elevation="0"
                    @click.stop="attendantsOpen = true"
                >
                  <v-icon size="100%" class="carmin--text"
                  >mdi-account-multiple
                  </v-icon
                  >
                  <p class="primaryText--text pt-3 pl-2">
                    Attendants: {{ this.attendants.length }}
                  </p>
                </v-btn>

                <AttendantsPopup
                    v-model="attendantsOpen"
                    v-if="attendantsOpen"
                />
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
        <v-row align="center" class="pt-3">
          <v-col cols="12">
            <Comments />
          </v-col>
        </v-row>
        <!-- <attendants-popup v-model="attendantsDialog" v-if="attendantsDialog" /> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>

<v-btn class="no-uppercase" text align="center">Attendants:
                    </v-btn>

<script>
import Comments from "@/components/Cards/Comments.vue";
import AttendantsPopup from "@/components/Popups/AttendantsPopup.vue";
import { DeedsService } from "@/services/deedsService";

export default {
  name: "ExpandedEventPopup",
  props: ["event"],
  components: { Comments, AttendantsPopup },
  data() {
    return {
      loaded: false,
      value: Boolean,
      attendantsOpen: false,
      attendants: [],
      going: false,
      comments: [
        {
          id: 1,
          user: "example",
          avatar: "http://via.placeholder.com/100x100/a74848",
          text: "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor "
        },
        {
          id: 2,
          user: "example1",
          avatar: "http://via.placeholder.com/100x100/2d58a7",
          text: "lorem ipsum dolor",
        },
        {
          id: 3,
          user: "example2",
          avatar: "http://via.placeholder.com/100x100/36846e",
          text: "lorem ipsum dolor again",
        },
      ],
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
    async getAttendands(id) {
      try {
        this.attendants = await DeedsService.getAttendands(id);
      } catch (err) {
        console.log(err);
      }
    },
    async attendEvent(id) {
      try {
        await DeedsService.attendEvent(id);
      } catch (err) {
        console.log(err);
      }
    },
    async isGoing(id) {
      try {
        this.going = await DeedsService.isGoing(id);
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.isGoing(this.event.deed_id);
    this.getAttendands(this.event.deed_id);
  }
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
</style>
