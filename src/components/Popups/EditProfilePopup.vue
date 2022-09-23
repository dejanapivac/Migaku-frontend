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
            >
              <v-icon color="white" small>mdi-close</v-icon>
            </v-btn
            >
          </v-col>
        </v-row>
        <v-row class="ma-0" justify="center">
          <v-card-title class="headline font-weight-bold text-no-wrap pb-0">
            Edit Profile
          </v-card-title>
        </v-row
        >
        <v-row class="my-4 mx-0">
          <v-col cols="12" class="pt-0">
            <h4 class="pl-5">- Profile picture -</h4>
          </v-col>
        </v-row>
        <v-row class="my-4 mx-0" justify="center">
          <v-col cols="9">
            <v-file-input
                v-model="profile_picture"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Update profile picture"
                prepend-icon="mdi-camera"
            >
            </v-file-input>
          </v-col>
        </v-row>
        <v-col class="pt-0" cols="12" align="center">
          <v-btn rounded class="primary elevation-0 text-caption"
                 @click="updateProfilePicture(); show = false"
          >Upload profile picture
          </v-btn
          >
        </v-col>
        <v-form>
          <v-row class="my-4 mx-0" justify="center">
            <v-col cols="12" class="pt-0">
              <h4 class="pl-5">- Personal info -</h4>
            </v-col>

            <v-col cols="8" class="px-6">
              <v-text-field
                  label="Full name*"
                  type="text"
                  v-model="name"
                  :rules="nameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="8" class="px-6">
              <v-text-field
                  label="E-mail"
                  type="text"
                  v-model="email"
                  :rules="emailRules"
                  required
              ></v-text-field>
            </v-col>
            <v-row class="my-4 mx-0" justify="center">
              <v-col cols="7" class="pt-0 pr-0">
                <v-text-field
                    hide-details
                    prepend-icon="mdi-magnify"
                    single-line
                    v-model="location"
                    id="autocomplete"
                    @click:append-outer="locatorButtonPressed"
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
                 @click="updateInfo(); show = false"
          >save changes
          </v-btn
          >
        </v-col>

        <v-row class="my-4 mx-0" justify="center">
          <v-col cols="12" class="pt-0">
            <h4 class="ml-5">- Change password -</h4>
          </v-col>
          <v-col cols="8" class="px-6">
            <v-form ref="form">
              <v-text-field
                  id="password"
                  v-model="current_password"
                  label="Current password"
                  type="password"
                  :type="show0 ? 'text' : 'password'"
                  :append-icon="show0 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show0 = !show0"
                  :rules="currentPasswordRules"
              ></v-text-field>
              <v-text-field
                  id="newPassword"
                  v-model="newPassword"
                  label="New password"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  :rules="newPasswordRules"
                  required
              ></v-text-field>
              <v-text-field
                  id="repPassword"
                  v-model="repeatPassword"
                  label="Confirm new password"
                  :type="show2 ? 'text' : 'password'"
                  :rules="repeatPasswordRules"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show2 = !show2"
                  required
              ></v-text-field>
              <v-col class="pt-7" cols="12" align="center">
                <v-btn rounded class="primary elevation-0 text-caption"
                       @click="updatePassword(current_password, newPassword)"
                >set new password
                </v-btn
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
import { Auth } from "@/services/userService";

require("dotenv").config();

export default {
  name: "EditProfilePopup",
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
      componentKey: 0,
      location: "",
      current_password: "",
      newPassword: "",
      repeatPassword: "",
      profile_picture: null,
      email: "",
      name: "",
      city: "",
      country: "",
      oldPasswordCorrect: true,
      show0: false,
      show1: false,
      show2: false,
      currentPasswordRules: [
        (v) => !!v || "Current password is required",
        (v) => this.oldPasswordCorrect == true || "Old password wrong."
      ],
      newPasswordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters"
      ],
      repeatPasswordRules: [
        (v) => !!v || "Repeat password is required",
        (v) => this.newPassword === this.repeatPassword || "Passwords must match"
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      nameRules: [
        (v) => {
          if (v) return v.length <= 50 || "maximum 50 characters";
          else return true;
        }
      ],
    };
  },
  props: {
    value: Boolean
  },
  mounted() {
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

      this.location = city + ", " + country;
    });
    this.getCurrentUser();
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
                return response.data.results[0].formatted_address;

              });
            }
            this.spinner = false;
            this.spinner = false;
          })
          .catch((error) => {
            this.error = error.message;
            this.spinner = false;
            console.log(error.message);
          });
    },
    async updateProfilePicture() {
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("image", this.profile_picture);
      try {
        await Auth.updateProfilePicture(formData);
      } catch (err) {
        console.log(err);
      }
    },
    async updateInfo() {
      const FormData = require("form-data");

      const locationSplit = this.location.split(",");
      let city = locationSplit[0];
      let country = locationSplit[1].trim();

      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("city", city);
      formData.append("country", country);

      try {
        await Auth.updateInfo(formData);
      } catch (err) {
        console.log(err);
      }
    },
    async updatePassword(current_password, new_password) {
      try {
        await Auth.updatePassword(current_password, new_password);
      } catch (err) {
        if (err.response.data === "Passwords don't match.") {
          this.oldPasswordCorrect = false;
          this.$refs.form.validate();
        }
        console.log(err.response);
      }
    },
    async getCurrentUser() {
      let user = await Auth.getCurrentUser();
      this.name = user.name;
      this.email = user.email;
      this.location = user.city + ", " + user.country;
    }

  },
  computed: {
    //zatamni ekran
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
