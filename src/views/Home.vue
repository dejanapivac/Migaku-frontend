<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="4">
      <v-autocomplete
        class="mt-10 mr-10"
        height
        id="search_term"
        ref="origin"
      ></v-autocomplete>
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

// Vue.use(VuetifyGoogleAutocomplete, {
//   apiKey: "AIzaSyBu8iUCMExuroiO_KgXXbKx9Rad4Leb02M", // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
//   version: "...", // Optional
//   language: "...", // Optional
//   installComponents: true, // Optional (default: true) - false, if you want to locally install components
//   vueGoogleMapsCompatibility: false, // Optional (default: false) - true, requires vue2-google-maps to be configured see https://github.com/xkjyeah/vue-google-maps
// });

export default {
  name: "Home",
};
</script>
