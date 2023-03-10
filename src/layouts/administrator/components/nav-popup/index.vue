<script lang="ts" setup>
import type { RouteRecordRaw } from "vue-router";
import self from "./index.vue";
import ArrowDown from "~icons/ep/arrow-down";
import { isMenu, isMenuItem, isRouteActive } from "@/layouts/administrator/utils";
const {
  routes = [],
  level = 1,
  layout = "vertical",
} = defineProps<{
  routes?: RouteRecordRaw[];
  level?: number;
  layout?: "horizontal" | "vertical";
}>();
const currentInstance = getCurrentInstance();
const parentExposed = $computed<{ close?: boolean }>(() => currentInstance?.parent?.exposed || {});
onMounted(() => {});
const exposed = reactive({
  close: true,
});
watchEffect(() => {
  if (!parentExposed || !parentExposed.close) return;
  exposed.close = parentExposed.close;
});

defineExpose(exposed);
</script>

<template>
  <template v-for="item in routes">
    <div
      v-if="isMenuItem(item)"
      :key="item.name"
      :style="{ '--level': level }"
      class="menu-nav-item nav-popup" :class="[
        layout,
        isRouteActive(item) && 'active',
        level == 1 && 'top-level',
      ]"
      :title="item.meta?.title"
      @click="$router.push({ name: item.name })"
    >
      <component :is="item?.meta?.icon" class="icon" />
      <div class="text">
        {{ item?.meta?.title }}
      </div>
    </div>
    <vpopup
      v-else-if="isMenu(item)"
      :key="item.path"
      popuper-class="nav-popup"
      transition-name="fade"
      :direction="layout == 'horizontal' && level == 1 ? 'bottom' : 'right'"
      :style="{ '--level': level }"
      class="menu-nav-item title nav-popup" :class="[
        layout,
        isRouteActive(item) && 'active',
        level == 1 && 'top-level',
      ]"
      :title="item.meta?.title"
    >
      <template #popup>
        <self :level="level + 1" :routes="item.children!" :layout="layout" />
      </template>

      <component :is="item?.meta?.icon" class="icon" />
      <div v-if="item?.meta?.title" class="text">
        {{ item?.meta?.title }}
      </div>
      <arrow-down class="arrow" />
    </vpopup>
  </template>
</template>

<style lang="less">
.menu-nav-item.nav-popup {
  padding: 12px;

  .arrow {
    transform: rotate(-90deg);
  }
}
</style>

<style lang="less">
.menu-nav-item.nav-popup.vertical {
  &.top-level {
    .text,
    .arrow {
      display: none;
    }
  }
}
</style>

<style lang="less">
.menu-nav-item.horizontal {
  --menu-bg-color: var(--el-bg-color);
  --menu-text-color: var(--el-text-color-primary);
  --menu-text-active-color: var(--el-color-primary);
  --menu-bg-sub-color: var(--el-bg-color);
  --menu-bg-active-color: var(--el-bg-color);

  height: 100%;
  transition: border-color 0.2s;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;

  &.top-level {
    margin: 0 16px;
    padding: 4px;
    background-color: transparent !important;

    .arrow {
      display: none;
    }

    &.active,
    &:hover {
      border-bottom: 3px solid var(--primary-color);
      background-color: transparent;
    }
  }
}
</style>
