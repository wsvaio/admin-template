<script setup lang="ts">
const main = useMainStore();
</script>

<template>
  <div class="setting" @click="main.toggleLayout('full')">
    <i-octicon:screen-full v-if="main.layout != 'full'" />
    <i-octicon:screen-normal v-else />
  </div>
</template>
