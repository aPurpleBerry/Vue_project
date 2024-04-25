<template>
  <div class="attr_box">
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"></Category>
    <el-card style="margin-top: 20px;">
      <div v-show="scene==0">
        <el-button @click="addAttr" type="primary" size="default" icon="Plus" style="margin-bottom: 10px;" :disabled="!categoryStore.c3Id">添加属性</el-button>
        <el-table border style="margin: 10px 0px;" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{row, $index}">
              <el-tag style="margin: 5px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{row, $index}">
              <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`你确定删除${row.attrName}?`" width="200px" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene==1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="addAttrValue" :disabled="attrParams.attrName?false:true" type="primary" size="default" icon="Plus">添加属性值</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
          <el-table-column width="80px" type="index" align="center" label="序号"></el-table-column>
          <el-table-column label="属性值名称">
            <!-- row是当前属性值对象 -->
            <template #="{row, $index}">
              <el-input :ref="(vc:any)=>inputArr[$index]=vc" v-if="row.flag" @blur="toLook(row, $index)" size="small"  placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
              <div @click="toEdit(row,$index)" v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{row, index}">
              <el-button type="primary" size="small" icon="Delete" @click="attrParams.attrValueList.splice(index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length>0?false:true">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  export default { name: 'Attr' }
</script>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';
import { watch, ref, onMounted, reactive, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, reqRemove } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';

let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])

//card组件内容切换变量
// scene=0. 显示table数据；scene=1，展示添加与修改属性结构
let scene = ref<number>(0)

//准备一个数组：将来存储对应的组件实例
let inputArr = ref<any>([])

//收集新增的属性数据
let attrParams = reactive<Attr>({
  attrName: "",
  attrValueList: [
  ],
  categoryId: '',
  categoryLevel: 3
})

onBeforeUnmount(()=>{ 
  //清空仓库数据
  categoryStore.$reset()
})

// onMounted(()=>{
//   scene.value = 0
//   attrArr.value = []
//   categoryStore.c1Id = categoryStore.c2Id = categoryStore.c3Id = ''
// })

// 监听仓库三级分类ID
watch(()=> categoryStore.c3Id, () => {
  attrArr.value = []
  // 三级分类得有才可以发送请求
  if(!categoryStore.c3Id) return
  getAttr()
})

const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let res:AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  console.log('hhhhhhhhhhhhhhhhh');
  
  console.log(res);
  
  if(res.code === 200) {
    attrArr.value = res.data
  }
}

//添加属性
const addAttr = () => {
  //每一次点击的时候先清空数据再收集
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3
  })
  scene.value = 1
}
//修改属性
const updateAttr = (row:Attr) => {
  scene.value = 1
  //已有的属性对象赋值给
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
//取消按钮
const cancel = () => {
  scene.value = 0
}

//添加属性值
const addAttrValue = ()=>{
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  })

  nextTick(()=>{
    inputArr.value[attrParams.attrValueList.length-1].focus()
  })
}

const save = async () => {
  let res:any = await reqAddOrUpdateAttr(attrParams)

  if(res.code === 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id?'修改成功':'添加成功'
    })
    //获取全部已有的属性
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id?'修改失败':'添加失败'
    })
  }
}

//*************查看模式和编辑模式的切换**********/
// //表单元素失去焦点
const toLook = (row: AttrValue, $index:number) => {
  // 非法情况判断
  if(row.valueName.trim()==''){
    //将属性值从数组中干掉
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
  }
  //非法情况2
  let repeat = attrParams.attrValueList.find((item)=>{
    if(item != row) {
      return item.valueName === row.valueName
    }
  })
  if(repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return
  }
  row.flag = false
}
const toEdit = (row: AttrValue, $index:number) => {
  row.flag = true
  nextTick(()=>{
    inputArr.value[$index].focus()
  })
}

const deleteAttr = async (attrId: number) => {
  let res = await reqRemove(attrId)
  if(res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
</script>

<style scoped lang="scss">
.attr_box {
  width: 100%;
  // background-color: red;
  padding: 20px;
}
</style>