<script setup lang="ts">
import "./styles/menu.less";
import "./styles/layout.less";

import MenuLeft from "./components/menu-left/index.vue";
import MenuLeftMix from "./components/menu-left-mix/index.vue";
import MenuLeftMixTrigger from "./components/menu-left-mix-trigger/index.vue";
import MenuTop from "./components/menu-top/index.vue";

import CollapseBottom from "./components/collapse-bottom/index.vue";
import CollapseTop from "./components/collapse-top/index.vue";
import BreadCrumb from "./components/bread-crumb/index.vue";

import search from "./components/search/index.vue";
import fullScreen from "./components/full-screen/index.vue";
import Bell from "./components/bell/index.vue";
import language from "./components/language/index.vue";
import user from "./components/user/index.vue";
import setting from "./components/setting/index.vue";
import tabs from "./components/tabs/index.vue";
import TabRefresh from "./components/tab-refresh/index.vue";
import TabDropdown from "./components/tab-dropdown/index.vue";
import TabFullscreen from "./components/tab-fullscreen/index.vue";

import LogoLeft from "./components/logo-left/index.vue";
import LogoTop from "./components/logo-top/index.vue";

const main = useMainStore();
</script>

<template tag="div" class="administrator">
  <aside
    v-if="main.layoutHas('left', 'mobile', 'top-mix', 'left-mix')"
    :class="[main.collapse && 'collapse', !main.showAside && 'hide']"
    @mousemove.stop=""
    @click.stop=""
  >
    <logo-left />
    <menu-left-mix-trigger v-if="main.layoutHas('left-mix')" />
    <menu-left v-else />
    <collapse-bottom />
  </aside>
  <menu-left-mix v-if="main.layoutHas('left-mix')" @mousemove.stop="" @click.stop="" />
  <section :class="main.collapse && 'collapse'">
    <header v-if="main.layoutHas('left', 'left-mix', 'top', 'top-mix', 'mobile')">
      <logo-top
        v-if="main.layoutHas('top', 'mobile', 'top-mix')"
        :class="[!main.showAside && 'hide']"
      />
      <collapse-top v-if="main.layoutHas('left', 'mobile', 'left-mix')" />
      <bread-crumb v-if="main.layoutHas('left', 'left-mix')" />
      <menu-top v-if="main.layoutHas('top', 'top-mix')" />
      <search />
      <bell />
      <full-screen />
      <language />
      <user />
      <setting />
    </header>
    <nav>
      <tabs />
      <tab-refresh />
      <tab-dropdown />
      <tab-fullscreen />
    </nav>
    <main>
      <router-view #="{ Component }">
        <transition mode="out-in">
          <keep-alive :include="main.nameList" :exclude="[...main.excluse]">
            <component :is="Component" v-if="main.isRouteActive" :key="$route.fullPath" />
          </keep-alive>
        </transition>
      </router-view>
    </main>
    <!-- <footer></footer> -->
  </section>
</template>

<style lang="less">
html:not(.dark) .administrator {
  & > aside {
    background-color: var(--aside-bg-color, #001529);
  }

  .menu-left-mix {
    background-color: var(--aside-bg-color, #001529);
  }
}
</style>

<style lang="less" scoped>
.administrator {
  display: flex;
  width: 100vw;
  height: 100vh;
  // overflow: hidden;

  aside {
    display: flex;
    z-index: 10;
    flex: none;
    flex-direction: column;
    overflow: auto;
    background-color: var(--aside-bg-color, var(--bg-color));
  }

  .menu-left-mix {
    background-color: var(--aside-bg-color, var(--bg-color));
  }

  section {
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    width: 50%;

    header {
      display: flex;
      height: 48px;
      padding: 0;
      overflow: auto;
      border-bottom: solid 1px var(--border-color);
      background-color: var(--header-bg-color, var(--bg-color));

      :deep(.hover) {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 10px;
        transition: background-color 0.3s;

        &:hover {
          background-color: rgb(var(--theme-color-invert) / 8%);
          cursor: pointer;
        }
      }
    }

    nav {
      display: flex;
      padding: 2px 0 1px;
      border-bottom: solid 1px var(--border-color);
      background-color: var(--bg-color);

      :deep(.setting) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        transition: color 0.3s;
        border-bottom: solid 1px var(--border-color);
        border-left: solid 1px var(--border-color);
        color: rgb(var(--theme-color-invert) / 50%);
        cursor: pointer;

        &:hover {
          color: rgb(var(--theme-color-invert) / 100%);
        }
      }
    }

    main {
      flex: 1 1 0%;
      padding: var(--gap);
      overflow-x: hidden;
      background: var(--main-bg-color);
    }
  }
}
</style>

<style lang="less" scoped>
.v-enter-from,
.v-leave-to {
  transform: translateX(10%);
  opacity: 0;
}

.v-enter-from {
  transform: translateX(-10%);
}

.v-leave-active,
.v-enter-active {
  transition: all 0.2s ease;
}
</style>
