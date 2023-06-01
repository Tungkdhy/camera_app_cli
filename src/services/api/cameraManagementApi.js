import axiosClient from "../axiosClient";
import streamingClient from "../axiosStreaming";
 export const cameraManagement = {
    update: (data, code) => {
        return axiosClient.put(`/cameraManagement/put-change-info-camera/?camera_code=${code}`, data)
    },
    startStreaming: (url, data) => {
        return streamingClient.post(url, data)
    },
    stopStreaming: (url, data) => {
        return streamingClient.post(url, data)
    },
    add: (url, data) => {
        return axiosClient.post(`${url}`, data)
    },
    delete: (code) => {
        return axiosClient.delete(`/cameraManagement/delete-remove-camera/?camera_code=${code}`)
    },
    getListCamera: (params) => {
        return axiosClient.get('/cameraManagement/get-list-camera/', {
            params: params
        })
    }

}
