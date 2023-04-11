import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const streamingClient = axios.create({
    baseURL: "http://cameraai.cds.vinorsoft.com/stream/vinorsoft/streamingcamera/v1.0/",
    headers:{
        'content-type':'application/json',
        // 'authorization': `vinorsoft ${sessionStorage.getItem('token')}`
    },
})
streamingClient.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token')
        //console.log(token)
        if (token) {
            config.headers.Authorization = 'vinorsoft ' + token
            //console.log(config.headers.Authorization)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
  )
  
streamingClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }
    return response
}, (error) => {

    throw error
})
export default streamingClient
