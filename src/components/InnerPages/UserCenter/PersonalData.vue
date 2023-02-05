<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">个人中心</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px',lineHeight: '0.8rem' }">
    </div>
  </a-layout-content>
</template>

<script>
export default {
  name: "PersonalData"
}
</script>

<style scoped>

</style>