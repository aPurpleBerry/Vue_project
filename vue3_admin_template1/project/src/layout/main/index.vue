<template>
  <!-- 本来单纯写这个就可以：<router-view></router-view> 但加了过渡动画 -->
  <router-view v-slot="{Component}">
    <transition name="fade">
      <!-- 渲染layout的子路由 -->
      <component :is="Component" v-if="flag"/>
    </transition>
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'Main'
}
</script>

<script setup lang="ts">
import {watch,ref,nextTick} from 'vue'
import useLayoutSetting from '@/store/modules/setting'
let layoutSettingStore = useLayoutSetting()

let flag = ref(true)

watch(()=> layoutSettingStore.refsh, ()=>{
  // 点击刷新按钮 路由组件销毁
  flag.value = false
  nextTick(()=>{
    flag.value = true
  })
})
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all .3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>