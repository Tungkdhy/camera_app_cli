import axiosClient from "../axiosClient"

export const playBackApi={
    getTimelines:(params)=>{
       
        return axiosClient.get('/camPlayback/get-list-timeline/',{
            params:{...params}
        })
    }
}