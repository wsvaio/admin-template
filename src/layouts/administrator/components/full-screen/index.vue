<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen(document.documentElement);
</script>

<template>
  <div class="hover" @click="toggle">
    <i-akar-icons:full-screen v-if="!isFullscreen" />
    <i-akar-icons:normal-screen v-else />
  </div>
</template>
