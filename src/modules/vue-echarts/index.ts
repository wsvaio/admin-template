// import ECharts from "vue-echarts";
// import type { ComposeOption } from "echarts/core";
// import { registerMap, use } from "echarts/core";
// import type { App } from "vue";

// // 手动引入 ECharts 各模块来减小打包体积
// import { CanvasRenderer } from "echarts/renderers";
// import type {
//   BarSeriesOption,
//   LineSeriesOption,
//   PieSeriesOption,
// } from "echarts/charts";
// import {
//   BarChart,
//   LineChart,
//   MapChart,
//   PieChart,
// } from "echarts/charts";
// import type {
//   DatasetComponentOption,
//   GridComponentOption,
//   LegendComponentOption,
//   TooltipComponentOption,
// } from "echarts/components";
// import {
//   DatasetComponent,
//   GeoComponent,
//   GridComponent,
//   LegendComponent,
//   PolarComponent,
//   TitleComponent,
//   ToolboxComponent,
//   TooltipComponent,
//   VisualMapComponent,
// } from "echarts/components";
// import { MapData } from "@/utils/zhuji";

// use([
//   DatasetComponent,
//   TooltipComponent,
//   GridComponent,
//   LegendComponent,
//   CanvasRenderer,
//   ToolboxComponent,
//   VisualMapComponent,
//   TitleComponent,
//   PolarComponent,
//   GeoComponent,
//   PieChart,
//   LineChart,
//   BarChart,
//   MapChart,
// ]);

// registerMap("zhuji", MapData);

// declare module "vue" {
//   export interface GlobalComponents {
//     VChart: typeof ECharts;
//   }
// }

// declare global {
//   type ECOption = ComposeOption<
//     | LineSeriesOption
//     | PieSeriesOption
//     | DatasetComponentOption
//     | TooltipComponentOption
//     | GridComponentOption
//     | LegendComponentOption
//     | BarSeriesOption
//   >;
// }

// export default (app: App) => {
//   // 全局注册组件（也可以使用局部注册）
//   // app.component("VChart", ECharts);
// };
export {};
