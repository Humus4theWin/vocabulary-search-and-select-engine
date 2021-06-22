// vocabs
// todo steal from him https://github.com/cfjedimaster/vue-demos/blob/master/idb/src/api/idb.js

let db;

function initiate() {
  console.log("indexDB initiate");
  if (!window.indexedDB)
    window.indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
  window.IDBTransaction =
    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction;
  window.IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  let DBOpenRequest = window.indexedDB.open("PROCEED", 1);
  DBOpenRequest.onsuccess = function () {
    db = DBOpenRequest.result;
  };
  DBOpenRequest.onupgradeneeded = function (event) {
    console.log("onupgradeneeded");
    db = event.target.result;
    db.createObjectStore("Vocabs", { keyPath: "sourceURL" });
    db.createObjectStore("Terms", { keyPath: "IRI" });
  };
}

/**
 *
 * @returns {[{sourceURL: string, baseURL: string, numberOfQuads: number, state: string, type: string}]}
 * Array of Vocabularies
 */
function getAllVocabularies() {
  console.log("indexDB getAllVocabularies");
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
async function addVocabulary(vocab) {
  console.log("indexDB addVocabulary");
  let transaction = db.transaction(["Vocabs"], "readwrite");
  let store = transaction.objectStore("Vocabs");
  store.put(vocab);

  await store.oncomplete;
}

// quads  ??

// indexed terms

/**
 *
 * @returns {{IRI: string, vocabSourceURL: string, ...any : string}}
 * can contain any number of attributes
 */
function getAllTerms() {
  console.log("indexDB getAllTerms");
  /*  return {
    IRI: "",
    vocabSourceURL: ""
  };*/

  let transaction = db.transaction(["Vocabs"], "readwrite");
  let store = transaction.objectStore("Vocabs");
  return store.getAll();
}

// eslint-disable-next-line no-unused-vars
function addAllTerms(termsArray) {
  let transaction = db.transaction(["Terms"], "readwrite");
  let store = transaction.objectStore("Terms");
  termsArray.forEach((term) => store.put(term));
  console.log("indexDB addAllTerms");
}

export {
  getAllVocabularies,
  addVocabulary,
  getAllTerms,
  addAllTerms,
  initiate,
};
