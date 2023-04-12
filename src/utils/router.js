import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'


const routes = [
    { path: '/', component: import("@/components/ATC-Index") },
    { path: '/dashboard', component: import("@/components/ATC-Dashboard") },
    { path: '/activity', component: import("@/components/ATC-Activity") },
    { path: '/notice', component: import("@/components/ATC-Notice") },
    { path: '/train', component: import("@/components/ATC-Train") },
    { path: '/apply', component: import("@/components/ATC-Apply") },
    { path: '/teacher', component: import("@/components/Teacher-Panel") },
    { path: '/admin', component: import("@/components/Admin") },
    { path: '/moodle', component: (<script language="javascript" type="text/javascript">window.location.href="https://moodle.skylineflyleague.cn";</script>)},
    { path: '/login', component: import("@/components/ATC-Login") },
    { path: '/activity/detail/:id', name:"detailedEvent",component: (import("@/components/InnerPages/Activity-Detail"))},
    { path: '/apply/create', component: (import("@/components/InnerPages/Apply/Apply-Create"))},
    { path: '/apply/read', component: (import("@/components/InnerPages/Apply/Apply-Read"))},
    { path: '/usercenter', component: import("@/components/InnerPages/UserCenter/PersonalData") },
    { path: '/list', component: import("@/components/ATC-List") },
    { path: '/apply/detail/:id', name:"detailedApply",component: (import("@/components/InnerPages/Apply/Apply-Detail"))},
    { path: '/train/detail/:id', name:"detailedTRain",component: (import("@/components/InnerPages/Train-Detail"))},

]

const router = createRouter({
    mode:'history',
    history: createWebHistory(),
    routes,
})

export default router