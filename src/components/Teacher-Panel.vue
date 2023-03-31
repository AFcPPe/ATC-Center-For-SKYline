<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray">
        <router-link to="/">管制员中心</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">教员面板</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <h1 style="font-size: 1.6rem">教员面板</h1>
      <h3 style="font-size: 1rem">使用本功能审批训练需求</h3>
      <a-divider />
      <a-card>
        <ATable :columns=cols :data-source="trainData.trnData">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex==='action'">
              <a-button @click="checkTrain(record.fullData)"><FileTextOutlined /> 查看</a-button>
            </template>
          </template>
        </ATable>
      </a-card>
    </div>
  </a-layout-content>
</template>

<script>
import checkLogin from "@/utils/CheckLogin";
import router from "@/utils/router";
import APIs from "@/utils/axios";
import {message} from "ant-design-vue";
import {reactive} from "vue";
import {FileTextOutlined} from "@ant-design/icons-vue"
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
  name: "Teacher-Panel",
  components:{
    FileTextOutlined
  },
  setup(){
    let loginData = checkLogin.check()
    let logon = false
    if (loginData !== undefined) {
      logon = true
      if(loginData['Level']<8){
        router.push('/')
        message.error('权限不足')
      }
    } else {
      localStorage.setItem('loginFirst', '0')
      router.push('/login')
    }
    let trainData = reactive({
      trnData:[]
    })
    APIs.LocalApi({url:'getAllTrains',method:'get'})
        .then((res)=>{
          let trains = res.data
          for(let i =0;i<trains.length;i++){
            const statuses = ['未查阅','已创建训练','已拒绝']
            let trainTableRow = {
              key:i+1,
              applicant: trains[i]['stu_id'],
              startTime:trains[i]['start'],
              endTime: trains[i]['end'],
              status: statuses[trains[i]['progress']],
              remark: trains[i]['remark'],
              fullData:trains[i]
            }
            trainData.trnData.push(trainTableRow)
          }
        })
    const checkTrain = function (data) {
      router.push('/train/detail/'+data.id)

    }
    return{
      cols,
      trainData,
      checkTrain
    }

  }
}
</script>

<style scoped>

</style>