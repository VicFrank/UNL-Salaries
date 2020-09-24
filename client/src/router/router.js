import Vue from "vue";
import VueRouter from "vue-router";

import Salaries from "../components/Salaries";
import Departments from "../components/Departments";
import Department from "../components/Department";
import Employee from "../components/Employee";
import NotFound from "../components/NotFound";

Vue.use(VueRouter);

const routes = [
  { path: "/404", alias: "*", component: NotFound },
  { path: "*", redirect: "/404" },
  {
    path: "/",
    component: Salaries,
  },
  {
    path: "/departments",
    component: Departments,
  },
  {
    path: "/departments/:name",
    component: Department,
  },
  {
    path: "/employees/:name",
    component: Employee,
  },
];

let router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
