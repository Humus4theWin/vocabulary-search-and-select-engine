<template>
  <v-autocomplete
    v-model="values"
    :items="predicates"
    dense
    chips
    multiple
    clearable
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
  watch: {
    values(val) {
      console.log(val);
    },
  },
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
  },
  selected() {},
};
</script>

<style scoped></style>
