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
//import onmessage from "../data/worker";

//import VocabWorker from "../data/webWorker";
//import Worker from "worker-loader!./Worker.js";

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
      //this.importVocab(this.addURL, this.select.state);
      //let worker = new Worker();
      //let vocabWorker = new VocabWorker(worker);
      //vocabWorker.postMessage([this.addURL, this.select.state]);

      //let myWorker = new Worker();    //'../data/worker.js');   require.toUrl('../data/worker.js') 'scr/data/worker.js', {type: 'module'}
      //myWorker.postMessage([this.addURL,this.select.state])
      //let myWorker = new Worker(window.URL.createObjectURL(new Blob(VocabWorker, { type: "text/javascript" })));
      //console.log(myWorker)
      //myWorker.postMessage([this.addURL,this.select.state])

      // onmessage({ data: [this.addURL, this.select.state] });

      const worker = new Worker("../data/worker", { type: "module" });

      worker.onmessage = (message) => {
        console.log(message);
        switch (message.data[0]) {
          case "addVocab":
            window.App.$store.commit("addVocab", message.data[1]);
            break;
          case "addVocabTerms":
            window.App.$store.commit("addVocabTerms", message.data[1]);
            break;
        }
      };

      worker.postMessage([this.addURL, this.select.state]);

      //clean up
      this.select.state = undefined;
      this.select.abbr = "auto";
      this.addURL = "";
    },
  },
};
</script>
