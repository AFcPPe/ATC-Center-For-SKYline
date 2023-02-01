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
      <a-button><ReloadOutlined /> 刷新</a-button>
      <br/>
      <br/>
      <a-card>
        <ATable :columns=cols :data-source=data>

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

const data = [{
  key:1,
  applicant:"Zhengyang Dou (1398)",
  submitTime:"2022-07-12 16:35 UTC",
  dealTime: "2022-09-26 15:59 UTC",
  status: "已拒绝",
  action: <div className="ant-space ant-space-horizontal ant-space-align-center" style="gap: 8px;">
    <div className="ant-space-item" style="">
      <button className="ant-btn ant-btn-sm" type="button"><a href="/applications/485" className=""><FileTextOutlined/> 查看
      </a></button>
    </div>
    <div className="ant-space-item" style=""><span></span></div>
    <div className="ant-space-item"><span></span></div></div>
},
{
  key:2,
  applicant:"Zhengyang Dou (1398)",
  submitTime:"2022-11-05 19:22 UTC",
  dealTime: "2023-01-17 20:26 UTC",
  status: "已通过",
  action: <div className="ant-space ant-space-horizontal ant-space-align-center" style="gap: 8px;">
    <div className="ant-space-item" style="">
      <button className="ant-btn ant-btn-sm" type="button"><a href="/applications/485" className=""><FileTextOutlined/> 查看
      </a></button>
    </div>
    <div className="ant-space-item" style=""><span></span></div>
    <div className="ant-space-item"><span></span></div></div>
}
]

export default {
  name: "ATC-Apply",
  components: {
    ReloadOutlined
  },
  setup() {
    return {
      data,
      cols,
    };
  },
}

</script>

<style scoped>

</style>