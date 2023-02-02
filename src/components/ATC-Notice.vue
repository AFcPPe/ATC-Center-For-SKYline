<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">公告</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <h1 style="font-size: 1.5rem">公告栏</h1>
      <a-card>
        <template #title>管制中心公告</template>
        <template #extra><a herf="">更多</a></template>
        <div id="ATCNotice">暂无公告</div>
      </a-card>
      <br>
<!--      <a-card>-->
<!--        <template #title>航行通告(NOTAM)</template>-->
<!--        <template #extra><a herf="">更多</a></template>-->
<!--        <div id="NOTAM">暂无航行通告</div>-->
<!--      </a-card>-->
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