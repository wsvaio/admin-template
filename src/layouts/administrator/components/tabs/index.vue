<script lang="ts" setup>
import type { RouteRecordNormalized } from "vue-router";
import { isRouteActive } from "../../utils";

const { keepAlive } = $(useMainStore());
function dragstart(event: DragEvent) {
  const el: any = event.target;
  event.dataTransfer?.setData("dragIndex", el?.dataset?.index);
}
function drop(event: DragEvent, dropIndex: number) {
  const dragIndex: any = event.dataTransfer?.getData("dragIndex");

  let temp = keepAlive[dragIndex];

  keepAlive.splice(dragIndex, 1);
  keepAlive.splice(dropIndex, 0, temp);
}
const tabItemRef = $ref<HTMLDivElement>();
const handleMouseWheel = (ev) => {
  if (!tabItemRef) return;
  tabItemRef.scrollTo({ left: tabItemRef.scrollLeft + ev.deltaY, behavior: "smooth" });
};
const route = useRoute();
const router = useRouter();
const handleClose = (item: RouteRecordNormalized, index) => {
  keepAlive.splice(index, 1);
  if (route.name == item.name || item.children.some(sub => sub.name == route.name))
    router.push([...keepAlive].reverse()[0]);
};
</script>

<template>
  <div ref="tabItemRef" class="tabs" @mousewheel.stop.prevent="handleMouseWheel">
    <transition-group>
      <el-tag
        v-for="(item, index) in keepAlive"
        :key="item.name || item.path"
        :data-index="index"
        draggable="true"
        cursor="pointer"
        :type="isRouteActive(item, $route.matched[$route.matched.length - 1]) ? '' : 'info'"
        :closable="keepAlive.length > 1"
        :effect="isRouteActive(item, $route.matched[$route.matched.length - 1]) ? 'dark' : 'plain'"
        @dragstart="dragstart"
        @drop="drop($event, index)"
        @dragover.prevent=""
        @click="$router.push(item)"
        @close="handleClose(item, index)"
      >
        {{ item.meta?.title || item.name }}
      </el-tag>
    </transition-group>
  </div>
</template>

<style lang="less" scoped>
.tabs {
  display: flex;
  flex: 1;
  width: 10vw;
  padding: 0 0 0 6px;
  overflow: auto;
  border-bottom: solid 1px var(--border-color);
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-tag {
  height: 28px;
  margin-right: 6px;
  transition: all 0.333s ease;
  border-bottom: none;
  border-radius: 2px 2px 0 0;
  user-select: none;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(25%);
  opacity: 0;
}
</style>
