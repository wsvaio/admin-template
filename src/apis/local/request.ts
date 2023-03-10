import { Progress } from "@wsvaio/utils";
import { createAPI } from "@wsvaio/api";

const { DEV, VITE_BASE_API } = import.meta.env;
// 创建api对象 泛型添加自定义属性
export const { post, get, put, patch, del, request, use } = createAPI<{
  success?: string;
}>({
  baseURL: DEV ? "/api" : VITE_BASE_API,
  log: true, // 控制台是否打印日志
  // timeout: 5000,
  headers: {},
});

// 请求发出前
use("befores")(async () => Progress.start());

use("befores")(async (ctx) => {
  const auth = useAuthStore();
  // Bearer
  ctx.headers.Authorization = `Bearer ${auth.accessToken}`;
});

// use("befores")(async (ctx) => {
//   if (["get", "head"].includes(ctx.method) || !ctx.b) return;
//   delete ctx.headers["Content-Type"];
//   ctx.body = new FormData();
//   for (const [k, v] of Object.entries(ctx.b)) {
//     ctx.body.set(k, v);
//   }
// });
// 请求发出后

use("afters")(async (ctx) => {
  if (ctx.data?.code != 200) throw new Error("123");
});

// 请求发出后
use("afters")(async ctx => (ctx.data = ctx.data.data));

use("errors")(async (ctx) => {
  if (ctx.data?.code != 401 && ctx.data?.status != 401) return;
  const auth = useAuthStore();
  auth.logout();
});

// use("errors")(async (ctx) => {
//   if (ctx.data?.code != 401 && ctx.data?.status != 401) return;
//   const auth = useAuthStore();
//   if (ctx.url == "/authorize/refreshToken") {
//     auth.logout();
//   } else {
//     await auth.refresh();
//     ctx.data = await run(ctx);
//   }
// });

// 结束时总会运行
// 进度条结束
use("finals")(async ctx => Progress.done(!ctx.error));
use("finals")(async ctx => (ctx.message = ctx.data?.msg || ctx.data?.message || ctx.message));
// notice 通知 不设置success则不会通知
use("finals")(async ctx =>
  ctx.error
    ? (ctx.message && ElNotification.error(ctx.message))
    : (ctx.success && ElNotification.success(ctx.success)),
);
