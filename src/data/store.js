import DB from "./indexDB"; // getAllVocabularies getAllTerms

/** @type {*} */
const store = {
  state: {
    //contains the added vocabs {amount, baseURL, data, quads:[{}],terms:[{}], type, url}
    vocabs: [],
    //contains terms {subject, predicate, object} added by the user
    vocabTerms: [],

    // searchFilter
    filterCriteria: [],

    ownTermAttributes: [],
    //contains the results of the search
    search: "",
    leftDrawerState: false,
    rightDrawerState: false,
  },
  mutations: {
    laodFromDB(state) {
      DB.getAllVocabularies().then((res) => (state.vocabs = res));
      DB.getAllTerms().then((res) => (state.vocabTerms = res));
      DB.getFilterCriteria().then((res) => (state.filterCriteria = res));
    },
    /**
     * saves the word, which the user choose, from the list of SearchField
     * @param state current state
     * @param {string} word string of searched
     */
    saveSearchedWord(state, word) {
      state.search = word;
    },
    /**
     * adds a vocab (quads) to the list of available vocabs
     * @param state current state
     * @param {Object} vocab a rdf vocab
     */
    addVocab(state, vocab) {
      console.log(vocab);
      state.vocabs.push(vocab);
      DB.addVocabulary(vocab);
    },
    /**
     * adds terms to the vocab, that matches the VocabUrl
     * @param state
     * @param Array data - [{{IRI: string, vocabSourceURL: string, ...any : string}}]
     */
    addVocabTerms: function (state, data) {
      console.log(data);
      state.vocabTerms.push(...data);
      DB.addTerms(data);
    },
    /**
     * adds a new term (subject, predicate, object), created by the user to terms
     * @param state current state
     * @param attribute {subject, predicate, object}
     */
    addTerm: function (state, attribute) {
      // todo: rename
      state.ownTermAttributes.push(attribute);
    },
    /**
     * toggles the boolean value of the LEFT navigation drawer (triggered by user click)
     * @param state 1current state
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
    /**
     *
     * @param state
     * @param Array of {object}
     *
     * @property {boolean} isUsed if the criteria is applied
     * @property {string} predicate the IRI of the predicate, being filtered on
     * @property {string} searchType  enum, how to filter the Terms on the predicate
     */
    setFilterCriteria(state, data) {
      state.filterCiteria = data;
      DB.updateFilterCriteria(data);
    },
  },
  getters: {
    /**
     * returns all vocabs, which were added
     * @return state.vocabs
     */
    vocabularies: (state) => {
      //todo: rename getVocabulareis
      return state.vocabs;
    },
    /**
     * returns all quads of all vocabs as an array of quads objects {subject, predicate, object}
     * @todo refactor JSDoc of function? Format not clear
     * @param state
     * @return {quads[]}
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
     * @return [{subject:string, predicate:string, object:string}]
     */
    terms: (state) => {
      // todo: rename to ermAttributes
      return state.ownTermAttributes;
    },
    /**
     * returns all terms from all vocab
     * @todo refactor JSDoc of function? Format not clear
     * @param state
     * @return {term[]}

     * @typedef {Object} term
     * @property {string} label the name of the term (aka. the subject)
     * @property {string} url the IRI of the Term (aka. the subject)
     * term can have additional arrtibues (key/val pairs), containning other predicate/object data for the given subject (lable/url)
     * access them through: Object.keys(<term>)
     */
    getVocabTerms(state) {
      return state.vocabTerms;
    },
    /**
     * returns all filter crieria
     * @param state
     * @return {fitlerCritera[]}

     * @typedef Array of {object}
     * @property {boolean} isUsed if the criteria is applied
     * @property {string} predicate the IRI of the predicate, being filtered on
     * @property {string} searchType  enum, how to filter the Terms on the predicate
     */
    getFilterCriteria(state) {
      console.log(state.filterCriteria);
      return state.filterCriteria;
    },
    /**
     * returns the outcome of the user's choice after searching throw the added vocabs, saved in state.search
     * @return  state.search
     */
    search: (state) => {
      return state.search;
    },
  },
};

export default {
  store,
};
