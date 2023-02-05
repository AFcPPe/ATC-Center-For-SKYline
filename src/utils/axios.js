import axios from "axios";

// const API = axios.create({
//     baseURL: 'https://api.skylineflyleague.cn/atc_center_api/Controller',
//     timeout: 10000
// })
const API = axios.create({
    baseURL: 'http://117.78.10.8:61846/',
    timeout: 10000
})

const APILogin = axios.create({
    baseURL: 'http://117.78.10.8:61846/',
    timeout: 10000
})

// const API = axios.create({
//     baseURL: 'http://127.0.0.1:61846/',
//     timeout: 10000
// })

// const APILogin = axios.create({
//     baseURL: 'http://127.0.0.1:61846/',
//     timeout: 10000
// })

export default {API,APILogin}