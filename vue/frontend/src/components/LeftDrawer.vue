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
import { mapGetters } from "vuex";

export default {
  name: "Header",
  methods: {
    ...mapGetters({
      drawerState: "drawerState", // map `this.drawerState()` to `this.$store.dispatch('drawerState')`
    }),
  },
};
</script>
