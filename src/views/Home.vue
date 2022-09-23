<template>
  <v-row>
    <v-spacer></v-spacer>
    <!-- ako mi ode ispod ovog drugog video hoe to display current locK -->
    <v-col cols="11" sm="3" class="pt-10 mx-3">
      <div class="red--text" v-show="error">
        {{ error }}
      </div>
      <v-toolbar
          dense
          class="rounded-pill"
          floating
          elevation="1"
          color="background"
          :class="
          $vuetify.breakpoint.name == 'xs' ? 'd-flex justify-center' : null
        "
      >
        <v-text-field
            hide-details
            extended
            prepend-icon="mdi-magnify"
            single-line
            placeholder="Search by city"
            v-model="location"
            id="autocomplete"
            :loading="spinner"
            @click:append-outer="locatorButtonPressed"

        ></v-text-field>
        <v-btn icon @click="locatorButtonPressed">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>

    <v-container>
      <v-row class="justify-center">
        <v-card color="background" flat class="ma-0 pa-0">
          <v-card-title class="primaryText--text text--lighten-1">Events near you</v-card-title>
        </v-card>
      </v-row>
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

    </v-container>
  </v-row>
</template>

<script>
import axios from "axios";
import deedsCard from "@/components/Cards/deedsCard.vue";
import { DeedsService } from "@/services/deedsService";

require("dotenv").config();

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
      location: "",
      city: "",
      country: ""
    };
  },
  components: { deedsCard },
  mounted() {
    this.$root.$on("deedAdded", (deed) => {
      this.deeds.push(deed);
    });
    let autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
          bounds: new google.maps.LatLngBounds(
              new google.maps.LatLng(45.815399, 15.966568)
          )
        }
    );

    let city;
    let country;

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      Array.from(place.address_components).forEach((component) => {
        Array.from(component.types).forEach((type) => {
          switch (type) {
            case "locality":
              city = component.long_name;
              break;
            case "country":
              country = component.long_name;
              break;
          }
        });
      });
      this.searchedCity(city, country);
    });

    this.getNearbyDeeds();
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

    async getAddressFrom(lat, long) {
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
              this.location = response.data.results[0].formatted_address;
              let city;
              let country;
              console.log(response.data.results[0]);
              let place = response.data.results[0].address_components;
              Array.from(place).forEach((component) => {
                Array.from(component.types).forEach((type) => {
                  switch (type) {
                    case "locality":
                      city = component.long_name;
                      break;
                    case "country":
                      country = component.long_name;
                      break;
                  }
                });

                this.city = city;
                this.country = country;
                this.location = this.city + ", " + this.country;
                // console.log('bla',this.city, this.country)
                console.log(this.location);
                this.searchedCity(this.city, this.country);
                return response.data.results[0].formatted_address;
              });
            }
            this.spinner = false;
          })
          .catch((error) => {
            this.error = error.message;
            this.spinner = false;
            console.log(error.message);
          });
    },
    async getNearbyDeeds() {
      try {
        this.deeds = await DeedsService.getNearbyDeeds();
      } catch (err) {
        console.log(err);
      }
    },
    async searchedCity(searched_city, country) {
      try {
        this.deeds = await DeedsService.searchedCity(searched_city, country);
      } catch (err) {
        console.log(err);
      }
    }
  }

};
</script>

<style>
</style>
