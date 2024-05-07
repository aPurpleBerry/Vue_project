// 对外暴露配置的路由
export const constantRoute = [
  {
    //登录
    path: '/login',
    component: ()=> import('@/views/login/index.vue'), // 懒加载
    name: 'login', // 命名路由（做权限的时候用到）
    meta: { 
      title: '登录',
      hidden: true ,// 本路由不参与菜单遍历
      icon: 'Coin', //菜单文字左侧图标，支持element-plus全部图标
    }
  },
  {
    // 登陆成功展示数据的路由
    path: '/',
    component: ()=> import('@/layout/index.vue'),
    name: 'layout',
    meta: {  
      title: ''  ,
      hidden: false,
      icon: ''
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: ()=>import('@/views/home/index.vue'),
        meta: {  
          title: '首页',
          hidden: false ,
          icon: 'HomeFilled'
        }
      }
    ]
  },
  {
    // 数据大屏
    path: '/screen',
    component: ()=> import('@/views/screen/index.vue'),
    name: 'screen',
    meta: {  
      title: '数据大屏',
      hidden: false,
      icon: 'Monitor'
    },
  },
  {
    //404
    path: '/404',
    component: ()=> import('@/views/404/index.vue'),
    name: '404',
    meta: {  
      title: '404',
      hidden: true,
      icon: 'Crop'
    },
  }
]

//异步路由
export const asyncRoute = [
  {
    //商品管理
    path: '/product',
    component: ()=>import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods' 
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: ()=>import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'Shop' 
        },
      },
      {
        path: '/product/addtr',
        component: ()=>import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'ChromeFilled' 
        },
      },
      {
        path: '/product/spu',
        component: ()=>import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Calendar' 
        },
      },
      {
        path: '/product/sku',
        component: ()=>import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Orange' 
        },
      }
    ]
  },
  {
    // 权限管理
    path: '/acl',
    component: ()=>import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock' 
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: ()=>import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User' 
        },
      },
      {
        path: '/acl/role',
        component: ()=>import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled' 
        },
      },
      {
        path: '/acl/permission',
        component: ()=>import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'List' 
        },
      }
    ]
  }
] 

//任意路由
export const anyRoute =  {
    // 任意路由：没有匹配上 上文中的任意一个
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {  
      title: 'any' ,
      hidden: true ,
      icon: 'Delete'
    },
  }