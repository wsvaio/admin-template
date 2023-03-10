<script lang="ts" setup>
import elCn from "element-plus/dist/locale/zh-cn.mjs";
import elEn from "element-plus/dist/locale/en.mjs";

const { locale: i18nLocale } = $(useI18n());
</script>

<template>
  <el-config-provider :locale="i18nLocale == '简体中文' ? elCn : elEn">
    <vmodel-provider><router-view /></vmodel-provider>
  </el-config-provider>
</template>
