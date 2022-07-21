<template>
  <v-card flat>
    <v-form>
      <v-container class="pb-0">
        <v-row class="pb-0 pl-1">
          <v-col cols="1">
            <v-avatar size="45">
              <img src="@/assets/vedrana.jpg" />
            </v-avatar>
          </v-col>
          <v-col cols="10" class="pb-0">
            <v-text-field
              class="pl-4"
              v-model="comment"
              :append-outer-icon="comment ? 'mdi-send' : null"
              filled
              :rules="commentRules"
              rounded
              auto-grow
              dense
              clear-icon="mdi-close-circle"
              clearable
              label="Write a comment..."
              type="text"
              @click:append="toggleMarker"
              @click:append-outer="sendComment"
              @keyup.enter="sendComment"
              @click:clear="clearComment"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-row v-if="items.length" align="center" class="pt-3" color="background">
      <v-col cols="12" v-for="item in items" :key="item.id" class="py-0">
        <SingleComment :info="item" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SingleComment from "@/components/Cards/SingleComment.vue";

export default {
  name: "Comments",
  components: { SingleComment },
  data() {
    return {
      password: "Password",
      show: false,
      comment: "",
      commentRules: [(v) => v.length <= 400 || "Max 25 characters"],
      items: [
        {
          id: 1,
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          username: "marija.marijic",
          text:
            "Traže se dobre duše koje bi pomogle starijem gospodinu urediti dvorište " +
            "i okućnicu. Potrebam je netko s kosilicom." +
            "Traže se dobre duše koje bi pomogle starijem gospodinu urediti dvorište " +
            "i okućnicu. Potrebam je netko s kosilicom." +
            "Traže se dobre duše koje bi pomogle starijem gospodinu urediti dvorište " +
            "i okućnicu. Potrebam je netko s kosilicom." +
            "Traže se dobre duše koje bi pomogle starijem gospodinu urediti dvorište " +
            "i okućnicu. Potrebam je netko s kosilicom.",
        },
        {
          id: 2,
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          username: "ivan",
          text: "ejj neeeemoj zezat",
        },
        {
          id: 3,
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          username: "filip",
          text: "najbolji sam na svijetu",
        },
      ],
    };
  },
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },
  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendComment() {
      if (this.comment != "") {
      }
      this.clearComment();
    },
    clearComment() {
      this.comment = "";
    },
  },
};
</script>
