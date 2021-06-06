<template>
  <v-app-bar color="primary" height="60" app>
    <router-link :to="{ name: 'Home' }">
      <v-img
        class="mx-2"
        :src="require('../assets/proceed.png')"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
    </router-link>
    <v-toolbar-title class="ml-5 mt-1 text--secondary">
      Vocabulary Search Engine
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <a
      href="https://gitlab.com/dBPMS-PROCEED/vocabulary-search-and-select-engine"
      target="_blank"
    >
      <v-icon size="50">mdi-gitlab</v-icon>
    </a>
  </v-app-bar>
</template>

<script>
export default {};
</script>
