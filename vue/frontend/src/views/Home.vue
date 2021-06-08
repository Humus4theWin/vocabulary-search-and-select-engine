<template>
  <v-container fill-height>
    <v-layout column wrap justify-center>
      <v-row justify-center align-content="center">
        <v-col sm="7" cols="7" xl="7">
          <h1 align="left" class="pl-16">
            CREATE A <br />CAPABILITY DESCRIPTION
          </h1>
        </v-col>
        <v-col cols="7"><SearchField /></v-col>
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
