import { merge } from "@wsvaio/utils";
import { defineStore } from "pinia";
import { router } from "@/modules/router";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_auth`;

export default defineStore("auth", {
  state: () => ({
    accessToken: "",
    refreshToken: "",
  }),
  actions: {
    async login(body: Record<any, any>) {
      const data = await authorizeToken({ body });
      merge(this.$state, data);
    },
    async refresh() {
      const data = await authorizeRefreshToken({ body: { refreshToken: this.refreshToken } });
      merge(this.$state, data);
    },
    logout() {
      this.$reset();
      const main = useMainStore();
      router.push({ name: "login" });
      main.keepAlive.length = 0;
    },
  },
  getters: {
    isLogin(): boolean {
      return !!this.accessToken;
    },
  },
  persist: {
    key: storageName,
    storage: localStorage,
  },
});
