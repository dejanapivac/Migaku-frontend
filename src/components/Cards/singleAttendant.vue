<template>
  <v-card flat>
    <v-list>
      <v-list-item>
        <v-list-item-avatar size="45" class="align-self-start py-0">
          <v-img :alt="`${info.id} avatar`" :src="info.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
              class="heaing-4 font-weight-bold py-0"
              v-text="info.title">

          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "SingleAttendant",
  data() {
    return {};
  },
  props: ["info"]
};
</script>