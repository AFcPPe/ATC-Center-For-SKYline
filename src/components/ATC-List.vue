<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray"><router-link to="/">管制员中心</router-link></a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">管制员列表</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px', lineHeight:'2rem'}">
      <a-row justify="space-between">
        <a-col :span="2"></a-col>
        <a-col :span="14">
          <a-table
              :columns="columns"
              :data-source="dataSource.data">
          </a-table>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
    </div>

  </a-layout-content>
</template>

<script>
import {reactive} from "vue";
import APIs from "@/utils/axios";
import router from "@/utils/router";
const columns = [{
  title: 'CID',
  dataIndex: 'CID',
  width: '20%',
}, {
  title: '姓名',
  dataIndex: 'name',
  width: '20%',
}, {
  title: 'DEL',
  dataIndex: 'DEL',
  width: '10%',
}, {
  title: 'GND',
  dataIndex: 'GND',
  width: '10%',
}, {
  title: 'TWR',
  dataIndex: 'TWR',
  width: '10%',
}, {
  title: 'TMA',
  dataIndex: 'TMA',
  width: '10%',
}, {
  title: 'CTR',
  dataIndex: 'CTR',
  width: '10%',
}];
export default {
  name: "ATC-List",
  setup(){
    const dataSource = reactive({
      data:[]
    })
    APIs.LocalApi({url:'getAllUsers',method:"get"})
        .then(res=>{
          if(res.status==200){
            let lo = res.data
            for(let each in lo){
              let newData = {
                key:each,
                CID:each,
                name:lo[each]['Name'],
                DEL:'×',
                GND:'×',
                TWR:'×',
                TMA:'×',
                CTR:'×',
                display:false,
              }
              for(let e in lo[each]['Group']){
                switch (parseInt(lo[each]['Group'][e]['id'])) {
                  case 1:
                    newData['DEL'] = 'S'
                    break
                  case 2:
                    newData['GND'] = 'S'
                    break
                  case 3:
                    newData['TWR'] = 'S'
                    break
                  case 4:
                    newData['TMA'] = 'S'
                    break
                  case 5:
                    newData['CTR'] = 'S'
                    break
                  case 6:
                    newData['DEL'] = '√'
                    break
                  case 7:
                    newData['GND'] = '√'
                    break
                  case 8:
                    newData['TWR'] = '√'
                    break
                  case 9:
                    newData['TMA'] = '√'
                    break
                  case 10:
                    newData['CTR'] = '√'
                    break
                  case 16:
                    newData['display']=true
                }
              }
              if(newData['display'])dataSource.data.push(newData)


            }
          }

        })
    return{
      columns,
      dataSource
    }
  }
}
</script>

<style scoped>

</style>