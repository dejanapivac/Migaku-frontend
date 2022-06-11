<template>
  <v-container fluid fill-height justify-center>
    <v-row justify="space-around">
      <v-col xs="12" sm="6" md="4">
        <v-card class="background elevation-0">
          <v-row justify="center">
            <v-col xs="2" md="7" flat>
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

            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                label="Username"
                v-model="userName"
                type="text"
                :rules="usernameRules"
                required
              ></v-text-field>
              <v-text-field
                label="E-mail"
                type="text"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                label="Full name*"
                type="text"
                :rules="nameRules"
              ></v-text-field>

              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                :type="show1 ? 'text' : 'password'"
                :rules="passwordRules"
                :counter="6"
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
                :counter="6"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show2 = !show2"
                required
              ></v-text-field>
              <div>
                <v-text-field
                  hide-details
                  prepend-icon="mdi-magnify"
                  single-line
                  v-model="address"
                  id="autocomplete"
                >
                </v-text-field>
                <v-btn icon @click="locatorButtonPressed" :loading="spinner">
                  <v-icon>mdi-crosshairs-gps</v-icon>
                </v-btn>
              </div>
            </v-form>
            <v-card-actions xs3 md4 class="justify-center">
              <div class="text-center pb-4">
                <v-btn
                  rounded
                  class="px-15 primary elevation-0 buttonText--text"
                  @click="signup()"
                  >Signup</v-btn
                >
              </div>
            </v-card-actions>
            <v-row align="end" justify="center">
              <span class="pt-5">Already have an account?</span>
              <a href="/login" class="pl-2"> SIGN IN </a>
            </v-row>
            <!-- <v-row>
              <v-col xs="12" md="12" justify-center class="text-center">
                <p class="pt-5 text-center">
                  By continuing, you agree to MealMaestro
                  <strong>Terms of Use</strong> and confirm that you have read
                  its <strong>Privacy Policy</strong>.
                </p>
              </v-col>
            </v-row> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Registration",
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
      valid: true,
      userName: "",
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) =>
          (v && v.length <= 15) || "Username must be less than 15 characters",
      ],
      email: "",
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
        (v) => v.length >= 6 || "Password must be at least 8 characters",
      ],
      repeatPassword: "",
      repeatPasswordRules: [
        (v) => !!v || "Repeat password is required",
        (v) => v.length >= 6,
        (v) => this.password === this.repeatPassword || "Passwords must match",
      ],
      show1: false,
      show2: false,
      location: "",
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
    validate() {
      this.$refs.form.validate();
    },
    async signup() {
      try {
        await this.validate();
        if (this.valid) {
          let user = {
            username: this.userName,
            email: this.email,
            password: this.password,
            password_confirm: this.repeatPassword,
            location: this.location,
          };

          await AuthService.signup(user);
          this.$router.push({ name: "Login" });
        }
      } catch (error) {
        console.log(error);
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
