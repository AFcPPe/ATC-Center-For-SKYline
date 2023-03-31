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
        <a-menu-item key="List">
          <DashboardOutlined style="color:#ffffff"/>
          <router-link to="/list"> 管制员列表</router-link>
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
        <a-menu-item key="Train" v-if="logon&&judge.student">
          <CarryOutOutlined style="color:#ffffff"/>
          <router-link to="/train"> 训练需求</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">训练需求</a></span>-->
        </a-menu-item>
        <a-menu-item key="Apply" v-if="logon">
          <ProfileOutlined style="color:#ffffff"/>
          <router-link to="/apply"> 管制员申请</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">管制员申请</a></span>-->
        </a-menu-item>
        <a-menu-item key="Teacher" v-if="logon&&judge.teacher">
          <team-outlined style="color:#ffffff"/>
          <router-link to="/teacher"> 教员面板</router-link>
          <!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">管制员申请</a></span>-->
        </a-menu-item>
        <a-menu-item key="Admin" v-if="logon&&judge.adm">
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
      <router-view style="overflow-x: auto;" v-if="!logon||!(userdata.data.Name==undefined ||userdata.data.Name==''||userdata.data.Email==undefined||userdata.data.Email=='')"></router-view>
      <a-layout-footer style="text-align: center">
        <div><a target="_blank" href="https://skylineflyleague.cn/">SKYline Flyleague</a>
          <div class="ant-divider ant-divider-vertical" role="separator"><!----></div>
          <a target="_blank" href="https://ant.design/">Ant Design</a></div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <a-modal
    v-model:visible="modalVisable"
    title="请先完善个人信息"
    :confirm-loading="confirmLoading"
    @ok="sendForm"
    :centered="true"
    :width="525"
    :destroyOnClose="true"
    :keyboard="false"
    :closable="false"
    :maskClosable="false"
    cancelText=" "
  >

    <a-form-item label="真实姓名（拼音）：" name="name">
      <a-input v-model:value="formState.name">
      </a-input>
    </a-form-item>
    <a-form-item label="邮箱：" name="email">
      <a-input v-model:value="formState.email">
      </a-input>
    </a-form-item>
    <br>
    <div>警告：这是您唯一一次填写信息的机会，如果后期您不能给出足够证据证明这是你的真实信息，你的管制员申请会被拒绝。</div>

  </a-modal>
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
    const modalVisable = ref(false);
    const confirmLoading = ref(false);
    const formState = reactive({
      name: '',
      email: '',
    });
    const showModal = function (){
      modalVisable.value = true
    }
    let loginData = checkLogin.check()
    let userdata=reactive({data:{}})
    let logon = false
    const judge = reactive({
      teacher : false,
      adm : false,
      student:false
    })
    if(loginData!==undefined){
      logon =true
      APIs.LocalApi({
        url:'user',
        method:'get',
        params:{cid:loginData.Username}

      }).then(res=>{
        userdata.data = res.data
        if(userdata.data.Name==undefined ||userdata.data.Name==''||userdata.data.Email==undefined||userdata.data.Email==''){
          showModal()
        }
        for(let e in userdata.data['Group']){
          if(userdata.data['Group'][e]['id']==14){
            judge.teacher=true
          }
          if(userdata.data['Group'][e]['id']==15){
            judge.teacher=true
          }
          if(userdata.data['Group'][e]['id']==13){
            judge.adm=true
          }
          if(userdata.data['Group'][e]['id']==11){
            judge.student=true
          }

        }
      })
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
        location.reload()
      }
    }
    const sendForm = function (){
      userdata.data.Name = formState.name
      userdata.data.Email = formState.email
      confirmLoading.value=true
      APIs.LocalApi({
        url:'changeUserData',
        method:'post',
        data:{'cid':loginData['Username'],
          data:userdata.data
        }}).then((res)=>{
        if(res.status==200){
          modalVisable.value=false
          confirmLoading.value = false
          location.reload()
        }else {
          confirmLoading.value = false
          location.reload()
        }
      })
      confirmLoading.value=true
    }
    return{
      jumpToLogin,
      logon,
      loginData,
      handleChange,
      userdata,
      modalVisable,
      confirmLoading,
      showModal,
      formState,
      sendForm,
      judge
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