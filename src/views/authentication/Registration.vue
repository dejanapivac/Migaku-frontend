<template>
  <v-container fluid fill-height justify-center>
    <v-row justify="space-around">
      <v-col xs="12" sm="6" md="4">
        <v-card class="background elevation-0">
          <v-row justify="center">
            <v-col xs="2" md="4" flat>
              <v-img
                class="ma-0"
                justify-center
                src="@/assets/registration-logo2.png"
              />
            </v-col>
          </v-row>
          <v-card-text class="py-2">
            <v-row justify="center">
              <v-card-title class="justify-center">
                <h2 class="justify-center">Sign up</h2>
              </v-card-title>
            </v-row>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="register"
            >
              <v-text-field
                label="E-mail"
                type="text"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                label="Full name*"
                type="text"
                v-model="name"
                :rules="nameRules"
              ></v-text-field>

              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                :type="show1 ? 'text' : 'password'"
                :rules="passwordRules"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                required
              ></v-text-field>
              <v-text-field
                id="repeatPassword"
                v-model="repeatPassword"
                label="Repeat password"
                :type="show2 ? 'text' : 'password'"
                :rules="repeatPasswordRules"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show2 = !show2"
                required
              ></v-text-field>

              <div class="pb-7">
                <v-text-field
                  v-model="location"
                  hide-details
                  prepend-icon="mdi-magnify"
                  :append-outer-icon="
                    location ? 'mdi-crosshairs-gps' : 'mdi-crosshairs-gps'
                  "
                  single-line
                  placeholder="Enter city name"
                  id="autocomplete"
                  @click:append-outer="locatorButtonPressed"
                >
                </v-text-field>
              </div>
              <v-row class="pt-0" justify="center">
                <v-col class="pt-0" cols="12">
                  <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Update profile picture"
                    prepend-icon="mdi-camera"
                    v-model="profile_picture"
                  >
                  </v-file-input>
                </v-col>
              </v-row>
            </v-form>
            <v-card-actions xs3 md4 class="justify-center">
              <div class="text-center pb-4">
                <v-btn
                  rounded
                  class="px-15 primary elevation-0 buttonText--text"
                  @click="register()"
                  >Signup
                </v-btn>
              </div>
            </v-card-actions>
            <v-row align="end" justify="center">
              <span class="pt-5">Already have an account?</span>
              <a href="/login" class="pl-2"> SIGN IN </a>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { Auth } from "@/services/userService";

require("dotenv").config();

export default {
  name: "Registration",
  data() {
    return {
      error: "",
      spinner: false,
      valid: true,
      email: "",
      profile_picture: null,
      location: "",
      city: "",
      country: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      name: "",
      nameRules: [
        (v) => {
          if (v) return v.length <= 50 || "maximum 50 characters";
          else return true;
        },
      ],

      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters",
      ],
      repeatPassword: "",
      repeatPasswordRules: [
        (v) => !!v || "Repeat password is required",
        (v) => this.password === this.repeatPassword || "Passwords must match",
      ],
      show1: false,
      show2: false,
    };
  },
  mounted() {
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(45.815399, 15.966568)
        ),
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

      this.location = city + ", " + country;
      console.log(this.location);
    });
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async register() {
      const FormData = require("form-data");

      const locationSplit = this.location.split(",");
      let city = locationSplit[0];
      let country = locationSplit[1].trim();

      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("name", this.name);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("image", this.profile_picture);

      let success = await Auth.register(formData);
      console.log("Rezultat registracije", success);
      if (success === true) {
        this.$router.push({ name: "Home" });
      }
    },
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
            this.location = response.data.results[0].formatted_address;
            let city;
            let country;

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
              console.log(this.location);
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
  },
};
</script>
