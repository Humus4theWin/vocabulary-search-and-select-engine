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
                //green of proceed
                primary: "#74b559",
                secondary: "#424242",
                accent: "#82B1FF",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FFC107",
            }
        }
    }
});