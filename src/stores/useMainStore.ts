import { defineStore } from "pinia";
import type { RouteLocationNormalized, RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import { isMenuItem } from "@/layouts/administrator/utils";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_main`;
type Layout = "left" | "top" | "full" | "mobile" | "left-mix" | "top-mix";
type Size = "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";
export default defineStore("main", {
  state: () => ({
    theme: "light" as "light" | "dark",
    size: "xxl" as Size,
    layout: "left" as Layout,
    layoutCache: {
      mobile: "left" as Layout,
      full: "left" as Layout,
    },
    excluse: new Set<string>(),
    collapse: false,
    showAside: false,
    leftMixActiveRoute: null as RouteRecordRaw | null,
    showLeftMix: false,
    fixedLeftMix: false,
    cssVars: {
      "--primary-color": "",
    },
    isRouteActive: true,
    // 要缓存的路由 因为要支持tab拖动 所以是个一列表
    keepAlive: [] as RouteRecordNormalized[],
  }),
  actions: {
    pushKeepAlive(route: RouteRecordNormalized) {
      !this.keepAlive.some(item => item.name == route.name) && this.keepAlive.push(route);
    },
    addKeepAlive(route: RouteLocationNormalized) {
      if (route.matched[0]?.name != "administrator") return;
      for (const matched of [...route.matched].reverse()) {
        if (isMenuItem(matched)) {
          this.pushKeepAlive(matched);
          return;
        }
      }
    },
    toggleLayout(name: "full" | "mobile") {
      if (this.layout == name) {
        this.layout = this.layoutCache[name];
      }
      else {
        this.layoutCache[name] = this.layout;
        this.layout = name;
      }
    },

    layoutHas(...names: Layout[]) {
      return names.some(item => item == this.layout);
    },

    refresh(name: string) {
      name = name.replace("-index", "");
      this.excluse.add(name);
      this.isRouteActive = false;
      nextTick(() => {
        this.isRouteActive = true;
        this.excluse.delete(name);
      });
    },

    isSize(what: ">" | "<" | "==" | ">=" | "<=") {
      return (size: Size) => {
        const sizes = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"];
        if (what == ">") return sizes.indexOf(this.size) > sizes.indexOf(size);
        if (what == ">=") return sizes.indexOf(this.size) >= sizes.indexOf(size);
        if (what == "<") return sizes.indexOf(this.size) < sizes.indexOf(size);
        if (what == "<=") return sizes.indexOf(this.size) <= sizes.indexOf(size);
        if (what == "==") return sizes.indexOf(this.size) == sizes.indexOf(size);
        return false;
      };
    },
  },
  getters: {
    // 要缓存的路由名
    nameList(): string[] {
      return [...this.keepAlive.map(item => String(item.name))];
    },
  },

  persist: {
    paths: [
      "theme",
      "layout",
      "layoutCache",
      "collapse",
      "showAside",
      "showLeftMix",
      "fixedLeftMix",
      "cssVars",
      "leftMixActiveRoute",
    ],
    key: storageName,
  },
});
