<template>
  <v-navigation-drawer v-model="drawerState" absolute temporary>
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
          to="/Vocabs"
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
          to="/create"
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

    <!--<v-divider></v-divider>-->
  </v-navigation-drawer>
</template>

<style></style>

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
