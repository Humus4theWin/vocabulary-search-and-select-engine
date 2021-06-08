<template>
  <v-container fill-height>
    <v-layout column wrap justify-center>
      <v-container class="pt-16">
        <v-row class="pt-16">
          <v-col sm="9" cols="7" xl="5" class="pt-16">
            <h1 align="left">CREATE A NEW TERM</h1>
          </v-col>
        </v-row>
        <v-row>
          <h3>Subject:</h3>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="title"
              :hint="changeHint"
              label="Term Name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <h3>Predicate:</h3>
        </v-row>
        <v-row justify-center align-content="center">
          <!--TODO key value like addVocab -->
          <v-select :items="items" label="RDFS Predicate" dense></v-select>
        </v-row>
        <v-row>
          <h3>Object:</h3>
        </v-row>
        <v-row>
          <v-radio-group v-model="radios" mandatory>
            <v-radio label="IRI of Object" value="IRI"></v-radio>
            <v-radio label="Literal as Object" value="Literal"></v-radio>
          </v-radio-group>
        </v-row>
        <v-row>
          <v-col v-if="radios === 'IRI'" cols="8"><SearchField /></v-col>
          <v-col v-else>
            <v-textarea
              label="enter your literal description"
              name="input-7-1"
              value=""
              background-color="grey lighten-3"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import SearchField from "@/components/SearchField.vue";

export default {
  name: "Home",
  components: {
    SearchField,
  },
  data: () => ({
    title: "",
    items: [
      "rdfs: Class",
      "rdf:Property",
      "rdf:type",
      "rdfs:subClassOf",
      "rdfs:subPropertyOf",
      "rdfs:domain",
      "rdfs:range",
    ],
    hint: "your created IRI is: https://docs.proceed-labs.org/",
    radios: null,
  }),
  computed: {
    changeHint() {
      return "your created IRI is: https://docs.proceed-labs.org/" + this.title;
    },
  },
};
</script>
<style scoped>
.adjustheight {
  padding-top: 20%;
}
</style>
