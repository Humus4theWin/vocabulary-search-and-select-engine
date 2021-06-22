const DB_NAME = "PROCEED";
const DB_VERSION = 1;
let DB;

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
};
