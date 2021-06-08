<template>
  <v-container fill-height class="float-end">
    <v-layout column wrap justify-center class="pt-10 pl-16">
      <v-row justify-center align-content="center">
        <v-col
          sm="11"
          cols="7"
          md="10"
          lg="8"
          xl="11"
          class="sm-pl-16 sm-pl-16 xl-pl-4"
        >
          <v-row>
            <v-spacer></v-spacer>
            <h1 align="left">
              CREATE A <br />CAPABILITY DESCRIPTION
            </h1>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>
        <v-col cols="12"><SearchField /></v-col>
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
<style></style>
