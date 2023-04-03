const { GET_INFO_USER } = require("../actions/getUserAction")

const initialState = {
    userInfo: {}
};

const userReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case GET_INFO_USER:
            return {
                ...state,
                userInfo: action.payload
            }
        default:
            return state
    }
}

export default userReducer;