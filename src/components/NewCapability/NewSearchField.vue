<template>
  <v-autocomplete
    v-model="select"
    :items="terms"
    :search-input.sync="search"
    :filter="filterObjects"
    item-text="label"
    item-value="IRI"
    cache-items
    class="mx-4"
    hide-no-data
    hide-details
    placeholder="Start typing to search"
    v-bind:label="label"
    return-object
    @change="emitEvent"
  ></v-autocomplete>
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
import { mapMutations } from "vuex";
export default {
  data: () => ({
    select: null,
    //selecteditem: null,
    value: ["http://www.w3.org/2000/01/rdf-schema#Class"],
  }),
  created() {
    this.value = [];
    switch (this.type) {
      case "kindOfCapability": {
        this.value.push("http://www.w3.org/2000/01/rdf-schema#Class");
        break;
      }
      //its an input or output
      case "input":
      case "output": {
        console.log(this.options.value.displayName);
        if (this.options.value.displayName == "Kind of Value") {
          this.value.push(
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property",
            "http://www.w3.org/2002/07/owl#ObjectProperty"
          );
        }
        if (this.options.value.displayName == "Data Type (opt.)") {
          this.value.push("https://schema.org/DataType");
        }
        break;
      }
    }
  },
  props: {
    label: {
      type: String,
      default: "Terms",
    },
    //kindOfCapability,kindOfValue,dataType
    type: {
      type: String,
    },
    // takes all parmeter of input or output search fields
    options: Object,
  },
  computed: {
    fields() {
      return Object.keys(this.select);
    },
    terms() {
      return this.$store.getters.getVocabTerms;
    },
    types() {
      return this.$store.getters.getVocabTerms
        .map((term) => term["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"])
        .filter((type) => type !== undefined);
    },
  },
  methods: {
    ...mapMutations({
      changeCapabilityInputProperty: "newCapChangeCapabilityInputProperty", // map `this.newCapChangeCapabilityInputProperty()` to `this.$store.dispatch('newCapChangeCapabilityInputProperty')`
      changeCapabilityOutputProperty: "newCapChangeCapabilityOutputProperty", // map `this.newCapChangeCapabilityOutputProperty()` to `this.$store.dispatch('newCapChangeCapabilityOutputProperty')`
    }),
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
    querySelections(val) {
      // Simulated ajax query
      if (val.length < 2) {
        console.log("search value {{val + val.length}}");
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
    /**
     * is triggerded when @change is triggered of the v-autocomplete.
     * Sends an event "SearchValue" with the choosen IRI and the type paramter
     */
    emitEvent() {
      /*console.log(this.select);
      console.log(this.select.IRI);*/
      if (this.type == "input") {
        this.options.value.value = this.select.IRI;
        this.changeCapabilityInputProperty({
          inputIndex: this.options.inputIndex,
          subIndex: this.options.subIndex,
          subsubIndex: this.options.subsubIndex,
          propertyKey: this.options.propertyKey,
          value: this.options.value,
        });
      } else {
        if (this.type == "output") {
          this.options.value.value = this.select.IRI;
          this.changeCapabilityOutputProperty({
            outputIndex: this.options.outputIndex,
            subIndex: this.options.subIndex,
            subsubIndex: this.options.subsubIndex,
            propertyKey: this.options.propertyKey,
            value: this.options.value,
          });
        } else {
          let params = { IRI: this.select.IRI, type: this.type };
          this.$emit("SearchValue", params);
        }
      }
    },
  },
};
</script>
