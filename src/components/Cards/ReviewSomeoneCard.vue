<template>
  <v-card flat>
    <v-list>
      <v-list-item>
        <v-list-item-avatar size="45" class="align-self-start py-0">
          <v-img :alt="`${singleAttendant.id} avatar`" :src="singleAttendant.profile_picture"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
              class="heaing-4 font-weight-bold py-0"
              v-text="singleAttendant.name"
          ></v-list-item-title>
          <v-form>
            <v-rating
                v-model="rating"
                color="primary"
                background-color="primary "
                dense
                hover
            ></v-rating>
            <v-textarea
                class="pt-2"
                label="Write a review"
                auto-grow
                clearable
                outlined
                :rules="reviewRules">
            </v-textarea>
          </v-form>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "ReviewSomeone",
  props: ["singleAttendant"],
  data() {
    return {
      rating: null,
      reviewRules: [
        (v) => {
          if (v) return v.length <= 250 || "maximum 250 characters";
          else return true;
        }
      ]
    };
  }
};
</script>