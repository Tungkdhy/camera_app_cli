import axios from "axios";
import axiosClient from "../axiosClient";

export const authenticatorAPI = {
    forgotPassRequire: (email) => {
        return axios.post('http://cameraai.cds.vinorsoft.com/camera/vinorsoft/aicamera/v1.0/authenticator/password-reset/require', email)
    },
    forgotValidateToken: (token) => {
        return axios.post('http://cameraai.cds.vinorsoft.com/camera/vinorsoft/aicamera/v1.0/authenticator/password-reset/validate-token', token)
    },
    passwordResetConfirm: (data) => {
        return axios.post("http://cameraai.cds.vinorsoft.com/camera/vinorsoft/aicamera/v1.0/authenticator/password-reset/confirm", data)
    }
}