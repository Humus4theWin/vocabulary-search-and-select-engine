<template>
  <v-container fill-height>
    <v-layout column justify-center>
      <v-spacer></v-spacer>
      <v-row justify-center align-content="center">
        <v-col cols="12"><AddVocab /></v-col>
      </v-row>
      <v-row>
        <v-col cols="12"><vocabTable /></v-col>
      </v-row>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script>
import AddVocab from "@/components/AddVocab.vue";
import vocabTable from "@/components/VocabTableCRUD.vue";

export default {
  name: "Home",
  components: {
    AddVocab,
    vocabTable,
  },
};
</script>
