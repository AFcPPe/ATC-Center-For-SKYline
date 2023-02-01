<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      欢迎来到公告
    </div>
  </a-layout-content>
</template>

<script>
export default {
  name: "ATC-Notice"
}
</script>

<style scoped>

</style>