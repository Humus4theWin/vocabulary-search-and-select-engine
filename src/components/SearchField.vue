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
        label="Terms"
        placeholder="Start typing to search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-expand-transition>
      <v-list v-if="model" class="info">
        <v-row class="pa-8">
          <v-btn class="ma-1" large color="primary">Subject</v-btn>
          <v-btn class="ma-1" large color="primary">Predicate</v-btn>
          <v-btn class="ma-1" large color="primary">Object</v-btn>
        </v-row>
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title
              class="descriptionTitle"
              v-text="field.value"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="descriptionSubtitle"
              v-text="field.key"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
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
