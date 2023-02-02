import axios from "axios";


const API = axios.create({
    baseURL: 'https://go.api.skylineflyleague.cn',
    timeout: 5000
})

export default API