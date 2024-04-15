<template>
  <h1>测试代码</h1>
</template>

<script setup lang="ts">
import axios from 'axios'
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111'
  }
})
</script>

<style scoped lang="scss">

</style>