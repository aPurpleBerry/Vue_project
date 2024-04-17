<template>
  <!-- 本来单纯写这个就可以：<router-view></router-view> 但加了过渡动画 -->
  <router-view v-slot="{Component}">
    <transition name="fade">
      <!-- 渲染layout的子路由 -->
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'Main'
}
</script>

<script setup lang="ts">
 //import {ref, reactive} from 'vue'
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