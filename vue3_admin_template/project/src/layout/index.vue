<template>
  <div class="layout_container">   
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
        <el-menu background-color="#001529" text-color="white"> 
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据大屏</el-menu-item>
          <!-- 折叠菜单 -->
          <el-sub-menu index="3">
            <!-- 这个是具名插槽 -->
            <template #title>权限管理</template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar"></div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <p style="height:5000px">q</p>
    </div>
  </div>
</template>

<script setup lang="ts">
 //import {ref, reactive} from 'vue'
 import Logo from './logo/index.vue'
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: red;

  .layout_slider{
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;

    .scrollbar{
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      color: white;
    }
  }
  .layout_tabbar{
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: cyan;
    
    position: fixed;
    top: 0px;
    left: $base-menu-width;
  }
  .layout_main{
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: yellow;
    position: fixed; //老师这里写的是absolute
    top: $base-tabbar-height;
    left: $base-menu-width;
    overflow:auto
  }
}
</style>