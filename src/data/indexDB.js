// vocabs

/**
 *
 * @returns {[{sourceURL: string, baseURL: string, numberOfQuads: number, state: string, type: string}]}
 * Array of Vocabularies
 */
function getAllVocabularies() {
  // TBD
  return [
    {
      sourceURL: "", // schema.org/vocabularieForIoT
      baseURL: "", // schema.org/
      numberOfQuads: 0,
      state: "", // default, loading, parsing, ready
      type: "",
    },
  ];
}

/**
 *
 * @param vocab {sourceURL: string, baseURL: string, numberOfQuads: number, state: string, type: string}
 */

// eslint-disable-next-line no-unused-vars
function addVocabulary(vocab) {
  // TBD
}

// quads  ??

// indexed terms

/**
 *
 * @returns {{IRI: string, vocabSourceURL: string, ...any : string}}
 * can contain any number of attributes
 */
function getAllTerms() {
  return {
    IRI: "",
    vocabSourceURL: "",
  };
}
// eslint-disable-next-line no-unused-vars
function addAllTerms(termsArray) {}

export { getAllVocabularies, addVocabulary, getAllTerms, addAllTerms };
