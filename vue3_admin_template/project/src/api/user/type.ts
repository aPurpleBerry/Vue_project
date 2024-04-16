// 登录接口需要携带的参数的TS类型
export interface loginForm {
  username: string,
  password: string
}
/*************************************** */

interface dataTYpe{
  token?: string
  message?: string,
}

// 登录接口返回的数据类型
export interface loginResponseData{
  code: number,
  data: dataTYpe
}
/*************************************** */
interface userInfo {
  userId: number,
  avatar: string,
  username: string,
  password: string,
  desc: string,
  roles: string[],
  buttons: string[],
  routes: string[],
  token: string,
}

interface user {
  checkUser:userInfo
}

// 定义服务器返回用户信息相关的数据类型
export interface userResponseData {
  code: number,
  data: user
}