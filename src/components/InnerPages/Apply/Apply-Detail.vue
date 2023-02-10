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
      <a-steps :current="parseInt(data.list['progress'])+1">
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
              <div>{{ data.list['realname'] }}</div>
            </a-form-item>
            <a-form-item label="邮箱" name="email" :rules="[{required:true,message:'请填写邮箱'}]">
              <div>{{ data.list['email'] }}</div>
            </a-form-item>
            <a-form-item label="QQ" name="qq" :rules="[{required:true,message:'请填写QQ'}]">
              <div>{{ data.list['qq'] }}</div>
            </a-form-item>
            <a-form-item label="工作" name="job" :rules="[{required:true,message:'请填写工作'}]">
              <div>{{ data.list['job'] }}</div>
            </a-form-item>
            <a-form-item label="预期在线时长(小时/周)" name="online_time"
                         :rules="[{required:true,message:'请填写预期在线时长'}]">
              <div>{{ data.list['online_time'] }}</div>
            </a-form-item>
            <a-form-item label="英语水平" name="language_skill" :rules="[{required:true,message:'请选择英语水平'}]">
              <div>{{ data.list['language_skill'] }}</div>
            </a-form-item>
            <a-form-item label="管制经验" name="atc_exp" :rules="[{required:true,message:'请填写管制经验'}]">
              <div>{{ data.list['atc_exp'] }}</div>
            </a-form-item>
            <a-form-item label="飞行经历" name="pilot_exp" :rules="[{required:true,message:'请填写飞行经历'}]">
              <div>{{ data.list['pilot_exp'] }}</div>
            </a-form-item>
            <a-form-item label="期望收获" name="expect" :rules="[{required:true,message:'请填写期望收获'}]">
              <div>{{ data.list['expect'] }}</div>
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
import {reactive} from "vue";

export default {
  name: "Apply-Detail",
  setup() {
    let loginData = checkLogin.check()
    let logon = false
    if (loginData !== undefined) {
      logon = true
    } else {
      localStorage.setItem('loginFirst', '0')
      router.push('/login')
    }
    let data = reactive({
      list: {}
    })
    APIs.API({
      url: 'atc_center_api/Controller/GetATCRequest.php',
      method: 'get',
      params: {'id': router.currentRoute.value.params.id}
    })
        .then((res) => {
          if (res.data.code == '200') {
            message.success('获取信息成功')
            data.list = res.data.data
            console.log(data.list)
          } else {
            message.error('获取信息失败，请刷新')
          }
        })

    return {
      data
    }


  }
}
</script>

<style scoped>

</style>