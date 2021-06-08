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
    drawerState: false,
  },
  mutations: {
    saveSearchedWord(state, word) {
      state.search = word;
    },
    addQuad(state, quad) {
      state.quads.push(quad);
    },
    addQuads(state, quads) {
      console.log(quads[0]);
      state.quads = [...state.quads, ...quads];
    },
    addVocab(state, vocab) {
      console.log(vocab);
      state.vocabs.push(vocab);
    },
    toggleDrawerState(state) {
      console.log("toggled");
      state.drawerState = !state.drawerState;
    },
  },
  getters: {
    vocabularies: (state) => {
      return state.vocabs;
    },
    quads: (state) => {
      return state.quads;
    },
    drawerState(state) {
      return state.drawerState;
    },
  },
});
new Vue({
  vuetify,
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
