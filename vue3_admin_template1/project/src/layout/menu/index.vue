<template>
  <!-- <p>{{ menuList }}</p>    -->
  <!-- 根据路由动态生成菜单 -->
  <template v-for="(item) in menuList" :key="item.path">
    <!-- el-menu-item需要index标识，其中的插槽菜单名字 -->
    <template v-if="!item.children">
      <el-menu-item  :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
        <!-- 没有子路由 -->
        <el-icon class="icon-margin">
            <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    
    <template  v-if="item.children&&item.children.length==1">
      <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden"  @click="goRoute">
        <!-- 有子路由,但只有一个 -->
        <el-icon  class="icon-margin">
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-sub-menu v-if="item.children&&item.children.length>1"  :index="item.path">
      <!-- 有大于一个子路由 -->
      <template #title>
        <el-icon  class="icon-margin">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
//获取父组件传递来的全部路由数组
defineProps(['menuList'])
const $router = useRouter()

const goRoute = (vc:any) => {
  // console.log(vc) // element ui 设计 点击菜单的时候注入VC事件
  $router.push(vc.index)
}
</script>

<script lang="ts">
export default {
  name: 'Menu'
}
</script>

<style scoped lang="scss">
.icon-margin {
  margin-right: 10px;
}
</style>