import DB from "./indexDB"; // getAllVocabularies getAllTerms

/** @type {*} */
const store = {
  state: {
    //contains the added vocabs {amount, baseURL, data, quads:[{}],terms:[{}], type, url}
    vocabs: [],
    //contains terms {subject, predicate, object} added by the user
    vocabTerms: [],
    // ???
    filterPredicates: [],

    displayCORS: false,
    // ???
    token: "",
    // ???
    missingCapabilityFields: [],
    //contains the id of input/output fields that were identified in NewCapability.vue to be empty
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
     * @param String
     */

    vocabLoadError(state, sourceURL) {
      state.displayCORS = true;
      console.log("error loading " + sourceURL);
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
     * Replaces the list of missing capability field's ids
     * @param state current state
     * @param value {array} Array of strings containing the ids of missing capabilitiy fields
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    replaceMissingCapabilityFields(state, value) {
      state.missingCapabilityFields = value;
    },
    /**
     * Replaces the kind of capability of a new capability
     * @param state current state
     * @param value The new kind of capability as string
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    newCapChangeKindOfCapability(state, value) {
      state.newCapability.kindOfCapability = value;
    },
    /**
     * Replaces the file name of a new capability
     * @param state current state
     * @param value The new file name as string
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    newCapChangeFileName(state, value) {
      state.newCapability.fileName = value;
    },
    /**
     * Replaces the function name of a new capability
     * @param state current state
     * @param value The new function name as string
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    newCapChangeFunctionName(state, value) {
      state.newCapability.functionName = value;
    },
    /**
     * Either adds an input parameter, or sub input parameter, or sub-sub input parameter, depending on whether a valid (>= 0) inputIndex or subInputIndex is provided for nesting
     * @param state current state
     * @param {{input: object, inputIndex: number, subInputIndex : number}} value the input parameter to be added, the optional input index -> sub-input or sub-sub input, the optional subInput index -> sub-sub input
     * @author Dimitri Staufer <staufer@tu-berlin.de>
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
     * Either removes an input parameter, or sub input parameter, or sub-sub input parameter, depending on whether a valid (>= 0) inputIndex or subInputIndex is provided for nesting
     * @param state current state
     * @param {{input: object, inputIndex: number, subInputIndex : number}} value the input parameter to be removed, the optional input index -> sub-input or sub-sub input, the optional subInput index -> sub-sub input
     * @author Dimitri Staufer <staufer@tu-berlin.de>
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
     * Replaces the array of inputs for a new capability description to force the UI to rebuild after a change of sequences through drag-and-drop
     * @param state current state
     * @param value {array} The array of inputs (containing the new sequence)
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    newCapReplaceCapabilityInputsForSequenceChange(state, value) {
      state.newCapability.inputs = value;
    },
    /**
     * Either adds an output parameter, or sub output parameter, or sub-sub output parameter, depending on whether a valid (>= 0) outputIndex or subOutputIndex is provided for nesting
     * @param state current state
     * @param {{output: object, outputIndex: number, subOutputIndex : number}} value the output parameter to be added, the optional output index -> sub-output or sub-sub output, the optional subOutput index -> sub-sub output
     * @author Dimitri Staufer <staufer@tu-berlin.de>
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
     * Either removes an output parameter, or sub output parameter, or sub-sub output parameter, depending on whether a valid (>= 0) outputIndex or subOutputIndex is provided for nesting
     * @param state current state
     * @param {{output: object, outputIndex: number, subOutputIndex : number}} value the output parameter to be removed, the optional output index -> sub-output or sub-sub output, the optional subOutput index -> sub-sub output
     * @author Dimitri Staufer <staufer@tu-berlin.de>
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
     * Replaces the array of outputs for a new capability description to force the UI to rebuild after a change of sequences through drag-and-drop
     * @param state current state
     * @param value {array} The array of outputs (containing the new sequence)
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    newCapReplaceCapabilityOutputsForSequenceChange(state, value) {
      state.newCapability.outputs = value;
    },
    /**
     * Changes the value of an input's, sub-input's, or sub-sub-input's parameter value, depending on whether a valid (>= 0) inputIndex, subIndex, or subsubIndex is provided for nesting
     * @param state current state
     * @param {{inputIndex: number, subIndex: number, subsubIndex : number, propertyKey : string, value : string}} value the input parameter this is refering to, the optional subIndex -> sub-output or sub-sub input, the optional subsubIndex -> sub-sub input, the key and value of the property to be mutated
     * @author Dimitri Staufer <staufer@tu-berlin.de>
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
     * Changes the value of an output's, sub-output's, or sub-sub-output's parameter value, depending on whether a valid (>= 0) outputIndex, subIndex, or subsubIndex is provided for nesting
     * @param state current state
     * @param {{outputIndex: number, subIndex: number, subsubIndex : number, propertyKey : string, value : string}} value the output parameter this is refering to, the optional subIndex -> sub-output or sub-sub output, the optional subsubIndex -> sub-sub output, the key and value of the property to be mutated
     * @author Dimitri Staufer <staufer@tu-berlin.de>
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
     * Restores the newCapability object to its original state, i.e. remove/clear all user input
     * @param state current state
     * @author Dimitri Staufer <staufer@tu-berlin.de>
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
     * Returns the list of missing capability field's ids
     * @return state.missingCapabilityFields, i.e. an array of field id strings that have not been filled-out by the user yet
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    missingCapabilityFields: (state) => {
      return state.missingCapabilityFields;
    },

    /**
     * Returns the kind of capability value, which is a string
     * @param state
     * @return {String} The kind of capability
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    newCapKindOfCapability: (state) => {
      return { value: state.newCapability.kindOfCapability };
    },
    /**
     * Returns the file name of the capability, which is a string
     * @param state
     * @return {String} the capability's file name
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    newCapFileName: (state) => {
      return { value: state.newCapability.fileName };
    },
    /**
     * Returns the function name of the capability, which is a string
     * @param state
     * @return {String} the capability's function name
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    newCapFunctionName: (state) => {
      return { value: state.newCapability.functionName };
    },
    /**
     * Returns the inputs array of the newCapability object
     * @param state
     * @return state.inputs
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    newCapInputs: (state) => {
      return state.newCapability.inputs;
    },
    /**
     * Returns the outputs array of the newCapability object
     * @param state
     * @return state.outputs
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    newCapOutputs: (state) => {
      return state.newCapability.outputs;
    },
    /**
     * Returns if vocab table shuld display CORS
     * @param state
     * @return displayCORS
     */
    displayCORS: (state) => {
      return state.displayCORS;
    },
  },
};

export default {
  store,
};
