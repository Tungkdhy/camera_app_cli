import axiosClient from "../axiosClient"

export const eventAI = {
    getStatEvent: (params) => {
        return axiosClient.get('statEventAI/get-list-stat-event-ai/',{
            params: params
        })
    },
    postStatEvent: () => {
        return axiosClient.post('statEventAI/post-add-stat-event-ai/')
    }
}