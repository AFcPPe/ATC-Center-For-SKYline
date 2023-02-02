<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">活动</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px',lineHeight: '0.8rem' }">
      <h1 style="font-size: 1.5rem">活动</h1>
      <br>
      <h5 style="font-size: 0.9rem">让窦主任看看你有没有报活动</h5>

      <a-row justify="space-between">
        <a-col :span="4"><a-button><ReloadOutlined /> 刷新</a-button></a-col>
        <a-col :span="4"></a-col>
        <a-col :span="4"></a-col>
        <a-col :span="4"></a-col>
        <RangePicker />
      </a-row>
      <br>
      <br>
      <a-Card>
        <!--eslint-disable-next-line-->
        <a-card hoverable style="width: 300px;float:left;margin: 2rem" v-for="each in EventList.list">
          <template #cover>
            <img alt="example" src="/img/ANNI.jpg" />
          </template>
          <a-card-meta>
            <template #title>{{each['T']}}</template>
            <template #description>{{each['Duration']}}</template>
          </a-card-meta>
        </a-card>

        <div id = 'EventCards'></div>
      </a-Card>
    </div>
  </a-layout-content>
</template>



<script>
import {
  ReloadOutlined,
} from "@ant-design/icons-vue"
import {
  RangePicker
} from 'ant-design-vue'
import API from "@/utils/axios";
import {reactive} from "vue";
export default {
  name: "ATC-Activity",
  components:{
    ReloadOutlined,
    RangePicker,
  },
  setup(){
    let EventList = reactive({
      list:[]
    });
    API({url:'/Center/EventList',method:'get'})
        .then((res)=>{
          EventList.list = res.data.data

        })
    return {
      EventList,
    }


  }

}

</script>

<style scoped>

</style>