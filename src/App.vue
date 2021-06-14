<template>
  <v-app>
    <Header />
    <router-view />
    <Navigation />
    <left-drawer />
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #74b559;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import LeftDrawer from "./components/LeftDrawer.vue";

export default {
  components: { Navigation, Header, LeftDrawer },
  methods: {},
};
</script>
