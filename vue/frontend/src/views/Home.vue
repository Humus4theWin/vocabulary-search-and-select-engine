<template>
  <div class="home">
    <Header />
    <v-container>
      <v-row align="center" justify="start">
        <v-spacer></v-spacer>
        <v-col cols="6"><SearchField /></v-col>
        <v-spacer></v-spacer>
        <v-col cols="4"><AddVocab /></v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="4"> <vocabTable /></v-col>
      </v-row>
    </v-container>
    <Navigation />
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
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
