<template>
  <v-card>
    <v-card-text class="pa-6">
      <v-autocomplete
        v-model="value"
        :items="types"
        auto-select-first
        label="rdfs:type"
        chips
        clearable
        deletable-chips
        multiple
      ></v-autocomplete>
      <v-autocomplete
        v-model="select"
        :items="terms"
        :filter="filterObjects"
        item-text="http://www.w3.org/2000/01/rdf-schema#label"
        item-value="IRI"
        cache-items
        class="mx-4"
        hide-no-data
        hide-details
        placeholder="Start typing to search"
        v-bind:label="searchLabel"
        return-object
        @update:search-input="doIt"
      ></v-autocomplete>
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
    doIt(event) {
      this.flag = true;
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
      let nTerms = [];
      nTerms = array;
      //search and sort logic here
      console.log(input);
      nTerms = ["a", "b"];

      return nTerms;
    },

    filterObjects(item, queryText) {
      if (
        !(
          this.value.length === 0 ||
          this.value
            .map(
              (typeVal) =>
                item["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] ===
                typeVal
            )
            .some((e) => e)
        )
      )
        return false;

      if (queryText.length > 2) {
        return this.$store.getters.getFilterCriteria
          .map(
            (criterion) =>
              item[criterion.predicate] !== undefined &&
              item[criterion.predicate].includes(queryText)
          )
          .some((e) => e);
      } else return true;
    },

    /**
     * Is triggered when a character is typed in the search field.
     * When the search contains more then 2 char, the list of terms is added to the entries for search.
     * @param val contains the search input
     */
    /*querySelections(val) {
      // Simulated ajax query
      if (val.length < 2) {
        console.log("search value {{val + val.length}}");
        this.entries = [];
        return;
      } else {
        this.terms = this.$store.getters.getVocabTerms;
      }
    },*/
    /*searchFunction(searchString, filterCriteria) {
      if (filterCriteria === undefined)
        filterCriteria = this.$store.getters.getFilterCriteria;
      if (searchString === undefined) searchString = ""; //todo: get from store this.$store.getters....;
      let terms = this.$store.getters.getVocabTerms;

      filterCriteria
        .filter((criteria) => criteria.isUsed)
        .forEach((criteria) => {
          console.log(criteria);
          terms = terms.filter((term) => {
            return (
              term[criteria["predicate"]] !== undefined &&
              this.getFilterFunction(criteria.searchType)(
                term[criteria["predicate"]],
                searchString
              )
            );
          });
        });
      console.log(terms);
      this.terms = terms;
      return terms;
    },*/

    /*getFilterFunction(searchType) {
      switch (searchType) {
        case "matches":
          return (a, b) => a === b;
        case "unequals":
          return (a, b) => a !== b;
        case "includes":
          return (a, b) => a.includes(b);
        case "excludes":
          return (a, b) => !a.includes(b);
      }
    },*/
  },
};
</script>
