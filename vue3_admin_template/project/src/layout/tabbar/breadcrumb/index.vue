<template>
  <el-icon style="margin-right: 10px;" @click="changIcon">
    <component :is="LayoutSettingStore.fold?'Fold':'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item> -->
    
    <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
    <!-- <button @click="handler">啊</button> -->
  </el-breadcrumb>
</template>

<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<script setup lang="ts">
import useLayoutSetting from '@/store/modules/setting'
let LayoutSettingStore = useLayoutSetting()

import { useRoute } from 'vue-router';
const $route = useRoute()

const changIcon = ()=>{
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}

const handler = ()=>{
  console.log($route.matched); //获取匹配到
}
</script>

<style scoped lang="scss">

</style>