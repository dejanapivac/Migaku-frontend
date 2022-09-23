<template>
  <v-row>
    <v-dialog
        class="ma-0"
        v-model="show"
        persistent
        max-width="600"
        eager
        @click:outside="show = false"
    >
      <v-card>
        <v-btn
            absolute
            right
            fab
            class="accent elevation-0 mt-3"
            @click="show = false"
            width="22.5"
            height="22.5"
        >
          <v-icon color="white" small>mdi-close</v-icon>
        </v-btn
        >
        <v-row class="ma-0 pt-6" justify="center">
          <v-card-title class="headline font-weight-bold pb-0">
            Add new event
          </v-card-title>
        </v-row
        >
        <v-form>
          <v-row class="my-4 mx-0" justify="center">
            <v-col cols="10" class="px-6 py-1">
              <v-text-field
                  label="Event name"
                  v-model="name"
                  type="text"
                  :rules="inputRules"
              >
              </v-text-field>
            </v-col>
            <v-col cols="10" class="px-6 py-1">
              <v-file-input
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Add event picture"
                  prepend-icon="mdi-camera"
                  v-model="deed_picture"
              >
              </v-file-input>
            </v-col>
            <v-col cols="10" class="px-6 py-1">
              <v-select
                  multiple
                  prepend-icon="mdi-shape"
                  v-model="category"
                  :items="categories"
                  label="Categories"
                  :rules="inputRules"
              ></v-select>
            </v-col>
            <v-col cols="10" class="px-6 py-1">

              <div>
                <v-text-field
                    v-model="address"
                    hide-details
                    prepend-icon="mdi-magnify"
                    :append-outer-icon="
                    address ? 'mdi-crosshairs-gps' : 'mdi-crosshairs-gps'"
                    single-line
                    placeholder="Location"
                    clearable
                    clear-icon="mdi-close-circle"
                    @click:clear="clearLocation"
                    id="autocomplete"
                    @click:append-outer="locatorButtonPressed"
                    class="googleClass"
                >
                  <!-- :loading="spinner" na lokator?? -->
                </v-text-field>
              </div>
            </v-col>
            <!-- DATUM OD DO -->
            <v-col cols="6" class="pr-1 pl-6 pt-5 pb-0">
              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="true"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <v-date-picker v-model="startDate" :min="new Date().toISOString()"></v-date-picker>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      label="Date"
                      v-model="showDate"
                      prepend-icon="mdi-calendar"
                      readonly
                      hint="YYYY/MM/DD format"
                      persistent-hint
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
              </v-menu>
            </v-col>
            <v-col cols="4" class="pl-1 pt-5 pb-5">
              <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="time"
                      label="Picker in menu"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="10" class="px-6 py-1">
              <v-textarea
                  v-model="description"
                  class="pt-2"
                  label="Write event description."
                  auto-grow
                  clearable
                  outlined
                  :rules="descriptionRules">
              </v-textarea>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions xs3 md4 class="justify-center">
          <div class="text-center pb-4">
            <v-btn
                rounded
                class="px-15 primary elevation-0 buttonText--text"
                @click="addEvent(); show = false"
            >Add event
            </v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import { DeedsService } from "@/services/deedsService";

require("dotenv").config();

export default {
  name: "CreateEventPopup",
  data() {
    return {
      startDate: "",
      date: "",
      name: "",
      time: null,
      menu2: false,
      menu: false,
      category: "",
      deed_picture: null,
      address: "",
      error: "",
      city: "",
      zipCode: "",
      streetName: "",
      streetNumber: "",
      country: "",
      description: "",
      location: "",
      spinner: false,
      valid: true,
      newEvent: null,
      categories: ["Environment", "Social", "Animals"],
      value: Boolean,
      inputRules: [(v) => v.length > 0 || "Field must not be empty"],
      descriptionRules: [
        (v) => {
          if (v) return v.length <= 250 || "maximum 250 characters";
          else return true;
        }
      ]
    };
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
    },
    showDate() {
      return this.startDate;
    }
  },
  methods: {
    closeDialog() {
      this.clear();
      this.show = false;
    },
    clearLocation() {
      this.location = "";
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
              this.address = response.data.results[0].formatted_address;
              let city;
              let country;
              let zipCode;
              let streetName;
              let streetNumber;


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
                    case "postal_code":
                      zipCode = component.long_name;
                      break;
                    case "route":
                      streetName = component.long_name;
                      break;
                    case "street_number":
                      streetNumber = component.long_name;
                      break;
                  }
                });

                this.city = city;
                this.country = country;
                this.zipCode = zipCode;
                this.streetName = streetName !== undefined ? streetName + ", " : "";
                this.streetNumber = streetNumber !== undefined ? streetNumber + ", " : "";
                this.address = this.streetName + this.streetNumber + this.zipCode + ", " + this.city + ", " + this.country;
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
    async addEvent() {
      try {
        const FormData = require("form-data");
        let startDate = this.startDate + " " + this.time;
        let categories = this.category.toString();

        const formData = new FormData();
        formData.append("image", this.deed_picture);
        formData.append("name", this.name);
        formData.append("category", categories);
        formData.append("street", this.streetName);
        formData.append("streetNumber", this.streetNumber);
        formData.append("zipCode", this.zipCode);
        formData.append("city", this.city);
        formData.append("country", this.country);
        formData.append("start_time", startDate);
        formData.append("description", this.description);

        this.newEvent = await DeedsService.addEvent(formData);
        this.deedAddedEventBus(this.newEvent);

      } catch (err) {
        console.log(err);
      }
    },
    deedAddedEventBus(deed) {
      this.$root.$emit("deedAdded", deed);
    }
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
    let zipCode;
    let streetName;
    let streetNumber;

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
            case "postal_code":
              zipCode = component.long_name;
              break;
            case "route":
              streetName = component.long_name;
              break;
            case "street_number":
              streetNumber = component.long_name;
              break;
          }
        });
      });


      this.city = city;
      this.country = country;
      this.zipCode = zipCode !== undefined ? zipCode : "";
      this.streetName = streetName !== undefined ? streetName + ", " : "";
      this.streetNumber = streetNumber !== undefined ? streetNumber + ", " : "";
      this.address = this.streetName + this.streetNumber + this.zipCode + ", " + this.city + ", " + this.country;
    });
  }
};
</script>

<style>
.googleClass {
  z-index: 10000 !important;
}
</style>
