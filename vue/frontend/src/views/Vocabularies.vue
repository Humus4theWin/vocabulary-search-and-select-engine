<template>
  <v-container fill-height>
    <v-layout column justify-center>
      <v-row justify-center align-content="center">
        <v-col cols="12" lg="4"><AddVocab /></v-col>
        <v-col cols="12" lg="8"><vocabTable /></v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import AddVocab from "@/components/AddVocab.vue";
import vocabTable from "@/components/vocabTable.vue";

// todo: Elemente sinnvoll anordnen (nicht in der mitte!)
export default {
  name: "Home",
  components: {
    AddVocab,
    vocabTable,
  },
};
</script>
