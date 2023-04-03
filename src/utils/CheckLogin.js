import AES from "@/utils/AES";
import API from "@/utils/axios"
import APIs from "@/utils/axios";
import {message} from "ant-design-vue";

export  default {
    async check(){
        return new Promise((result)=>{
            let readData = localStorage.getItem('loginData')
            if(readData!=undefined){
                let loginData = JSON.parse(AES.decrypt(readData))
                let formdata = new FormData()
                formdata.append('username',loginData.username)
                formdata.append('password',loginData.password)
                APIs.APILogin({url:'Center/Login',method:'post',data:formdata})
                    .then((res)=>{
                        if(res.data.code=='200'){
                            message.success('验证登录成功')
                            let saveData = AES.encrypt(JSON.stringify(res.data.data.UserData[0]))
                            sessionStorage.setItem('userData',saveData)
                            result(res.data.data.UserData[0])
                        }else {
                            sessionStorage.clear()
                            message.error('验证登录失败，请先登录');
                            result(undefined)
                        }
                    })
                    .catch(reason => {
                        if(reason.code == 'ERR_NETWORK'){
                            sessionStorage.clear()
                            message.error('与服务器交互失败')
                            result(undefined)
                        }
                    })

            }else{
                result(undefined)
            }
        })

    },
    getLoginStatus(){
        const ud = sessionStorage.getItem('userData')
        if(ud !==undefined &&ud!==null){
            return JSON.parse(AES.decrypt(ud))
        }else{
            return undefined
        }
    }
}