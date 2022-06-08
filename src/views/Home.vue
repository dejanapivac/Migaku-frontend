<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="12" sm="4" class="pt-10">
      <!-- <v-autocomplete class="mt-10 mr-10" height id="search_term" ref="origin">
      </v-autocomplete> -->
      <div class="red--text" v-show="error">{{ error }}</div>
      <v-toolbar dense floating elevation="1" color="background">
        <v-text-field
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          v-model="address"
          id="autocomplete"
        ></v-text-field>
        <v-btn icon @click="locatorButtonPressed" :loading="spinner">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
    <!-- <vuetify-google-autocomplete
      id="map"
      append-icon="search"
      v-bind:disabled="true"
      placeholder="Start typing"
      v-on:placechanged="getAddressData"
    >
    </vuetify-google-autocomplete> -->
  </v-row>
</template>

<script>
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
import axios from "axios";

// Vue.use(VuetifyGoogleAutocomplete, {
//   apiKey: "AIzaSyBu8iUCMExuroiO_KgXXbKx9Rad4Leb02M", // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
//   version: "...", // Optional
//   language: "...", // Optional
//   installComponents: true, // Optional (default: true) - false, if you want to locally install components
//   vueGoogleMapsCompatibility: false, // Optional (default: false) - true, requires vue2-google-maps to be configured see https://github.com/xkjyeah/vue-google-maps
// });

export default {
  name: "Home",

  data() {
    return {
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
