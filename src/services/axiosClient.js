import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (e) {
    console.log(e);
  }
};
const axiosClient = axios.create({
  baseURL: 'http://cameraai.cds.vinorsoft.com/camera/vinorsoft/aicamera/v1.0/',
  headers: {
    'content-type': 'application/json',
  },
});
axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    //console.log(token)
    if (token) {
      config.headers.Authorization = 'vinorsoft ' + token;
      //console.log(config.headers.Authorization)
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
let isRefreshing = false;
axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async error => {
    if (getToken() && error?.response?.status === 401) {
      // console.log(getToken());
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          let refresh = await AsyncStorage.getItem('refresh');
          const res = await axios.post(
            'http://cameraai.cds.vinorsoft.com/camera/vinorsoft/aicamera/v1.0/authenticator/refreshToken/',
            {
              refresh: refresh,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          await AsyncStorage.setItem('token', res.data.access);
          // window.location.reload();
          error.config.headers.authorization = `vinorsoft ${res.data.access}`;
          isRefreshing = false;
          return axiosClient.request(error.config);
        } catch (error) {
          isRefreshing = false;
          if (error?.response?.status === 401) {
            // console.log(getToken(), 'authen');
            // window.location.replace('/login')
          }
          throw error;
        }
      } else {
        // Chờ đến khi token mới được cập nhật và gửi lại yêu cầu sau đó
        await new Promise(resolve => {
          const intervalId = setInterval(() => {
            if (!isRefreshing) {
              clearInterval(intervalId);
              resolve();
            }
          }, 100);
        });
        return axiosClient.request(error.config);
      }
    }
    throw error;
  },
);
export default axiosClient;
