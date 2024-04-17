<template>
  <div class="tabbar">   
    <!-- 顶部左侧 -->
    <div class="tabbar_left">
      <BreadCrumb></BreadCrumb>
    </div>
    <!-- 顶部右侧 -->
    <Setting></Setting>
  </div>
</template>

<script setup lang="ts">
//左侧面包屑
import BreadCrumb from './breadcrumb/index.vue'

//右侧功能区
import Setting from './setting/index.vue'
</script>

<script lang="ts">
export default {
  name: 'Tabbar'
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  // background-image: linear-gradient(to right, white, black, white);

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

}
</style>