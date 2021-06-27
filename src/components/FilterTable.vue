<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="this.$store.getters.getFilterCriteria"
    item-key="predicate"
    show-select
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>
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
    };
  },
};
</script>

<style scoped></style>
