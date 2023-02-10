<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">活动详情</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <h1 style="font-size: 1.2rem">{{data.list['title']}}</h1>
      <a-Divider /> <!--分割线-->
      <a-row justify="space-between">
        <a-col :span="8">
          <h5 style="font-size: 0.8rem">开始时间</h5>
          <p style="font-size: 1.5rem">{{data.list['duration']}} UTC</p>
          <h5 style="font-size: 0.8rem">发布人</h5>
          <p style="font-size: 1.5rem">SKYline官方</p>
          <h5 style="font-size: 0.8rem;font-weight: normal">活动航路</h5>
          <p style="font-size: 1.5rem">{{data.list['route']}}</p>
        </a-col>
        <a-col>
          <img :src="'/atcapi/upload/activity/cover_'+eventID+'.jpg'" style="width: 500px;height: 300px">
        </a-col>
      </a-row>
      <br>
      <!--eslint-disable-next-line-->
      <ATable :columns=colFirst :data-source=ATCTypes.types :pagination=false >
        <template #expandedRowRender="{ record }">
          <ATable :columns=cols :data-source=record.seats :pagination=false>
            <template #bodyCell="{column,text,record}">
              <template v-if="column.key==='requires'">
                <a-tag color="blue">{{record.require}}</a-tag>
              </template>
              <template v-if="column.key==='action'">
                <a-button type="primary" disabled v-if="record.datas.status!='0'&&record.datas.status!=cid"><lock-outlined />{{record.datas.status}}</a-button>
                <a-button type="primary" v-if="record.datas.status=='0'&&level>=record.datas.rating" @click="submitPre(record.datas)">立即预约</a-button>
                <a-button type="primary" disabled v-if="record.datas.status=='0'&&level<record.datas.rating"><lock-outlined />锁定</a-button>
                <a-button type="primary" v-if="record.datas.status==cid" danger @click="submitCancel(record.datas)">取消</a-button>
              </template>
            </template>

          </ATable>

        </template>

      </ATable>
    </div>
  </a-layout-content>
</template>

