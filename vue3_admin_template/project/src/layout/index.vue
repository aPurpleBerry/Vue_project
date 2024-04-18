<template>
  <div class="layout_container">   
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{fold:LayoutSettingStore.fold?true:false}">
      <Logo></Logo>
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
        <el-menu :collapse="LayoutSettingStore.fold" :default-active="$route.path"  background-color="#001529" text-color="white"  active-text-color="yellowgreen">  
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{fold:LayoutSettingStore.fold?true:false}">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{fold:LayoutSettingStore.fold?true:false}">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<script setup lang="ts">
 //import {ref, reactive} from 'vue'
 import Logo from './logo/index.vue'
 // 菜单组件
 import Menu from './menu/index.vue'
// 右侧内容展示区域
import Main from './main/index.vue'
//获取路由对象
import { useRoute } from 'vue-router';
// 引入顶部tabbar组件
import Tabbar from './tabbar/index.vue'
// 仓库
import useLayoutSetting from '@/store/modules/setting';
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()

//获取路由对象
let $route = useRoute();

//获取layout配置仓库
let LayoutSettingStore = useLayoutSetting();

</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  // background: red;

  .layout_slider{
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .scrollbar{
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      color: white;
      .el-menu {
        border-right: none;
      }
    }

    &.fold{
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar{
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    // background: cyan;
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold{
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main{
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: yellow;
    position: fixed; //老师这里写的是absolute
    top: $base-tabbar-height;
    left: $base-menu-width;
    overflow:auto;
    transition: all 0.3s;

    &.fold{
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>