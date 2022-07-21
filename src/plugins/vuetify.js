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
        background: "FFFEFB",
        buttonText: "555645",
        primaryText: "#445462",
      },
    },
  },
});
