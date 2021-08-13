<template>
  <v-card :loading="loading">
    <v-card-actions>
      <v-btn v-for="synonym in synonyms" :key="synonym.message" ripple text
        >{{ synonym.text }}}</v-btn
      >
    </v-card-actions>
    <v-card-text class="pa-6">
      <v-autocomplete
        v-model="select"
        :items="terms"
        :filter="filterObjects"
        item-text="http://www.w3.org/2000/01/rdf-schema#label"
        item-value="IRI"
        class="mx-4"
        hide-no-data
        hide-details
        placeholder="Start typing to search"
        v-bind:label="searchLabel"
        return-object
        @update:search-input="customSearch"
        prepend-icon="mdi-magnify"
      ></v-autocomplete>
      <v-row class="mt-3">
        <v-spacer></v-spacer>
        <p class="mt-1 advancedSearch">Advanced Search</p>
        <v-btn
          class="mb-1"
          color="primary"
          icon
          @click="showFilter = !showFilter"
        >
          <v-icon
            >{{ showFilter ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </v-btn>
      </v-row>
      <v-expand-transition>
        <v-autocomplete
          v-show="showFilter"
          v-model="value"
          :items="types"
          auto-select-first
          label="Filter rdfs:type"
          chips
          clearable
          deletable-chips
          multiple
        ></v-autocomplete>
      </v-expand-transition>
    </v-card-text>
    <v-expand-transition>
      <v-list v-if="select" class="info">
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title
              class="descriptionTitle"
              v-text="field"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="descriptionSubtitle"
              v-text="select[field]"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </v-card>
</template>

<style>
.descriptionTitle {
  color: white !important;
  font-weight: 500;
  text-align: left;
}

.descriptionSubtitle {
  color: lightgrey !important;
  text-align: left;
}

.advancedSearch {
  color: #74b559;
}
</style>

<script>
// https://gitlab.com/dBPMS-PROCEED/vocabulary-search-and-select-engine/-/blob/master/src/components/SearchField.vue
export default {
  data: () => ({
    select: null,
    selecteditem: null,
    flag: false,
    allTerms: [],

    //select
    value: [],
    showFilter: false,
    synonyms: [],
    loading: false,
    searchWord: "",
  }),
  created() {
    this.allTerms = this.$store.getters.getVocabTerms;
  },

  props: {
    searchLabel: {
      type: String,
      default: "Terms",
    },
  },
  computed: {
    terms() {
      // is triggered once during render and if terms are changed

      return this.allTerms;
    },
    // is triggered when the user choose an item
    fields() {
      return Object.keys(this.select);
    },
    types() {
      return this.$store.getters.getVocabTerms
        .map((term) => term["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"])
        .filter((type) => type !== undefined);
    },
  },
  watch: {
    select() {
      console.log(this.select.IRI);
      this.$emit("newSelect", this.select.IRI);
    },
  },
  methods: {
    /**
     * is triggerde whenever the user types a char in input of the autocomplete.
     * @param event contains the search input
     */
    customSearch(event) {
      this.flag = true;
      this.searchWord = event;
      this.fetchSynonyms(event);
      this.allTerms = this.filterAndSort(
        this.$store.getters.getVocabTerms,
        event
      );
    },
    /**
     * filters and sorts the array and returns an array
     * @param array array to sort
     * @param input input of user
     * @returns an sorted and filtered array
     */
    filterAndSort(array, input) {
      console.log("filterAndSort");
      console.log(input);
      console.log(array);
      //filter correct types
      let filteredTerms;
      if (!input || input.length == 0) {
        return []; //array;
      } else if (this.value.length > 0) {
        filteredTerms = array.filter((term) =>
          this.value.includes(
            term["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"]
          )
        );
      } else {
        filteredTerms = array;
      }
      console.log(filteredTerms);
      filteredTerms = this.$store.getters.getFilterCriteria.flatMap(
        (predicate) => {
          console.log(predicate);
          return filteredTerms.filter(
            (term) =>
              term[predicate.predicate] !== undefined &&
              term[predicate.predicate].search(new RegExp(input, "i")) !== -1
          );
        }
      );

      console.log(filteredTerms);
      return filteredTerms;
    },

    filterObjects() {
      return true;
    },
    async fetchSynonyms(word) {
      this.loading = true;
      let response = await fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
      );
      let json = await response.json();

      console.log(json);
      if (Array.isArray(json)) {
        this.synonyms = json.flatMap((word) => {
          return word["meanings"].map((meaning) => {
            return {
              text: word["word"] + " (" + meaning["partOfSpeech"] + ")",
              synonyms: meaning["definitions"].flatMap(
                (def) => def["synonyms"]
              ),
            };
          });
        }); //[0]["meanings"][0]["definitions"]["synonyms"]
      }
      console.log(this.synonyms);
      if (this.searchWord === word) this.loading = false;
    },
  },
};
</script>
