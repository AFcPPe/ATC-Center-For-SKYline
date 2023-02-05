<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">工作台</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px', lineHeight:'2rem'}">
      <h1 style="font-size: 1.6rem">你好，{{loginData['Username']}}，看看你还有什么b事没干！</h1>
      <h5 style="font-size: 0.9rem">你今天上管了吗？太久不上线是要回炉的哦！</h5>
      <a-card>
        <template #title><div style="font-weight: bold;font-size: 1.1rem;color: darkred">即将进行的活动</div></template>
        <template #extra><router-link to="/Activity">更多</router-link></template>

        <!--eslint-disable-next-line-->
        <div  v-for="each in EventList.list.slice(0, 4)">

          <a-card hoverable style="width: 300px;float:left;margin: 2rem"  v-if="each['title']!=''" @click="jumpToDetail(each)">
            <template #cover>
              <img :src="each['image'].replace('https://api.skylineflyleague.cn/','http://117.78.10.8:61846/')" style="height: 200px;width: 300px">
            </template>
            <a-card-meta>
              <template #title>{{each['title']}}</template>
              <template #description>{{each['duration']}}</template>
            </a-card-meta>
          </a-card>
        </div>

      </a-card>
      <br>
      <a-card>
        <template #title><div style="font-weight: bold;font-size: 1.1rem;color: darkred">最近的训练</div></template>
        <template #extra><router-link to="/Train">更多</router-link></template>
        <div id="RecentTrain">无</div>

      </a-card>
    </div>

  </a-layout-content>
</template>

<script>
import {reactive} from "vue";
import APIs from "@/utils/axios";
import router from "@/utils/router";
import checkLogin from "@/utils/CheckLogin";

export default {
  name: "ATC-Dashboard",
  setup(){
    let loginData = checkLogin.check()
    if(loginData!==undefined){
      console.log(0)
    }else {
      router.push({path: '/',})
    }
    let EventList = reactive({
      list:[]
    });
    APIs.API({url:'atc_center_api/Controller/GetEventList.php',method:'get'})
        .then((res)=>{

          EventList.list = res.data.data
        })
    const jumpToDetail = function(data){
      router.push({name:'detailedEvent',params:{id:data['id']}})
    }
    return{
      EventList,
      jumpToDetail,
      loginData
    }
  }
}
</script>

<style scoped>

</style>