<template>
  <v-row>
    <v-spacer></v-spacer>
    <!-- ako mi ode ispod ovog drugog video hoe to display current locK -->
    <v-col cols="11" sm="3" class="pt-10 mx-3">
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
          @keyup.enter="sendDeeds"
        ></v-text-field>
        <v-btn icon @click="locatorButtonPressed">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>

    <v-container>
      <v-row v-if="this.deeds.length" class="my-10" justify="center">
        <v-col
          cols="12"
          md="6"
          align="left"
          class="pa-8"
          v-for="deed in deeds"
          :key="deed.id"
        >
          <deedsCard :info="deed" />
        </v-col>

        <v-spacer cols="12" md="6"></v-spacer>
      </v-row>
      <!-- <v-row
        v-if="this.deeds.length < this.numOfDeeds"
        justify="center"
        class="mb-5"
        ><v-btn @click="loadMore" plain>Load more...</v-btn>
      </v-row>
      <v-row v-else justify="center" class="caption my-8 text-center"
        >No more deeds to show. </v-row
      > -->
    </v-container>
  </v-row>
</template>

<script>
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
import axios from "axios";
import deedsCard from "@/components/Cards/deedsCard.vue";
import * as geometry from "spherical-geometry-js";

export default {
  name: "Home",
  data() {
    return {
      addEventOpen: false,
      address: "",
      error: "",
      spinner: false,
      deeds: [],
      numOfDeeds: 20,
    };
  },
  components: { deedsCard },
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
  // created() {
  //   this.getNearbyDeeds(0);
  // },
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

            this.showNearbyDeeds(
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

    showNearbyDeeds(latitude, longitude) {
      let usersLocation = new google.maps.LatLng(latitude, longitude);

      let map = new google.maps.Map();

      // const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      //   this.lat
      // },${this.lng}&type=${this.type}&radius=${this.radius * 1000}&key=${
      //   this.apiKey
      // }`;

      // axios
      //   .get(URL)
      //   .then((responde) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     this.error = error.message;
      //   });
    },

    calculateIfWithinRadius() {
      const radius = 20000;
      geometry.computeDistanceBetween();
      const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA8ZVxnr56Qs_nRGHnjpBBnwwnhKeXM2Ec`
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          console.log(jsonData.results[0].geometry.location); // {lat: 45.425152, lng: -75.6998028}
        })
        .catch((error) => {
          console.log(error);
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
