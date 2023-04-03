<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray">
        <router-link to="/">管制员中心</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">管理面板</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <h1 style="font-size: 1.6rem">管理面板</h1>
      <h3 style="font-size: 1rem">使用本功能审批管制员申请</h3>
      <a-divider />
      <a-tabs>
        <a-tab-pane key="1" tab="审批管制员申请">
          <a-card>
            <ATable :columns=cols :data-source=ApplyData.list>
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex==='action'">
                  <a-button @click="jumpToDetail(record.id)"><FileTextOutlined /> 查看</a-button>
                </template>
              </template>
            </ATable>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="用户管理">
          <a-tree-select
              v-model:value="UserData.selectData"
              show-search
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择用户"
              allow-clear
              tree-default-expand-all
              :tree-data="UserData.treeData">
          </a-tree-select>
          <a-divider></a-divider>
          <a-form-item
            label="姓名："
          >
            <a-input v-model:value = "UserData.selectName">

            </a-input>
          </a-form-item>
          <a-form-item
              label="邮箱："
          >
            <a-input v-model:value = "UserData.selectEmail">

            </a-input>
          </a-form-item>
          <a-form-item
            label="用户组："
          >
            <a-tree-select
                v-model:value="UserData.selectGroups"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="Please select"
                allow-clear
                multiple
                tree-default-expand-all
                :tree-data="UserData.treeGroup"
            >
              <template #tagRender="{ label, closable, onClose, option }">
                <a-tag :closable="closable" color="blue" style="margin-right: 3px" @close="onClose">
                  {{label}}
                </a-tag>
              </template>
            </a-tree-select>
          </a-form-item>
          <a-button type="primary" :onclick="submitForm">
            确定
          </a-button>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-layout-content>
</template>

<script>
import {reactive, watch} from "vue";

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
import checkLogin from "@/utils/CheckLogin";
import router from "@/utils/router";
import APIs from "@/utils/axios";
import {message} from "ant-design-vue";
export default {
  name: "Admin",
  setup(){
    let asData = reactive({
      EventList:[],
      logon:false,
      displayName:'未登录',
      cid:'',
      email:'',
      groups:[]
    });
    let loginData = checkLogin.getLoginStatus()
    if(loginData!==undefined){
      asData.logon =true
      asData.cid = loginData['Username']
    }else {
      router.push('/login')
    }
    let ApplyData = reactive({
      list:[]
    })
    let UserData = reactive({
      orgData:{},
      treeData:[],
      treeGroup:[],
      selectData:'',
      Groups:[],
      selectGroups:[],
      selectEmail:'',
      selectName:'',
    })
    const refreshApplies=function () {
      APIs.LocalApi({url:'getAllApply',method:'get'})
          .then((res)=>{
            if(res.status == 200){
              ApplyData.list=[]
              let gData = res.data
              for(let i =0;i<gData.length;i++){
                let stat = '未查阅'
                if(gData[i]['progress']==1){
                  stat = '未查阅'
                }else if(gData[i]['progress']==2){
                  stat = '已通过'
                }else if(gData[i]['progress']==3){
                  stat = '已通过'
                }else if(gData[i]['progress']==-1||gData[i]['progress']==-2){
                  stat = '已拒绝'
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
    const refreshUsers = function (){
      APIs.LocalApi({url:'getAllUsers',method:'get'})
          .then(res=>{
            if(res.status == 200){
              UserData.orgData = res.data
              UserData.treeData = []
              for(let each in UserData.orgData){
                let newList = {
                  title: UserData.orgData[each]['Name']+' - '+each,
                  value: each,
                }
                UserData.treeData.push(newList)
              }
            }
            console.log(UserData.orgData)
          })

    }
    const jumpToDetail=function (id){
      router.push({name:'detailedApply',params:{id:id}})
    }
    const refreshGroups = function () {
      APIs.LocalApi({url:'getGroupsList',method:'get'})
          .then((res)=>{
            if(res.status == 200){
              UserData.Groups = res.data
              for(let each in res.data){
                let newList = {
                  title: res.data[each]['name'],
                  value: res.data[each]['id'],
                }
                UserData.treeGroup.push(newList)
              }
            }
            // console.log(UserData.Groups)
          })
    }
    const submitForm = function (){
      let gp = []
      for(let each in UserData.selectGroups){
        gp.push(UserData.Groups[UserData.selectGroups[each]-1])
      }
      // APIs.LocalApi({url:'setUserGroup',method:'post',data:{cid:UserData.selectData,group:gp}}).then(res=>{
      //   if(res.status==200){
      //     APIs.LocalApi({url:'setUserName',method:'post',data:{cid:UserData.selectData,name:UserData.selectName}}).then(res1=>{
      //       if(res1.status==200){
      //         APIs.LocalApi({url:'setUserEmail',method:'post',data:{cid:UserData.selectData,email:UserData.selectEmail}}).then(res2=>{
      //           if(res2.status==200){
      //             message.success("修改成功（至少服务器响应了，我也不知道是不是成功）")
      //           }
      //         })
      //       }
      //     })
      //   }
      // })
      APIs.LocalApi({url:'changeUserData',method:'post',data:{cid:UserData.selectData,data:{Name:UserData.selectName,Email:UserData.selectEmail,Group:gp}}})
        .then(res=>{
          if(res.status==200) {
            message.success("修改成功（至少服务器响应了，我也不知道是不是成功）")
            refreshUsers()
          }
        })
    }
    watch(() => UserData.selectData,()=>{
      if(UserData.selectData!=''){
        let user = UserData.orgData[UserData.selectData]
        UserData.selectGroups = []
        for(let each in user['Group']){
          UserData.selectGroups.push(user['Group'][each]['id'])
        }
        UserData.selectName=user['Name']
        UserData.selectEmail=user['Email']
      }
    })
    refreshApplies()
    refreshUsers()
    refreshGroups()
    return{
      cols,
      ApplyData,
      jumpToDetail,
      UserData,
      submitForm,
    }

  }
}
</script>

<style scoped>

</style>