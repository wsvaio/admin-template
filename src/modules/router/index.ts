import { createRouter, createWebHistory } from "vue-router";
import { Progress } from "@wsvaio/utils";
import type { App } from "vue";
import routes from "@/routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
});

router.beforeEach(() => Progress.start());

router.beforeEach((to): any => useMainStore().addKeepAlive(to));

router.afterEach(() => Progress.clear());

export default (app: App) => app.use(router);
