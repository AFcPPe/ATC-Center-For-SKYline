import axios from "axios";

const API = axios.create({
    baseURL: '/atcapi/',
    timeout: 20000
})

const LocalApi = axios.create({
    baseURL: '/LocalApi/',
    timeout: 20000
})

const APILogin = axios.create({
    baseURL: '/goApi/',
    timeout: 20000
})

// const API = axios.create({
//     baseURL: 'https://api.skylineflyleague.cn/',
//     timeout: 10000
// })
//
// const APILogin = axios.create({
//     baseURL: 'https://go.api.skylineflyleague.cn/',
//     timeout: 10000
// })

//NGINX设置
// location /atcapi {
//     proxy_pass https://api.skylineflyleague.cn/;
//         }
// location /goApi {
//     proxy_pass https://go.api.skylineflyleague.cn/;
//         }


// const API = axios.create({
//     baseURL: 'http://117.78.10.8:61846/',
//     timeout: 10000
// })
//
// const APILogin = axios.create({
//     baseURL: 'http://117.78.10.8:61846/',
//     timeout: 10000
// })

// const API = axios.create({
//     baseURL: 'http://127.0.0.1:61846/',
//     timeout: 10000
// })
//
// const APILogin = axios.create({
//     baseURL: 'http://127.0.0.1:61846/',
//     timeout: 10000
// })

export default {API,APILogin,LocalApi}