<template>
  <v-dialog v-model="popupVisible" max-width="400">
    <v-card>
      <v-card-title class="headline">Account Change</v-card-title>
      <v-card-text>
        You switched to a different MetaMask account.
        <br />
        Current account: {{ currentAccount }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="popupVisible = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    currentAccount: String,
  },
  data() {
    return {
      popupVisible: true,
    };
  },
};
</script>
