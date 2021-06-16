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
/** @type {*} */
const store = new Vuex.Store({
  state: {
    //contains the added vocabs
    vocabs: [],
    terms: [],
    //contains the results of the search
    search: "",

    answers: {},
    leftDrawerState: false,
    rightDrawerState: false,
  },
  mutations: {
    /**
     * saves the word, which the user choose, from the list of SearchField
     * @param state current state
     * @param {string} word string of searched
     */
    saveSearchedWord(state, word) {
      state.search = word;
    },
    /**
     * adds a vocab to the list of available vocabs
     * @param state current state
     * @param {Object} vocab a rdf vocab
     */
    addVocab(state, vocab) {
      console.log(vocab);
      state.vocabs.push(vocab);
    },
    /**
     * @param state
     * @param {Object} data - {url, terms}
     */
    addVocabTerms: function (state, data) {
      let selected = state.vocabs.filter((vocab) => vocab.url === data.url);
      selected[0].terms = data.terms;
    },
    /**
     * adds a new term (subject, predicate, object), created by the user to the searchable terms
     * @param state current state
     * @param term subject, predicate, object
     */
    addTerm: function (state, term) {
      state.terms.push(term);
    },
    /**
     * toggles the boolean value of the LEFT navigation drawer (triggered by user click)
     * @param state current state
     */
    toggleLeftDrawerState(state) {
      state.leftDrawerState = !state.leftDrawerState;
    },
    /**
     * toggles the boolean value of the RIGHT capability description drawer (triggered by user click)
     * @param state current state
     */
    toggleRightDrawerState(state) {
      state.rightDrawerState = !state.rightDrawerState;
    },
  },
  getters: {
    /**
     * returns all vocabs, which were added (baseURL, RDF type, amount)
     * @return state.vocabs
     */
    vocabularies: (state) => {
      return state.vocabs;
    },
    /**
     * returns vocabs as an array of quads objects {subject, predicate, object}
     * @todo refactor JSDoc of function? Format not clear
     * @param state
     * @return {unknown[]}
     */
    quads: (state) => {
      return state.vocabs.flatMap((vocab) => vocab.quads);
    },
    /**
     * @param state
     * @return {boolean}
     */
    leftDrawerState(state) {
      return state.leftDrawerState;
    },
    /**
     * @param state
     * @return {boolean}
     */
    rightDrawerState(state) {
      return state.rightDrawerState;
    },
    /**
     * returns all terms, which the user has added
     * @param state
     * @return state.terms
     */
    terms: (state) => {
      return state.terms;
    },
    getVocabTerms(state) {
      return state.vocabs.flatMap((vocab) => vocab.terms);
    },
    /**
     * returns the outcome of the user's choice after searching throw the added vocabs, saved in state.search
     * @return  state.search
     */
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
