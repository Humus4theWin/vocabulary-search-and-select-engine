<template>
  <v-col class="newCapabilityColumn">
    <new-capability></new-capability>
  </v-col>
</template>

<style lang="scss">
.newCapabilityColumn {
  background-color: #343c4a;
  transition: all 0.5s;
  transition-timing-function: ease-out;
  height: 100%;
}
</style>

<script>
import { mapGetters, mapMutations } from "vuex";
import NewCapability from "./NewCapability.vue";

export default {
  name: "RightDrawer",
  components: {
    NewCapability,
  },

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
