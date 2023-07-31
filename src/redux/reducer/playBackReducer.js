import {
  GET_LIST_PLAYBACK,
  SET_DAY,
  SET_TIME,
  SET_FULL_SCREEN,
  SET_TIME_END,
  SET_TIME_STICK,
  SET_LIST_CAMERA_PLAYBACK,
  SET_RELOAD,
  SET_DISTRICT_CODE_PLAYBACK,
  SET_PROVINCE_CODE_PLAYBACK,
  SET_IS_BG,
  SET_STATUS,
} from '../actions/playBackAction';
import { formatDDMMYY2 } from '../../utils';
const initialState = {
  cameras: [],
  playBacks: [],
  filter: {
    day: new Date(),
    time: '00:00',
    timeEnd: '23:59',
    stick_time: '00:00:00',
    record_status: 1,
    isBG: true,
    province_code: 'All',
    district_code: 'All',
    status: 'On',
  },
  isFullScreen: false,
  reload: false,
};
const playBackReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PLAYBACK:
      return { ...state, playBacks: action.payload };
    case SET_DAY:
      return {
        ...state,
        filter: {
          ...state.filter,
          day: action.payload,
        },
      };
    case SET_TIME:
      return {
        ...state,
        filter: {
          ...state.filter,
          time: action.payload,
        },
      };
    case SET_TIME_END:
      return {
        ...state,
        filter: {
          ...state.filter,
          timeEnd: action.payload,
        },
      };
    case SET_FULL_SCREEN:
      return { ...state, isFullScreen: action.payload };
    case SET_TIME_STICK:
      return {
        ...state,
        filter: {
          ...state.filter,
          stick_time: action.payload,
        },
      };
    case SET_LIST_CAMERA_PLAYBACK:
      return { ...state, cameras: action.payload };
    case SET_RELOAD:
      return {
        ...state,
        reload: action.payload,
      };
    case SET_PROVINCE_CODE_PLAYBACK:
      return {
        ...state,
        filter: {
          ...state.filter,
          province_code: action.payload,
        },
      };
    case SET_DISTRICT_CODE_PLAYBACK:
      return {
        ...state,
        filter: {
          ...state.filter,
          district_code: action.payload,
        },
      };
    case SET_IS_BG:
      return {
        ...state,
        filter: {
          ...state.filter,
          isBG: action.payload,
        },
      };
    case SET_STATUS:
      return {
        ...state,
        filter: {
          ...state.filter,
          status: action.payload,
        },
      };
    default:
      return state;
  }
};
export default playBackReducer;
