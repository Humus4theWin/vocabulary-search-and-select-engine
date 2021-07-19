<template>
  <v-app-bar color="primary" height="120" class="mb-10">
    <v-col>
      <v-row align="center">
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
          <v-app-bar-nav-icon
            @click="toggleLeftDrawerState()"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>Capabilities</v-toolbar-title>

          <v-spacer></v-spacer>

          <!--<v-btn icon v-if="!rightDrawer" @click="toggleRightDrawerState()"
            ><v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn icon v-else @click="toggleRightDrawerState()"
            ><v-icon>mdi-arrow-right</v-icon>
          </v-btn>-->
        </v-toolbar>
      </v-card>
    </v-col>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      rightDrawer: "rightDrawerState", // map `this.rightDrawerState()` to `this.$store.dispatch('rightDrawerState')`
    }),
    rightDrawerState: {
      get() {
        return this.rightDrawer;
      },
      set(rightDrawerState) {
        if (!rightDrawerState) {
          this.toggleRightDrawerState();
        }
        return rightDrawerState;
      },
    },
  },

  methods: {
    ...mapMutations({
      toggleLeftDrawerState: "toggleLeftDrawerState", // map `this.toggleLeftDrawerState()` to `this.$store.dispatch('toggleLeftDrawerState')`
      toggleRightDrawerState: "toggleRightDrawerState", // map `this.toggleRightDrawerState()` to `this.$store.dispatch('toggleRightDrawerState')`
    }),
  },
};
</script>
