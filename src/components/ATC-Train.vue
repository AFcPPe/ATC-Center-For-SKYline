<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">训练需求</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <h1 style="font-size: 1.6rem">训练需求</h1>
      <h3 style="font-size: 0.8rem">如果您需要并且有时间参与训练，请在此提出和管理您的训练需求。注意，此处仅用于表达训练意向，提出训练需求不保证一定会得到满足。 教员将按照您提出的训练时间，结合个人安排决定最终训练时间。因此，为了让成功预约的可能性最大化，每个需求中允许最多提供五个可选时间段。 请尽量多提供一些时间以供选择。在训练时间最终确定前，您都可以修改您的训练需求。</h3>
      <a-divider />
      <a-row justify="space-between">
        <a-col :span="4">
          <a-button type="primary" @click="showModal"><PlusOutlined /> 新建需求 </a-button>
          <a-modal
              v-model:visible="modalVisable"
              title="创建训练计划"
              :confirm-loading="confirmLoading"
              @ok="sendForm"
              :centered="true"
              :width="525"
              :destroyOnClose="true"
          >
            <a-form-item label="选择时间：" name="time">
              <RangePicker v-model:value="formState.date" :showTime="true"/>
            </a-form-item>
            <a-form-item label="备注" name="remark">
              <a-input v-model:value="formState.remark">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>

          </a-modal>
          <a-button @click="refreshTrains"><ReloadOutlined /> 刷新</a-button>
        </a-col>
        <a-col :span="4"></a-col>
        <a-col :span="4"></a-col>
        <a-col :span="4"><RangePicker /></a-col>


      </a-row>

      <br/>
      <br/>
      <a-card>
        <ATable :columns=cols :data-source=trainData.data>
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex==='action'">
              <a-button @click="deleteReq(record.key-1)"><FileTextOutlined /> 删除</a-button>
            </template>
          </template>
        </ATable>
      </a-card>
    </div>
  </a-layout-content>
</template>
<script>
import {
  ReloadOutlined,
  FileTextOutlined,
  PlusOutlined,

} from '@ant-design/icons-vue';

import {
  message,
  RangePicker,
} from 'ant-design-vue'
import {reactive, ref} from "vue";
import APIs from "@/utils/axios";
import checkLogin from "@/utils/CheckLogin";
import router from "@/utils/router";
import ProfileOutlined from "@/App";
import AES from "@/utils/AES";

const cols = [{
  title: '学员',
  dataIndex: 'applicant',
  key: 'applicant',
}, {
  title: '最早开始时间',
  dataIndex: 'startTime',
  key: 'startTime',
  sorter: true,
}, {
  title: '最晚结束时间',
  dataIndex: 'endTime',
  key: 'endTime',
  sorter: true,
}, {
  title: '备注',
  key: 'remark',
  dataIndex: 'remark',
  sorter: true,
}, {
  title: '状态',
  key: 'status',
  dataIndex: 'status',
}, {
  title: '操作',
  key: 'action',
  dataIndex: 'action',
}];
export default {
  name: "ATC-Train",
  components: {
    ProfileOutlined,
    ReloadOutlined,
    PlusOutlined,
    RangePicker,
    FileTextOutlined
  },

  setup() {
    let trains = []
    let trainData = reactive({
      data: []
    })
    let loginData = checkLogin.check()
    let logon = false
    if(loginData==undefined){
      localStorage.setItem('loginFirst','0')
      router.push('/login')
    }else{
      logon = true
    }

    const refreshTrains=function () {
        APIs.API({url:'atc_center_api/Controller/GetTRNRequestList.php',method:'get',params:{'cid':loginData['Username']}})
            .then((res)=>{
              if(res.data.code =='200'){
                trainData.data=[]
                trains = res.data.data
                for(let i =0;i<trains.length;i++){
                  let trainTableRow = {
                    key:i+1,
                    applicant: trains[i]['stu_id'],
                    startTime:trains[i]['earliest_time'],
                    endTime: trains[i]['latest_time'],
                    status: "未查阅",
                    remark: trains[i]['remark'],
                  }
                  trainData.data.push(trainTableRow)
                }
                message.success('刷新成功')
              }else {
                message.error('刷新失败')
              }
            })
    }
    const formState = reactive({
      date: {},
      remark: '',
    });
    const modalVisable = ref(false);
    const confirmLoading = ref(false);
    const showModal = function (){
      modalVisable.value = true
    }
    const sendForm = function (){
      APIs.API({
        url:'atc_center_api/Controller/CreateTRNRequest.php',
        method:'post',
        data:{'stu_id':loginData['Username'],
          'earliest_time':formState.date[0],
          'latest_time':formState.date[1],
          'remark':formState.remark

        }}).then((res)=>{
          if(res.data.code =='200'){
            modalVisable.value=false
            confirmLoading.value = false
            refreshTrains()
            message.success('创建成功')
          }else {
            message.error('创建失败')
          }

      })
      confirmLoading.value=true
    }
    const deleteReq = function (id) {
      let formdata = new FormData();
      formdata.append('id',trains[id]['id'])
      APIs.API({
        url:'atc_center_api/Controller/DeleteTRNRequest.php',
        method:'post',
        data:formdata
      }).then(
          res=>{
            if(res.data.code =='200'){
              refreshTrains()
              message.success('删除成功')
            }else {
              message.success('删除失败')
            }
          }
      )
    }
    refreshTrains()
    return {
      confirmLoading,
      sendForm,
      showModal,
      modalVisable,
      trainData,
      cols,
      formState,
      deleteReq,
      refreshTrains
    };
  },
}

</script>

<style scoped>

</style>