<template>
  <v-row justify="center" v-if="loaded">
    <v-dialog v-model="show" max-width="600" @click:outside="show = false">
      <v-card>
        <v-img :src="event.image" height="300" class="justify-end" align="end">
        </v-img>
        <v-card-title class="headline font-weight-bold pb-0">
          {{ event.name }}
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ExpandedEventPopup",
  props: {
    eventId: String,
  },
  data() {
    return {
      event: {},
      loaded: false,
      events: {},
    };
  },
};
</script>
