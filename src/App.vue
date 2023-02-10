<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible style="min-width: 500px;" :collapsedWidth="0" :trigger="null">
      <div class="logo">
        <img src="./assets/logo.svg" style="padding-left: 5px;padding-right: 5px">
      </div>

      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :inlineIndent="50">
        <a-menu-item key="DashBoard">
          <DashboardOutlined style="color:#ffffff"/>
          <router-link to="/dashboard"> 工作台</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">工作台</a></span>-->
        </a-menu-item>
        <a-menu-item key="Activity" v-if="logon">
          <CustomerServiceOutlined style="color:#ffffff"/>
          <router-link to="/activity"> 活动</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">活动</a></span>-->
        </a-menu-item>
        <a-menu-item key="Notice" v-if="logon">
          <NotificationOutlined style="color:#ffffff"/>
          <router-link to="/notice"> 公告</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">公告</a></span>-->
        </a-menu-item>
        <a-menu-item key="Train" v-if="logon">
          <CarryOutOutlined style="color:#ffffff"/>
          <router-link to="/train"> 训练需求</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">训练需求</a></span>-->
        </a-menu-item>
        <a-menu-item key="Apply" v-if="logon">
          <ProfileOutlined style="color:#ffffff"/>
          <router-link to="/apply"> 管制员申请</router-link>
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
          <a-col :span="4"></a-col>
          <a-col :span="2"></a-col>
          <a-col :span="3">
            <a-button type="primary" @click="jumpToLogin()" v-if="!logon"><login-outlined />登录</a-button>
            <div >
              <a-avatar
                  size="large"
                  :style="{verticalAlign: 'middle' }"
                  :src="'/atcapi/efb/data/user_main_data/avatar/'+loginData['Username']+'.jpg'"
                  v-if="logon"
              >
              </a-avatar>

              <a-select
                  ref="select"
                  v-model:value="loginData['Username']"
                  style="width: auto;padding-left: 10px;"
                  @focus="focus"
                  @change="handleChange"
                  v-if="logon"
              >
                <a-select-option value="usercenter"><UserOutlined /> 个人中心</a-select-option>
                <a-select-option value="logout"><DisconnectOutlined /> 注销登录</a-select-option>

              </a-select>
            </div>
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
  MenuUnfoldOutlined
  // UserOutlined,
  // DisconnectOutlined
} from '@ant-design/icons-vue';
import {defineComponent, ref} from 'vue';
import router from "@/utils/router";
import checkLogin from "@/utils/CheckLogin";
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
    MenuUnfoldOutlined
    // UserOutlined,
    // DisconnectOutlined
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    };
  },
  setup(){
    let loginData = checkLogin.check()
    let logon = false
    if(loginData!==undefined){
      logon =true
    }
    const jumpToLogin = function(){
      router.push('/login')
    }
    const handleChange = function (value){
      if(value=="usercenter"){
        router.push({path: '/usercenter',})
      }
      if(value=="logout"){
        localStorage.clear()
        router.push('/login')
      }
    }
    return{
      jumpToLogin,
      logon,
      loginData,
      handleChange
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