// 创建用户相关的小仓库
import {defineStore} from 'pinia'
// 引入接口
import  {reqLogin,reqUserInfo,reqLogout } from '@/api/user/index.ts'
// 引入数据类型
import type {loginFormData,loginResponseData,userInfoResponseData} from '@/api/user/type.ts'

// 引入路由（常量路由)
import { constantRoute,asyncRoute,anyRoute } from '@/router/routes.ts'

import type {UserState} from './types/type.ts'
//引入操作本地存储的数据
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'

import router from '@/router'

//引入深拷贝方法
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep';

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute (asyncRoute:any, routes:any) {
  return asyncRoute.filter((item:any) => {
    if(routes.includes(item.name)) {
      if(item.children && item.children.length>0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: ():UserState=>{
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, // 仓库存储菜单
      username: '',
      avatar: '',
      //存储当前用户是否包含某一个按钮
      buttons: []
    }
  },
  //异步/逻辑
  actions: {
    /******************************************************** */
    //处理用户登录
    async userLogin(loginForm:loginFormData) {
      // console.log(loginForm);
      let res:loginResponseData = await reqLogin(loginForm)
      // console.log('这里是store');   
      // console.log(res);

      if(res.code === 200) {
        this.token = (res.data)as string
        SET_TOKEN((res.data)as string)
        console.log('-登陆成功')
        return 'ok' // 如果不设置返回值，undefined也是成功
        // 这行语句能保证当前async函数返回一个成功的promise对象
      } else {
        return Promise.reject(new Error(res.data))
      }
    },
    /******************************************************** */
    //获取用户信息 （带着token访问服务器获取数据）
    async userInfo() {
      let res:userInfoResponseData = await reqUserInfo()

      console.log('-----userInfo---');
      console.log(res);
      // 若获取用户信息成功 存储用户信息
      if(res.code === 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        this.buttons = res.data.buttons
        let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), res.data.routes)
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
        //目前路由器管理的只有常量路由：用户计算完毕的需要追加
        [...userAsyncRoute, anyRoute].forEach((route:any) => {
          router.addRoute(route)
        })

        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    /******************************************************** */
    //退出登录 
    async userLogout() {
      //退出登录请求
      let res:any = await reqLogout()
      console.log('+++userLogout+++');
      console.log(res);
      
      if(res.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        console.log(localStorage.getItem('TOKEN'));
        
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
  },
  getters: {

  }
})

// 对外暴露获取小仓库的方法
export default useUserStore