<template>
  <v-navigation-drawer v-model="drawerState" fixed temporary>
    <v-list-item>
      <v-list-item-content>
        <v-btn
          class="primary"
          :to="{ name: 'Home' }"
          depressed
          min-height="80"
          max-height="85"
          width="80"
        >
          <span>Capability</span>
          <v-icon class="pa-2">mdi-hammer-wrench</v-icon>
        </v-btn>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-btn
          class="primary"
          :to="{ name: 'Vocabularies' }"
          depressed
          min-height="80"
          max-height="85"
          width="80"
        >
          <span>Vocabs</span>
          <v-icon class="pa-2">mdi-book-open-blank-variant</v-icon>
        </v-btn>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-btn
          class="primary"
          :to="{ name: 'CreateTerm' }"
          depressed
          min-height="80"
          max-height="85"
          width="80"
        >
          <span>Create Term</span>
          <v-icon class="pa-2">mdi-pencil</v-icon>
        </v-btn>
      </v-list-item-content>
    </v-list-item>
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
