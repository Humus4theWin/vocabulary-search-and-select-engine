<template>
  <v-container fill-height class="rounded-lg mb-16" style="background: white">
    <v-layout column justify-center>
      <v-row justify-center align-content="center"></v-row>
      <v-row>
        <v-col cols="12">
          <vocabTable />
        </v-col>
      </v-row>
      <v-row class="mx-2"><h3>Adjust Search Fields and Priority</h3></v-row>

      <v-row class="mx-2">
        <SearchPropertySelect />
      </v-row>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script>
//import AddVocab from "@/components/AddVocab.vue";
import vocabTable from "@/components/vocabTable.vue";
import SearchPropertySelect from "@/components/SearchPropertySelect";

export default {
  name: "Home",
  components: {
    //  AddVocab,
    vocabTable,
    SearchPropertySelect,
  },
};
</script>
