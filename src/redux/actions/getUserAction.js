export const GET_INFO_USER = "SET_INFO_USER"
export const setUserInfo = (payload) => {
    return {
        type: GET_INFO_USER,
        payload: payload,
    };
};