<template>
  <v-container fill-height class="mb-16" style="background: white">
    <v-row>
      <v-col>
        <h1>Manage Vocabularies</h1>
      </v-col>
    </v-row>
    <v-alert
      v-if="displayCORS"
      dismissible
      elevation="5"
      outlined
      text
      type="warning"
      >Loading vocabulary failed! This may be due to CORS issues
      <br />
      <v-btn
        color="green"
        href="https://gitlab.com/dBPMS-PROCEED/vocabulary-search-and-select-engine/-/tree/master/src/localCORSproxy"
        target="_blank"
        >solve!
      </v-btn></v-alert
    >
    <v-data-table
      :headers="headers"
      :items="vocabularies"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-btn
          v-if="oldVocabularies.length > 0"
          color="primary"
          dark
          class="mb-2"
          @click="refreshOldVocabularies"
        >
          reshresh Vocabularies
        </v-btn>
        <v-toolbar flat>
          <!--<v-toolbar-title>Vocabularies</v-toolbar-title>-->
          <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Vocabulary
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.sourceURL"
                        label="Source URL"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.type"
                        :hint="`${select.abbr}`"
                        :items="items"
                        item-text="abbr"
                        item-value="state"
                        label="Select format"
                        persistent-hint
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="[true, false]"
                        v-model="editedItem.isUsed"
                        label="in use"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="close"> Cancel</v-btn>
                <v-btn color="primary" text @click="save"> Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="primary" text @click="deleteItemConfirm"
                  >OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
        <v-icon small @click="refreshItem(item)"> mdi-refresh</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="importDefaultVocabs">
          Load Defaults
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

export default { name: "VocabTableCRUD", };
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Date", value: "date" },
      { text: "Source URL", value: "sourceURL" },
      { text: "Source type", value: "type" },
      { text: "Number of Quads", value: "numberOfQuads" },
      { text: "Used for Search", value: "isUsed" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      date: "never",
      sourceURL: "",
      numberOfQuads: 0,
      isUsed: true,
    },
    defaultItem: {
      name: "",
      date: new Date().toISOString(),
      sourceURL: "",
      numberOfQuads: 0,
      isUsed: true,
    },

    select: { state: undefined, abbr: "auto" },
    items: [
      { state: "application/trig", abbr: ".trig" },
      { state: "application/n-quads", abbr: ".nq, .nquads" },
      { state: "text/turtle", abbr: ".ttl, .turtle" },
      { state: "application/n-triples", abbr: ".nt, .ntriples" },
      { state: "application/ld+json", abbr: ".jsonld" },
      { state: "application/json", abbr: ".json" },
      { state: "application/rdf+xml", abbr: ".rdf, .rdfxml, .owl" },
      { state: "text/html", abbr: ".html, .htm," },
      { state: "application/xhtml+xml", abbr: ".xhtml, .xht" },
      { state: "mage/svg+xml", abbr: ".xml" },
      { state: "application/xml", abbr: ".svg, .svgz" },
    ],
  }),

  computed: {
    displayCORS() {
      return this.$store.getters.displayCORS;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    vocabularies() {
      return this.$store.getters.vocabularies;
    },
    oldVocabularies() {
      return this.$store.getters.vocabularies.filter((vocab) => {
        let dt1 = new Date(Date.parse(vocab.date));
        let dt2 = new Date();

        let daysDifference = Math.floor(
          (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
            Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
            (1000 * 60 * 60 * 24)
        );
        return daysDifference >= 5;
      });
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    editItem(item) {
      this.editedIndex = this.vocabularies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.$store.commit("setVocabs", this.vocabularies);
    },

    deleteItem(item) {
      this.editedIndex = this.vocabularies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    refreshItem(item) {
      this.editedIndex = this.vocabularies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.addVocab(this.editedItem.sourceURL, this.editedItem.type);
    },

    deleteItemConfirm() {
      this.vocabularies.splice(this.editedIndex, 1);
      this.closeDelete();
      this.$store.commit("setVocabs", this.vocabularies);
      console.log(this.editedItem.sourceURL);
      let filteredTerms = this.$store.getters.getVocabTerms.filter(
        (term) => term.vocabSourceURL !== this.editedItem.sourceURL
      );
      console.log(filteredTerms);
      this.$store.commit("setVocabTerms", filteredTerms);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$store.commit("setVocabs", this.vocabularies);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.vocabularies[this.editedIndex], this.editedItem);
      } else {
        this.vocabularies.push(this.editedItem);
        this.addVocab(this.editedItem.sourceURL, this.editedItem.type);
      }
      this.close();
      this.$store.commit("setVocabs", this.vocabularies);
    },

    addVocab(sourceURL, type) {
      const worker = new Worker("../data/worker", { type: "module" });

      worker.onmessage = (message) => {
        console.log(message);
        switch (message.data[0]) {
          case "addVocab":
            window.App.$store.commit("addVocab", message.data[1]);
            break;
          case "addVocabTerms":
            window.App.$store.commit("addVocabTerms", message.data[1]);
            break;
          case "loadError":
            window.App.$store.commit("vocabLoadError", message.data[1]);
            break;
        }
      };

      worker.postMessage([sourceURL, type]);
    },
    async refreshOldVocabularies() {
      //first update defaults
      await this.loadDefaultVocabs(
        this.vocabularies.map((vocab) => vocab.sourceURL)
      );

      console.log(this.oldVocabularies);
      this.oldVocabularies.forEach(
        (vocab) => this.addVocab(vocab.sourceURL, vocab.type) // pass type?
      );
    },
    async importDefaultVocabs() {
      this.$store.commit(
        "setFilterCriteria",
        [
          //todo: refactor make object, or only store URLs in the sotore
          "http://www.w3.org/2000/01/rdf-schema#label",
          "http://www.w3.org/2000/01/rdf-schema#comment",
        ].map((predicate) => {
          return {
            text: predicate.split("/").pop() || predicate,
            predicate: predicate,
          };
        })
      );
      this.loadDefaultVocabs();
    },
    async loadDefaultVocabs(selectedVocabsURLs) {
      let res = await fetch(
        "https://dbpms-proceed.gitlab.io/vocabulary-search-and-select-engine/defaultVocabularies.json"
      );

      if (res.ok) {
        let json = await res.json();
        json.vocabularies
          //only store desired vocabs
          .filter(
            (vocab) =>
              selectedVocabsURLs === undefined ||
              selectedVocabsURLs.includes(vocab.sourceURL)
          )
          .forEach((vocab) => {
            // window.App.$store.commit("addVocabTerms", vocab.terms);
            vocab.date = json.lastUpdate;
            window.App.$store.commit("addVocab", vocab);
          });
      }
    },
  },
};
</script>
