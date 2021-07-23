<template>
  <v-navigation-drawer v-model="drawerState" fixed temporary right>
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
          <span>Search</span>
          <v-icon class="pa-2">mdi-magnify</v-icon>
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
          <span>Vocabularies</span>
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
  name: "RightDrawer",
  computed: {
    ...mapGetters({
      drawer: "rightDrawerState", // map `this.rightDrawerState()` to `this.$store.dispatch('rightDrawerState')`
    }),
    drawerState: {
      get() {
        return this.drawer;
      },
      set(drawerState) {
        if (!drawerState) {
          this.toggleRightDrawerState();
        }
        return drawerState;
      },
    },
  },
  methods: {
    ...mapMutations({
      toggleRightDrawerState: "toggleRightDrawerState", // map `this.toggleRightDrawerState()` to `this.$store.dispatch('toggleRightDrawerState')`
    }),
  },
};
</script>
