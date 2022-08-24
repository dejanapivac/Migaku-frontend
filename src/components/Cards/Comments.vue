<template>
  <v-card flat>
    <v-form>
      <v-container class="pb-0">
        <v-row class="pb-0 pl-1">
          <v-col cols="1">
            <v-avatar size="46" class="align-self-start py-0">
              <img :src="profilePicture" />
            </v-avatar>
          </v-col>
          <v-col cols="10" class="pb-0">
            <v-text-field
                class="pl-4"
                v-model="yourComment"
                :append-outer-icon="yourComment ? 'mdi-send' : null"
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
                @click:append-outer="sendComment(deedId, yourComment)"
                @keydown.enter.prevent="sendComment(deedId, yourComment)"
                @click:clear="clearComment"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-col cols="12" v-for="comment in commentsArray" :key="comment.comment_id">
      <SingleComment :single-comment="comment" />
    </v-col>
  </v-card>
</template>

<script>
import SingleComment from "@/components/Cards/SingleComment.vue";
import { CommentsService } from "@/services/commentsService";
import { Auth } from "@/services/userService";


export default {
  name: "Comments",
  components: { SingleComment },
  data() {
    return {
      password: "Password",
      show: false,
      yourComment: "",
      profilePicture: "",
      commentRules: [(v) => v.length <= 400 || "Max 25 characters"]
    };
  },
  props: ["commentsArray", "deedId"],
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    }
  },
  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    async sendComment(id, comment) {
      try {
        const newComment = await CommentsService.addComment(id, comment);
        this.commentsArray.push(newComment);
        console.log(newComment);
        this.clearComment();
      } catch (err) {
        console.log(err);
      }
    },
    clearComment() {
      this.yourComment = "";
    },
    async getProfilePic() {
      try {
        this.profilePicture = await Auth.getProfilePic();
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.getProfilePic();
  }
};
</script>
