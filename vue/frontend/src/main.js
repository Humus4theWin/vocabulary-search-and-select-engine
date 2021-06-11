import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import Vuex from "vuex";
import VueWorker from "vue-worker";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueWorker);

const store = new Vuex.Store({
  state: {
    vocabs: [],
    terms: [],

    search: "",
    //contains the results of the search
    answers: {},
    drawerState: false,
  },
  mutations: {
    saveSearchedWord(state, word) {
      state.search = word;
    },
    addVocab(state, vocab) {
      console.log(vocab);
      state.vocabs.push(vocab);
    },
    addTerm(state, term) {
      state.terms.push(term);
    },
    toggleDrawerState(state) {
      state.drawerState = !state.drawerState;
    },
  },
  getters: {
    vocabularies: (state) => {
      return state.vocabs;
    },
    quads: (state) => {
      return state.vocabs.flatMap((vocab) => vocab.quads);
    },
    drawerState(state) {
      return state.drawerState;
    },
    terms: (state) => {
      return state.terms;
    },
    search: (state) => {
      return state.search;
    },
  },
});

new Vue({
  vuetify,
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
