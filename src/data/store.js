/** @type {*} */
const store = {
  state: {
    //contains the added vocabs {amount, baseURL, data, quads:[{}],terms:[{}], type, url}
    vocabs: [],
    //contains terms {subject, predicate, object} added by the user
    terms: [],
    //contains the results of the search
    search: "",
    leftDrawerState: false,
    rightDrawerState: false,
    //contains the properties, such as kindOfCapability and inputs/outputs of new capabilities
    newCapability: {
      kindOfCapability: "",
      fileName: "",
      functionName: "",
      sameAs: "",
      inputs: [],
      outputs: [],
    },
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
     * adds a vocab (quads) to the list of available vocabs
     * @param state current state
     * @param {Object} vocab a rdf vocab
     */
    addVocab(state, vocab) {
      console.log(vocab);
      state.vocabs.push(vocab);
    },
    /**
     * adds terms to the vocab, that matches the VocabUrl
     * @param state
     * @param {Object} data - {VocabUrl, terms}
     */
    addVocabTerms: function (state, data) {
      let selected = state.vocabs.filter((vocab) => vocab.url === data.url);
      selected[0].terms = data.terms;
    },
    /**
     * adds a new term (subject, predicate, object), created by the user to terms
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

    /**
     * TODO Description
     * @param state current state
     */
    newCapChangeKindOfCapability(state, value) {
      state.newCapability.kindOfCapability = value;
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapChangeFileName(state, value) {
      state.newCapability.fileName = value;
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapChangeFunctionName(state, value) {
      state.newCapability.functionName = value;
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapChangeSameAs(state, value) {
      state.newCapability.sameAs = value;
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapAddCapabilityInput(state, input) {
      state.newCapability.inputs.push(input);
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapRemoveCapabilityInput(state, index) {
      state.newCapability.inputs.splice(index, 1);
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapAddCapabilityOutput(state, output) {
      state.newCapability.outputs.push(output);
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapRemoveCapabilityOutput(state, index) {
      state.newCapability.outputs.splice(index, 1);
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapChangeCapabilityInputProperty(
      state,
      { inputIndex, propertyKey, value }
    ) {
      // The input array needs to be recreated using 'splice()' so the UI updates automatically
      let input = state.newCapability.inputs[inputIndex];
      input[propertyKey] = value;
      state.newCapability.inputs.splice(inputIndex, 1, input);
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapChangeCapabilityOutputProperty(
      state,
      { outputIndex, propertyKey, value }
    ) {
      // The input array needs to be recreated using 'splice()' so the UI updates automatically
      let output = state.newCapability.outputs[outputIndex];
      output[propertyKey] = value;
      state.newCapability.outputs.splice(outputIndex, 1, output);
    },
  },
  getters: {
    /**
     * returns all vocabs, which were added
     * @return state.vocabs
     */
    vocabularies: (state) => {
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
     * @return state.terms
     */
    terms: (state) => {
      return state.terms;
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
      return state.vocabs.flatMap((vocab) => vocab.terms);
    },
    /**
     * returns the outcome of the user's choice after searching throw the added vocabs, saved in state.search
     * @return  state.search
     */
    search: (state) => {
      return state.search;
    },

    /**
     * ToDo Description
     * @param state
     * @return {String}
     */
    newCapKindOfCapability: (state) => {
      return state.newCapability.kindOfCapability;
    },
    /**
     * ToDo Description
     * @param state
     * @return {String}
     */
    newCapFileName: (state) => {
      return state.newCapability.fileName;
    },
    /**
     * ToDo Description
     * @param state
     * @return {String}
     */
    newCapFunctionName: (state) => {
      return state.newCapability.functionName;
    },
    /**
     * ToDo Description
     * @param state
     * @return {String}
     */
    newCapSameAs: (state) => {
      return state.newCapability.sameAs;
    },
    /**
     * ToDo Description
     * @param state
     * @return state.inputs
     */
    newCapInputs: (state) => {
      return state.newCapability.inputs;
    },
    /**
     * ToDo Description
     * @param state
     * @return state.outputs
     */
    newCapOutputs: (state) => {
      return state.newCapability.outputs;
    },
  },
};

export default {
  store,
};
