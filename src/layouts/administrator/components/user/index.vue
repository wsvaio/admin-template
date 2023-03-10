<script setup lang="ts">
// import ilock from "~icons/material-symbols/lock-outline";
import ishutdown from "~icons/icons8/shutdown";
const main = useMainStore();
const auth = useAuthStore();
const handleCommand = (item) => {
  if (item === "lock") {
    //
  }
  else if (item === "logout") {
    auth.logout();
  }
};
const title = import.meta.env.VITE_DOCUMENT_SHORT_TITLE;
</script>

<template>
  <el-dropdown class="hover" @command="handleCommand">
    <div flex="~" items="center" outline="none">
      <img src="@/assets/avatar.jpg" w="32px" h="32px" object="cover" rounded="50%" />
      <span v-if="main.layout != 'mobile'" m="l-8px" min="w-32px">{{ title }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- <el-dropdown-item :icon="ilock" command="lock">锁定屏幕</el-dropdown-item> -->
        <el-dropdown-item :icon="ishutdown" command="logout">
          退出系统
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
