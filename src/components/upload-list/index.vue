<script setup lang="ts">
import { download } from "@wsvaio/utils";
import type { FormContext } from "element-plus";
import { formContextKey } from "element-plus";
const props = defineProps<{
  list: string[];
}>();

const injected = inject<FormContext>(formContextKey);

function dragstart(event: DragEvent) {
  const el: any = event.target;
  event.dataTransfer?.setData("dragIndex", el?.dataset?.index);
}
function drop(event: DragEvent, dropIndex: number) {
  const dragIndex: any = event.dataTransfer?.getData("dragIndex");
  const temp = props.list[dragIndex];
  if (!temp) return;
  props.list.splice(dragIndex, 1);
  props.list.splice(dropIndex, 0, temp);
}
let showImageViewer = $ref(false);
let initialIndex = $ref(0);
</script>

<template tag="div" class="upload-list">
  <el-image-viewer
    v-if="showImageViewer"
    :initial-index="initialIndex"
    :url-list="list"
    :teleported="true"
    @close="showImageViewer = false"
  />
  <transition-group>
    <div
      v-for="(item, index) in list"
      :key="item"
      :data-index="index"
      :draggable="!injected?.disabled ? 'true' : 'false'"
      @dragstart="dragstart"
      @drop="drop($event, index)"
      @dragover.prevent=""
    >
      <el-image class="w-full h-full" :src="item" fit="cover" />
      <div class="mask">
        <div @click="download(item)">
          <i-majesticons:cloud-download-line />
        </div>
        <div @click="(initialIndex = index), (showImageViewer = true)">
          <i-icon-park-outline:preview-open />
        </div>
        <div
          :class="[injected?.disabled && 'disabled']"
          @click="injected?.disabled || list.splice(index, 1)"
        >
          <i-mingcute:delete-2-line />
        </div>
      </div>
    </div>
  </transition-group>
  <slot></slot>
</template>

<style lang="less">
.upload-list {
  display: grid;
  position: relative;
  grid-auto-rows: 95px;
  grid-template-columns: repeat(auto-fill, 95px);
  width: 100%;
  user-select: none;
  gap: 12px;

  .disabled {
    cursor: not-allowed !important;
  }

  & > * {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all 0.3s;
    border: 1px solid var(--border-color);
    border-radius: 4px;

    .mask {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      opacity: 0;
      background-color: rgb(var(--theme-color-invert) / 50%);
      color: rgb(var(--theme-color));
      line-height: 1;

      & > div {
        padding: 2px 4px;
        transition: all 0.3s;
        border-radius: 4px;
        text-align: center;

        &:hover {
          background-color: rgb(var(--theme-color-invert) / 50%);
          cursor: pointer;
        }
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  & > *[draggable="true"] {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}

.v-enter-from,
.v-leave-to {
  transform: translateY(25%);
  opacity: 0;
}
</style>
