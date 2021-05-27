<template>
  <v-form>
    <v-text-field
      outlined
      v-model="searchValue"
      v-on:input="emitSearch"
      label="Search Vocabs"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "Search",
  data: () => ({
    searchValue: "",
  }),
  methods: {
    emitSearch() {
      if (this.searchValue.length > 1) this.$emit("search", this.searchValue);
    },
  },
};
</script>
