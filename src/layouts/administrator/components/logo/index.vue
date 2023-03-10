<script setup lang="ts">
const title = import.meta.env.VITE_DOCUMENT_SHORT_TITLE;
</script>

<template>
  <div class="logo">
    <img w="32px" h="32px" object="cover" src="/logo.png" />
    <h3 m="0 l-12px">
      {{ title }}
    </h3>
  </div>
</template>

<style lang="less" scoped>
.logo {
  display: flex;
  flex: none;
  align-items: center;
  height: 48px;
  padding: 10px;
  overflow: hidden;
  white-space: nowrap;
}
</style>
