import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: "mdiSvg", // "mdi" || "mdiSvg" || "md" || "fa" || "fa4" || "faSvg"
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
        info: "#8e968a",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});