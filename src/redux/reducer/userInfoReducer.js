const { GET_INFO_USER, GET_USER_TYPE_CODE } = require("../actions/getUserAction")

const initialState = {
    userInfo: {},
    userTypeCode: null
};

const userReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case GET_INFO_USER:
            return {
                ...state,
                userInfo: action.payload
            }
        case GET_USER_TYPE_CODE:
            return {
                ...state,
                userTypeCode: action.payload
            }
        default:
            return state
    }
}

export default userReducer;