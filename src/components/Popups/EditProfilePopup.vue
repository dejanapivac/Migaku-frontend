<template>
  <v-row justify="center" :key="componentKey">
    <v-dialog
      v-model="show"
      persistent
      max-width="600"
      @click:outside="show = false"
    >
      <v-card>
        <v-row class="ma-0">
          <v-col class="pb-0">
            <v-btn
              absolute
              right
              fab
              class="accent elevation-0 mt-3"
              @click="show = false"
              width="22.4"
              height="22.4"
              ><v-icon color="white" small>mdi-close</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <v-row class="ma-0" justify="center">
          <v-card-title class="headline font-weight-bold text-no-wrap pb-0">
            Edit Profile
          </v-card-title></v-row
        >
        <v-row class="my-4 mx-0">
          <v-col cols="12" class="pt-0">
            <h4 class="pl-5">- Profile picture -</h4>
          </v-col>
        </v-row>
        <v-row class="my-4 mx-0" justify="center">
          <v-col cols="9">
            <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Update profile picture"
              prepend-icon="mdi-camera"
            >
            </v-file-input>
          </v-col>
        </v-row>
        <v-form>
          <!-- u v-form stavit netsa vidi kod lucija -->
          <v-row class="my-4 mx-0">
            <v-col cols="12" class="pt-0">
              <h4 class="pl-5">- Personal info -</h4>
            </v-col>
            <v-col cols="8" class="px-6">
              <v-text-field label="Username" type="text"
                >marija.amarijic</v-text-field
              >
            </v-col>
            <v-col cols="8" class="px-6">
              <v-text-field label="First name" type="text"></v-text-field>
            </v-col>
            <v-col cols="8" class="px-6">
              <v-text-field label="Last name" type="text"></v-text-field>
            </v-col>
            <v-col cols="8" class="px-6">
              <v-text-field label="Email" type="text"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "EditProfilePopup",
  data() {
    return {
      componentKey: 0,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
    };
  },
  props: {
    value: Boolean,
  },
  methods: {
    // closeDialog() {
    //   this.$refs.form_1.resetValidation();
    //   this.$refs.form_2.resetValidation();
    //   this.show = false;
    // },
  },
  computed: {
    //zatamni ekran
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
