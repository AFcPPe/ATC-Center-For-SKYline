import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from './utils/axios'
import router from './utils/router'
const app = createApp(App)
app.use(Antd).use(router).mount('#app')
app.config.globalProperties.$axios = axios