<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray">
        <router-link to="/">管制员中心</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <div class="ant-row ant-row-space-between ant-row-middle" type="flex"
           style="height: 100%; text-align: center; row-gap: 0px;">
        <div class="ant-space ant-space-vertical" style="width: 100%; gap: 8px;">
          <br>
          <br>
          <br>
          <br>
          <div class="ant-space-item" style=""><img src="/img/indexLogo.svg" style="max-width: 30%;"></div>
          <!---->
          <br>
          <br>
          <div class="ant-space-item" style=""><h1 style="font-size: 2rem;">欢迎来到 SKYline 管制员中心</h1></div><!---->
          <div class="ant-space-item" style="">
          </div><!---->
          <div class="ant-space-item">
            <div style="font-size: 1rem; margin-top: 2rem;"> 欢迎回来。请在页面左侧进入你需要的功能。
            </div>
          </div><!----></div>
      </div>
    </div>
  </a-layout-content>
</template>

<script>

import {message} from "ant-design-vue";

export default {
  name: "ATC-index",
  setup() {

    let flag = localStorage.getItem('banFlag')
    if (flag !== undefined) {
      if (flag == '1') {
        message.success('登录成功！')
        localStorage.removeItem('banFlag')
      }
    }
  }

}
</script>

<style scoped>

</style>