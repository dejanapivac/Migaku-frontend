<template>
  <v-row>
    <v-dialog
      class="ma-0 popup"
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
          ><v-icon color="white" small>mdi-close</v-icon></v-btn
        >
        <v-row class="ma-0 pt-6" justify="center">
          <v-card-title class="headline font-weight-bold pb-0">
            Add new event
          </v-card-title></v-row
        >
        <v-form>
          <v-row class="my-4 mx-0" justify="center">
            <v-col cols="10" class="px-6 py-1">
              <v-text-field
                class="font-weight-medium"
                label="Event name"
                v-model="eventName"
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
              <!-- <div class="red--text" v-show="error">{{ error }}</div>

              <v-text-field
                hide-details
                extended
                prepend-icon="mdi-magnify"
                single-line
                placeholder="Event location"
                v-model="address"
                id="autocomplete"
                :loading="spinner"
              ></v-text-field>
            </v-col> -->

              <div>
                <v-text-field
                  hide-details
                  prepend-icon="mdi-magnify"
                  single-line
                  v-model="address"
                  id="autocomplete"
                >
                </v-text-field>
              </div>
            </v-col>
            <!-- DATUM OD DO -->
            <v-col cols="6" class="pr-1 pl-6 pt-5 pb-0">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <v-date-picker v-model="dates" range></v-date-picker>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateRangeText"
                    label="Date range"
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
            <v-col cols="4" class="pl-1 pt-5 pb-0">
              <!-- SAMO PREKO INPUTA TIME - JEDINO AM/PM -->

              <!-- <v-text-field type="time" label="Time" format="24hr">
              </v-text-field> -->
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
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateEventPopup",
  data() {
    return {
      dates: [],
      time: null,
      menu2: false,
      menu: false,
      category: "",
      address: "",
      error: "",
      spinner: false,
      valid: true,
      categories: ["Environment", "Social", "Animals"],
      value: Boolean,
      eventName: "",
      inputRules: [(v) => v.length > 0 || "Field must not be empty"],
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
      },
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  methods: {
    closeDialog() {
      this.clear();
      this.show = false;
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
};
</script>
