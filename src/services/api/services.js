import axiosClient from "../axiosClient"

export const services = {
    getListServices: (params)=>{
        return axiosClient.get('service/get-list-services/',{
            params: params ? params : null
        })
    }
}