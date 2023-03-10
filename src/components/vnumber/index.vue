<script setup lang="ts">
const props = defineProps<{ value?: number; duration?: number }>();
let num = $ref(0);
watchEffect(() => {
  if (!props.value && props.value != 0) return;
  gsap.to($$(num), {
    value: props.value,

    duration: props.duration || 1,
  });
});
</script>

<template>
  <span class="vnumber">
    <slot :num="num">{{ num.toFixed(0) }}</slot>
  </span>
</template>

<style scoped>
.vnumber {
  font-weight: 700;
  letter-spacing: 0;
  text-align: left;
  vertical-align: top;
}
</style>
