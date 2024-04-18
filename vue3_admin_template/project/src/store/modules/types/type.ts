//定义小仓库的类型
import type { RouteRecordRaw } from "vue-router";
export interface UserState {
  token: string|null;
  menuRoutes: RouteRecordRaw[],
  username: string,
  avatar: string
}