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
          <v-row class="my-4 mx-0" justify="center">
            <v-col cols="12" class="pt-0">
              <h4 class="pl-5">- Personal info -</h4>
            </v-col>

            <v-col cols="8" class="px-6">
              <v-text-field label="Full name" type="text"></v-text-field>
            </v-col>
            <v-col cols="8" class="px-6">
              <v-text-field label="Email" type="text"></v-text-field>
            </v-col>
            <v-row class="my-4 mx-0" justify="center">
              <v-col cols="7" class="pt-0 pr-0">
                <v-text-field
                  hide-details
                  prepend-icon="mdi-magnify"
                  single-line
                  v-model="address"
                  id="autocomplete"
                >
                </v-text-field>
              </v-col>
              <v-col cols="1" class="pl-0">
                <v-btn icon @click="locatorButtonPressed" :loading="spinner">
                  <v-icon>mdi-crosshairs-gps</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-row>
        </v-form>
        <v-col class="pt-0" cols="12" align="center">
          <v-btn rounded class="primary elevation-0 text-caption"
            >save changes</v-btn
          >
        </v-col>

        <v-row class="my-4 mx-0" justify="center">
          <v-col cols="12" class="pt-0">
            <h4 class="ml-5">- Change password -</h4>
          </v-col>
          <v-col cols="8" class="px-6">
            <v-form>
              <v-text-field
                id="password"
                label="Current password"
                type="password"
                :rules="[(v) => !!v || 'Current password is required']"
              ></v-text-field>
              <v-text-field
                id="newPassword"
                label="New password"
                type="password"
                :rules="[(v) => !!v || 'New password is required']"
              ></v-text-field>
              <v-text-field
                id="repPassword"
                label="Confirm new password"
                type="password"
                :rules="[(v) => !!v || 'Please confirm your new password']"
              ></v-text-field>
              <v-col class="pt-7" cols="12" align="center">
                <v-btn rounded class="primary elevation-0 text-caption"
                  >set new password</v-btn
                >
              </v-col>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "EditProfilePopup",
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
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
  mounted() {
    new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(45.815399, 15.966568)
        ),
      }
    );
  },

  methods: {
    locatorButtonPressed() {
      this.spinner = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            this.error =
              "Locater is unable to find your address. Please type your address manually";
            this.spinner = false;
          }
        );
      } else {
        this.error = error.message;
        console.log("Your browser does not support geolocation");
      }
    },
    getAddressFrom(lat, long) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            ", " +
            long +
            "&key=AIzaSyA8ZVxnr56Qs_nRGHnjpBBnwwnhKeXM2Ec"
        )
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;
            // console.log(response.data.results[0].formatted_address);
          }
          this.spinner = false;
        })
        .catch((error) => {
          this.error = error.message;
          this.spinner = false;
          console.log(error.message);
        });
    },
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
