<script lang="ts" setup>
import type { RouteRecordRaw } from "vue-router";
import { isMenuItem } from "@/layouts/administrator/utils";
import { administratorChildren } from "@/routes";
const main = useMainStore();
const router = useRouter();
const handleMenuClick = (routeItem: RouteRecordRaw) => {
  if (isMenuItem(routeItem)) {
    router.push(routeItem);
    main.showLeftMix = false;
  }
  else {
    main.showLeftMix = true;
  }
  main.leftMixActiveRoute = routeItem;
};
</script>

<template>
  <div class="menu-left-mix-trigger">
    <div
      v-for="item in administratorChildren"
      :key="item.name"
      :title="item.meta?.title"
      class="menu-nav-item" :class="[main.leftMixActiveRoute?.name == item.name && 'active']"
      @click="handleMenuClick(item)"
    >
      <component :is="item?.meta?.icon" class="icon" />
      <div class="text">
        {{ item?.meta?.title }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu-left-mix-trigger {
  .menu-nav-item {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2px;
    text-align: center;

    .text {
      margin-left: 0;
    }
  }
}
</style>
