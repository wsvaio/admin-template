<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";
import NavList from "../nav-list/index.vue";
import NavPopup from "../nav-popup/index.vue";
import { getTopLevelRoute } from "../../utils";
import { administratorChildren } from "@/routes";
const main = useMainStore();
const isShowNavList = computed(() => {
  if (main.layoutHas("left", "top-mix")) return !main.collapse;
  if (main.layout == "mobile") return true;
  return true;
});

const route = useRoute();
const routes = computed((): RouteRecordRaw[] => {
  if (main.layoutHas("top-mix")) {
    const activeRoute = getTopLevelRoute(route);
    if (!activeRoute) return routes.value;
    return activeRoute?.children || [];
  }

  return administratorChildren;
});
watchEffect(() => {
  main.showAside = !!routes.value?.length;
});

const windowEvent = useElementEvent(window);
windowEvent.on("click", () => main.layoutHas("mobile") && (main.collapse = true));
</script>

<template>
  <div class="menu-left">
    <nav-list v-if="isShowNavList" :routes="routes" />
    <nav-popup v-else :routes="routes" />
  </div>
</template>

<style lang="less">
.menu-left {
  overflow: auto;
  overflow-x: hidden;
}
</style>
