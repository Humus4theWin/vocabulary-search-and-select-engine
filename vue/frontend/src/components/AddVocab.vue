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
          <v-btn v-on:click="emitAdd">add Vocab</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
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
    emitAdd() {
      this.$emit("add", this.addURL, this.select.state);
      this.select.state = undefined;
      this.select.abbr = "auto";
      this.addURL = "";
    },
  },
};
</script>