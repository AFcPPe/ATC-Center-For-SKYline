<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray">
        <router-link to="/">管制员中心</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: gray">
        <router-link to="/apply">管制员申请</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">查看申请</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px'}">
      <a-steps :current="Math.abs(parseInt(data.list['progress']))+1" :status="data.list['status']">
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
      <a-row justify="space-between">
        <a-col span="1"></a-col>
        <a-col span="12">
          <a-form>
            <a-form-item label="姓名" name="realname" :rules="[{required:true,message:'请填写姓名'}]">
              <div>{{ data.list['name'] }}</div>
            </a-form-item>
            <a-form-item label="邮箱" name="email" :rules="[{required:true,message:'请填写邮箱'}]">
              <div>{{ data.list['mail'] }}</div>
            </a-form-item>
            <a-form-item label="QQ" name="qq" :rules="[{required:true,message:'请填写QQ'}]">
              <div>{{ data.list['qq'] }}</div>
            </a-form-item>
            <a-form-item label="工作" name="job" :rules="[{required:true,message:'请填写工作'}]">
              <div>{{ data.list['job'] }}</div>
            </a-form-item>
            <a-form-item label="预期在线时长(小时/周)" name="online_time"
                         :rules="[{required:true,message:'请填写预期在线时长'}]">
              <div>{{ data.list['ol_hour'] }}</div>
            </a-form-item>
            <a-form-item label="英语水平" name="language_skill" :rules="[{required:true,message:'请选择英语水平'}]">
              <div>{{ data.list['eng'] }}</div>
            </a-form-item>
            <a-form-item label="管制经验" name="atc_exp" :rules="[{required:true,message:'请填写管制经验'}]">
              <div>{{ data.list['atc_exp'] }}</div>
            </a-form-item>
            <a-form-item label="飞行经历" name="pilot_exp" :rules="[{required:true,message:'请填写飞行经历'}]">
              <div>{{ data.list['flight_exp'] }}</div>
            </a-form-item>
            <a-form-item label="飞行时长" name="pilot_time" :rules="[{required:true,message:'请填写飞行时长'}]">
              <div>{{ data.list['flight_time'] }} 小时</div>
            </a-form-item>
            <a-form-item label="期望收获" name="expect" :rules="[{required:true,message:'请填写期望收获'}]">
              <div>{{ data.list['exp_hav'] }}</div>
            </a-form-item>
            <a-form-item label="面试时间" name="interviewTime" v-if="data.list['progress']==2||data.list['progress']==3">
              <div>{{ data.list['interviewTime'] }}</div>
            </a-form-item>
            <a-form-item label="面试教员" name="applier" v-if="data.list['progress']==2||data.list['progress']==3">
              <div>{{ data.list['applier'] }}</div>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col span="1"></a-col>
      </a-row>
    </div>
  </a-layout-content>
</template>

<script>
import checkLogin from "@/utils/CheckLogin";
import router from "@/utils/router";
import APIs from "@/utils/axios";
import {message} from "ant-design-vue";
import {reactive, ref} from "vue";
import dayjs from "dayjs";
import AES from '@/utils/AES'

export default {
  name: "Apply-Detail",
  setup() {
    let logon = false
    let loginData = checkLogin.getLoginStatus()
    if(loginData!==undefined){
      logon=true
    }else {
      router.push('/login')
    }
    let data = reactive({
      list: {}
    })
    APIs.LocalApi({
      url: 'getApply',
      method: 'post',
      data:AES.encryptReq({'id': router.currentRoute.value.params.id})
    })
        .then((res) => {
          if (res.data.code == '200') {
            message.success('获取信息成功')
            data.list = res.data.data[0]
            if(data.list['progress']==-1){
              data.list['status'] = 'error'
            }else if(data.list['progress']==-2){
              data.list['status'] = 'error'
            }else if(data.list['progress']==3){
              data.list['status'] ='final'
            }else{
              data.list['status'] = 'process'
            }
            if(data.list['check_result'] == null){
              data.list['progress']=1
            }else{
              if(data.list['check_result'] == 1){
                if(data.list['interview_time']==null){
                  data.list['progress']=2
                }else {
                  if(data.list['interview_result']==null){
                    data.list['progress']=2
                  }else{
                    if(data.list['interview_result']==2){
                      data.list['progress']=2
                      data.list['status'] = 'error'
                    }else if(data.list['interview_result']==1){
                      data.list['status'] ='final'
                    }
                  }
                }
              }else if(data.list['check_result'] == 2){
                data.list['progress']=1
                data.list['status'] = 'error'
              }

            }
          } else {
            message.error('获取信息失败，请刷新')
          }
        })
    const formState = reactive({
      date: dayjs(Date.now()),
      applier: '',
    });
    return {
      data,
      loginData,
      formState
    }


  }
}
</script>

<style scoped>

</style>