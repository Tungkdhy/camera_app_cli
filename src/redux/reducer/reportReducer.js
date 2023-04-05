import {GET_LIST_REPORT, SET_DAY_REPORT, SET_TIME_REPORT,SET_FULL_SCREEN,SET_TIME_END,VIDEO_ACTIVE} from '../actions/reportAction';
const initialState = {
  reports: [],
  filter: {
    day: new Date,
    time: new Date,
    timeEnd:'23:59',
    service:"Chuyển động"
  },
  isFullScreen:false,
  video_active:[{
    path:'',
    name:'',
  }],
};
const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_REPORT:
      return {...state, reports: action.payload};
    case SET_DAY_REPORT:
      return {...state, filter: {
        ...state.filter,day:action.payload
      }};
    case SET_TIME_REPORT:
      return {...state, filter: {
        ...state.filter,time:action.payload
      }};
      case SET_TIME_END:
        return {...state, filter: {
          ...state.filter,timeEnd:action.payload
        }};
      case SET_FULL_SCREEN:
      return {...state, isFullScreen:!state.isFullScreen};
      case VIDEO_ACTIVE:
      return {...state, video_active:[action.payload]};
    default:
      return state;
  }
};
export default reportReducer;
