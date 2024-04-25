//定义小仓库的类型
import type { RouteRecordRaw } from "vue-router";
import type { CategoryObj } from '@/api/product/attr/type'

export interface UserState {
  token: string|null;
  menuRoutes: RouteRecordRaw[],
  username: string,
  avatar: string
}

// 分类仓库state对象的TS类型
export interface CategoryState {
  c1Id: string | number,
  c1Arr: CategoryObj[],
  c2Id: string | number,
  c2Arr: CategoryObj[],
  c3Id: string | number,
  c3Arr: CategoryObj[],
}