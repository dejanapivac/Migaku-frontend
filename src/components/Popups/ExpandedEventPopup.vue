<template>
  <v-row justify="center">
    <v-dialog
      class="body"
      v-model="show"
      persistent
      max-width="600"
      @click:outside="show = false"
    >
      <v-card class="body">
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
            >
              <v-icon color="white" small>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-img
          :src="event.image"
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
                  params: { id: event.user_id },
                }"
                class="caption font-weight-bold primaryText--text"
                style="text-decoration: none; cursor: pointer"
                >@{{ event.name }}
              </router-link>
            </v-card-subtitle>
          </v-col>
          <v-col cols="12" sm="4" align="right">
            <v-btn class="no-uppercase" text @click="attendEvent(event.deed_id)"
              >Going
              <v-checkbox :input-value="this.going"></v-checkbox>
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
                    >mdi-map-marker
                  </v-icon>
                </v-col>
                <v-col cols="11" sm="10" class="pl-3">
                  <p
                    class="twoLineText font-weight-bold primaryText--text ma-0"
                  >
                    {{
                      event.street +
                      ", " +
                      event.zipcode +
                      ", " +
                      event.deedcity +
                      ", " +
                      event.deedcountry
                    }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="mt-2">
                <v-col cols="1" class="pr-0 ma-0">
                  <v-icon size="100%" class="carmin--text"
                    >mdi-clock-time-ten
                  </v-icon>
                </v-col>
                <v-col cols="11" sm="10" class="pl-3">
                  <p
                    class="twoLineText font-weight-bold primaryText--text ma-0"
                  >
                    {{ timestampToTime(event.start_time) }}
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
                  </v-icon>
                  <p class="primaryText--text ma-0">
                    Attendants: {{ this.attendantsLength }}
                  </p>
                </v-btn>

                <AttendantsPopup
                  :attendants-array="attendants"
                  v-model="attendantsOpen"
                  v-if="attendantsOpen"
                />
              </v-row>
              <v-row class="mt-4 pb-5">
                <v-btn
                  v-if="completeButton"
                  rounded
                  class="no-uppercase px-5 primary elevation-0 buttonText--text"
                  @click.stop="sendEthOpen = true"
                  :disabled="complete"
                >
                  Complete event
                </v-btn>
                <SendEthPopup
                  :attendants-array="attendants"
                  :event="event"
                  :has-wallet="hasWallet"
                  :curr-user-wallet="curr_user_wallet"
                  v-model="sendEthOpen"
                  v-if="sendEthOpen"
                  @complete-event-clicked="handleCompleteEventClicked"
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
            <Comments :comments-array="comments" :deed-id="event.deed_id" />
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<v-btn class="no-uppercase" text align="center">Attendants:
</v-btn>

<script>
import Comments from "@/components/Cards/Comments.vue";
import AttendantsPopup from "@/components/Popups/AttendantsPopup.vue";
import SendEthPopup from "@/components/Popups/SendEthPopup.vue";
import { DeedsService } from "@/services/deedsService";
import { CommentsService } from "@/services/commentsService";
import { Auth } from "@/services/userService";
import moment from "moment";

export default {
  name: "ExpandedEventPopup",
  props: ["event", "info"],
  components: { Comments, AttendantsPopup, SendEthPopup },
  data() {
    return {
      loaded: false,
      value: Boolean,
      curr_user: null,
      completeButton: true,
      attendantsOpen: false,
      sendEthOpen: false,
      attendants: [],
      attendantsLength: null,
      description: "",
      going: Boolean,
      complete: false,
      comments: [],
      hasWallet: false,
      curr_user_wallet: null,
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
    async getAttendees(id) {
      try {
        this.attendants = await DeedsService.getAttendees(id);
        this.attendantsLength = this.attendants.length;
      } catch (err) {
        console.log(err);
      }
    },
    async attendEvent(id) {
      try {
        let going = await DeedsService.attendEvent(id);
        if (going === true) {
          this.attendantsLength += 1;
        } else {
          this.attendantsLength -= 1;
        }
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
    },
    async isCompleted(id) {
      try {
        this.complete = await DeedsService.isCompleted(id);
      } catch (err) {
        console.log(err);
      }
    },
    async getComments(id) {
      try {
        this.comments = await CommentsService.getComments(id);
      } catch (err) {
        console.log(err);
      }
    },
    async resolveUserData() {
      this.curr_user = await Auth.getCurrentUser();
      this.completeButton = this.curr_user.id === this.event.user_id;
      this.hasWallet = this.curr_user.metamask_wallet != null;
      this.curr_user_wallet = this.curr_user.metamask_wallet;
    },
    timestampToTime(start_time) {
      return moment(start_time).format("LLLL");
    },
    handleCompleteEventClicked(complete) {
      this.complete = complete;
    },
  },
  mounted() {
    this.isGoing(this.event.deed_id);
    this.getAttendees(this.event.deed_id);
    this.isCompleted(this.event.deed_id);
    this.getComments(this.event.deed_id);
    this.resolveUserData();
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

.body {
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}
</style>
