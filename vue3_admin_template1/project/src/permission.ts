// 路由鉴权
import router from '@/router'
import setting from './setting'
//进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({showSpinner: false})

//在组件的外部想直接引入小仓库是不可以的，必须先引入大仓库
import useUserStore from './store/modules/user'
import pinia from './store'
let userStore = useUserStore(pinia)
console.log(userStore);


// 全局守卫：项目中任意路由切换都会触发的钩子

// 全局前置守卫
router.beforeEach(async(to, _, next) => {
  document.title = `${setting.title}-${to.meta.title}`
  // 访问某一个路由之前会触发的钩子
  // to：你将要访问的路由对象
  // from：你从哪个路由对象来
  // next：路由的放行函数
  nprogress.start()

  //获取token 判断用户是否登录
  let token = userStore.token
  // 获取用户名字
  let username = userStore.username

  if(token) {
    // console.log('有token');
    
    //有 token 的时候 : 有登陆信息
    if(to.path === '/login') { // 还想去登录页面，不行
      next({ path:'/' })
    } else { // 去除了登陆页面之外的别的页面
      if(username) {
        next() //放行
      } else {
        // ..如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
        try {
          //场景是 刚登陆完，用户拿到后台给的token，但此时没有用户信息，就统一在路由首位中获取一下用户的信息。
          await userStore.userInfo()
          //加载完之后放行
          next({ ...to })

        } catch(error) {
          //token过期 获取不到用户信息
          // 用户手动修改了本地token
          userStore.userLogout()
          next({path: '/login',query:{redirect: to.path}})
        }
      }
    }
  } else {
    // console.log('没有 token');
    
    // 本地没有token的时候：没有登陆
    // 在没有登陆的时候访问 login 是可以的，访问别的路由是不行的，但我们会把你想去的路由记录下来
    if(to.path === '/login') {
      next()
    } else {
      next({path: '/login', query:{redirect: to.path}})
    }
  }

  // next() 
})

// 全局后置守卫
router.afterEach(() =>{
  // 访问某一个路由之后会触发的钩子
  // to：你将要访问的路由对象
  // from：你从哪个路由对象来
  nprogress.done()
})