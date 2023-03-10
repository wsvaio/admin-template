import type { RouteRecordRaw } from "vue-router";
import shouye from "@/assets/menuIcon/shouye.svg";

export const administratorChildren = [
  {
    path: "dashboard",
    name: "dashboard",
    meta: { title: "首页总览", icon: h("img", { src: shouye, width: 16 }) },
    component: () => import("@/views/dashboard/index.vue"),
  },

] as RouteRecordRaw[];

export default [
  {
    path: "/",
    name: "administrator",
    redirect: { name: "dashboard" },
    component: () => import("@/layouts/administrator/index.vue"),
    children: administratorChildren,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
] as RouteRecordRaw[];
