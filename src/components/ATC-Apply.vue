<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">管制员申请</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <h1 style="font-size: 1.6rem">管制员申请</h1>
      <h3 style="font-size: 1rem">使用本功能提交管制员申请</h3>
      <a-divider />
      <a-button type="primary" @click="router.push('/apply/read')"><PlusOutlined /> 创建申请 </a-button>
      <a-button @click="refreshApplies"><ReloadOutlined /> 刷新</a-button>
      <br/>
      <br/>
      <a-card>
        <ATable :columns=cols :data-source=ApplyData.list>
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex==='action'">
              <a-button @click="jumpToDetail(record.id)"><FileTextOutlined /> 查看</a-button>
              <a-button @click="deleteApply(record.id)" v-if="record.status == '未查阅'"><FileTextOutlined /> 删除</a-button>
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
  FileTextOutlined
} from '@ant-design/icons-vue';
import router from "@/utils/router";
import checkLogin from "@/utils/CheckLogin";
import APIs from "@/utils/axios";
import {message} from "ant-design-vue";
import {reactive} from "vue";

const cols = [{
  title: '申请人',
  dataIndex: 'applicant',
  key: 'applicant',
}, {
  title: '提交时间',
  dataIndex: 'submitTime',
  key: 'submitTime',
  sorter: true,
}, {
  title: '处理时间',
  dataIndex: 'dealTime',
  key: 'dealTime',
  sorter: true,
}, {
  title: '状态',
  key: 'status',
  dataIndex: 'status',
  sorter: true,
}, {
  title: '操作',
  key: 'action',
  dataIndex: 'action',
}];
export default {
  name: "ATC-Apply",
  components: {
    ReloadOutlined
  },
  setup() {
    let loginData = checkLogin.check()
    let logon = false
    if(loginData!==undefined){
      logon =true
    }else {
      localStorage.setItem('loginFirst','0')
      router.push('/login')
    }
    let ApplyData = reactive({
      list:[]
    })
    const refreshApplies=function () {
      APIs.API({url:'atc_center_api/Controller/GetATCRequestList.php',method:'get',params:{'cid':loginData['Username']}})
          .then((res)=>{
            if(res.data.code =='200'){
              ApplyData.list=[]
              let gData = res.data.data
              for(let i =0;i<gData.length;i++){
                let stat = '未查阅'
                if(gData[i]['progress']=='1'){
                  stat = '未查阅'
                }else if(gData[i]['progress']=='2'){
                  stat = '已通过'
                }else if(gData[i]['progress']=='3'){
                  stat = '已通过'
                }else if(gData[i]['progress']=='-1'){
                  stat = stat = '已拒绝'
                }

                let singleData = {
                  key:i+2,
                  applicant:gData[i]['realname']+ ' (' + gData[i]['stu_id']+')',
                  submitTime:gData[i]['submit_date'],
                  dealTime: gData[i]['check_date'] == undefined?'无':gData[i]['check_date'],
                  status: stat,
                  id:gData[i]['id']
                }
                ApplyData.list.push(singleData)
              }
              message.success('刷新成功')
            }else {
              message.error('刷新失败')
            }
          })
    }
    const jumpToDetail=function (id){
      router.push({name:'detailedApply',params:{id:id}})
    }
    const deleteApply = function (id){
      let formdata = new FormData();
      formdata.append('id',id)
      APIs.API({url:'atc_center_api/Controller/DeleteATCRequest.php',method:'post',data:formdata})
          .then(res=>{
            if(res.data.code =='200'){
              message.success('删除成功')
              refreshApplies()
            }
            else {
              message.error('删除失败')
            }
          })
    }
    refreshApplies()
    return {
      cols,
      router,
      ApplyData,
      jumpToDetail,
      deleteApply,
      refreshApplies
    };
  },
}

</script>

<style scoped>

</style>