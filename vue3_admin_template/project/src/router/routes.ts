// 对外暴露配置的路由
export const constantRoute = [
  {
    //登录
    path: '/login',
    component: ()=> import('@/views/login/index.vue'), // 懒加载
    name: 'login' // 命名路由（做权限的时候用到）
  },
  {
    // 登陆成功展示数据的路由
    path: '/',
    component: ()=> import('@/layout/index.vue'),
    name: 'layout'
  },
  {
    //404
    path: '/404',
    component: ()=> import('@/views/404/index.vue'),
    name: '404'
  },
  {
    // 任意路由：没有匹配上 上文中的任意一个
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any'
  }
]