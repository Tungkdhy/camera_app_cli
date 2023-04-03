import {GET_LIST_PLAYBACK, SET_DAY, SET_TIME,SET_FULL_SCREEN} from '../actions/playBackAction';
const initialState = {
  playBacks: [],
  filter: {
    day: 'All',
    time: 'All',
  },
  isFullScreen:false
};
const playBackReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PLAYBACK:
      return {...state, playBacks: action.payload};
    case SET_DAY:
      return {...state, filter: {
        ...state.filter,day:action.payload
      }};
    case SET_TIME:
      return {...state, filter: {
        ...state.filter,time:action.payload
      }};
      case SET_FULL_SCREEN:
      return {...state, isFullScreen:!state.isFullScreen};
    default:
      return state;
  }
};
export default playBackReducer;
