<script setup lang="ts">
import { useRequest } from "vue-request";

// const main = useMainStore();
const { t } = useI18n();
const payload = reactive<Record<any, any>>({});
const auth = useAuthStore();
const router = useRouter();
const { loading, runAsync: submit } = $(
  useRequest(
    async () => {
      await auth.login(payload);
      ElNotification.success("登录成功");
      router.push("/");
    },
    {
      manual: true,
    },
  ),
);
</script>

<template tag="div" class="login">
  <article>
    <header
      v-enter="{ translate: '-100px, 0', delay: '0.1s' }"
      grid="col-span-full"
      flex="~"
      p="t-100px"
      text="white"
      font="leading-[1]"
      class="self-start"
    >
      <div></div>
      <img src="@/assets/zck_logo.png" w="95px" h="77px" object="cover" />
      <section flex="~ col" justify="center" m="l-24px">
        <h1 m="0" text="32px">
          智充客智慧电源一体化管理平台
        </h1>
        <h3 m="0 t-16px" class="opacity-50">
          UNIFIED AUTHENTICATION PLATFORM
        </h3>
      </section>
    </header>

    <section class="left">
      <img
        v-enter="{ translate: '-100px, 0', delay: '0.2s' }"
        w="80%"
        src="@/assets/login/left-img.gif"
        object="contain"
      />
      <!-- <h1 m="0" text="white center" font="bold">智慧充电 · 美好生活</h1> -->
      <h1 v-enter="{ translate: '-100px, 0', delay: '0.3s' }" text="white">
        开箱即用的智能电源管理平台
      </h1>
      <h4
        v-enter="{ translate: '-100px, 0', delay: '0.4s' }"
        text="white"
        class="opacity-50"
        font="normal"
      >
        输入您的个人详细信息开始使用！
      </h4>
    </section>

    <el-form
      class="right"
      :model="payload"
      size="large"
      :disabled="loading"
      w="full"
      max="w-404px"
      justify="self-end"
    >
      <h1 v-enter="{ translate: '100px, 0', delay: '0.1s' }">
        欢迎登录
      </h1>
      <el-form-item
        v-enter="{ translate: '100px, 0', delay: '0.2s' }"
        prop="username"
        :rules="[{ required: true, message: t('login.verify.username') }]"
      >
        <el-input
          v-model="payload.username"
          clearable
          :placeholder="t('login.placeholder.username')"
        />
      </el-form-item>

      <el-form-item
        v-enter="{ translate: '100px, 0', delay: '0.3s' }"
        prop="password"
        :rules="[{ required: true, message: t('login.verify.password') }]"
      >
        <el-input
          v-model="payload.password"
          type="password"
          size="large"
          show-password
          clearable
          :placeholder="t('login.placeholder.password')"
          @keydown.enter="submit"
        />
      </el-form-item>

      <div v-enter="{ translate: '100px, 0', delay: '0.4s' }" flex="~" items="center">
        <el-checkbox>{{ t("login.form.remembe") }}</el-checkbox>
        <a m="l-auto" cursor="pointer" un:text="[rgba(var(--primary-color))]">{{
          t("login.form.forgot")
        }}</a>
      </div>
      <el-button
        v-enter="{ translate: '100px, 0', delay: '0.4s' }"
        m="t-12px"
        w="full"
        type="primary"
        :loading="loading"
        @click="submit"
      >
        登录
      </el-button>
    </el-form>

    <footer
      v-enter="{ translate: '-100px, 0', delay: '0.5s' }"
      grid="col-span-full"
      class="self-end pb-24px"
      text="white"
    >
      <!-- <a class="opacity-50">浙公网安备 33068102000744</a>
      <a class="opacity-50" m="l-96px">浙ICP备 2021018529 号 -2</a> -->
    </footer>
  </article>
</template>

<style lang="less" scoped>
.login {
  // background-color: rgb(var(--background-color-secondary));
  // padding: 0 48px;
  --login-max-width: 1440px;
  // linear-gradient(
  //   270deg,
  //   transparent 0%,
  //   transparent calc(38.2vw + 200px),
  //   #1e4dac calc(38.2vw + 200px),
  //   #1e4dac
  // );
  // background-color: #1e4dac;
  overflow-x: hidden;
  background: url("@/assets/login/bg.svg") right 38.2vw center / cover no-repeat;

  & > article {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr max-content 1fr;
    align-content: space-between;
    // overflow-x: hidden;

    // justify-items: center;
    align-items: center;
    justify-content: space-between;
    max-width: var(--login-max-width);
    height: 100vh;
    margin: 0 auto;
    padding: 0 24px;
    gap: 24px;
  }
}
</style>

<style lang="less" scoped>
.md .login {
  background: url("@/assets/login/bg.svg") right 0 center / cover no-repeat;

  .left {
    display: none;
  }

  .right {
    grid-column: span 2;
    max-width: 500px;
    padding: 32px;
    border-radius: 12px;
    background-color: var(--login-form-bg-color, var(--bg-color));
    text-align: center;
    justify-self: center;

    @apply shadow-lg;
  }
}

.dark .login {
  background: var(--bg-color) !important;
}
</style>
