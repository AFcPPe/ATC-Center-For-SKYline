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
      <a-space>
        <a-button type="primary"><PlusOutlined /> 新建需求</a-button>
        <a-button><ReloadOutlined /> 刷新</a-button>
        <RangePicker style="margin-left: 70rem;padding-right: 2rem"/>
      </a-space>

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
  FileTextOutlined,
  PlusOutlined,

} from '@ant-design/icons-vue';

import {
  RangePicker
} from 'ant-design-vue'

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

const data = [{
  key:1,
  applicant:<div><button type="button" className="ant-table-row-expand-icon ant-table-row-expand-icon-collapsed"
                         aria-label="展开行" style="margin-right: 0.7rem"></button>Zhengyang Dou (1398)</div>,
  startTime:"2022-07-12 16:35 UTC",
  endTime: "2022-09-26 15:59 UTC",
  status: "已被拒绝/无合适时间",
  remark: "",
  action: <div className="ant-space ant-space-horizontal ant-space-align-center" style="gap: 8px;">
    <div className="ant-space-item" style="">
      <button className="ant-btn ant-btn-sm" type="button"><a href="/applications/485" className=""><FileTextOutlined/> 查看训练
      </a></button>
    </div>
    <div className="ant-space-item" style=""><span></span></div>
    <div className="ant-space-item"><span></span></div></div>
},
  {
    key:2,
    applicant: <div><button type="button" className="ant-table-row-expand-icon ant-table-row-expand-icon-collapsed"
              aria-label="展开行" style="margin-right: 0.7rem"></button>Zhengyang Dou (1398)</div>,
    startTime:"2022-11-05 19:22 UTC",
    endTime: "2023-01-17 20:26 UTC",
    status: "已通过",
    remark: "",
    action: <div className="ant-space ant-space-horizontal ant-space-align-center" style="gap: 8px;">
      <div className="ant-space-item" style="">
        <button className="ant-btn ant-btn-sm" type="button"><a href="/applications/485" className=""><FileTextOutlined/> 查看训练
        </a></button>
      </div>
      <div className="ant-space-item" style=""><span></span></div>
      <div className="ant-space-item"><span></span></div></div>
  }
]

export default {
  name: "ATC-Train",
  components: {
    ReloadOutlined,
    PlusOutlined,
    RangePicker
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