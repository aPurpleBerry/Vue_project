// 创建用户相关的小仓库
import {defineStore} from 'pinia'
// 引入接口
import  {reqLogin,reqUserInfo} from '@/api/user/index.ts'
// 引入数据类型
import type {loginForm,loginResponseData} from '@/api/user/type.ts'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes.ts'

import type {UserState} from './types/type.ts'
//引入操作本地存储的数据
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'

let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: ():UserState=>{
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, // 仓库存储菜单
      username: '',
      avatar: ''
    }
  },
  //异步/逻辑
  actions: {
    /******************************************************** */
    //处理用户登录
    async userLogin(loginForm:loginForm) {
      // console.log(loginForm);
      let res:loginResponseData = await reqLogin(loginForm)
      console.log(res);

      if(res.code === 200) {
        this.token = (res.data.token)as string
        SET_TOKEN((res.data.token)as string)
        return 'ok' // 如果不设置返回值，undefined也是成功
        // 这行语句能保证当前async函数返回一个成功的promise对象
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
    /******************************************************** */
    //获取用户信息 （带着token访问服务器获取数据）
    async userInfo() {
      let res = await reqUserInfo()
      console.log(res);
      // 若获取用户信息成功 存储用户信息
      if(res.code === 200) {
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    /******************************************************** */
    //退出登录 
    userLogout() {
      //目前没有mock接口：退出登录接口
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    }
  },
  getters: {

  }
})

// 对外暴露获取小仓库的方法
export default useUserStore