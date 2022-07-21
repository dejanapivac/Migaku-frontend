<template>
  <v-card>
    <v-dialog
      @click.stop="attendantsDialog = true"
      class="mx-auto"
      max-width="300"
      tile
    >
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "AttendantsPopup",
};
</script>
