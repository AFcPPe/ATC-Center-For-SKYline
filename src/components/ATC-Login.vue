<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray">
        <router-link to="/">管制员中心</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">管制员登录</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px', lineHeight:'2rem'}">
      <a-row justify="space-between">
        <a-col :span="6"></a-col>
        <a-col :span="6"><h1 style="font-size: 1.5rem;text-align: center">管制员登录</h1></a-col>
        <a-col :span="6"></a-col>
      </a-row>
      <a-divider />
      <a-row justify="space-between">
        <a-col :span="6"></a-col>
        <a-col :span="6">
          <a-form-item label="账号" name="username">
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon"/>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
        </a-col>
        <a-col :span="6"></a-col>
      </a-row>
      <a-row justify="space-between">
        <a-col :span="6"></a-col>
        <a-col :span="1"><a-button type="primary" @click="onShow">登录</a-button></a-col>
        <a-col :span="6"></a-col>

        <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
      </a-row>



    </div>

  </a-layout-content>
</template>

<script>
import {UserOutlined,LockOutlined} from '@ant-design/icons-vue';
import Vcode from "vue3-puzzle-vcode"
import {reactive, ref} from "vue";
import APIs from "@/utils/axios";
import router from "@/utils/router";
import AES from "@/utils/AES";
import checkLogin from "@/utils/CheckLogin";
import { message } from 'ant-design-vue';
export default {
  name: "ATC-Login",
  components: {
    UserOutlined,LockOutlined,Vcode
  },

  setup() {
    if(checkLogin.check()!=undefined){
      router.push({path: '/',})
    }
    if(localStorage.getItem('loginFirst')=='0'){
      message.error('请先登录')
      localStorage.removeItem('loginFirst')
    }
    const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });
    const isShow = ref(false);

    const onShow = () => {
      isShow.value = true;
    };

    const onClose = () => {
      isShow.value = false;
    };

    const onSuccess = () => {
      onClose()
      let formdata = new FormData();
      formdata.append('username',formState.username)
      formdata.append('password',formState.password)
      APIs.APILogin({url:'Center/Login',method:'post',data:formdata})
          .then((res)=>{
            console.log('data')
            if(res.data.code=='200'){
              localStorage.clear()
              let saveData = AES.encrypt(JSON.stringify(res.data.data))
              localStorage.setItem('loginData',saveData)
              localStorage.setItem('banFlag','1')
              location.reload()
            }else {
              message.error('登录失败');
            }
          })
          .catch(reason => {
            if(reason.code == 'ERR_NETWORK'){
              message.error('与服务器交互失败')
            }
          })
    };
    return {onShow,onSuccess,onClose,isShow,formState};
  },

}
</script>

<style scoped>

</style>