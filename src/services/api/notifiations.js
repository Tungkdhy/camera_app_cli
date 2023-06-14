import axiosClient from "../axiosClient";

export const notificationsAPI = {
    getListNotification: (params) =>  {
        //page=${page}&size=10&type
        return axiosClient.get('/notification/get-list-notification/', {
            params: params
        })
    },
    putSeenNotification: (code) => {
        // /?notification_code
        return axiosClient.put(`notification/put-change-notification-seen/?notification_code=${code}`)
    } 
}