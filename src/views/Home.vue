<template>
  <v-container fill-height class="float-end">
    <v-layout column wrap justify-center class="pt-10 pl-16">
      <v-row justify-center align-content="center">
        <v-col cols="10">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="6">
              <h1>CREATE A <br />CAPABILITY DESCRIPTION</h1>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>

        <v-col cols="10">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="6">
              <SearchField />
            </v-col>
            <v-spacer></v-spacer>
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
