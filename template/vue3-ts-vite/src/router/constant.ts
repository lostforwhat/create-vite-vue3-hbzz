// 固定路由（默认路由）
export const constantRoutes = [
  {
    path: '/:all(.*)*',
    name: 'error404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      title: '404'
    }
  }
];
