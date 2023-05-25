import {GET_LIST_PLAYBACK, SET_DAY, SET_TIME,SET_FULL_SCREEN,SET_TIME_END,SET_TIME_STICK} from '../actions/playBackAction';
import { formatDDMMYY2 } from '../../utils';
const initialState = {
  playBacks: [],
  filter: {
    day: formatDDMMYY2(new Date),
    time: '00:00',
    timeEnd:'23:59',
    stick_time:"00:00:00"
  },
  isFullScreen:false,

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
      case SET_TIME_END:
        return {...state, filter: {
          ...state.filter,timeEnd:action.payload
        }};
      case SET_FULL_SCREEN:
      return {...state, isFullScreen:action.payload};
      case SET_TIME_STICK:
        return {...state, filter:{
          ...state.filter,
          stick_time:action.payload
        }};
    default:
      return state;
  }
};
export default playBackReducer;
