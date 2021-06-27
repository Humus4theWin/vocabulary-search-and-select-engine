<template>
  <v-toolbar dark color="teal">
    <v-toolbar-title>State selection</v-toolbar-title>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="What state are you from?"
      solo-inverted
    ></v-autocomplete>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
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
export default {
  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: null,
  }),
  watch: {
    search(val) {
      val && val !== this.select && this.searchFunction(val);
    },
  },
  methods: {
    /**
     * Is triggered when a charackter is typed in the search field.
     * When the search contains more then 2 char, the list of terms is added to the entries for search.
     * @param val contains the search input
     */
    querySelections(val) {
      this.loading = true;
      // Simulated ajax query
      if (val.length < 2) {
        console.log(val + val.length);
        this.entries = [];
        return;
      } else {
        this.entries = this.$store.getters.getVocabTerms;
      }
    },
    searchFunction(searchString, filterCriteria) {
      if (filterCriteria === undefined)
        filterCriteria = this.$store.getters.getFilterCriteria;
      if (searchString === undefined) searchString = ""; //todo: get from store this.$store.getters....;
      let terms = this.$store.getters.getVocabTerms;
      console.log(filterCriteria);

      filterCriteria
        .filter((criteria) => criteria.isUsed)
        .forEach((criteria) => {
          terms = terms.filter((term) => {
            return this.getFilterFunction(criteria.searchType)(
              term[criteria["predicate"]],
              searchString
            );
          });
        });
      console.log(terms);
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
