<template>
  <v-autocomplete
    v-model="selected"
    :items="predicates"
    dense
    chips
    multiple
    clearable
    deletable-chips
    @change="changed"
    solo
  ></v-autocomplete>
</template>

<script>
export default {
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz"],
    values: [],
    value: null,
  }),

  computed: {
    predicates() {
      window.i = this.$store.getters.getVocabTerms;
      if (this.$store.getters.getVocabTerms.length) {
        let predicates = [
          ...new Set(
            this.$store.getters.getVocabTerms.flatMap((term) =>
              Object.keys(term)
            )
          ),
        ];
        return predicates.map((predicate) => {
          return {
            text: predicate.split("/").pop() || predicate,
            value: predicate,
          };
        });
      } else {
        return [];
      }
    },
    selected() {
      return this.$store.getters.getFilterCriteria.map((c) => c.predicate);
    },
  },
  methods: {
    changed(val) {
      console.log(val);
      let criteria = val.map((uri) => {
        return {
          predicate: uri,
          priority: 1,
        };
      });
      this.$store.commit("setFilterCriteria", criteria);
    },
  },
  selected() {},
};
</script>

<style scoped></style>
