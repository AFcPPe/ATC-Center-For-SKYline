<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">活动详情</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <h1 style="font-size: 1.2rem">{{data.list['title']}}</h1>
      <a-Divider /> <!--分割线-->
      <a-row justify="space-between">
        <a-col :span="8">
          <h5 style="font-size: 0.8rem">开始时间</h5>
          <p style="font-size: 1.5rem">{{data.list['duration']}}</p>
          <h5 style="font-size: 0.8rem">发布人</h5>
          <p style="font-size: 1.5rem">SKYline官方</p>
          <h5 style="font-size: 0.8rem;font-weight: normal">活动航路</h5>
          <p style="font-size: 1.5rem">{{data.list['route']}}</p>
        </a-col>
        <a-col>
          <img :src="('https://api.skylineflyleague.cn/upload/activity/cover_'+eventID+'.jpg').replace('https://api.skylineflyleague.cn/','http://117.78.10.8:61846/')" style="width: 500px;height: 300px">
        </a-col>
      </a-row>
      <br>
      <!--eslint-disable-next-line-->
      <div  v-for='each in ATC.list'>
        <div>{{each}}</div>
      </div>
      <ATable :columns=colFirst>


      </ATable>
    </div>
  </a-layout-content>
</template>

<script>
import router from "@/utils/router";
import APIs from "@/utils/axios";
import {reactive} from "vue";
export default {
  name: "Activity-Detail",
  setup(){
    const colFirst = [{
      title: '席位类别',
      dataIndex: 'seat',
      key: 'seat',
    }]
    const eventID = router.currentRoute.value.params.id
    let data = reactive({
      list:[]
    })
    let ATC = reactive({
      list:[]
    })
    APIs.API({url:'atc_center_api/Controller/GetEventInfo.php',method:'get',params:{id:router.currentRoute.value.params.id}})
        .then((res)=>{
          data.list=res.data.data
        })
    APIs.API({url:'Center/EventATC/'+router.currentRoute.value.params.id,method:'get'})
        .then((res)=>{
          ATC.list=res.data.data
        })
    return {
      data,
      colFirst,
      ATC,
      eventID
    }
  }
}
</script>

<style scoped>

</style>