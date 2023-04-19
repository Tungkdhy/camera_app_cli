export const GET_INFO_USER = "SET_INFO_USER";
export const GET_USER_TYPE_CODE = 'get-user-type-code';
export const setUserInfo = (payload) => {
    return {
        type: GET_INFO_USER,
        payload: payload,
    };
};
export const setUserTypeCode = (payload) => {
    return {
        type: GET_USER_TYPE_CODE,
        payload: payload,
    };
};