<template>
  <div class="logo" v-if="setting.logoHidden">   
    <img :src="setting.logo" alt="">
    <p>{{ setting.title }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Logo'
}
</script>

<script setup lang="ts">
//引入设置标题与LOGO的配置文件
import setting from '@/setting';
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 30px;
    height: 30px;
  }
  p{
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
    font-weight: bold;
  }
}
</style>