import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const getToken =async ()=>{
  try{
    const token = await AsyncStorage.getItem("token")
    return token
  }
  catch(e){
    console.log(e);
  }
}
const axiosClient = axios.create({
  baseURL: "http://cameraai.cds.vinorsoft.com/camera/vinorsoft/aicamera/v1.0/",
  headers: {
    "content-type": "application/json",
  },
});
axiosClient.interceptors.request.use(
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

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    //console.log(AsyncStorage.getItem("token"));
    if (getToken() && error.response.status === 401) {
      async function refreshToken() {
        const res = await axios.post(
          "http://42.96.41.91:10710/vinorsoft/aicamera/v1.0/authenticator/refreshToken/",
          {
            // refresh: AsyncStorage.getItem("refresh"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        await AsyncStorage.setItem("token", res.data.access);
        window.location.reload()
      }
      refreshToken();
    }
    throw error;
  }
);
export default axiosClient;
