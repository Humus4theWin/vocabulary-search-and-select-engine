<template>
  <v-app>
    <Header />
    <split-pane :min-percent="25" :default-percent="40" split="vertical">
      <template slot="paneR">
        <v-col class="rightView">
          <router-view />
          <right-drawer />
        </v-col>
      </template>
      <template slot="paneL">
        <v-col class="leftView"
          ><v-col class="newCapabilityColumn">
            <new-capability></new-capability>
          </v-col>
        </v-col>
      </template>
    </split-pane>
    <Navigation />
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #343c4a;
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

html {
  background-color: #343c4a;
}

.leftView {
  height: calc(100% - 200px);
}
.rightView {
  padding: 20px 30px;
}

.actionBar {
  margin-top: 25px;
}

.yearLicense {
  font-size: 80%;
}
.splitter-pane-resizer {
  width: 8px !important;
  height: 45px !important;
  margin-left: -5px !important;
  border-left: none !important;
  border-right: none !important;
  top: 50% !important;
  border-radius: 8px !important;
  background: #ffffff !important;
  opacity: 0.3 !important;
  transition: opacity 0.4s;
  transition-timing-function: ease-out;
}
.vue-splitter-container {
  background-color: #343c4a;
}
.splitter-pane-resizer:hover,
.splitter-pane-resizer:active,
.splitter-pane-resizer:focus {
  opacity: 0.7 !important;
}
</style>
<script>
import splitPane from "vue-splitpane";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import RightDrawer from "./components/RightDrawer.vue";
import NewCapability from "./components/NewCapability/NewCapability.vue";

export default {
  components: { Navigation, Header, RightDrawer, NewCapability, splitPane },
};
</script>
