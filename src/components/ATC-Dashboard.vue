<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">工作台</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px', lineHeight:'2rem'}">
      <h1 style="font-size: 1.6rem">你好，Dou Zhengyang，看看你还有什么b事没干！</h1>
      <h5 style="font-size: 0.9rem">你今天上管了吗？太久不上线是要回炉的哦！</h5>
      <a-card>
        <template #title><div style="font-weight: bold;font-size: 1.1rem;color: darkred">即将进行的活动</div></template>
        <template #extra><a href="#" style="font-size: 0.9rem">更多</a></template>
        <div id="ActivitiesComing">无</div>

      </a-card>
      <br>
      <a-card>
        <template #title><div style="font-weight: bold;font-size: 1.1rem;color: darkred">最近的训练</div></template>
        <template #extra><a href="#" style="font-size: 0.9rem">更多</a></template>
        <div id="RecentTrain">无</div>

      </a-card>
    </div>

  </a-layout-content>
</template>

<script>
export default {
  name: "ATC-Dashboard"
}
</script>

<style scoped>

</style>