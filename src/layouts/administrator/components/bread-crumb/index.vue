<script lang="ts" setup>
import { isMenu, isMenuItem } from "@/layouts/administrator/utils";
</script>

<template>
  <el-breadcrumb class="bread-crumb">
    <transition-group tag="div" mode="out-in">
      <template v-for="item in $route.matched.filter((item) => item.meta.title)">
        <el-breadcrumb-item v-if="!isMenu(item)" :to="{ name: item.name }">
          <span class="align-middle">{{ item.meta?.title }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else>
          <el-dropdown>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="sub of item.children.filter((item) => isMenuItem(item))"
                  :key="sub.name"
                  @click="$router.push({ name: sub.name })"
                >
                  {{ sub?.meta?.title }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
            <span>
              <span
                class="align-middle cursor-pointer transition-colors hover:text-[rgba(var(--primary-color))]"
              >{{ item.meta?.title }}</span>
              <i-ic:outline-keyboard-arrow-down class="align-middle" />
            </span>
          </el-dropdown>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="less" scoped>
.bread-crumb {
  display: grid;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  overflow-x: hidden;
  white-space: nowrap;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.v-enter-active {
  transition: all 0.333s ease;
}

.v-leave-active {
  display: inline-block;
  position: absolute;
  transition: all 0.333s ease;
}
</style>
