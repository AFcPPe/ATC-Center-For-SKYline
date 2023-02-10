<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray">
        <router-link to="/">管制员中心</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: gray">
        <router-link to="/usercenter">个人中心</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">个人数据</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px',lineHeight: '0.8rem' }" v-if="logon">
      <h1 style="font-size: 24px">{{ loginData['Username'] }} 的个人数据</h1>
      <br>
      <div>可以在右侧导航栏中选择查看对应的内容哦~</div>
      <a-divider></a-divider>
      <a-tabs>
        <a-tab-pane key="1" tab="个人数据">
          <a-card>
            <template #title>
              <div style="font-weight: bold;color: darkred">个人数据</div>
            </template>
            <a-row justify="center">
              <a-col :span="2"></a-col>
              <a-col :span="6">
                <a-statistic title="姓名" :value="loginData['Username']" groupSeparator=""/>
              </a-col>
              <a-col :span="2"></a-col>
              <a-col :span="6">
                <a-statistic title="ID" :value="loginData['Username']" groupSeparator=""/>
              </a-col>
              <a-col :span="2"></a-col>
            </a-row>
            <br>
            <a-row justify="center">
              <a-col :span="2"></a-col>
              <a-col :span="6">
                <a-statistic title="邮箱" :value="loginData['Email']" groupSeparator=""/>
              </a-col>
              <a-col :span="2"></a-col>
              <a-col :span="6">
                <a-statistic title="等级" :value="rating[loginData['Level']]" groupSeparator=""/>
              </a-col>
              <a-col :span="2"></a-col>
            </a-row>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2">Content of Tab 2</a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">Content of Tab 3</a-tab-pane>
      </a-tabs>
    </div>
  </a-layout-content>

</template>

<script>
import checkLogin from "@/utils/CheckLogin";
import router from "@/utils/router";
import APIS from "@/utils/axios"

export default {
  name: "PersonalData",
  setup() {

    let loginData = checkLogin.check()
    let logon = false
    if (loginData !== undefined) {
      logon = true
    } else {
      localStorage.setItem('loginFirst', '0')
      router.push('/login')
    }
    APIS.LocalApi({url:'UserGroup',method:'get',params:{'cid':loginData['Username']}})
        .then((res)=>{
        console.log(res)
    })
    const rating = ['已封禁', 'OBS', 'S1', 'S2', 'S3', 'C1', 'C2', 'C3', 'I1', 'I2', 'I3', 'SUP', 'ADM']
    return {
      loginData,
      logon,
      rating
    }
  }
}
</script>

<style scoped>

</style>