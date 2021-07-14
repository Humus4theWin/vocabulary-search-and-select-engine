import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: "mdi", // "mdi" || "mdiSvg" || "md" || "fa" || "fa4" || "faSvg"
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#74b559",
        secondary: "#585958",
        accent: "333632",
        error: "#FF5252",
        info: "#343c4a",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});
