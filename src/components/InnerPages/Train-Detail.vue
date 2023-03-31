<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">训练需求</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">训练详情</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <div>训练详情 </div>
      <a-divider></a-divider>
      <a-row justify="space-between">
        <a-col span="1"></a-col>
        <a-col span="12">
          <a-form>
            <a-form-item label="学员" name="stu">
              <div>{{trnData.list.stu_id}}</div>
            </a-form-item>
            <a-form-item label="最早开始时间" name="ertime">
              <div>{{trnData.list.start}}</div>
            </a-form-item>
            <a-form-item label="最晚开始时间" name="latime">
              <div>{{trnData.list.end}}</div>
            </a-form-item>
            <a-form-item label="状态" name="status">
              <div>{{statuses[trnData.list.progress]}}</div>
            </a-form-item>
            <a-form-item label="备注" name="remark">
              <div>{{trnData.list.remark}}</div>
            </a-form-item>
            <a-form-item label="训练时间" name="def_time" v-if="trnData.list.train_time!=null">
              <div>{{trnData.list.train_time}}</div>
            </a-form-item>
            <a-form-item label="训练内容" name="content" v-if="trnData.list.content!=null">
              <div>{{trnData.list.content}}</div>
            </a-form-item>
            <a-form-item label="教员" name="ins" v-if="trnData.list.ins_id!=null">
              <div>{{trnData.list.ins_id}}</div>
            </a-form-item>
            <a-form-item label="评价" name="comment" v-if="trnData.list.comment!=null">
              <div>{{trnData.list.comment}}</div>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col span="1"></a-col>
      </a-row>
      <a-row justify="space-between" v-if="loginData['Level']>7">
        <a-col :span="4"></a-col>
        <a-col :span="4" v-if="trnData.list.train_time==null&&trnData.list.ins_id==null&&trnData.list.progress==0"><a-button type="primary" @click="showModal">接收训练</a-button></a-col>
        <a-col :span="4" v-if="trnData.list.train_time!=null&&trnData.list.comment==null&&trnData.list.ins_id==loginData['Username']&&trnData.list.status==2"><a-button type="primary">写评语</a-button></a-col>
        <a-col :span="4"></a-col>
      </a-row>
    </div>
  </a-layout-content>
  <a-modal
      v-model:visible="modalVisable"
      title="约定训练时间"
      :confirm-loading="confirmLoading"
      @ok="sendForm"
      :centered="true"
      :width="525"
      :destroyOnClose="true"
  >
    <a-form-item label="选择时间：" name="time">
      <a-date-picker show-time placeholder="选择时间" v-model:value="formState.date"/>
<!--      <RangePicker v-model:value="formState.date" :showTime="true"/>-->
    </a-form-item>
    <a-form-item label="内容" name="content">
      <a-input v-model:value="formState.content">
      </a-input>
    </a-form-item>

  </a-modal>
</template>

<script>
import router from "@/utils/router";
import AES from "@/utils/AES";
import checkLogin from "@/utils/CheckLogin";
import APIs from "@/utils/axios"
import {message, DatePicker} from 'ant-design-vue';
import {reactive, ref} from "vue";
import {
LockOutlined,

} from '@ant-design/icons-vue';
import dayjs from "dayjs";
export default {
  name: "Train-Detail",
  components:{LockOutlined,DatePicker},
  setup(){
    let loginData = checkLogin.check()
    let logon = false
    if(loginData!==undefined){
      logon =true
    }else {
      localStorage.setItem('loginFirst','0')
      router.push('/login')
    }
    let trnData = reactive({
      list:{}
    })
    console.log(Date.now())
    const formState = reactive({

      date: dayjs(Date.now()),
      content: '',
    });
    const modalVisable = ref(false);
    const confirmLoading = ref(false);
    const refreshTrain = function () {
      APIs.LocalApi({url:'getTrain',params:{id:router.currentRoute.value.params.id}})
          .then(res=>{
            if(res.status==200){
              trnData.list = JSON.parse(JSON.stringify(res.data))

              message.success('获取数据成功')
            }else{
              message.error('获取数据失败')
            }
          })
    }
    const statuses = ['未查阅','已创建训练','已完成','已拒绝']
    const showModal = function () {
      modalVisable.value=true
    }
    const sendForm = function (){
      confirmLoading.value = true
      let time = JSON.stringify(formState.date.add(8,'hour')).slice(1,11)+' '+JSON.stringify(formState.date.add(8,'hour')).slice(12,17)
      APIs.LocalApi({
        url:'arrangeTrainTime',
        method:'post',
        data:{
          id:router.currentRoute.value.params.id,
          time:time,
          ins_id:loginData['Username'],
          content:formState.content
        },
      }).then(res=>{
        if(res.status==200){
          modalVisable.value=false
          confirmLoading.value = false
          refreshTrain()
          message.success('预约成功')
        }else {
          confirmLoading.value = false
          message.error('预约失败')
        }
      })
    }
    refreshTrain()
    return{trnData,statuses,loginData,formState,modalVisable,confirmLoading,showModal,sendForm}
  }
}
</script>

<style scoped>

</style>