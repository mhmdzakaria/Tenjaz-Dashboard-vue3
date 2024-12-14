import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layout/DefaultLayout.vue";
import Dashboard from "../pages/Dashboard.vue";
import Users from "../pages/Users.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/dashboard",
  },
  {
    path: "/",
    name: "DefaultLayout",
    component: DefaultLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "users",
        name: "Users",
        component: Users,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
