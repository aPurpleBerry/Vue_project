<template>
  <!-- 官网https://element-plus.gitee.io/zh-CN/component/layout.html -->
  <div class="login_container">   
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <el-form-item>
            <h1>Hello</h1>
          </el-form-item>
          <el-form-item>
            <h2>欢迎来到硅谷甄选</h2>
          </el-form-item>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive,ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus' 
import { getTime } from '@/utils/time' //获取当前时间

//定义变量控制按钮加载效果
let loading = ref(false)
// 获取form表单
let loginForms = ref()
// 获取路由器
const $router = useRouter()
const $route = useRoute()

let loginForm = reactive({username:'admin',password:'111111'})

// *************************登录按钮*****************************
// 登录逻辑在仓库中施行
let userStore = useUserStore()
const login = async () => {
  //保证全部表单项校验通过再发请求
  await loginForms.value.validate()

  loading.value = true //开始加载效果

  // 页面要根据axios返回的数据弹出提示框，但因为业务逻辑在仓库中实现，组件无法知道
  // 解决方法：userLogin函数用async修饰，会返回一个promise对象
  try {
    // 保证登陆成功
    await userStore.userLogin(loginForm)
    // 这里抓的是登陆失败的错误，不是网络错误
    // 判断登陆的时候，路径当中是否有query参数
    let redirect:any = $route.query.redirect
    $router.push({
      path: redirect || '/'
    })
    // 登录成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: 'HI,'+ getTime() + '好'
    })
    // 登陆成功加载停止
    loading.value = true
  } catch (error) {
    // 登陆失败账号加载停止
    loading.value = false
    // 登陆失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}

/**********************表单校验*************************** */
//自定义校验规则
function validatorUserName(rule: any, value: any, callback: any) {
  // rule: 校验规则对象
  // value：表单元素文本内容
  // callback：回调函数，如果符合条件就通过callback放行。如果不符合条件，callback注入错误信息
  if(value.length >= 3){
    callback();
  } else {
    callback(new Error('账号长度至少3位'))
  }
}
const rules ={
  username:[
    //required表示这个字段必须校验
    // { required: true, message: '用户名不能为空', trigger: 'blur' },
    // { required: true, min: 3, max: 5, message: '账号长度至少3位', trigger: 'change' }
    { required: true, trigger: 'change', validator: validatorUserName }
  ],
  password:[
    { required: true, min: 3, max: 10, message: '密码长度至少3位', trigger: 'change' }
  ]
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  // background-color: red;
  background: url("@/assets/images/background.jpg"); // 不是background-image
  background-size: cover; // 图片保持比例放大或缩小使X轴Y轴都铺满整个容器，但图片超出容器部分会被剪裁掉，图片不变形。
  
  .login_form{
    width: 80%;
    // background-color: red;
    
    position: relative;//配合top、bottom、left、right这4个偏移量来实现相对它所属父元素的相对定位
    top: 30vh;
    background: url('@/assets/images/login_form.png');
    background-size: cover;
    padding: 40px;
    h1{
      font-size: 40px;
      color:white;
    }
    h2{
      font-size: 20px;
      color:white;
      margin: 20px 0px; // 顺时针排序：上，右，下，左。（上下 左右）
    }
  }
}
</style>