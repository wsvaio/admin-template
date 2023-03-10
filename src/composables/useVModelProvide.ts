export default () => {
  const result = inject<VModelProvider>("vmodel-provider");
  if (!result)
    throw new Error("useVModelProvide：注入vmodel-provider依赖失败，请检查是否拥有该父辈组件");
  return result;
};
