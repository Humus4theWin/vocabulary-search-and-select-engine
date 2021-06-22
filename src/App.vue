<template>
  <v-app>
    <v-row no-gutters>
      <v-col class="leftView">
        <Header />
        <router-view />
        <Navigation />
        <left-drawer />
      </v-col>
      <right-drawer />
    </v-row>
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

.leftView {
  max-height: calc(100% - 200px);
}

.actionBar {
  margin-top: 25px;
}

.yearLicense {
  font-size: 80%;
}
</style>
<script>
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import LeftDrawer from "./components/LeftDrawer.vue";
import RightDrawer from "./components/RightDrawer.vue";

export default {
  components: { Navigation, Header, LeftDrawer, RightDrawer },
};
</script>
