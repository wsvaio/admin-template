import { defineStore } from "pinia";
import { placeInfoChooseList } from "@/apis/local";
// const storageName = `${import.meta.env.VITE_PROJECT_NAME}_list`;
export default defineStore("list", {
  state: () => ({
    subjectTypes: [] as any[], // 主体类型
    mchTypes: [] as any[], // 商户类型
    placeList: [] as any[], // 场地
    productList: [] as any[], // 产品
    prodTypes: [] as any[], // 产品类型
    placeTypes: [] as any[], /// 场地类型
    constructions: [] as any[], // 场所
    repairTypes: [] as any[], // 工单类型
    equipErrors: [] as any[], // 设备故障
    chargeErrors: [] as any[], // 充电故障
    equipOutlines: [] as any[], // 设备离线
    fireSafetys: [] as any[], // 消防安全
    repairStates: ["待处理", "处理中", "已处理"],
    mchs: [] as any[], // 商户列表
  }),
  actions: {
    // async syncAllList() {
    //   await Promise.all(
    //     Object.keys(this)
    //       .filter((item) => {
    //         return item.startsWith("sync") && item != "syncAllList";
    //       })
    //       .filter((item) => {
    //         const name = item.replace("sync", "");
    //         const list = this[name.replace(name[0], name[0].toLowerCase())];
    //         return !list.length;
    //       })
    //       .map((item) => this[item]()),
    //   );
    // },
    async syncSubjectTypes() {
      this.subjectTypes = await dictList({ q: { dictId: 10003 } });
    },
    async syncMchTypes() {
      this.mchTypes = await dictList({ q: { dictId: 10001 } });
    },
    async syncPlaceList() {
      this.placeList = await placeInfoChooseList();
    },
    async syncProductList() {
      this.productList = await productInfoChooseList();
    },
    async syncProdTypes() {
      this.prodTypes = await dictList({ q: { dictId: 10010 } });
    },
    async syncPlaceTypes() {
      this.placeTypes = await dictList({ q: { dictId: 10016 } });
    },
    async syncConstructions() {
      this.constructions = await dictList({ q: { dictId: 10027 } });
    },
    async syncRepairTypes() {
      this.repairTypes = await dictList({ q: { dictId: 10025 } });
    },
    async syncEquipErrors() {
      this.equipErrors = await dictList({ q: { dictId: 1002501 } });
    },
    async syncChargeErrors() {
      this.chargeErrors = await dictList({ q: { dictId: 1002502 } });
    },
    async syncEquipOutlines() {
      this.repairTypes = await dictList({ q: { dictId: 1002503 } });
    },
    async syncFireSafetys() {
      this.repairTypes = await dictList({ q: { dictId: 1002504 } });
    },
    async syncMchs() {
      this.mchs = await mchInfoChooseList();
    },
  },
  getters: {},

  // persist: {
  //   key: storageName,
  // },
});
