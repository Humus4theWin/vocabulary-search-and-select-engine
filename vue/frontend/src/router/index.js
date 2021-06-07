import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreateTerm from "../views/CreateTerm.vue";
import Vocabularies from "../views/Vocabularies.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/vocabs",
    name: "Vocabularies",
    component: Vocabularies,
  },
  {
    path: "/create",
    name: "Create term",
    component: CreateTerm,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
