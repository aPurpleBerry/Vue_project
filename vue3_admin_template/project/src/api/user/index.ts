// 统一管理咱们项目用户相关的接口
import myaxios from '@/utils/request'
// 引入TS类型
import type {loginForm,loginResponseData,userResponseData} from './type'

// 统一管理接口
// 这里是按照mock中的规范进行书写的
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info'
}
// 暴露请求函数
// (1)登录接口方法  
// 这里的data是用户数据，包括账号与密码
export const reqLogin = (data:loginForm) => 
  myaxios.post<any,loginResponseData>(API.LOGIN_URL, data)

// export const reqLogin = function(data) {
//   return myaxios.post(API.LOGIN_URL)
// }

//(2)获取用户信息接口方法
export const reqUserInfo = () => 
  myaxios.get<any,userResponseData>(API.USERINFO_URL)