<script>
import router from "@/utils/router";
import APIs from "@/utils/axios";
import {reactive} from "vue";
import checkLogin from "@/utils/CheckLogin";
import {LockOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

const cols = [{
  title: '呼号',
  dataIndex: 'callsign',
  key: 'callsign',
  width: 70,
},{
  title: '要求',
  dataIndex: 'requires',
  key: 'requires',
  width: 250,
},{
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
},{
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  width: 100,
},]
const ratings = [
    'Banned',
    'OBS',
    'TWR Solo Permission',
    'TWR Full Permission',
    'TMA Solo Permission',
    'TMA Full Permission',
    'CTR Solo Permission',
    'CTR Full Permission',
    'Procedural Controller Permission',
    'Supervisor'

]
export default {
  name: "Activity-Detail",
  components:{
    LockOutlined
  },
  setup(){
    let loginData = checkLogin.check()
    let logon = false
    let cid = loginData['Username']
    let level = 0
    if(loginData!==undefined){
      level = loginData['Level']
      logon =true
    }else {
      localStorage.setItem('loginFirst','0')
      router.push('/login')
    }
    const submitPre = function (data) {
      if(level>=parseInt(data.rating)){
        let formdata = new FormData();
        formdata.append('id',router.currentRoute.value.params.id)
        formdata.append('cid',cid)
        formdata.append('atc',data.name)
        APIs.API({
          url:'atc_center_api/Controller/NewBooking.php',
          method:'post',
          data:formdata
        }).then(
            res=>{
              if(res.data.code =='200'){
                message.success('预约成功')
                reloadBooking()
              }else {
                message.error('预约失败')
              }
            }
        )
      }else{
        message.error('权限不足')
      }
    }
    const submitCancel = function (data) {
      console.log(data)
      let formdata = new FormData();
      formdata.append('id',router.currentRoute.value.params.id)
      formdata.append('atc',data.name)
      APIs.API({
        url:'atc_center_api/Controller/CancelBooking.php',
        method:'post',
        data:formdata
      }).then(
          res=>{
            if(res.data.code =='200'){
              message.success('取消成功')
              reloadBooking()
            }else {
              message.error('取消失败')
            }
          }
      )
    }
    const colFirst = [{
      title: '席位类别',
      dataIndex: 'seat',
      key: 'seat',

    }]
    const eventID = router.currentRoute.value.params.id
    let data = reactive({
      list:[]
    })
    let ATC = reactive({
      list:{}
    })
    let ATCTypes = reactive({
      types:[]
    })
    APIs.API({url:'atc_center_api/Controller/GetEventInfo.php',method:'get',params:{id:router.currentRoute.value.params.id}})
        .then((res)=>{
          data.list=res.data.data
        })
    const reloadBooking = function (){
      APIs.API({url:'atc_center_api/Controller/GetEventBooking.php',method:'get',params:{'id':router.currentRoute.value.params.id}})
          .then((res)=>{
            ATCTypes.types=[]
            let booking = res.data.data
            let CTRs = []
            let TMAs = []
            let TWRs = {}
            let OTHERs = []
            for(let each in booking){
              if(booking[each]['type']=='3'){
                CTRs.push(booking[each])
              }else if(booking[each]['type']=='2'){
                TMAs.push(booking[each])
              }else if(booking[each]['type']=='1'){
                let splStr = booking[each]['name'].split('_')
                if(TWRs[splStr[0]] == undefined){
                  TWRs[splStr[0]] = []
                }
                TWRs[splStr[0]].push(booking[each])
              }else {
                OTHERs.push(booking[each])
              }
            }
            ATC.list['CTR'] = []
            for(let i =0;i<CTRs.length;i++){
              let CTRRow = {
                key:i+1,
                callsign: CTRs[i]['name'],
                require:ratings[parseInt(CTRs[i]['rating'])],
                remark: CTRs[i]['remark'],
                datas:CTRs[i]
              }
              ATC.list['CTR'].push(CTRRow)
            }
            ATCTypes.types.push({key:1,seat:'航路管制',seats:ATC.list['CTR']})
            ATC.list['TMA'] = []
            for(let i =0;i<TMAs.length;i++){
              let TMARow = {
                key:i+1,
                callsign: TMAs[i]['name'],
                require:ratings[parseInt(TMAs[i]['rating'])],
                remark: TMAs[i]['remark'],
                datas:TMAs[i]
              }
              ATC.list['TMA'].push(TMARow)
            }
            ATCTypes.types.push({key:2,seat:'终端管制',seats:ATC.list['TMA']})
            let num =2
            for(let each in TWRs){
              ATC.list[each] = []
              let eachTWR = TWRs[each]
              for(let i =0;i<eachTWR.length;i++){
                let eachTWRRow = {
                  key:i+1,
                  callsign: eachTWR[i]['name'],
                  require:ratings[parseInt(eachTWR[i]['rating'])],
                  remark: eachTWR[i]['remark'],
                  datas:eachTWR[i]
                }
                ATC.list[each].push(eachTWRRow)
              }
              num = num+1
              ATCTypes.types.push({key:num,seat:each,seats:ATC.list[each]})
            }
            ATC.list['OTHER']=[]
            for(let i =0;i<OTHERs.length;i++){
              if (parseInt(OTHERs[i]['rating'])>=12){
                continue
              }
              let OTHERsRow = {
                key:i+1,
                callsign: OTHERs[i]['name'],
                require:ratings[parseInt(OTHERs[i]['rating'])],
                remark: OTHERs[i]['remark'],
                datas:OTHERs[i]
              }
              ATC.list['OTHER'].push(OTHERsRow)
            }
            ATCTypes.types.push({key:++num,seat:'备份席位',seats:ATC.list['OTHER']})
          })
    }
    reloadBooking()
    return {
      data,
      colFirst,
      eventID,
      cols,
      ATCTypes,
      submitPre,
      level,
      cid,
      submitCancel
    }
  }
}
</script>

<style scoped>

</style>