<template>
  <v-form>
    <v-container fluid>
      <v-text-field
        outlined
        v-model="addURL"
        label="paste Vocab URL here"
      ></v-text-field>
      <v-row align="center" justify="space-between">
        <v-select
          v-model="select"
          :hint="`${select.state}, ${select.abbr}`"
          :items="items"
          item-text="abbr"
          item-value="state"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
        <v-col>
          <v-btn v-on:click="addVocab">add Vocab</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import rdfParser from "rdf-parse";
//import { mapGetters,  mapActions} from 'vuex'
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
    addVocab() {
      //this.$emit("add", this.addURL, this.select.state);
      this.importVocab(this.addURL, this.select.state);
      //clean up
      this.select.state = undefined;
      this.select.abbr = "auto";
      this.addURL = "";
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
      let quads = [];

      await rdfParser
        .parse(textStream, {
          contentType: vocab.type,
          baseIRI: vocab.baseURL,
        })
        .on("data", (quad) => {
          quads.push(quad);
          vocab.amount += 1;
        })
        .on("error", (error) => console.error(error))
        .on("end", () => {
          this.$store.commit("addQuads", quads);
          this.$store.commit("addVocab", vocab);
          console.log("All done!");
        });

      // push vocab
    },
  },
};
</script>
