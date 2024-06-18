<template>
  <div class="tabbar_right">
    <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
    <el-button size="small" icon="FullScreen" circle  @click="fullScreen"></el-button>
    <el-popover
      placement="bottom"
      title="主题设置"
      width="300"
      trigger="hover">
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            @change="setColor"
            size="small"
            v-model="color"
            show-alpha
            :teleported="false"
            :predefine="predefineColors">
          </el-color-picker>
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            @change="changeDark"
            v-model="dark"
            size="small"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny">
          </el-switch>
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button size="small" icon="Setting" circle></el-button>
      </template>
    </el-popover>
    <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%;">
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{userStore.username}}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<script setup lang="ts">

import {ref} from 'vue'
import useLayoutSetting from '@/store/modules/setting'
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';

let $router = useRouter()
let $route = useRoute()

let layoutSettingStore = useLayoutSetting()
//获取用户相关仓库
let userStore = useUserStore()

//刷新按钮的回调
const updateRefsh = ()=>{
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}

// 全屏按钮点击回调
const fullScreen = ()=>{
  // 这个DOM对象属性可以用来判断当前是不是全屏
  let full = document.fullscreenElement
  //切换为全屏
  if(!full) {
    //文档根节点的方法requestFullscreen实现全屏模式
    document.documentElement.requestFullscreen();
  } else{
    document.exitFullscreen()
  }
}

//退出登录
const logout = async () =>{
  await userStore.userLogout()
  $router.push({
    path: '/login',
    query: { redirect: $route.path }
  })
}

/*************颜色组件*********************/
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])

//收集开关的数据
let dark = ref<boolean>(false);

// change事件
const changeDark = () => {
  let html = document.documentElement
  dark.value?html.className='dark':html.className=''
}

//主题颜色的设置
const setColor = () => {
  //通过JS修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary',color.value)
}
</script>

<style scoped lang="scss">
  .tabbar_right {
    display: flex;
    // background-color: red;
    align-items: center;
    padding-right: 10px;
  }
</style>