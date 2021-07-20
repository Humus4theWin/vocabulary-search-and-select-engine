<template>
  <v-autocomplete
    v-model="select"
    :items="terms"
    :filter="filterObjects"
    :search-input.sync="search"
    item-text="http://www.w3.org/2000/01/rdf-schema#label"
    item-value="IRI"
    class="mx-4"
    hide-no-data
    hide-details
    placeholder="Start typing to search"
    v-bind:label="label"
    return-object
    @change="emitEvent"
    @update:search-input="doIt"
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
    value: [],
    allTerms: [],
  }),
  created() {
    console.log(this.type + "was created");
    this.allTerms = this.$store.getters.getVocabTerms;

    this.value = [];
    switch (this.type) {
      case "kindOfCapability": {
        this.value.push("Class");
        break;
      }
      //its an input or output
      case "input":
      case "output":
        {
          if (this.options.value.displayName == "Kind of Value") {
            this.value.push("Property");
          }
          if (this.options.value.displayName == "Data Type (opt.)") {
            this.value.push("DataType");
          }
        }
        break;
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
      console.log("terms got changed ");

      return this.allTerms;
    },
  },
  methods: {
    ...mapMutations({
      changeCapabilityInputProperty: "newCapChangeCapabilityInputProperty", // map `this.newCapChangeCapabilityInputProperty()` to `this.$store.dispatch('newCapChangeCapabilityInputProperty')`
      changeCapabilityOutputProperty: "newCapChangeCapabilityOutputProperty", // map `this.newCapChangeCapabilityOutputProperty()` to `this.$store.dispatch('newCapChangeCapabilityOutputProperty')`
    }),
    /**
     * is triggerde whenever the user types a char in input of the autocomplete.
     * @param event contains the search input
     */
    doIt(event) {
      console.log("did something");
      this.flag = true;
      this.allTerms = this.filterAndSort(
        this.$store.getters.getVocabTerms,
        event
      );
      console.log("terms:");
      console.log(this.terms);
    },
    /**
     * filters and sorts the array and returns an array
     * @param array array to sort
     * @param input input of user
     * @returns an sorted and filtered array
     */
    filterAndSort(array, input) {
      //filter correct types
      console.log(array);
      let filteredTerms;
      if (!input || input.length == 0) {
        return []; //array;
      } else if (this.value.length > 0) {
        filteredTerms = array.filter((term) =>
          this.value.some((type) =>
            term["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"].includes(
              type
            )
          )
        );
      } else {
        filteredTerms = array;
      }
      console.log(filteredTerms);
      filteredTerms = this.$store.getters.getFilterCriteria.flatMap(
        (predicate) => {
          return filteredTerms.filter(
            (term) =>
              term[predicate.predicate] !== undefined &&
              term[predicate.predicate].includes(input)
          );
        }
      );

      console.log(filteredTerms);
      return filteredTerms;
    },
    /**
     * disables the filter of the v-autocomplete
     */
    filterObjects() {
      return true;
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
