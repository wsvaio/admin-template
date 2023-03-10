<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  items: string[];
}>();
const emit = defineEmits(["update:modelValue"]);

const ulRef = $ref<HTMLUListElement>();

const activeLi = $computed(() => {
  const index = props.items.indexOf(props.modelValue);
  return ulRef?.children[index] as HTMLLIElement | undefined;
});

const sliderStyle = reactive({
  left: "0px",
  width: "100px",
});
onMounted(() => {
  if (!props.items.includes(props.modelValue)) emit("update:modelValue", props.items[0]);
  if (activeLi) {
    sliderStyle.left = `${activeLi.offsetLeft + activeLi.clientWidth / 2}px`;
    sliderStyle.width = `${activeLi.clientWidth}px`;
  }
});

watchEffect(() => {
  if (!activeLi) return;
  gsap.to(sliderStyle, {
    left: `${activeLi.offsetLeft + activeLi.clientWidth / 2}px`,
    width: `${activeLi.clientWidth}px`,
    duration: 0.3,
  });
});
</script>

<template ref="ulRef" tag="ul" class="vtab">
  <li
    v-for="item in items"
    :class="[modelValue == item && 'active']"
    @click="emit('update:modelValue', item)"
  >
    {{ item }}
  </li>
  <div v-if="items?.length" class="slider" :style="sliderStyle"></div>
</template>

<style lang="less" scoped>
ul.vtab {
  display: grid;
  position: relative;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  margin: 0;
  list-style: none;
  white-space: nowrap;
  gap: var(--gap);

  & > li {
    transition: opacity 0.3s, font-weight 0.3s;
    opacity: 0.5;
    cursor: pointer;
    // font-weight: bold;

    &.active {
      opacity: 1;
      font-weight: bold;
    }
  }

  & > div.slider {
    position: absolute;
    bottom: -2px;
    width: 67px;
    height: 4px;
    overflow: hidden;
    transform: translateX(-50%);
    border-radius: 999px;
    background-color: var(--primary-color);
  }
}
</style>
