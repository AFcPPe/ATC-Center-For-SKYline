<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray">
        <router-link to="/">管制员中心</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: gray">
        <router-link to="/apply">管制员申请</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">提交申请</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px'}">
      <a-steps :current="1">
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>阅读</template>
          <template #description>
            <span>阅读管制员申请须知</span>
          </template>
        </a-step>
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>提交</template>
          <template #description>
            <span>提交管制申请表</span>
          </template>
        </a-step>
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>查阅</template>
          <template #description>
            <span>等待管理员查阅</span>
          </template>
        </a-step>
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>面试</template>
          <template #description>
            <span>与教员进行一场面试</span>
          </template>
        </a-step>
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>完成</template>
          <template #description>
            <span>成为管制学员开始学习</span>
          </template>
        </a-step>
      </a-steps>
      <a-divider></a-divider>
<!--      <div v-if="loginData['Pilottime']/3600>=20"></div>-->

      <a-row justify="space-between">
        <a-col span="2"></a-col>
        <a-col span="10">
          <a-form :model="formState.list" @finish="onSubmitClick">
            <a-form-item label="姓名" name="name" :rules="[{required:true,message:'请填写姓名'}]">
              <a-input v-model:value="formState.list.name" style="width: 300px"></a-input>
            </a-form-item>
            <a-form-item label="邮箱" name="mail" :rules="[{required:true,message:'请填写邮箱'}]">
              <a-input v-model:value="formState.list.mail" style="width: 300px"></a-input>
            </a-form-item>
            <a-form-item label="QQ" name="qq" :rules="[{required:true,message:'请填写QQ'}]">
              <a-input v-model:value="formState.list.qq" style="width: 300px"></a-input>
            </a-form-item>
            <a-form-item label="工作" name="job" :rules="[{required:true,message:'请填写工作'}]">
              <a-input v-model:value="formState.list.job" style="width: 300px"></a-input>
            </a-form-item>
            <a-form-item label="预期在线时长(小时/周)" name="ol_hour" :rules="[{required:true,message:'请填写预期在线时长'}]">
              <a-input v-model:value="formState.list.ol_hour" style="width: 100px"></a-input>
            </a-form-item>
            <a-form-item label="英语水平" name="eng" :rules="[{required:true,message:'请选择英语水平'}]">
              <a-radio-group v-model:value="formState.list.eng">
                <a-radio :style="radioStyle" :value="1">1.几乎不懂英文</a-radio>
                <a-radio :style="radioStyle" :value="2">2.粗通英文，了解一些英文飞行单词，借助文字和翻译器，可以进行英文陆空对话勉强能听懂和进行陆空对话</a-radio>
                <a-radio :style="radioStyle" :value="3">3.能听懂大多数场景下的陆空对话，能用语音进行流利的英语对话除了熟练运用陆空对话外，还能使用英文处理一些非常规情景的对话。</a-radio>
                <a-radio :style="radioStyle" :value="4">4.英文交流基本无任何障碍。</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="管制经验" name="atc_exp" :rules="[{required:true,message:'请填写管制经验'}]">
              <a-textarea v-model:value="formState.list.atc_exp" style="width: 500px"></a-textarea>
            </a-form-item>
            <a-form-item label="飞行经历" name="flight_exp" :rules="[{required:true,message:'请填写飞行经历'}]">
              <a-textarea v-model:value="formState.list.flight_exp" style="width: 500px"></a-textarea>
            </a-form-item>
            <a-form-item label="期望收获" name="exp_hav" :rules="[{required:true,message:'请填写期望收获'}]">
              <a-textarea v-model:value="formState.list.exp_hav" style="width: 500px"></a-textarea>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" html-type="submit">提交</a-button>
            </a-form-item>
          </a-form>
        </a-col>
          <a-col span="1"></a-col>
        <a-col span="1"></a-col>
      </a-row>
    </div>

  </a-layout-content>
</template>

<script>
import checkLogin from "@/utils/CheckLogin";
import router from "@/utils/router";
import {Steps, Step, message} from "ant-design-vue"
import {reactive} from "vue";
import APIs from "@/utils/axios";
import AES from "@/utils/AES";
import dayjs from "dayjs";

export default {
  name: "Apply-Create",
  components:{
    Steps,Step
  },
  setup(){
    let loginData = checkLogin.getLoginStatus()
    if(loginData!==undefined){
    }else {
      router.push('/login')
    }
    const radioStyle = reactive({
      display: 'flex',
    });
    const formState = reactive({
      list:{
        cid:loginData['Username'],
        name:'',
        mail:'',
        qq:'',
        job:'',
        ol_hour:'',
        eng:'',
        atc_exp:'',
        flight_exp:'',
        exp_hav:'',
        flight_time:loginData['Pilottime']/3600.0,
        submit_time:0
      },
    });

    const onSubmitClick = function () {
      if(loginData==undefined||loginData['Pilottime']==undefined||loginData['Pilottime']/3600<45){
        message.error('提交失败，因为你的连飞时长小于45小时')
        router.push('/apply')
        return
      }
      formState.list.submit_time = dayjs().add(8,'hour')
      APIs.LocalApi({url:'createApply',method:'post',data:AES.encryptReq(formState.list)})
          .then((res)=>{
            if(res.data.code =='200'){
              message.success('提交成功')
              router.push('/apply')
            }else {
              message.error('提交失败')
            }
          })
    }
    return{
      loginData,
      onSubmitClick,
      formState,
      radioStyle,
    }
  }
}
</script>

<style scoped>

</style>