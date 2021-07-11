<template>
  <v-container fill-height>
    <v-layout column justify-center>
      <v-row justify-center align-content="center" class="mt-15 mb-15">
        <v-col cols="12">
          <v-row class="d-flex justify-center">
            <v-col cols="6">
              <h1>Search for Terms</h1>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row class="d-flex justify-center">
            <v-col cols="6">
              <SearchField />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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
};
</script>
<style>
h1 {
  text-align: left;
}
th,
td {
  text-align: left;
}
</style>
