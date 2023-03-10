<script setup lang="ts">
const main = useMainStore();
</script>

<template>
  <div class="collapse-top hover" @click.stop="main.collapse = !main.collapse">
    <i-ant-design:menu-unfold-outlined v-if="main.collapse" />
    <i-ant-design:menu-fold-outlined v-else />
  </div>
</template>
