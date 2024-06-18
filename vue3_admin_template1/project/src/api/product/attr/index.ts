//属性相关API文件
import request from "@/utils/request";
import type { CategoryResponseData, AttrResponseData, Attr } from './type'

enum API {
  //一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  //二级
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  // 分区分类下已有的属性&地址
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  //删除属性接口
  DELETEATTR_URL = '/admin/product/deleteAttr/'
}

export const reqC1 = () => {
  return request.get<any, CategoryResponseData>(API.C1_URL)
}


export const reqC2 = (category1ID: number|string) => {
  return request.get<any, CategoryResponseData>(API.C2_URL + category1ID)
}


export const reqC3 = (category2ID: number|string) => {
  return request.get<any, CategoryResponseData>(API.C3_URL + category2ID)
}


export const reqAttr = (category1ID:number|string,category2ID: number|string,category3ID: number|string) => 
{
  return request.get<any,AttrResponseData>(API.ATTR_URL + `${category1ID}/${category2ID}/${category3ID}`)
}

//新增或者修改已有的属性接口
export const reqAddOrUpdateAttr = (data:Attr)=>{
  return request.post<any, any>(API.ADDORUPDATEATTR_URL, data);
}

//删除属性接口
export const reqRemove = (attrId: number) => {
  return request.delete<any, any>(API.DELETEATTR_URL+attrId)
}