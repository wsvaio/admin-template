import { Progress } from "@wsvaio/utils";
import { createAPI } from "@wsvaio/api";
const { get, use } = createAPI<{
  success?: string;
}>({
  baseURL: "https://restapi.amap.com/v3",
  log: import.meta.env.DEV, // 控制台是否打印日志
});

// 请求发出前
use("befores")(async () => Progress.start());
use("befores")(async (ctx) => {
  ctx.q.key = import.meta.env.VITE_GAODE_WEBAPI_KEY;
});
use("finals")(async ctx => Progress.done(!ctx.error));

export const ipPosition = get("/ip");

export const inputtips = get("/assistant/inputtips");
// 行政区域查询
export const district = get({
  url: "/config/district",
  q: {
    subdistrict: 4,

    page: 1,
    offset: 100,
  },
});
