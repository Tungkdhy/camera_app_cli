import axiosClient from "../axiosClient";

export const userManager = {
    getCurrentUser: () => {
        return axiosClient.get('/user/get-user-info/')
    }
}