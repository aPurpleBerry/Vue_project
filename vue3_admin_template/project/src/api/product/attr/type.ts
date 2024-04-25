// 下拉菜单分类相关的数据TS类型
// 共有的
export interface ResponseData {
  code: number,
  message: string,
  ok:  boolean
}

export interface CategoryObj {
  id: number | string,
  name: string, 
  category1Id?: number
  category2Id?: number
}

// 相应的分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData{
  data: CategoryObj[]
}

//【GET】 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
// 属性值对象
export interface AttrValue {
  id?: number,
  valueName: string,
  attrId?: number,
  flag?: boolean
}

export type AttrValueList = AttrValue[]

export interface Attr {
  id?: number,
  attrName: string,
  categoryId: number | string,
  categoryLevel: number,
  attrValueList: AttrValueList
}

export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
  data: Attr[]
}