<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select :disabled="scene==0?false:true" v-model="categoryStore.c1Id" style="width: 200px" @change="handler">
          <el-option  v-for="(item) in categoryStore.c1Arr" 
                      :key="item.id" 
                      :label="item.name"
                      :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select :disabled="scene==0?false:true" v-model="categoryStore.c2Id" style="width: 200px"  @change="handler2">
          <el-option  v-for="(item) in categoryStore.c2Arr" 
                      :key="item.id" 
                      :label="item.name"
                      :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="scene==0?false:true" v-model="categoryStore.c3Id" style="width: 200px">
          <el-option  v-for="(item) in categoryStore.c3Arr" 
                      :key="item.id" 
                      :label="item.name"
                      :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
  export default { name:'Category' }
</script>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'

let categoryStore = useCategoryStore()

// 通知仓库获取一级分类
const getC1 = () => {
  categoryStore.getC1()
}

onMounted(()=>{
  getC1()
})

// change 已有一级分类，获取二级分类
const handler = () => {
  // 要将二级三级菜单清空
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  // 为什么这里不请空二级呢，因为一级选择触发二级
  categoryStore.getC2()
}

// change 已有2级分类，获取3级分类
const handler2 = () => {
  // 清理三级分类的数据
  categoryStore.c3Id = ''
  categoryStore.getC3()
}

// 接收父组件传来的scene
defineProps(['scene'])

// import { ref, reactive, onMounted } from 'vue'
// import { reqC1, reqC2, reqC3 } from '@/api/product/attr'

// // 存储一级分类的数组
// let c1Arr:any = ref([])
// //收集一级菜单的数据
// let c1Id = <number | string>('')

// const getC1 = async ()=>{
//   let res = await reqC1()
//   console.log(res);
  
//   if(res.code === 200) {
//     c1Arr.value = res.data
//   }
// }

// onMounted(() => {
//   getC1()
// })
</script>

<style scoped lang="scss">

</style>