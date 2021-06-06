<template>
  <v-container fill-height>
    <v-layout column wrap justify-center>
      <v-row justify-center align-content="center">
        <SearchField />
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import SearchField from "@/components/SearchField.vue";
import Header from "@/components/Header.vue";
import AddVocab from "@/components/AddVocab.vue";
import vocabTable from "@/components/vocabTable.vue";

export default {
  name: "Home",
  components: {
    Navigation,
    AddVocab,
    SearchField,
    Header,
    vocabTable,
  },
};
</script>
