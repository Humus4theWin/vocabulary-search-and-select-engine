<template>
  <v-card>
    <v-autocomplete
      v-model="select"
      :items="terms"
      :search-input.sync="search"
      item-text="label"
      item-value="IRI"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="Terms"
    ></v-autocomplete>
    <v-expand-transition>
      <v-list v-if="select" class="info">
        <v-list-item v-for="(field, i) in Object.keys(fields[0])" :key="i">
          <v-list-item-content>
            <v-list-item-title
              class="descriptionTitle"
              v-text="field"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="descriptionSubtitle"
              v-text="fields[0][field]"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
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
    terms: [],
    search: null,
    select: null,
    selecteditem: null,
  }),
  watch: {
    search(val) {
      val && val !== this.select && this.searchFunction(val);
    },
    select(val) {
      this.selectedItem = this.terms.filter((term) => term.IRI === val)[0];
      console.log(this.selectedItem);
    },
  },
  computed: {
    fields() {
      return this.terms.filter((term) => term.IRI === this.select);
    },
  },
  methods: {
    /**
     * Is triggered when a character is typed in the search field.
     * When the search contains more then 2 char, the list of terms is added to the entries for search.
     * @param val contains the search input
     */
    querySelections(val) {
      // Simulated ajax query
      if (val.length < 2) {
        console.log(val + val.length);
        this.entries = [];
        return;
      } else {
        this.terms = this.$store.getters.getVocabTerms;
      }
    },
    searchFunction(searchString, filterCriteria) {
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
    },

    getFilterFunction(searchType) {
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
    },
  },
};
</script>
