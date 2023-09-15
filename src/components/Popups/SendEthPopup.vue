<template>
  <v-row>
    <v-dialog
      v-model="show"
      class="body ma-0"
      persistent
      max-width="400"
      eager
      @click:outside="show = false"
    >
      <v-card class="body">
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
        </v-btn>
        <v-row class="ma-0 pt-6" justify="center">
          <v-card-title class="headline font-weight-bold pb-0">
            Send Eth
          </v-card-title>
        </v-row>
        <v-row
          v-if="attendantsArray.length"
          align="center"
          class="mb-1"
          color="background"
        >
          <v-col
            cols="12"
            v-for="attendant in attendantsArray"
            :key="attendant.id"
            class="py-0"
          >
            <SingleAttendant
              :info="attendant"
              :showButton="showButton && hasWallet"
              :curr-user-wallet="currUserWallet"
              :complete="complete"
              @singleAttendantTip="pushToAttendantsArray"
            />
          </v-col>
        </v-row>
        <v-card-actions xs3 md4 class="justify-center">
          <div class="text-center pb-4">
            <v-btn
              rounded
              class="no-uppercase px-5 primary elevation-0 buttonText--text"
              @click="completeEvent(event.deed_id) && sendEth()"
              :disabled="complete"
              >Complete event
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import SingleAttendant from "@/components/Cards/singleAttendant";
import { DeedsService } from "@/services/deedsService";
import { ethers } from "ethers";
import TipAttendantsContract from "../../../artifacts/contracts/TipAttendantsContract.sol/TipAttendantsContract.json";

export default {
  name: "SendEthPopup",
  components: { SingleAttendant },
  props: ["attendantsArray", "event", "hasWallet", "currUserWallet"],
  data() {
    return {
      value: Boolean,
      complete: false,
      showButton: true,
      tippedAttendantsArray: [],
    };
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    async completeEvent(id) {
      try {
        this.complete = await DeedsService.completeEvent(id);
        this.$emit("complete-event-clicked", this.complete);
        if (this.complete) {
          setTimeout(() => {
            this.show = false;
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async sendEth() {
      try {
        const contract = new ethers.Contract(
          "0x5fbdb2315678afecb367f032d93f642f64180aa3",
          TipAttendantsContract.abi,
          new ethers.providers.Web3Provider(this.getEth()).getSigner()
        );

        const tipsSum = this.tippedAttendantsArray
          .map((attendant) => attendant.tip)
          .reduce((acc, currValue) => {
            return acc + currValue;
          }, 0);

        const result = await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.currUserWallet,
              to: contract.address,
              value: ethers.utils.parseEther(tipsSum.toString())._hex,
              gasLimit: "0x5028",
              maxPriorityFeePerGas: "0x3b9aca00",
              maxFeePerGas: "0x2540be400",
            },
          ],
        });

        await contract.sendTips(this.tippedAttendantsArray);

        console.log("Transaction result:", result);
      } catch (error) {
        console.error("Transaction error:", error);
      }
    },
    pushToAttendantsArray(event) {
      const attendant = {
        wallet: event.attendantWallet,
        tip: parseInt(event.tipAmount),
      };
      this.tippedAttendantsArray.push(attendant);
    },
    getEth() {
      const eth = window.ethereum;
      if (!eth) {
        throw new Error("no metamask");
      }
      return eth;
    },
  },
};
</script>

<style>
.body {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
