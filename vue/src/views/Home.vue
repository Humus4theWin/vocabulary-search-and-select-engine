<template>
  <div class="home">
    <Header />
    <v-container>
      <v-row justify="space-between">
        <v-col cols="12" md="6">
          <VocabTable v-bind:vocabs="this.vocabs" cols="6" md="4" />
        </v-col>
        <v-col cols="12" md="6">
          <AddVocab v-on:add="addVocab" data-app />
        </v-col>
        <v-col cols="12" md="12">
          <Search v-on:search="search" />
        </v-col>
        <v-col cols="12" md="12">
          <ResultsTable v-bind:results="this.searchResults" />
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
import AddVocab from "@/components/AddVocab.vue";
import rdfParser from "rdf-parse";

export default {
  name: "Home",
  components: {
    Header,
    Search,
    VocabTable,
    ResultsTable,
    AddVocab,
  },
  data: () => ({
    defaultVocabs: [
      "https://schema.org/version/latest/schemaorg-current-https.jsonld", //application/ld+json
      "http://iot-ontologies.github.io/dogont/documentation/ontology.json", //application/json;
      "https://dbpedia.org/ontology/", //text/html; charset=UTF-8
    ],
    inputText: "",
    vocabs: [],
    quads: [],
    searchResults: [],
  }),
  created() {
    //  this.loadAndParse();
  },
  methods: {
    async search(searchText) {
      console.log(searchText);

      this.searchResults = new Set(
        this.quads.filter((q) => {
          //  try {
          return (
            q.subject.value.includes(searchText) ||
            q.predicate.value.includes(searchText) ||
            q.object.value.includes(searchText)
          );
          //  } catch (ex) {
          //   return false;
          //  }
        })
      );

      console.log("Found results");
      console.log(this.searchResults);
    },
    async loadAndParse() {
      await this.loadAndPareseVocabs();
      // this.searchResults = this.quads;
      console.log(this.vocabs);
    },
    async addVocab(url, format) {
      console.log("add URL: " + url + " @" + format);
      await this.importVocab(url, format).then((data) =>
        this.vocabs.push(data)
      );
      // this.searchResults = this.quads;
    },
    async loadAndPareseVocabs() {
      //load list of vocabs
      let vocabList = this.defaultVocabs; //await fetch("http://localhost:80/vocabs").then((data) =>data.json());
      let promises = vocabList.map((url) =>
        this.importVocab(url).then((data) => this.vocabs.push(data))
      );

      await Promise.all(promises);
    },

    async importVocab(url, format) {
      let vocab = {};
      vocab.amount = 0;

      vocab.baseURL = "http://" + url.split("/")[2];

      let response;
      try {
        // load from remote server
        response = await fetch(url);
      } catch (ex) {
        // if fails, load via proxy
        response = await fetch("http://localhost:80/proxy", {
          headers: { url: url },
        });
      }
      if (response.ok) {
        vocab.type = response.headers.get("content-type").split(";")[0];
        vocab.data = await response.text();
      } else {
        console.log("error: " + url);
        return;
      }
      if (format) vocab.type = format;

      // parse vocab datta
      let textStream = require("streamify-string")(vocab.data);

      await rdfParser
        .parse(textStream, {
          contentType: vocab.type,
          baseIRI: vocab.baseURL,
        })
        .on("data", (quad) => {
          this.quads.push(quad);
          vocab.amount += 1;
        })
        .on("error", (error) => console.error(error))
        .on("end", () => console.log("All done!"));

      return vocab;
    },
    async advancedSearch(searchText) {
      this.searchResults = this.quads.filter((q) => {
        return (
          q.subject.value == searchText ||
          q.predicate.value == searchText ||
          q.object.value == searchText
        );
      });
      this.searchResults.concat(
        this.quads.filter((q) => {
          return (
            q.subject.value.includes(searchText) ||
            q.predicate.value.includes(searchText) ||
            q.object.value.includes(searchText)
          );
        })
      );
    },
  },
};
</script>
