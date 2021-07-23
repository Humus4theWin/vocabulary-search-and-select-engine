import DB from "./indexDB"; // getAllVocabularies getAllTerms

/** @type {*} */
const store = {
  state: {
    //contains the added vocabs {amount, baseURL, data, quads:[{}],terms:[{}], type, url}
    vocabs: [],
    //contains terms {subject, predicate, object} added by the user
    vocabTerms: [],
    // searchFilter
    filterPredicates: [],

    token: "",

    ownTermAttributes: [],
    //contains the results of the search
    search: "",
    rightDrawerState: false,
    //contains the properties, such as kindOfCapability and inputs/outputs of new capabilities
    newCapability: {
      name: "",
      kindOfCapability: "",
      fileName: "index.js",
      functionName: "",
      sameAs: "",
      inputs: [],
      outputs: [],
    },
  },
  mutations: {
    async laodFromDB(state) {
      state.vocabs = await DB.getAll(DB.dbNames.VOCABULARIES);
      state.vocabTerms = await DB.getAll(DB.dbNames.TERMS);
      state.token = await DB.getSingle(
        DB.dbNames.SETTINGS,
        DB.settingsKeys.Token
      );
      state.filterPredicates = await DB.getSingle(
        DB.dbNames.SETTINGS,
        DB.settingsKeys.PREDICATES
      );
    },

    /**
     * adds a vocab (quads) to the list of available vocabs
     * @param state current state
     * @param {Object} vocab a rdf vocab
     */
    addVocab(state, vocab) {
      let changedVocab = state.vocabs.filter(
        (v) => v.sourceURL === vocab.sourceURL
      )[0];
      if (changedVocab === undefined) {
        state.vocabTerms = [...state.vocabTerms, ...vocab.terms];
        DB.putAll(DB.dbNames.TERMS, [...vocab.terms]);

        vocab.terms = undefined; //do not sore terms in vocabs
        state.vocabs = [...state.vocabs, vocab];
        DB.putSingle(DB.dbNames.VOCABULARIES, vocab);
      } else {
        let index = state.vocabs.indexOf(changedVocab);
        Object.keys(vocab)
          .filter((key) => key !== "terms") //do not sore terms in vocabs
          .forEach((key) => (state.vocabs[index][key] = vocab[key]));

        let updatedTerms = this.state.vocabTerms.filter(
          (term) => term.vocabSourceURL !== vocab.sourceURL
        );
        console.log(updatedTerms);
        updatedTerms.push(...vocab.terms);
        console.log(updatedTerms);
        this.state.vocabTerms = updatedTerms;
        DB.overwriteAll(DB.dbNames.VOCABULARIES, state.vocabs);
        DB.overwriteAll(DB.dbNames.TERMS, state.vocabTerms);
      }
    },
    /**
     * adds terms to the vocab, that matches the VocabUrl
     * @param state
     * @param Array data - [{{IRI: string, vocabSourceURL: string, ...any : string}}]
     */
    addVocabTerms: function (state, data) {
      console.log(data);
      state.vocabTerms.push(...data);
      DB.putAll(DB.dbNames.TERMS, data);
    },
    /**
     * overwrites the list of available vocabs
     * @param state current state
     * @param [{Object}] vocab a rdf vocab
     */
    setVocabs(state, vocabs) {
      state.vocabs = vocabs;
      DB.overwriteAll(DB.dbNames.VOCABULARIES, vocabs);
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
      state.filterPredicates = data;
      console.log("setFilterCriteria");
      console.log(data);
      let criteria = {
        //todo: refactor
        key: DB.settingsKeys.PREDICATES,
        value: data,
      };

      DB.putSingle(DB.dbNames.SETTINGS, criteria);
    },
    /**
     * adds terms to the vocab, that matches the VocabUrl
     * @param state
     * @param Array data - [{{IRI: string, vocabSourceURL: string, ...any : string}}]
     */
    setVocabTerms: function (state, data) {
      console.log(data);
      state.vocabTerms = data;
      DB.overwriteAll(DB.dbNames.TERMSdata);
    },

    /**
     * adds a new term (subject, predicate, object), created by the user to terms
     * @param state current state
     * @param attribute {subject, predicate, object}
     */
    addTerm: function (state, attribute) {
      state.ownTermAttributes.push(attribute); //display

      let term = state.vocabTerms.find(
        (term) => term.IRI === attribute.Subject
      );
      if (!term) {
        term = {
          IRI: attribute.Subject,
        };
        state.vocabTerms.push(term);
      }
      term[attribute.Predicate] = attribute.Object;
      console.log(term);
      DB.putSingle(DB.dbNames.TERMS, term);
    },
    /**
     * toggles the boolean value of the RIGHT navigation drawer (triggered by user click)
     * @param state 1current state
     */
    toggleRightDrawerState(state) {
      state.rightDrawerState = !state.rightDrawerState;
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
     * TODO Description
     * @param state current state
     * @param value
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
    newCapAddCapabilityInput(state, { input, inputIndex, subInputIndex }) {
      if (subInputIndex >= 0) {
        // Add new Sub Sub Input
        state.newCapability.inputs[inputIndex]["sub"][subInputIndex][
          "sub"
        ].push(input);
      } else if (inputIndex >= 0) {
        // Add new Sub Input
        input["sub"] = [];
        state.newCapability.inputs[inputIndex]["sub"].push(input);
      } else {
        // Add new Input
        input["sub"] = [];
        state.newCapability.inputs.push(input);
      }
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapRemoveCapabilityInput(state, { index, subIndex, subsubIndex }) {
      if (subsubIndex >= 0) {
        state.newCapability.inputs[index]["sub"][subIndex]["sub"].splice(
          subsubIndex,
          1
        );
      } else if (subIndex >= 0) {
        state.newCapability.inputs[index]["sub"].splice(subIndex, 1);
      } else {
        state.newCapability.inputs.splice(index, 1);
      }
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapReplaceCapabilityInputsForSequenceChange(state, value) {
      state.newCapability.inputs = value;
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapAddCapabilityOutput(state, { output, outputIndex, subOutputIndex }) {
      if (subOutputIndex >= 0) {
        // Add new Sub Sub Output
        state.newCapability.outputs[outputIndex]["sub"][subOutputIndex][
          "sub"
        ].push(output);
      } else if (outputIndex >= 0) {
        // Add new Sub Output
        output["sub"] = [];
        state.newCapability.outputs[outputIndex]["sub"].push(output);
      } else {
        // Add new Output
        output["sub"] = [];
        state.newCapability.outputs.push(output);
      }
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapRemoveCapabilityOutput(state, { index, subIndex, subsubIndex }) {
      if (subsubIndex >= 0) {
        state.newCapability.outputs[index]["sub"][subIndex]["sub"].splice(
          subsubIndex,
          1
        );
      } else if (subIndex >= 0) {
        state.newCapability.outputs[index]["sub"].splice(subIndex, 1);
      } else {
        state.newCapability.outputs.splice(index, 1);
      }
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapReplaceCapabilityOutputsForSequenceChange(state, value) {
      state.newCapability.outputs = value;
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapChangeCapabilityInputProperty(
      state,
      { inputIndex, subIndex, subsubIndex, propertyKey, value }
    ) {
      console.log(
        "" + inputIndex + subIndex + subsubIndex + propertyKey + value
      );
      // The input array needs to be recreated using 'splice()' so the UI updates automatically
      let input = state.newCapability.inputs[inputIndex];
      if (subsubIndex >= 0) {
        input["sub"][subIndex]["sub"][subsubIndex][propertyKey] = value;
      } else if (subIndex >= 0) {
        input["sub"][subIndex][propertyKey] = value;
        // Remove subsubinputs if complex is disabled
        if (propertyKey == "complex" && value.value == false) {
          input["sub"][subIndex]["sub"] = [];
        }
      } else {
        input[propertyKey] = value;
        // Remove subinputs if complex is disabled
        if (propertyKey == "complex" && value.value == false) {
          input["sub"] = [];
        }
      }

      state.newCapability.inputs.splice(inputIndex, 1, input);
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapChangeCapabilityOutputProperty(
      state,
      { outputIndex, subIndex, subsubIndex, propertyKey, value }
    ) {
      // The output array needs to be recreated using 'splice()' so the UI updates automatically
      let output = state.newCapability.outputs[outputIndex];
      if (subsubIndex >= 0) {
        output["sub"][subIndex]["sub"][subsubIndex][propertyKey] = value;
      } else if (subIndex >= 0) {
        output["sub"][subIndex][propertyKey] = value;
        // Remove subsuboutputs if complex is disabled
        if (propertyKey == "complex" && value.value == false) {
          output["sub"][subIndex]["sub"] = [];
        }
      } else {
        output[propertyKey] = value;
        // Remove suboutputs if complex is disabled
        if (propertyKey == "complex" && value.value == false) {
          output["sub"] = [];
        }
      }

      state.newCapability.outputs.splice(outputIndex, 1, output);
    },
    /**
     * TODO Description
     * @param state current state
     */
    newCapClear(state) {
      state.newCapability = {
        name: "",
        kindOfCapability: "",
        fileName: "index.js",
        functionName: "",
        sameAs: "",
        inputs: [],
        outputs: [],
      };
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
         * returns all predicates, wich are incudet into the search
         * @param state
         * @return {fitlerCritera[]}

         * @typedef Array of {object}
         */
    getFilterCriteria(state) {
      return state.filterPredicates;
    },
    /**
     * returns user Token
     * @return {String}
     */
    getToken(state) {
      return state.token;
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
      return { value: state.newCapability.kindOfCapability };
    },
    /**
     * ToDo Description
     * @param state
     * @return {String}
     */
    newCapFileName: (state) => {
      return { value: state.newCapability.fileName };
    },
    /**
     * ToDo Description
     * @param state
     * @return {String}
     */
    newCapFunctionName: (state) => {
      return { value: state.newCapability.functionName };
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
