import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Details from "@/components/Details";

Vue.use(Router);

const router = new Router({
  routes: [
    { path: "/", component: Home },
    { path: "/details", component: Details },
  ],
});

export default router;
