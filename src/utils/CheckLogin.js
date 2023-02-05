import AES from "@/utils/AES";


export  default {
    check(){
        let readData = localStorage.getItem('loginData')
        if(readData!=undefined){
            let loginData = JSON.parse(AES.decrypt(readData))
            if(loginData['UserData']!=undefined){
                if(loginData['UserData'][0]!=undefined){
                    if(loginData['UserData'][0]['Username']!=undefined){
                        return loginData['UserData'][0]
                    }
                }
            }
            return undefined
        }
    }
}