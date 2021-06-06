<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12"> </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-row justify="center">
            <v-col cols="12">
              <v-card-title> Search for your URI </v-card-title>

              <v-card-text>
                <v-autocomplete
                  v-model="model"
                  :items="items"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="black"
                  hide-no-data
                  hide-selected
                  item-text="Description"
                  item-value="API"
                  label="URIs"
                  placeholder="Start typing to Search"
                  prepend-icon="mdi-database-search"
                  return-object
                ></v-autocomplete>
              </v-card-text>
              <v-divider></v-divider>
              <v-expand-transition>
                <v-list v-if="model" class="red lighten-3">
                  <v-list-item v-for="(field, i) in fields" :key="i">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="field.value"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="field.key"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expand-transition>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + "..."
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    },
  },

  watch: {
    search(val) {
      if (val == "") return;
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.publicapis.org/entries")
        .then((res) => res.json())
        .then((res) => {
          const { count, entries } = res;
          this.count = count;
          this.entries = entries;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>