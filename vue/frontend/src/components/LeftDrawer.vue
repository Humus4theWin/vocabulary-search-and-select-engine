<template>
  <v-navigation-drawer v-model="drawerState" absolute temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Capabilities</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Vocabularies</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>More..</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "LeftDrawer",
  computed: {
    ...mapGetters({
      drawer: "drawerState", // map `this.drawerState()` to `this.$store.dispatch('drawerState')`
    }),
    drawerState: {
      get() {
        return this.drawer;
      },
      set(drawerState) {
        if (!drawerState) {
          this.toggleDrawerState();
        }
        return drawerState;
      },
    },
  },
  methods: {
    ...mapMutations({
      toggleDrawerState: "toggleDrawerState", // map `this.toggleDrawerState()` to `this.$store.dispatch('toggleDrawerState')`
    }),
  },
};
</script>
