<template>
  <v-card>
    <v-card-text>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        color="black"
        hide-no-data
        hide-selected
        item-text="label"
        item-value="url"
        label="search terms"
        placeholder="Start typing to Search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-expand-transition>
      <v-list v-if="model" class="info">
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="field.value"></v-list-item-title>
            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        if (key === "url") {
          this.$store.commit("saveSearchedWord", this.model[key]);
          console.log(this.model[key]);
        }
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    items() {
      return this.$store.getters.getVocabTerms;
    },
  },
};
</script>
