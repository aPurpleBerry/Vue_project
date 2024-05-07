<template>
  <div class="trade_box">
    <el-card style="max-width: 1300px">
      <!-- 添加品牌按钮 -->
      <el-button  v-has="`btn.Trademark.add`"
        type="primary" size="default" icon="Plus" @click="addTradeMark"
        style="margin-bottom: 10px;">添加品牌
      </el-button>
      <!-- 表格组件 -->
      <!-- 
        table属性
        --border 设置表格纵向是否有边框
        table-column
        --label 某一个列表
        --width 列宽
        --align 文字对齐方式
       -->
      <el-table border style="margin: 10px, 0px;" :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <!-- 
          table-column 默认展示数据用div
          <el-table-column label="品牌名称" props="tmName"></el-table-column>
          也可以使用插槽
          <el-table-column label="品牌名称">
            <template #="{row, $index}">  row是每一行的数据对象
              <h1>{{ row.tmName }}</h1>
            </template>
          </el-table-column>
         -->
        <el-table-column label="品牌名称">
          <template #="{row, $index}">  
            <h1>{{ row.tmName }}</h1>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{row, $index}">  
            <img :src="row.logoUrl" alt="没有图片" style="width: 80px; ">
          </template>
        </el-table-column>
        <el-table-column  label="品牌">
          <template #="{row, $index}">
            <el-button type="primary" size="small" icon="Edit" @click="updateTradeMark(row)"></el-button>
            <!-- <el-button type="primary" size="small" icon="Delete"></el-button> -->
            <!-- 气泡确认框 -->
            <el-popconfirm title="您确定要删除这个品牌吗?" width="250px" @confirm="removeTrademark(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <!-- 
        v-model实现父子组件传递
        v-model:current-page="currentPage4" 设置分页器当前页码
        v-model:page-size="pageSize" 每一页展示多少数据
        page-sizes 下拉菜单数据
        :small="small" 是否使用小型分页器
        :background="background" 分页器按钮的背景颜色
        layout 设置分页器六个子组件布局调整 [->]把右边的顶到右边
       -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :disabled="false"
        :background="true"
        layout="prev, pager, next, jumper, ->,  sizes, total"
        :total="total"
        @current-change="changePageNo"
        @size-change="sizeChange"
      />
    </el-card>

    <!-- 对话框 -->
    <!-- 
      v-model数组：用于控制对话框的显示和隐藏 true显示 false隐藏
      title：设置对话框左上角标题
     -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id?'修改品牌':'新增品牌'" width="500">
      <el-form  :model="trademarkParams" :rules="rules" style="width: 80%; padding-left: 20px;"  ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 
            上传图片
            upload组件属性: action
           -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽 footer 插入按钮 -->
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
  
</template>

<script lang="ts">
  export default { name:'Trademark' }
</script>

<script setup lang="ts">
import {ref, onMounted, reactive, nextTick} from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
import type {TradeMarkResponseData, TradeMark, Records} from '@/api/product/trademark/type.ts'
import { ElMessage, type UploadProps } from 'element-plus'
//按钮权限的实现
// import useUserStore from '@/store/modules/user';
// let userStore = useUserStore()

let formRef = ref()

 /**************分页器****************** */
 //分页器当前页码
 let currentPage = ref<number>(1)
 //每一页展示多少数据
 let pageSize = ref<number>(3)

/******************获取已有品牌的接口封装为一个函数************* */

// 存储已有品牌的数据总数
let total = ref<number>(0)
// 存储已有品牌的数组
let trademarkArr = ref<Records>([])

// 请求的时机为 刚进入页面、每一次点击页数
const getHasTrademark = async ()=> {
  // 这里的变量写的与老师不一样
  let res:TradeMarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value)
  console.log(res);
  
  if(res.code === 200) {
    // 存储已有品牌的总个数
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}
//组件挂载完毕的钩子 发送请求
onMounted(()=>{
  getHasTrademark()
}) 

