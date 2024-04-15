<template>
  <!-- k-v一致省去v -->
  <!-- <svg :style="{'width':width, 'height':height}"> -->
  <svg :style="{width, height}">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>   
</template>

<script setup lang="ts">
  // 父组件传递过来的参数
  defineProps({
    // xlink:href 属性值的前缀
    prefix: {
      type: String,
      default: '#icon-' //默认值
    },
    // 提供使用的图标名字
    name: String,
    // 接收父组件传递颜色
    color: {
      type: String,
      default: '' //默认值
    },
    // 接受父组件传递过来的图标宽度
    width: {
      type: String,
      default: '50px'
    },
    height: {
      type: String,
      default: '50px'
    }
  })
</script>

<style>

</style>
