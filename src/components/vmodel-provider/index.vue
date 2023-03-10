<script setup lang="ts">
import type { Middleware } from "@wsvaio/utils";
import { compose, merge } from "@wsvaio/utils";
const actionMap: VModelProvider["actionMap"] = new Map();
const slotMap: VModelProvider["slotMap"] = new Map();
const {
  payload,
  action,
  clear,
  use: payloadUse,
} = usePayload({
  $slot: "",
  $show: false,
  $footable: true,
});

const use = (slotName: string) =>
  (...names: string[]) =>
    (...middlewares: Middleware<VModelProvider>[]) => {
      let actionSet = actionMap.get(slotName);
      !actionSet && actionMap.set(slotName, (actionSet = new Set()));
      actionSet.add(
        compose(
          async (ctx, next) =>
            (names.includes(ctx.payload.$name) || names.length == 0) && (await next()),
          ...middlewares,
        ),
      );
    };

const dialog = reactive<VModelProvider["dialog"]>({});

watchEffect(() => (payload.$show = !!payload.$slot));
const close = () => (payload.$show = false);
const handleClose = () => {
  merge(dialog, {}, { del: true });
  clear();
};

const exposed: VModelProvider = {
  actionMap,
  slotMap,
  payload,
  dialog,
  use,
  action,
  clear,
  close,
};

payloadUse()(async () => {
  const activeAction = actionMap.get(payload.$slot);
  if (!activeAction) return;
  await compose(...activeAction)(exposed);
});

provide("vmodel-provider", exposed);
defineExpose(exposed);
</script>

<template>
  <teleport to="body">
    <el-dialog
      v-model="payload.$show"
      class="el-dialog-overwrite"
      :="dialog"
      :before-close="(done) => payload.$loading || done()"
      @closed="handleClose"
    >
      <template #header>
        <component
          :is="slotMap.get(payload.$slot)?.header"
          v-if="slotMap.get(payload.$slot)?.header"
        />
        <span v-else class="el-dialog__title">{{ dialog.title || payload.$name }}</span>
      </template>

      <slot :name="payload.$slot"></slot>
      <component
        :is="slotMap.get(payload.$slot)?.default"
        v-if="slotMap.get(payload.$slot)?.default"
      />

      <template v-if="payload.$footable" #footer>
        <component
          :is="slotMap.get(payload.$slot)?.footer"
          v-if="slotMap.get(payload.$slot)?.footer"
        />
        <template v-else>
          <el-button type="primary" @click="action()">
            保存
          </el-button>
          <el-button @click="close()">
            取消
          </el-button>
        </template>
      </template>
    </el-dialog>
  </teleport>
  <slot></slot>
</template>
