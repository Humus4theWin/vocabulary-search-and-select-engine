<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="selectSearchType"
          :items="searchTypeList"
          label="Search Type"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="selectPredicate"
          :items="availablePredicates"
          label="Predicate"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>
      <v-col>
        <v-btn v-on:click="addFilterCriteria">add Filter</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="getFilterCriteria"
      item-key="predicate"
      show-select
      class="elevation-1"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selected: [],
      headers: [
        {
          text: "Search type",
          align: "start",
          sortable: false,
          value: "searchType",
        },
        { text: "Predicate", value: "predicate" },
      ],
      filterCriteria: [],
      selectSearchType: "",
      selectPredicate: "",
      searchTypeList: ["matches", "unequals", "includes", "excludes"],
    };
  },
  watch: {
    selected(val) {
      let allFilter = this.$store.getters.getFilterCriteria;
      allFilter.forEach(
        (filterCriterion) =>
          (filterCriterion["isUsed"] = val.includes(filterCriterion))
      );

      this.$store.commit("setFilterCriteria", allFilter);
      console.log(allFilter);
    },
  },
  computed: {
    availablePredicates() {
      let terms = this.$store.getters.getVocabTerms;
      let predicates = [];
      terms.forEach((term) => {
        predicates.push(...Object.keys(term));
      });
      // todo: IRI und Werte, die bereits in der Tabelle sind ausschließen
      predicates = new Set(predicates);
      predicates = Array.from(predicates);
      return predicates;
    },
    ...mapGetters(["getFilterCriteria"]),
  },
  methods: {
    addFilterCriteria() {
      this.filterCriteria.push({
        isUsed: true,
        predicate: this.selectPredicate,
        searchType: this.selectSearchType,
      });
      this.$store.commit("setFilterCriteria", this.filterCriteria); //todo:refactor
      this.selectSearchType = "";
      this.selectPredicate = "";
      console.log(this.filterCriteria);
    },
  },
  mounted: function () {
    this.selected = this.$store.getters.getFilterCriteria.filter(
      (c) => c.isUsed
    );
  },
};
</script>

<style scoped></style>
