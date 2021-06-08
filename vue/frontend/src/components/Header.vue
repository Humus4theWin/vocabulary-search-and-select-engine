<template>
  <v-app-bar color="primary" height="120" app>
    <v-col>
      <v-row justify="left" align="center">
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
      </v-row>

      <v-card class="actionBar" color="grey lighten-4" flat height="0px" tile>
        <v-toolbar extension-height="100">
          <v-app-bar-nav-icon @click="toggleDrawerState()"></v-app-bar-nav-icon>

          <v-toolbar-title>Capabilities</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-col>
  </v-app-bar>
</template>

<style>
.actionBar {
  margin-top: 25px;
}
</style>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Header",
  methods: {
    ...mapMutations({
      toggleDrawerState: "toggleDrawerState", // map `this.toggleDrawerState()` to `this.$store.dispatch('toggleDrawerState')`
    }),
  },
};
</script>
