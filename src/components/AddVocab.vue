<template>
  <v-form>
    <v-container fluid>
      <v-row align="center" justify="space-between">
        <v-col cols="12">
          <h1>ADD ANOTHER <br />VOCABULARY</h1>
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            v-model="addURL"
            label="Paste Vocab URL here"
            @keyup.enter="addVocab"
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="pb-10">
          <v-select
            v-model="select"
            :hint="`${select.abbr}`"
            :items="items"
            item-text="abbr"
            item-value="state"
            label="Select format"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </v-col>
        <v-col class="pb-10">
          <v-btn v-on:click="addVocab">add Vocab</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import rdfParser from "rdf-parse";
export default {
  name: "AddVocab",
  data: () => ({
    addURL: "",
    select: { state: undefined, abbr: "auto" },
    items: [
      { state: "application/trig", abbr: ".trig" },
      { state: "application/n-quads", abbr: ".nq, .nquads" },
      { state: "text/turtle", abbr: ".ttl, .turtle" },
      { state: "application/n-triples", abbr: ".nt, .ntriples" },
      { state: "application/ld+json", abbr: ".jsonld" },
      { state: "application/json", abbr: ".json" },
      { state: "application/rdf+xml", abbr: ".rdf, .rdfxml, .owl" },
      { state: "text/html", abbr: ".html, .htm," },
      { state: "application/xhtml+xml", abbr: ".xhtml, .xht" },
      { state: "mage/svg+xml", abbr: ".xml" },
      { state: "application/xml", abbr: ".svg, .svgz" },
    ],
  }),

  methods: {
    /**
     * calls importVocab and clears select.state, select.abbr (format of Vocab) and URL
     */
    addVocab() {
      this.importVocab(this.addURL, this.select.state);
      //clean up
      this.select.state = undefined;
      this.select.abbr = "auto";
      this.addURL = "";
    },
    /**
     * imports vocabulary and parses quads; adds it to Vuex
     * @async
     * @param url
     * @param format
     * @return {Promise<void>}
     */
    async importVocab(url, format) {
      let vocab = {};
      vocab.amount = 0;
      vocab.url = url;
      vocab.terms = [];
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

      // parse vocab data
      let textStream = require("streamify-string")(vocab.data);
      vocab.quads = [];

      await rdfParser
        .parse(textStream, {
          contentType: vocab.type,
          baseIRI: vocab.baseURL,
        })
        .on("data", (quad) => {
          vocab.quads.push(quad);
          vocab.amount += 1;
        })
        .on("error", (error) => console.error(error))
        .on("end", () => {
          this.$store.commit("addVocab", vocab);
          console.log("All done!");
          this.indexVocab(url, vocab.quads);
        });
    },

    /**
     * parses the terms and their attributes and adds those to the existing vocab in Vuex
     * @param url
     * @param quads
     */
    indexVocab(url, quads) {
      //find terms in other Thread

      let terms = quads
        .filter((quad) => quad.predicate.value.includes("label"))
        .map((quad) => {
          return {
            url: quad.subject.value,
            label: quad.object.value,
          };
        });
      console.log(quads);
      // add all attributes
      terms = terms.map((term) => {
        let attributes = quads.filter((quad) => {
          return quad.subject.value === term.url;
        });

        attributes.forEach((attr) => {
          let val = attr.object.value;
          if (val.length > this.descriptionLimit) {
            val = val.slice(0, this.descriptionLimit) + "...";
          }
          term[attr.predicate.value] = val;
        });

        return term;
      });
      this.$store.commit("addVocabTerms", { url: url, terms: terms });
    },
  },
};
</script>
