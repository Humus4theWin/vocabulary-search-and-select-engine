<template>
  <div class="home">
    <Header />
    <v-container>
      <v-row justify="space-between">
        <v-col cols="12" md="6">
          <VocabTable v-bind:vocabs="this.vocabTable" cols="6" md="4" />
        </v-col>
        <v-col cols="12" md="6">
          <Search />
        </v-col>
        <v-col cols="12" md="12">
          <ResultsTable />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Search from "@/components/Search.vue";
import VocabTable from "@/components/vocabTable.vue";
import ResultsTable from "@/components/ResultsTable.vue";

export default {
  name: "Home",
  components: {
    Header,
    Search,
    VocabTable,
    ResultsTable,
  },
  data: () => ({
    vocabTable: [
      {
        baseURL: "schema.org",
        type: "JSON LD",
      },
    ],
  }),
};
</script>
