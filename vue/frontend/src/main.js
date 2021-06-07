import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import Vuex from "vuex";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    quads: [],
    vocabs: [],

    search: "",
    //contains the results of the search
    answers: {},
  },
  mutations: {
    saveSearchedWord(state, word) {
      state.search = word;
    },
    addQuad(state, quad) {
      state.quads.push(quad);
    },
    addQuads(state, quads) {
      console.log(quads);
      state.quads = [...state.quads, ...quads];
    },
    addVocab(state, vocab) {
      console.log(vocab);
      state.vocabs.push(vocab);
    },
  },
  getters: {
    vocabularies: (state) => {
      return state.vocabs;
    },
  },
});
new Vue({
  vuetify,
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
