const DB_NAME = "PROCEED";
const DB_VERSION = 1;
let DB;

export default {
  dbNames: {
    VOCABULARIES: "Vocabs",
    TERMS: "Terms",
    SETTINGS: "Settings",
  },
  dbIndexes: {
    VOCABULARIES: "sourceURL",
    TERMS: "IRI",
    SETTINGS: "key",
  },
  settingsKeys: {
    PREDICATES: "predicates",
    Token: "token",
  },

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
        console.log("create index DB");
        let db = e.target.result;
        Object.keys(this.dbNames).forEach((dbName) => {
          let dbIndex = this.dbIndexes[dbName];
          db.createObjectStore(this.dbNames[dbName], { keyPath: dbIndex });
        });
        this.putSingle(this.dbNames.SETTINGS, {
          key: "token",
          value: Math.random().toString(36).substring(7),
        });
      };
    });
  },

  async getAll(dbName) {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction([dbName], "readonly");
      trans.oncomplete = () => {
        resolve(elements);
      };

      let store = trans.objectStore(dbName);
      let elements = [];

      store.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
          elements.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },
  async getSingle(dbName, keyName) {
    let allData = await this.getAll(dbName);
    return allData.find((elem) => elem.key === keyName).value;
  },
  async putSingle(dbName, value) {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction([dbName], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore(dbName);
      store.put(value);
    });
  },
  async putAll(dbName, values) {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction([dbName], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore(dbName);
      values.forEach((value) => store.put(value));
    });
  },

  async overwriteAll(dbName, values) {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction([dbName], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore(dbName);
      store.clear();
      values.forEach((value) => store.put(value));
    });
  },
};
