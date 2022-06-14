<template>
  <v-row>
    <v-spacer></v-spacer>

    <v-col cols="11" sm="3" class="pt-10 mx-3">
      <!-- <v-autocomplete class="mt-10 mr-10" height id="search_term" ref="origin">
      </v-autocomplete> -->

      <div class="red--text" v-show="error">{{ error }}</div>
      <v-toolbar
        dense
        class="rounded-pill"
        floating
        elevation="1"
        color="background"
      >
        <v-text-field
          hide-details
          extended
          prepend-icon="mdi-magnify"
          single-line
          placeholder="Search by city"
          v-model="address"
          id="autocomplete"
          :loading="spinner"
        ></v-text-field>
        <v-btn icon @click="locatorButtonPressed">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
  </v-row>
</template>

<script>
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      addEventOpen: false,
      address: "",
      error: "",
      spinner: false,
    };
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
};
</script>

<style>
.pac-icon {
  display: none;
}

.toolbar {
  width: 90%;
}
</style>
