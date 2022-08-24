<template>
  <v-card flat>
    <v-list>
      <v-list-item>
        <v-list-item-avatar size="45" class="align-self-start py-0">
          <v-img :alt="`${info.id} avatar`" :src="info.profile_picture"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="heaing-4 font-weight-bold py-0">
            <router-link
                :to="{
              name: 'Reviews',
              params: { id: info.id }
            }"
                class="font-weight-bold text--primary pointer pt-5 mb-3 pt-1"
                style="text-decoration: none; font-size: 15px"
            >{{ info.name }}
            </router-link
            >
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