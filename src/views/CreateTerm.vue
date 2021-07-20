<template>
  <v-container fill-height class="mb-16 rounded-xl" style="background: white">
    <v-layout justify-center>
      <v-container class="pa-6" fill-width>
        <v-row>
          <v-col cols="12" class="pl-0">
            <h1>Create a new Term</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-text-field
            label="My Token"
            v-model="token"
            disabled
          ></v-text-field>
        </v-row>
        <v-row>
          <h4 class="mt-5">Subject:</h4>
          <v-col cols="9">
            <v-text-field
              dense
              v-model="title"
              :hint="changeHint"
              label="Term Name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <h4 class="mt-5">Predicate:</h4>
          <!--TODO key value like addVocab -->
          <v-col cols="9">
            <v-select
              :items="items"
              item-text="abbr"
              label="RDFS Predicate"
              v-model="select"
              return-object
              dense
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <h4>Object:</h4>
        </v-row>
        <v-row>
          <v-radio-group v-model="radios" mandatory row>
            <v-radio label="IRI as Object" value="IRI"></v-radio>
            <v-radio label="Literal as Object" value="Literal"></v-radio>
          </v-radio-group>
        </v-row>
        <v-row class="pl-0">
          <v-col v-if="radios === 'IRI'" cols="9">
            <SearchField @newSelect="handleIRIChnage" />
          </v-col>
          <v-col v-else cols="9">
            <v-textarea
              v-model="description"
              label="Enter your literal description"
              name="input-7-1"
              value=""
              background-color="grey lighten-4"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row class="pt-3 mb-3">
          <v-spacer></v-spacer>
          <v-btn color="primary" v-on:click="addTerm">add Property</v-btn>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12"><termsTable /></v-col>
        </v-row>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import SearchField from "@/components/SearchField.vue";
import TermsTable from "@/components/TermsTable.vue";

export default {
  name: "Home",
  props: ["search"],
  components: {
    SearchField,
    TermsTable,
  },

  data: () => ({
    //contains subject
    title: "",
    items: [
      { state: "_", abbr: "undefined" },
      {
        state: "http://www.w3.org/2000/01/rdf-schema#Class",
        abbr: "rdfs:Class",
      },
      {
        state: "https://www.w3.org/2000/01/rdf-schema#Property",
        abbr: "rdf:Property",
      },
      {
        state: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        abbr: "rdf:type",
      },
      {
        state: "https://www.w3.org/2000/01/rdf-schema#subClassOf",
        abbr: "rdfs:subClassOf",
      },
      {
        state: "https://www.w3.org/2000/01/rdf-schema#subPropertyOf",
        abbr: "rdfs:subPropertyOf",
      },
      {
        state: "https://www.w3.org/2000/01/rdf-schema#domain",
        abbr: "rdfs:domain",
      },
      {
        state: "https://www.w3.org/2000/01/rdf-schema#range",
        abbr: "rdfs:range",
      },
      {
        state: "http://www.w3.org/2000/01/rdf-schema#label",
        abbr: "rdfs:label",
      },
      {
        state: "http://www.w3.org/2000/01/rdf-schema#comment",
        abbr: "rdfs:comment",
      },
    ],
    hint: "Your created IRI is: https://rdf.proceed-labs.org/",
    radios: null,
    select: { state: undefined, abbr: "undefined" },
    description: "",
    selectedIRI: "",
  }),
  computed: {
    /**
     * computes the IRI as hint under the name input field of the term
     * @return {string}
     */
    changeHint() {
      return "Your created IRI is: https://rdf.proceed-labs.org/" + this.title;
    },
    token() {
      return this.$store.getters.getToken;
    },
  },
  methods: {
    handleIRIChnage(newVal) {
      console.log("handleIRIChnage: " + newVal);
      this.selectedIRI = newVal;
    },

    /**
     * adds the new term as quad ( with object or literal) to the existing user terms in the store
     */
    addTerm() {
      let quad = {
        Subject:
          "https://rdf.proceed-labs.org/" + this.token + "/" + this.title,
        Predicate: this.select.state,
        Object: "",
      };
      if (
        this.title &&
        this.select.state &&
        this.select.state !== "undefined"
      ) {
        console.log(this.title + this.select.state);
        if (this.radios === "IRI") {
          //console.log("IRI" + this.$store.getters.search);
          //quad.Object = this.$store.getters.search;
          console.log("IRI" + this.selectedIRI);
          quad.Object = this.selectedIRI;
        } else {
          console.log(this.description);
          quad.Object = this.description;
        }
        this.$store.commit("addTerm", quad);
        this.select.state = "undefined";
        this.select.abbr = "undefined";
        this.title = "";
        this.description = "";
      } else {
        console.log("fehlerhafte Eingabe");
      }
    },
  },
};
</script>
