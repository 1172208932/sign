import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index/index.vue"),
  },
  {
    path: "/upload",
    name: "upload",
    component: () => import("../views/sign/index.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
