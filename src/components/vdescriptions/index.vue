<script setup lang="ts">
import type { StyleValue } from "vue";

const props = withDefaults(
  defineProps<{
    column?: number;
  }>(),
  {
    column: 2,
  },
);
const style = $computed(
  (): StyleValue => ({
    "grid-template-columns": "max-content 1fr ".repeat(props.column).trimEnd(),
  }),
);
</script>

<template>
  <div class="vdescriptions" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="less">
.vdescriptions {
  display: grid;
  grid-template-columns: max-content 1fr max-content 1fr;
  align-items: center;
  gap: 24px 32px;

  .vdescriptions-label {
    margin-right: -32px;
    text-align: right;

    &.required {
      &::before {
        content: "*";
        color: var(--el-color-danger);
      }
    }
  }

  .vdescriptions-title {
    grid-column: 1 / -1;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-color);
    color: rgba(var(--theme-color-invert));
    font-size: 20px;
  }

  .el-form-item {
    margin: 0;
  }
}

html.sm .vdescriptions {
  grid-template-columns: max-content 1fr !important;

  & > * {
    grid-column: span 1 !important;
  }
}
</style>
