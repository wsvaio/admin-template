<script setup lang="ts">
import navPopup from "../nav-popup/index.vue";
import useCount from "./useCount";
import { administratorChildren } from "@/routes";
import IEllipsis from "~icons/uit/ellipsis-h";
const { layout } = $(useMainStore());
const menuTopRef = $ref<HTMLDivElement>();
const { count } = $(useCount($$(menuTopRef)));
const routes = computed(() => {
  const l
    = layout === "top-mix"
      ? administratorChildren.map(item => ({
        ...item,
        children: [],
        children_backup: item.children,
      }))
      : [...administratorChildren];
  if (l.length > count) {
    const children = l.slice(count);
    l.length = count;
    l.push({
      path: "",
      name: "",
      meta: { title: "", icon: IEllipsis },
      children,
    });
  }
  return l;
});
</script>

<template>
  <div ref="menuTopRef" class="menu-top">
    <nav-popup :routes="routes" :level="1" layout="horizontal" />
  </div>
</template>

<style scoped lang="less">
.menu-top {
  display: flex;
  width: 100%;
  // justify-content: center;
}
</style>
