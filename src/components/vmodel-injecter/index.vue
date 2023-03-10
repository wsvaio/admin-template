<script setup lang="ts">
import { merge } from "@wsvaio/utils";
import type { DialogProps } from "element-plus";
const props = defineProps<{
  slotName: string;
  dialog?: Partial<DialogProps>;
}>();
const attr = useAttrs();
if (!props.slotName) throw new Error("vmodel-injecter：组件props.slotName属性是必须的");
const vmodleInjecter = inject<VModelProvider>("vmodel-provider");
if (!vmodleInjecter) {
  throw new Error(
    `vmodel-injecter：组件props.slotName=${props.slotName}注入vmodel-provider依赖失败，请检查是否拥有该父辈组件`,
  );
}
const slots = useSlots();
const { actionMap, slotMap, use } = vmodleInjecter;
use(props.slotName)()(async (ctx) => {
  if (ctx.payload.$show != true) return;
  merge(ctx.dialog, props.dialog || {}, { overwrite: false });
  merge(ctx.dialog, attr, { overwrite: false });
});
onBeforeMount(() => {
  if (slotMap?.has(props.slotName)) {
    throw new Error(
      `vmodel-injecter：组件props.slotName=${props.slotName}已存在，props.slotName应当是唯一的`,
    );
  }
  slotMap && slotMap.set(props.slotName, slots as any);
});

onBeforeUnmount(() => {
  actionMap && actionMap.delete(props.slotName);
  slotMap && slotMap.delete(props.slotName);
});
</script>
