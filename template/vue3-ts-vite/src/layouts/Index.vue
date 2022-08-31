<template>
  <div>
    <router-view v-slot="{ Component, route: currentRoute }">
      <transition name="main" mode="out-in" appear>
        <keep-alive :include="appStore.cacheViews">
          <component :is="Component" :key="currentRoute.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup name="Layout">
import { useAppStore } from '@/store/modules/app';
const appStore = useAppStore()
</script>

<style lang="less" scoped>

</style>
