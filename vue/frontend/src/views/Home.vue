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

export default {
  name: "Home",
  components: {
    SearchField,
  },
};
</script>
