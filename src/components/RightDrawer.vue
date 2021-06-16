<template>
  <v-col
    class="newCapabilityMenu"
    cols="4"
    :style="{ flex: drawerState ? '0 0 33.3333%' : '0 0 0%' }"
  >
    <v-col class="pa-8">
      <h1 class="white--text" style="line-height: 1.3 !important">
        New Capability
      </h1>
      <v-text-field
        class="pt-5"
        label="Capability Name"
        placeholder="Untitled Capability"
        color="white"
        filled
      ></v-text-field>
      <v-card class="mx-auto mb-5">
        <v-app-bar flat color="#74b559">
          <v-toolbar-title class="text-h6 white--text pl-0">
            Subject
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color="white" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-title>Structured-light 3D scanner</v-card-title>
        <v-card-text class="text-left">
          <v-expansion-panels :value="drawerState ? 0 : 1">
            <v-expansion-panel>
              <v-expansion-panel-header> Description </v-expansion-panel-header>
              <v-expansion-panel-content>
                3D scanning device for measuring the three-dimensional shape of
                an object using projected light patterns and a camera system.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>

      <v-card class="mx-auto mb-5">
        <v-app-bar flat color="#74b559">
          <v-toolbar-title class="text-h6 white--text pl-0">
            Predicate
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-app-bar>
      </v-card>

      <v-card class="mx-auto mb-5">
        <v-app-bar flat color="#74b559">
          <v-toolbar-title class="text-h6 white--text pl-0">
            Object
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-app-bar>
      </v-card>
    </v-col>

    <v-col fill-height align="end" class="pa-8">
      <v-btn x-large color="white">Generate JSON-LD</v-btn>
    </v-col>
  </v-col>
</template>

<style lang="scss">
.newCapabilityMenu {
  background-color: #343c4a;
  transition: all 0.5s;
  transition-timing-function: ease-out;
}

.newCapabilityMenu .theme--light.v-label {
  color: rgba(255, 255, 255, 0.6);
}

.newCapabilityMenu .theme--light.v-input input,
.newCapabilityMenu .theme--light.v-input textarea {
  color: rgba(255, 255, 255, 0.87);
}
</style>

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
