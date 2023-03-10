import type { RouteLocationNormalizedLoaded, RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import { administratorChildren } from "@/routes";

// export const isMenuItem = (route: RouteRecordRaw) =>
//   !route.children || route.children.filter((item) => item.meta?.icon).length == 0;
export const isMenuItem = (route: RouteRecordRaw) =>
  (!route.children || route.children.filter(item => item.meta?.icon).length == 0)
  && route.meta?.icon;
export const isMenu = (route: RouteRecordRaw) =>
  route.children && route.meta?.icon && route.children.filter(item => item.meta?.icon).length > 0;
export const isRouteActive = (
  routeItem: RouteRecordRaw | RouteRecordNormalized,
  route?: RouteRecordRaw | RouteLocationNormalizedLoaded,
) => {
  route ||= useRoute();

  if ("children_backup" in routeItem)
    routeItem = { ...routeItem, children: routeItem.children_backup as RouteRecordRaw[] };

  if (routeItem.name == route.name) return true;
  else if (Array.isArray(routeItem.children))
    return routeItem.children.some(item => isRouteActive(item, route));

  else return false;
};

export const getTopLevelRoute = (route: RouteRecordRaw | RouteLocationNormalizedLoaded) => {
  for (const item of administratorChildren)
    if (isRouteActive(item, route)) return item;
};
