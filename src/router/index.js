import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/vocabulary-search-and-select-engine/",
    alias: ["/", "/vocabulary-search-and-select-engine/"],
    name: "Home",
    component: Home,
  },
  {
    path: "/vocabs",
    name: "Vocabularies",
    component: () =>
      import(/* webpackChunkName: "vocabularies" */ "../views/Vocabularies"),
  },
  {
    path: "/create",
    name: "CreateTerm",
    component: () =>
      import(/* webpackChunkName: "createTerm" */ "../views/CreateTerm"),
  },
  {
    path: "/capability",
    name: "Capability",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/Capability"),
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/NotFound"),
  },
];

//for URL without hashes
const mode = "history";

const router = new VueRouter({
  routes,
  mode,
});

export default router;
