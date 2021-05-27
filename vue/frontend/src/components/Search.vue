<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="12" md="10">
        <div v-for="vocab in vocabs" :key="vocab.id">
          <b>{{ vocab.baseURL }}</b>
          {{ "\t   [" + vocab.type + "]" }}
        </div>
        <v-text-field
          outlined
          v-on:input="search"
          v-model="inputText"
        ></v-text-field>

        <div v-for="result in searchResults" :key="result.id">
          {{ result }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import rdfParser from "rdf-parse";

export default {
  name: "Search",
  data: () => ({
    inputText: "",
    vocabs: [],
    quads: [],
    searchResults: [],
  }),
  watch: {
    vocabs: function (val) {
      // console.log(val);
      console.log(val);
      // val[0].then((e) => console.log(e));
    },
  },
  created() {
    this.loadAndParse();
  },
  methods: {
    async search() {
      console.log(this.inputText);

      this.searchResults = new Set(
        this.quads
          .filter(
            (q) =>
              q.subject.value.includes(this.inputText) ||
              q.predicate.value.includes(this.inputText)
          )
          .map((q) => q.subject.value)
      );

      console.log("Found results");
      console.log(this.searchResults);
    },
    async loadAndParse() {
      await this.loadAndPareseVocabs();

      console.log(this.vocabs);
    },

    async loadAndPareseVocabs() {
      //load list of vocabs
      let vocabList = await fetch("http://localhost:80/vocabs").then((data) =>
        data.json()
      );
      let promises = vocabList.map((url) =>
        this.importVocab(url).then((data) => this.vocabs.push(data))
      );

      await Promise.all(promises);
    },

    async importVocab(url) {
      let vocab = {};

      vocab.baseURL = "http://" + url.split("/")[2];

      let response;
      try {
        // load from remote server
        response = await fetch(url);
      } catch (ex) {
        // if fails, load via proxy
        response = await fetch("localhost/proxy", {
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

      // parse vocab datta
      let textStream = require("streamify-string")(vocab.data);

      await rdfParser
        .parse(textStream, {
          contentType: vocab.type,
          baseIRI: vocab.baseURL,
        })
        .on("data", (quad) => this.quads.push(quad))
        .on("error", (error) => console.error(error))
        .on("end", () => console.log("All done!"));

      return vocab;
    },
  },
};
</script>
