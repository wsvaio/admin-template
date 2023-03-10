import { del, get, post, put } from "./request";

// 登录认证
export const authorizeToken = post("/authorize/token");
export const authorizeRefreshToken = post<{
  refreshToken: string;
}>("/authorize/refreshToken");

// 字典码表列表
export const dictList = get("/dict/list");

// 商户列表CRUD
export const mchInfoList = get("/mch/info/list");
export const mchInfoDetail = get("/mch/info/detail");
export const mchInfoDelete = del("/mch/info/delete");
export const mchInfoUpdate = post("/mch/info/update");
export const mchInfoInsert = post("/mch/info/insert");
// 获取商户树
export const mchInfoTheTreeList = get("/mch/info/theTreeList");
// 设备管理CRUD
export const equipInfoList = get("/equip/info/list");
export const equipInfoDetail = get("/equip/info/detail");
export const equipInfoInsert = post("/equip/info/insert");
export const equipInfoUpdate = put("/equip/info/update");
export const equipInfoDelete = del("/equip/info/delete");

// 场地列表下拉选
export const placeInfoChooseList = get("/place/info/chooseList");
export const productInfoChooseList = get("/product/info/chooseList");

// 场地CRUD
export const placeInfoList = get("/place/info/list");
export const placeInfoDetail = get("/place/info/detail");
export const placeInfoInsert = post("/place/info/insert");
export const placeInfoUpdate = put("/place/info/update");
// 获取场地设备端口地图列表(todo)
export const placeInfoGetMap = get("/place/info/getMap");
// 根据场地id获取设备列表
export const equipInfoListByPlaceId = get("/equip/info/listByPlaceId");
// 根据场地id获取设备各状态数量
export const equipInfoGetEquipByPlaceId = get("/equip/info/getEquipByPlaceId");
// 场地绑定新设备
export const equipInfoBinding = post("/equip/info/binding");
// 根据场地id获取设备列表及端口列表(分页)
export const equipInfoFindEquipMapPageByPlace = get("/equip/info/findEquMapPageByPlace");
// 根据场地id获取设备列表及端口列表
export const equipInfoFindEquipMapByPlace = get("/equip/info/findEquMapByPlace");

// 工单CRUD
export const repairInfoList = get("/repair/info/list");
export const repairInfoDetail = get("/repair/info/detail");
// export const repairInfoList = get("/repair/info/list");
// export const repairInfoList = get("/repair/info/list");
// export const repairInfoList = get("/repair/info/list");
// 工单处理
export const repairInfoDeal = put("/repair/info/deal");

// 用户CRUD
export const userList = get("/user/list");
export const userDetail = get("/user/detail");
export const userUpdate = put("/user/update");
export const userDelete = del("/user/delete");
export const userInsert = del("/user/insert");
// 角色管理
export const roleList = get("/role/list");
export const roleDetail = get("/role/detail");
// 菜单管理
export const permissionTree = get("/permission/tree");
// 商户下拉选列表
export const mchInfoChooseList = get("/mch/info/chooseList");

// 更新设备内部定位
export const equipInfoUpdateAxis = put("/equip/info/updateAxis");
// 更新设备端口内部定位
export const equipPortUpdateAxis = put("/equip/port/updateAxis");

// 设备详情（场地地图）
export const equipInfoFindInfoByIdForPlace = get("/equip/info/findInfoByIdForPlace");
// 更新设备端口内部定位
export const equipPortFindInfoByIdForPlace = get("/equip/port/findInfoByIdForPlace");

// 提交需要绑定的设备到场地
export const placeEquipRelBinding = post("/place/equip/rel/binding");
// 解绑场地已绑定的设备
export const placeEquipRelUnbind = post("/place/equip/rel/unbind");
// 根据场地id获取未绑定的设备列表
export const equipInfoGetNotBindingList = get("/equip/info/getNotBindingList");
// 根据场地id获取绑定的设备列表
export const equipInfoGetBindingList = get("/equip/info/getBindingList");
// 清空当前场地绑定的设备及端口的xy轴坐标点位
export const equipInfoClearAxis = get("/equip/info/clearAxis");
// 上传场地内部地图
export const placeInfoUploadMap = post("/place/info/uploadMap");
// 删除场地地图
export const placeInfoDeleteMap = del("/place/info/deleteMap");
// 获取场地内部地图
export const placeInfoGetMapImg = get("/place/info/getMapImg");
// 商户商标上传
export const mchInfoUploadIco = post("/mch/info/uploadIco");
// 商户资质上传
export const mchInfoUploadLicense = post("/mch/info/uploadLicense");
// -------------------------------------
// -------------------------------------
// 工单详情列表
export const listOfWorkOrderDetails = get("/cockpit/repairDetailList?limit=6");
// 工单完成数量
export const WorkOrderNum = get("/cockpit/repairDoneNum");
// 设备运行各状态数量统计图表
export const WorkOrderNumberOfStates = get("/cockpit/onlineNumChart");
// 数据新增统计详情图表
export const addStatisticsDetails = get("/cockpit/newVolStatistics");
// 数据新增统计详情图表
export const addHomeStatisticsDetails = get("/home/newVolStatistics");
// 设备运行各状态数量统计图表
export const homeOnlineNumChart = get("/home/onlineNumChart");
// 今日未完成工单列表
export const homeTodayUnfinishedRepair = get("/home/todayUnfinishedRepair");
