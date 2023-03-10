<script setup lang="ts">
import { getTopLevelRoute } from "../../utils";
import NavList from "../nav-list/index.vue";
import { administratorChildren } from "@/routes";

const main = useMainStore();
const routes = computed(() => {
  if (!main.leftMixActiveRoute) return [];
  return (
    administratorChildren.find(item => item.name == main.leftMixActiveRoute?.name)?.children || []
  );
});
const route = useRoute();

const windowEvent = useElementEvent(window);
windowEvent.on("mousemove", () => {
  if (main.layout != "left-mix" || main.fixedLeftMix) return;
  main.showLeftMix = false;
  main.leftMixActiveRoute = getTopLevelRoute(route)!;
});

windowEvent.on("click", () => {
  if (main.layout != "left-mix") return;

  main.leftMixActiveRoute = getTopLevelRoute(route)!;
  if (main.showLeftMix) main.showLeftMix = !!main.leftMixActiveRoute.children?.length;
});

const title = import.meta.env.VITE_DOCUMENT_SHORT_TITLE;
</script>

<template>
  <div class="menu-left-mix" :class="[!main.showLeftMix && 'hide', main.fixedLeftMix && 'be-fixed']">
    <div
      class="logo-mix"
      h="48px"
      text="white"
      flex="~ none"
      items="center"
      p="r-12px"
      pos="sticky top-0"
    >
      <span text="18px" m="r-auto" class="whitespace-nowrap">{{ title }}</span>
      <i-material-symbols:push-pin
        v-if="main.fixedLeftMix"
        @click="main.fixedLeftMix = !main.fixedLeftMix"
      />
      <i-material-symbols:push-pin-outline v-else @click="main.fixedLeftMix = !main.fixedLeftMix" />
    </div>
    <div class="nav-container">
      <nav-list :routes="routes" />
    </div>
  </div>
</template>

<style lang="less">
.menu-left-mix {
  display: flex;
  z-index: 10;
  flex-direction: column;
  width: 200px;
  height: 100%;
  margin-right: -200px;
  // max-height: calc(100vh - 250px);
  overflow: auto;
  overflow-x: hidden;
  transition: width 0.3s, margin-right 0.3s;

  &.hide {
    width: 0;
    margin-right: 0;
  }

  &.be-fixed {
    margin-right: 0;
  }

  .logo-mix {
    border-bottom: 1px solid var(--border-color);
  }

  .nav-container {
    flex: 1;
    overflow: auto;
    border-left: 1px solid var(--border-color);
  }
}

html:not(.dark) .menu-left-mix {
  --border-color: rgb(var(--theme-color) / 10%);
}
</style>
