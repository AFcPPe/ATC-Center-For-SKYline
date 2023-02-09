<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      欢迎来到首页
    </div>
  </a-layout-content>
</template>

<script>

import {message} from "ant-design-vue";

export default {
  name: "ATC-index",
  setup(){

    let flag = localStorage.getItem('banFlag')
    if(flag !==undefined ){
      if(flag=='1'){
        message.success('登录成功！')
        localStorage.removeItem('banFlag')
      }
    }
  }

}
</script>

<style scoped>

</style>