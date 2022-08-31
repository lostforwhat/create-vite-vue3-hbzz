<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
const appStore = useAppStore();

const loading = computed(() => appStore.loading);
</script>

<template>
  <a-config-provider :locale="zhCN">
    <a-spin :spinning="loading" tip="加载中...">
      <router-view />
    </a-spin>
  </a-config-provider>
</template>

<style></style>
