//用户登录接口
export interface loginFormData {
  username: string,
  password: string
}

// 定义全部接口返回数据 都拥有的ts类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

//登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string 
}

// 获取用户信息返回数据的类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[],
    buttons: string[],
    roles: string[],
    name: string,
    avatar: string
  }
}

// 退出登录返回类型


/*
【-----------下面是mock假数据时定义的------------】
 
// 登录接口需要携带的参数的TS类型
export interface loginForm {
  username: string,
  password: string
}
//----------------------------------------------------


interface dataTYpe{
  token?: string
  message?: string,
}

// 登录接口返回的数据类型
export interface loginResponseData{
  code: number,
  data: dataTYpe
}
//----------------------------------------------------
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
*/