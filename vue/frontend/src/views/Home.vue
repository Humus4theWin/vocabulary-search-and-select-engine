<template>
  <v-container fill-height>
    <v-layout column wrap justify-center>
      <v-row justify-center align-content="center">
        <v-col cols="8"><SearchField /></v-col>
        <v-col cols="4"><vocabTable /></v-col>
        <v-col></v-col><v-spacer></v-spacer><v-col cols="4"><AddVocab /></v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import SearchField from "@/components/SearchField.vue";
import AddVocab from "@/components/AddVocab.vue";
import vocabTable from "@/components/vocabTable.vue";

export default {
  name: "Home",
  components: {
    SearchField,
    AddVocab,
    vocabTable,
  },
};
</script>
