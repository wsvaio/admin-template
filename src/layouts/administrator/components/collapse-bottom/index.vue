<script setup lang="ts">
const main = useMainStore();
</script>

<template>
  <div class="collapse-bottom" @click.stop="main.collapse = !main.collapse">
    <i-ic:twotone-keyboard-double-arrow-left v-if="!main.collapse" />
    <i-ic:twotone-keyboard-double-arrow-right v-else />
  </div>
</template>

<style lang="less" scoped>
.collapse-bottom {
  display: flex;
  position: sticky;
  bottom: 0;
  flex: none;
  align-items: center;
  justify-content: center;
  height: 36px;
  margin-top: auto;
  background-color: rgb(var(--theme-color) / 16%);
  color: white;
  font-size: 18px;
}
</style>
