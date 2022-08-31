import { createRouter, createWebHistory } from 'vue-router';
import { useAppStore } from '@/store/modules/app';
import { isLogin } from '@/utils/storage';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { constantRoutes } from '@/router/constant';

/**
 * 使用vite插件自动生成路由，views目录下的文件夹名称作为路由的name
 * constant 是否固定路由, 固定路由不会自动生成
 * layout 是否使用布局
 */
const layoutRoutes = setupLayouts(generatedRoutes.filter(route => !route.meta?.constant && route.meta?.layout !== false));
const commonRoutes = generatedRoutes.filter(route => !route.meta?.constant && route.meta?.layout === false);
const routes = [...layoutRoutes, ...commonRoutes, ...constantRoutes];

const router = createRouter({
  history: createWebHistory(), //createWebHashHistory() //history模式
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 前进返回按钮
      return savedPosition;
    } else {
      // 其他路由
      // return {x: 0, y: 0};
      return { top: 0 };
    }
  }
});

const canUserAccess = (to: any) => {
  // console.log(to.meta.auth, store.getters.token)
  if (to?.meta?.requireAuth) {
    return Promise.resolve(isLogin()); //此处使用promise，因为可能查询权限需要调用接口
  }
  return Promise.resolve(true);
};

// 全局路由守卫
router.beforeEach(async to => {
  NProgress.start();
  // 中断正在进行的请求
  useAppStore().abortRequest();
  const canAccess = await canUserAccess(to);
  if (!canAccess) {
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath }
    };
  }
  if (to.meta && to.meta.title) {
    window.document.title = <string>to.meta.title;
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
