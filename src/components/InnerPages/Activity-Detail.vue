<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">活动详情</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <h1 style="font-size: 1.2rem">{{asData.eventData['title']}}</h1>
      <a-Divider /> <!--分割线-->
      <a-row justify="space-between">
        <a-col :span="8">
          <h5 style="font-size: 0.8rem">开始时间</h5>
          <p style="font-size: 1.5rem">{{asData.eventData['duration']}} UTC</p>
          <h5 style="font-size: 0.8rem">发布人</h5>
          <p style="font-size: 1.5rem">SKYline官方</p>
          <h5 style="font-size: 0.8rem;font-weight: normal">活动航路</h5>
          <p style="font-size: 1.5rem">{{asData.eventData['route']}}</p>
        </a-col>
        <a-col>
          <img :src="'/images/cover_'+asData.eventID+'.jpg'" style="width: 500px;height: 300px">
        </a-col>
      </a-row>
      <br>
<!--      :data-source=ATCTypes.types-->
      <ATable :columns=asData.colFirst  :pagination=false :data-source=asData.ATCTypes >
        <template #expandedRowRender="{ record }">
          <ATable :columns=cols :data-source=record.seats :pagination=false>
            <template #bodyCell="{column,text,record}">
              <template v-if="column.key==='requires'">
                <a-tag color="blue">{{record.require}}</a-tag>
              </template>
              <template v-if="column.key==='action'">
                <a-button type="primary" disabled v-if="record.datas.status!='0'&&record.datas.status!=asData.cid"><lock-outlined />{{record.datas.status}}</a-button>
                <a-button type="primary" v-if="record.datas.status=='0'&&record.datas.avail" @click="submitPre(record.datas)">立即预约</a-button>
                <a-button type="primary" disabled v-if="record.datas.status=='0'&&!record.datas.avail"><lock-outlined />锁定</a-button>
                <a-button type="primary" v-if="record.datas.status==asData.cid" danger @click="submitCancel(record.datas)">取消</a-button>
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
import AES from "@/utils/AES";

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
    let asData = reactive({
      EventList:[],
      logon:false,
      displayName:'未登录',
      cid:'',
      email:'',
      groups:[],
      eventData:{},
      eventID: router.currentRoute.value.params.id,
      colFirst :[{
        title: '席位类别',
        dataIndex: 'seat',
        key: 'seat',
      }],
      ATCTypes:[],
      ATCList:{}
    });
    let loginData = checkLogin.getLoginStatus()
    if(loginData!==undefined){
      asData.logon =true
      asData.cid = loginData['Username']
      const userData = JSON.parse(AES.decrypt(sessionStorage.getItem('ud')))
      asData.displayName = userData.name
      asData.email = userData.email
      asData.groups = userData.groups.split(',')
    }else {
      router.push('/login')
    }
    const getEventData = function () {

      APIs.API({url:'atc_center_api/Controller/GetEventInfo.php',method:'get',params:{id:asData.eventID}})
          .then((res)=>{
            if(res.data.code ==200&&res.data.data!==null){
              asData.eventData=res.data.data
              message.success('获取活动信息成功')

            }else{
              message.error('获取活动信息失败，正在返回活动页面')
              router.push('/activity')
            }

          })
      APIs.API({url:'atc_center_api/Controller/GetEventBooking.php',method:'get',params:{'id':asData.eventID}})
          .then(r=>{
            asData.ATCTypes = []
            if(r.data.code ==200&&r.data.data!==null){
              const seatData = r.data.data
              let CTRs = []
              let TMAs = []
              let TWRs = {}
              let OTHERs = []
              for(let each in seatData){
                if(seatData[each]['rating']==2){
                  seatData[each]['id']=[3,8]
                }else if(seatData[each]['rating']==3){
                  seatData[each]['id']=[8]
                }else if(seatData[each]['rating']==4){
                  seatData[each]['id']=[4,9]
                }else if(seatData[each]['rating']==5){
                  seatData[each]['id']=[9]
                }else if(seatData[each]['rating']==6){
                  seatData[each]['id']=[5,10]
                }else if(seatData[each]['rating']==7){
                  seatData[each]['id']=[10]
                }
                seatData[each]['avail']=false
                for(let e in asData.groups){
                  for(let h in seatData[each]['id']){
                    if(asData.groups[e]==seatData[each]['id'][h]){
                      seatData[each]['avail']=true
                    }
                  }
                }
                if(seatData[each]['type']=='3'){
                  CTRs.push(seatData[each])
                }else if(seatData[each]['type']=='2'){
                  TMAs.push(seatData[each])
                }else if(seatData[each]['type']=='1'){
                  let splStr = seatData[each]['name'].split('_')
                  if(TWRs[splStr[0]] == undefined){
                    TWRs[splStr[0]] = []
                  }
                  TWRs[splStr[0]].push(seatData[each])
                }else {
                  OTHERs.push(seatData[each])
                }
              }
              asData.ATCList['CTR'] = []
              for(let i =0;i<CTRs.length;i++){
                let CTRRow = {
                  key:i+1,
                  callsign: CTRs[i]['name'],
                  require:ratings[parseInt(CTRs[i]['rating'])],
                  remark: CTRs[i]['remark'],
                  datas:CTRs[i]
                }
                asData.ATCList['CTR'].push(CTRRow)
              }
              asData.ATCTypes.push({key:1,seat:'航路管制',seats:asData.ATCList['CTR']})
              asData.ATCList['TMA'] = []
              for(let i =0;i<TMAs.length;i++){
                let TMARow = {
                  key:i+1,
                  callsign: TMAs[i]['name'],
                  require:ratings[parseInt(TMAs[i]['rating'])],
                  remark: TMAs[i]['remark'],
                  datas:TMAs[i]
                }
                asData.ATCList['TMA'].push(TMARow)
              }
              asData.ATCTypes.push({key:2,seat:'终端管制',seats:asData.ATCList['TMA']})
              let num =2
              for(let each in TWRs){
                asData.ATCList[each] = []
                let eachTWR = TWRs[each]
                for(let i =0;i<eachTWR.length;i++){
                  let eachTWRRow = {
                    key:i+1,
                    callsign: eachTWR[i]['name'],
                    require:ratings[parseInt(eachTWR[i]['rating'])],
                    remark: eachTWR[i]['remark'],
                    datas:eachTWR[i]
                  }
                  asData.ATCList[each].push(eachTWRRow)
                }
                num = num+1
                asData.ATCTypes.push({key:num,seat:each,seats:asData.ATCList[each]})
              }
              <asData className="ATCList"></asData>['OTHER']=[]
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
                asData.ATCList['OTHER'].push(OTHERsRow)
              }
              message.success('获取席位预约信息成功')
            }else{
              message.error('获取席位预约信息失败，很可能还没发布席位预约信息哦')
            }
          })
    }
    const submitPre = function (data) {
      if(data.avail){
        let formdata = new FormData();
        formdata.append('id',router.currentRoute.value.params.id)
        formdata.append('cid',asData.cid)
        formdata.append('atc',data.name)
        APIs.API({
          url:'atc_center_api/Controller/NewBooking.php',
          method:'post',
          data:formdata
        }).then(
            res=>{
              if(res.data.code =='200'){
                message.success('预约成功')
                getEventData()
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
              getEventData()
            }else {
              message.error('取消失败')
            }
          }
      )
    }
    getEventData()
    return {
      cols,
      asData,
      submitPre,
      submitCancel
    }
  }
}
</script>

<style scoped>

</style>