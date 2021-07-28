// https://v15.vuetifyjs.com/en/components/data-tables/#crud-actions
<template>
  <v-data-table
    :headers="headers"
    :items="filterCriteria"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Edit search Rules</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Rule
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="[true, false]"
                      v-model="editedItem.isUsed"
                      label="in use"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="searchTypes"
                      v-model="editedItem.searchType"
                      label="Search type"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="predicates"
                      v-model="editedItem.predicate"
                      label="Predicate"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="close"> Cancel</v-btn>
              <v-btn color="primary" text @click="save"> Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="primary" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: true,
    headers: [
      {
        text: "in use",
        align: "start",
        // sortable: false,
        value: "isUsed",
      },
      { text: "Search type", value: "searchType" },
      { text: "Predicate", value: "predicate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    //filterCriteria: [],
    // predicates: [],
    editedIndex: -1,
    editedItem: {
      isUsed: true,
      searchType: "",
      predicate: "",
    },
    defaultItem: {
      isUsed: true,
      searchType: "includes",
      predicate: 0,
    },
    searchTypes: ["includes", "matches", "excludes", "unequals"],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Rule" : "Edit Rule";
    },
    predicates() {
      // console.log("predicates")
      if (this.$store.getters.getVocabTerms.length) {
        return [...new Set(Object.keys(...this.$store.getters.getVocabTerms))];
      } else {
        return [];
      }
    },
    filterCriteria() {
      return this.$store.getters.getFilterCriteria;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    filterCriteria(val) {
      console.log("filterCriteria");
      console.log(val);
    },
  },

  beforeMount() {
    this.initialize();
  },

  methods: {
    initialize() {
      // not used
      this.editedItem = Object.assign({}, this.defaultItem);
      // this.filterCriteria = this.$store.getters.getFilterCriteria;
      //this.predicates = [
      //...new Set(Object.keys(...this.$store.getters.getVocabTerms)),
      //];
      // console.log(this.predicates);
    },

    editItem(item) {
      this.editedIndex = this.filterCriteria.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.$store.commit("setFilterCriteria", this.filterCriteria);
    },

    deleteItem(item) {
      this.editedIndex = this.filterCriteria.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.$store.commit("setFilterCriteria", this.filterCriteria);
    },

    deleteItemConfirm() {
      this.filterCriteria.splice(this.editedIndex, 1);
      this.closeDelete();
      this.$store.commit("setFilterCriteria", this.filterCriteria);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$store.commit("setFilterCriteria", this.filterCriteria);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.filterCriteria[this.editedIndex], this.editedItem);
      } else {
        this.filterCriteria.push(this.editedItem);
      }
      this.close();
      this.$store.commit("setFilterCriteria", this.filterCriteria);
    },
  },
};
</script>
