<template>
  <div class="tabbar_right">
    <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
    <el-button size="small" icon="FullScreen" circle  @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
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
</script>

<style scoped lang="scss">
  .tabbar_right {
    display: flex;
    // background-color: red;
    align-items: center;
    padding-right: 10px;
  }
</style>