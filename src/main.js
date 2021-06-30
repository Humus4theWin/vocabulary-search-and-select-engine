import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import Vuex from "vuex";
import VueWorker from "vue-worker";
import store from "./data/store";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueWorker);

let storeObj = new Vuex.Store(store.store); // get from store

storeObj.commit("laodFromDB");

setTimeout(function () {
  let app = new Vue({
    vuetify,
    router,
    store: storeObj,
    render: (h) => h(App),
  }).$mount("#app");

  window.App = app; // todo: delete! workareound for WebWorker, until it is a "real" WebWorker, not just a "function in another file"
}, 0);