// 分页器当前页码发生变化 再次请求
// 自定义事件current-change有回传的数据 （当前的页码）
const changePageNo = ()=> {
  getHasTrademark()
}

// 下拉菜单触发的时候也要 发送请求
// @size-change="sizeChange"
// size-change自定义事件 注入了 分页器下拉菜单
const sizeChange = ()=>{
  // 下拉菜单发生改变的时候，页面应该归一 
  currentPage.value = 1
  /* 这个逻辑也可以写在 getHasTrademark 的默认参数里面
    但是前提改成这样 @current-change="getHasTrademark"
    因为自定义current-change事件发生变化的时候，会默认注入页码给getHasTrademark作为参数
  */
  getHasTrademark() 
}

/********************D对话框*****************************/
let dialogFormVisible = ref<boolean>(false) // 对话框是否可见
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})

//添加品牌按钮
const addTradeMark = ()=>{
  // formRef.value?.clearValidate('tmName')
  nextTick(()=>{
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  trademarkParams.id = undefined
  dialogFormVisible.value = true
}

//上传图片之前
const beforeAvatarUpload:UploadProps['beforeUpload'] = (rawFile) => {
  // 在图片上传之前触发 上传文件之前可以约束文件类型
  // 要求上传文件格式 png/jpg/gif
  if(rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif' ) {
    if(rawFile.size/1024/1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小应小于4M'
      })
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必是 png | jpg | gif'
    })
  }
}

// 文件上传时的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = ( response, uploadFile) => {
  // response 这次上传图片post服务器返回的数据 
  trademarkParams.logoUrl = response.data
  // console.log(trademarkParams);
  //图片上传成功
  formRef.value.clearValidate('logoUrl')
}

//对话框取消
const cancel = () =>{
  dialogFormVisible.value = false
  
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
}
//对话框提交
const confirm = async () => {
  // 发请求之前对整个表单进行校验
  await formRef.value.validate()

  console.log(trademarkParams);
  
  let res = await reqAddOrUpdateTrademark(trademarkParams)
  if(res.code === 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id?'修改品牌成功':'新增品牌成功'
    })
    if(!trademarkParams.id) getHasTrademark()
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id?'修改品牌失败':'新增品牌失败'
    })
    dialogFormVisible.value = false
  }
}
/*************************修改品牌按钮************************ */
// 更新品牌按钮
const updateTradeMark = (row:TradeMark)=>{
  nextTick(()=>{
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  console.log(row);
  Object.assign(trademarkParams, row)
  // trademarkParams.id = row.id
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
  dialogFormVisible.value = true
} 

/*******************表单校验规则************************ */
const validatorTmName = (rule:any, value:any, callback: any) => {
  if(value.trim().length >= 2) {
    callback()
  } else {
    // 校验没有通过
    callback(new Error('品牌名称位数必须大于等于两位'))
  }
}

const validatorlogoUrl = (rule:any, value:any, callback: any) => {
  if(value) {
    // value是图片地址
    callback()
  } else {
    callback(new Error('LOGO图片务必上传'))
  }
}

const rules = {
  tmName: [
    // 输入焦点
    { required: true, trigger: 'blur', validator:  validatorTmName}
  ],
  logoUrl: [
    { required: true, trigger: 'blur', validator:  validatorlogoUrl}  
  ]
}
/*******************删除品牌********************/
const removeTrademark = async (id: number) => {
  console.log('删除功能');
  
  let res = await reqDeleteTrademark(id)
  if(res.code === 200) {
    ElMessage({
      type:'success',
      message:'删除品牌成功'
    })
    getHasTrademark()
  } else{
    ElMessage({
      type:'error',
      message:'删除品牌失败'
    })
  }
}
</script>

<style scoped lang="scss">
.trade_box {
  padding-top: 30px;
  padding-left: 40px;
  width: 100%;
  // background-color: red;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>