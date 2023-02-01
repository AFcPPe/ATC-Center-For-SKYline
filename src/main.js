import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createRouter,createWebHashHistory } from 'vue-router'


const routes = [
    { path: '/', component: import("@/components/ATC-Index") },
    { path: '/dashboard', component: import("@/components/ATC-Dashboard") },
    { path: '/activity', component: import("@/components/ATC-Activity") },
    { path: '/notice', component: import("@/components/ATC-Notice") },
    { path: '/train', component: import("@/components/ATC-Train") },
    { path: '/apply', component: import("@/components/ATC-Apply") },
    { path: '/moodle', component: (<script language="javascript" type="text/javascript">window.location.href="https://moodle.skylineflyleague.cn";</script>)}

]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(Antd).use(router).mount('#app')