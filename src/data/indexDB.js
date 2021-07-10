const DB_NAME = "PROCEED";
const DB_VERSION = 1;
let DB;

let defaultFilterCriteria = [
  {
    isUsed: true,
    predicate: "http://www.w3.org/2000/01/rdf-schema#label",
    searchType: "includes",
  },
  {
    isUsed: true,
    predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
    searchType: "includes",
  },
];

export default {
  async getDb() {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      console.log("OPENING DB", DB);
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        console.log("Error opening db", e);
        reject("Error");
      };

      request.onsuccess = (e) => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = (e) => {
        console.log("onupgradeneeded");
        let db = e.target.result;
        db.createObjectStore("Vocabs", { keyPath: "sourceURL" });
        db.createObjectStore("Terms", { keyPath: "IRI" });
        db.createObjectStore("Filter", { keyPath: "predicate" });
        console.log(this.getFilterCriteria());
        this.getFilterCriteria().then((arr) => {
          if (arr.length === 0)
            this.updateFilterCriteria(defaultFilterCriteria);
        });
        this.getAllTerms().then((arr) => {
          if (arr.length === 0) this.loadDefaultVocabs();
        });
      };
    });
  },
  /*async deleteCat(cat) {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['cats'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('cats');
      store.delete(cat.id);
    });
  },*/
  async getAllVocabularies() {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["Vocabs"], "readonly");
      trans.oncomplete = () => {
        resolve(vocabs);
      };

      let store = trans.objectStore("Vocabs");
      let vocabs = [];

      store.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
          vocabs.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },

  async addVocabulary(vocab) {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["Vocabs"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("Vocabs");
      store.put(vocab);
    });
  },
  async getAllTerms() {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["Terms"], "readonly");
      trans.oncomplete = () => {
        resolve(terms);
      };

      let store = trans.objectStore("Terms");
      let terms = [];

      store.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
          terms.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },

  async addTerms(terms) {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["Terms"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("Terms");
      terms.forEach((term) => store.put(term));
    });
  },

  async getFilterCriteria() {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["Filter"], "readonly");
      trans.oncomplete = () => {
        resolve(criteria);
      };

      let store = trans.objectStore("Filter");
      let criteria = [];

      store.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
          criteria.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },
  async loadDefaultVocabs() {
    let res = await fetch(
      "https://dbpms-proceed.gitlab.io/vocabulary-search-and-select-engine/defaultVocabularies.json"
    );
    if (res.ok) {
      let json = await res.json();
      json.vocabularies.forEach((vocab) => {
        this.addTerms(vocab.terms);
        vocab.terms = undefined;
        vocab.date = json.lastUpdate;
        this.addVocabulary(vocab);
      });
    }
  },

  async updateVocabularys(vocabs) {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["Vocabs"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("Vocabs");
      store.clear(); //todo: may refactor to handle single CRUD Events
      vocabs.forEach((criteria) => store.put(criteria));
    });
  },

  async updateFilterCriteria(filterCriteria) {
    //array of criteria
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["Filter"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("Filter");
      store.clear(); //todo: may refactor to handle single CRUD Events
      filterCriteria.forEach((criteria) => store.put(criteria));
    });
  },

  async updateTerms(terms) {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["Terms"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("Terms");
      store.clear(); //todo: may refactor to handle single CRUD Events
      terms.forEach((criteria) => store.put(criteria));
    });
  },
};
