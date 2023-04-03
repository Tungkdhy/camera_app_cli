import {
  SET_COUNT_NOTIFICATION
} from '../actions/notification';

const initialState = {
  count: 0,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNT_NOTIFICATION:
      return { ...state, count: action.payload };

    default:
      return state;
  }
};
export default notificationReducer;
