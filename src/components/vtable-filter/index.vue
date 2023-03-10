<script setup lang="ts">
const { labelWidth = "max-content", itemWidth = "minmax(100px, max-content)" } = defineProps<{
  labelWidth?: string;
  itemWidth?: string;
}>();
let collapse = $ref(true);
const $slot = useSlots();

let count = $ref(0);
onMounted(() => (count = $slot.default ? $slot.default().length : 0));
const main = useMainStore();
const maxCount = $computed(() =>
  main.isSize(">")("xl") ? 8 : main.isSize(">")("lg") ? 6 : main.isSize(">")("sm") ? 4 : 2,
);
const isShowCollapse = computed(() => count > maxCount);
</script>

<template tag="div" class="vtable-filter">
  <div
    class="left" :class="[collapse && 'collapse']"
    :style="{
      '--count': (maxCount > count ? count : maxCount) / 2,
      '--label-width': labelWidth,
      '--item-width': itemWidth,
    }"
  >
    <slot></slot>
  </div>
  <div v-if="$slots.right" class="right">
    <slot name="right"></slot>
    <div
      v-if="isShowCollapse"
      cursor="pointer"
      text="[var(--primary-color)] 12px"
      @click="collapse = !collapse"
    >
      <span class="align-middle">{{ collapse ? "展开" : "收起" }}</span>
      <i-ion:arrow-down-b
        class="align-middle arrow"
        m="l-4px"
        :class="[collapse && 'collapse']"
      />
    </div>
  </div>
</template>

<style lang="less">
.vtable-filter {
  display: flex;
  // overflow: hidden;
  flex-wrap: wrap;
  margin: calc(var(--gap) / -2);
  overflow: auto;
  // gap: var(--gap);
  color: rgb(var(--theme-color-invert) / 80%);

  & > * {
    margin: calc(var(--gap) / 2);
  }

  .left {
    display: grid;
    grid-template-columns: repeat(var(--count), var(--label-width) var(--item-width));
    flex: 1 1 0%;
    align-items: center;
    max-height: 100vh;
    transition: max-height 0.3s;
    gap: var(--gap);

    & > * {
      animation: vtable-show 0.3s;
    }

    @keyframes vtable-show {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }

  .right {
    display: flex;
    flex: none;
    align-items: center;
    align-self: flex-end;
    margin-left: auto;
    // gap: calc(var(--gap) / 4 * 3);
    // margin: calc(var(--gap) / 8 * -3);

    & > * {
      // margin: calc(var(--gap) / 8 * 3);
      margin-left: calc(var(--gap) / 4 * 3);
    }

    .arrow {
      transform: rotate(180deg);

      &.collapse {
        transform: rotate(0deg);
      }
    }
  }

  .vtable-filter-label {
    margin-right: calc(-1 * var(--gap));
  }
}

html.xxl .vtable-filter > .left.collapse > *:nth-child(n + 9) {
  display: none;
}

html.xl .vtable-filter > .left.collapse > *:nth-child(n + 7) {
  display: none;
}

html.lg .vtable-filter > .left.collapse > *:nth-child(n + 5) {
  display: none;
}

html.sm .vtable-filter > .left.collapse > *:nth-child(n + 3) {
  display: none;
}
</style>
