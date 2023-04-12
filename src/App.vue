<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible style="min-width: 500px;" :collapsedWidth="0" :trigger="null">
      <div class="logo">
        <img src="./assets/logo.svg" style="padding-left: 5px;padding-right: 5px">
      </div>

      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :inlineIndent="50">
        <a-menu-item key="DashBoard" v-if="asData.logon">
          <DashboardOutlined style="color:#ffffff"/>
          <router-link to="/dashboard"> 工作台</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">工作台</a></span>-->
        </a-menu-item>
        <a-menu-item key="List">
          <DashboardOutlined style="color:#ffffff"/>
          <router-link to="/list"> 管制员列表</router-link>
          <!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">工作台</a></span>-->
        </a-menu-item>
        <a-menu-item key="Activity" v-if="asData.logon">
          <CustomerServiceOutlined style="color:#ffffff"/>
          <router-link to="/activity"> 活动</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">活动</a></span>-->
        </a-menu-item>
        <a-menu-item key="Notice" v-if="asData.logon">
          <NotificationOutlined style="color:#ffffff"/>
          <router-link to="/notice"> 公告</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">公告</a></span>-->
        </a-menu-item>
        <a-menu-item key="Train" v-if="asData.groups.find(ele=>ele=='11')&&asData.logon">
          <CarryOutOutlined style="color:#ffffff"/>
          <router-link to="/train"> 训练需求</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">训练需求</a></span>-->
        </a-menu-item>
        <a-menu-item key="Apply" v-if="asData.logon">
          <ProfileOutlined style="color:#ffffff"/>
          <router-link to="/apply"> 管制员申请</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">管制员申请</a></span>-->
        </a-menu-item>
        <a-menu-item key="Teacher" v-if="asData.groups.find(ele=>ele=='14'||ele=='15')&&asData.logon">
          <team-outlined style="color:#ffffff"/>
          <router-link to="/teacher"> 教员面板</router-link>
          <!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">管制员申请</a></span>-->
        </a-menu-item>
        <a-menu-item key="Admin"  v-if="asData.groups.find(ele=>ele=='13')&&asData.logon">
          <team-outlined style="color:#ffffff"/>
          <router-link to="/admin"> 管理面板</router-link>
          <!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">管制员申请</a></span>-->
        </a-menu-item>
        <a-menu-item key="Moodle">
          <BookOutlined style="color:#ffffff"/>
          <router-link to="/moodle"> Moodle</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">Moodle</a></span>-->
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row justify="space-between">
          <a-col :span="4">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" style="padding-left: 15px;fontSize: 20px"/>
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"  style="padding-left: 15px;fontSize: 20px"/>
          </a-col>
          <a-col :span="5"></a-col>
          <a-col :span="3">
            <a-avatar
                size="large"
                :style="{verticalAlign: 'middle' }"
                :src="'/atcapi/efb/data/user_main_data/avatar/'+asData.cid+'.jpg'"
                v-if="asData.logon">
            </a-avatar>
            <a-select
                ref="select"
                v-model:value="asData.displayName"
                style="width: auto;padding-left: 10px;"
                @focus="focus"
                @change="handleChange"
                v-if="asData.logon"
            >
              <a-select-option value="usercenter"><UserOutlined /> 个人中心</a-select-option>
              <a-select-option value="logout"><DisconnectOutlined /> 注销登录</a-select-option>

            </a-select>
            <a-button type="primary" :onclick="jumpToLogin" v-if="!asData.logon"><login-outlined />登录</a-button>
          </a-col>
        </a-row>
      </a-layout-header>
      <router-view style="overflow-x: auto;"></router-view>
      <a-layout-footer style="text-align: center">
        <div><a target="_blank" href="https://skylineflyleague.cn/">SKYline Flyleague</a>
          <div class="ant-divider ant-divider-vertical" role="separator"><!----></div>
          <a target="_blank" href="https://ant.design/">Ant Design</a></div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  BookOutlined,
  CarryOutOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  NotificationOutlined,
  ProfileOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  // UserOutlined,
  // DisconnectOutlined
} from '@ant-design/icons-vue';
import {defineComponent, reactive, ref} from 'vue';
import router from "@/utils/router";
import checkLogin from "@/utils/CheckLogin";
import APIs from "@/utils/axios"
import {message} from "ant-design-vue";
import AES from "@/utils/AES";
export default defineComponent({
  components: {
    DashboardOutlined,
    CustomerServiceOutlined,
    NotificationOutlined,
    ProfileOutlined,
    CarryOutOutlined,
    BookOutlined,
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    };
  },
  setup(){
    const asData = reactive({
      logon:false,
      displayName:'未登录',
      name:'',
      cid:'',
      email:'',
      groups:[]
    })
    checkLogin.check().then(res=>{
      if(res===undefined){
        asData.logon = false
        asData.displayName = '未登录'
        asData.cid = ''
      }else{
        asData.logon = true
        asData.cid = res['Username']

        APIs.LocalApi({url:'getUser',method:'post',data:AES.encryptReq({cid:asData.cid})}).then(r=>{
          const packetData = r.data
          if(packetData['code'] == 200){
            const userData = packetData.data[0]
            sessionStorage.setItem('ud',AES.encrypt(JSON.stringify(userData)))
            asData.displayName = userData.name
            asData.email = userData.email
            asData.name = userData.name
            asData.groups = userData.groups.split(',')
          }
        })
      }
    })
    const handleChange = function (value){
      asData.displayName = asData.name
      if(value=="usercenter"){
        router.push({path: '/usercenter',})
      }
      if(value=="logout"){
        localStorage.clear()
        sessionStorage.clear()
        location.reload()
      }
    }
    const jumpToLogin = function(){
      router.push('/login')
    }


    return{
      asData,
      handleChange,
      jumpToLogin
    }
  },

});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>