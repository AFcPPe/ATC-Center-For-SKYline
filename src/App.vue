<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible style="min-width: 500px">
      <div class="logo">
        <img src="./assets/logo.svg">
      </div>

      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="DashBoard">
          <DashboardOutlined style="color:#ffffff"/>
          <router-link to="/dashboard"> 工作台</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">工作台</a></span>-->
        </a-menu-item>
        <a-menu-item key="Activity">
          <CustomerServiceOutlined style="color:#ffffff"/>
          <router-link to="/activity"> 活动</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">活动</a></span>-->
        </a-menu-item>
        <a-menu-item key="Notice">
          <NotificationOutlined style="color:#ffffff"/>
          <router-link to="/notice"> 公告</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">公告</a></span>-->
        </a-menu-item>
        <a-menu-item key="Train">
          <CarryOutOutlined style="color:#ffffff"/>
          <router-link to="/train"> 训练需求</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">训练需求</a></span>-->
        </a-menu-item>
        <a-menu-item key="Apply">
          <ProfileOutlined style="color:#ffffff"/>
          <router-link to="/apply"> 管制员申请</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">管制员申请</a></span>-->
        </a-menu-item>
        <a-menu-item key="Moodle">
          <BookOutlined style="color:#ffffff"/>
          <router-link to="/moodle"> Moodle</router-link>
<!--          <span><a target="_blank" href="https://skylineflyleague.cn/" style="color:#ffffff">Moodle</a></span>-->
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="ant-row" style="row-gap: 0px;">
          <div class="ant-col ant-col-24" style="padding: 0px 1.5rem; text-align: right;">
            <a-space>
              <a-select
                  ref="select"
                  v-model:value="value1"
                  style="width: 120px"
                  @focus="focus"
                  @change="handleChange"
              >
                <a-select-option value="jack"><UserOutlined /> 个人中心</a-select-option>
                <a-select-option value="lucy"><DisconnectOutlined /> 注销登录</a-select-option>
              </a-select>
            </a-space>
          </div>
        </div>
      </a-layout-header>
      <router-view></router-view>
      <a-layout-footer style="text-align: center">
        <div><a target="_blank" href="https://skylineflyleague.cn/">SKYline Flyleague</a>
          <div class="ant-divider ant-divider-vertical" role="separator"><!----></div>
          <a target="_blank" href="https://ant.design/">Ant Design</a></div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  BookOutlined,
  CarryOutOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  NotificationOutlined,
  ProfileOutlined,
  UserOutlined,
  DisconnectOutlined
} from '@ant-design/icons-vue';
import {defineComponent, ref} from 'vue';
export default defineComponent({
  components: {
    DashboardOutlined,
    CustomerServiceOutlined,
    NotificationOutlined,
    ProfileOutlined,
    CarryOutOutlined,
    BookOutlined,
    UserOutlined,
    DisconnectOutlined
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    };
  },
});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>