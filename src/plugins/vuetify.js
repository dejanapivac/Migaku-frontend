import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
// import "font-awesome/css/font-awesome.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "FCCC8A", //zuta
        primaryLighter: "FFEBD0",
        green: "8BA88F",
        carmin: "#D70040",
        // secondary: "#E05333", //crvena
        // accent: "#F8AC42", //zuta
        // white: "#FFFEFB",
        background: "FFFEFB",
        buttonText: "555645",
        primaryText: "#445462",
        // secondaryText: "#6D7984"
      },
    },
  },
});
