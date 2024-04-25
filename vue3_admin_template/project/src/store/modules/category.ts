// 商品分类全局组件的仓库
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type' 

let useCategoryStore = defineStore('Category', {
  state: ():CategoryState => {
    return {
      // 一级分类的所有option
      c1Arr: [],
      // 用户选择一级分类的ID
      c1Id: '',
      //二级
      c2Arr: [],
      c2Id: '',
      // 三级
      c3Id: '',
      c3Arr: []
    }
  },
  actions: {
    async getC1() {
      let res:CategoryResponseData = await reqC1()
      // console.log(res);
      
      if(res.code === 200) {  this.c1Arr = res.data  }
    },
    async getC2() {
      let res: CategoryResponseData = await reqC2(this.c1Id)
      // console.log(res);   
      if(res.code === 200) {  this.c2Arr = res.data  }
    },
    async getC3() {
      let res: CategoryResponseData = await reqC3(this.c2Id)
      // console.log(res);   
      if(res.code === 200) {  this.c3Arr = res.data  }
    },
  },
  getters: {

  }
})

export default useCategoryStore