import {
  GET_LIST_REPORT,
  SET_DAY_REPORT,
  SET_TIME_REPORT,
  SET_FULL_SCREEN,
  SET_TIME_END,
  VIDEO_ACTIVE,
  GET_LIST_SERVICE_PACKAGE,
  SET_AI_CODE,
  SET_AI_NAME,
  SET_LIST_CAMERA,
  SET_LIST_CAMERA2,
} from '../actions/reportAction';
const initialState = {
  reports: [],
  filter: {
    day: new Date(),
    time: new Date(),
    timeEnd: '23:59',
    service: 'Phát hiện chuyển động',
    ai_code: '20230222000000000001',
    name: 'Phát hiện chuyển động',
    record_status: 1,
    isBG: false,
    province_code: 'All',
    district_code: 'All',
  },
  isFullScreen: false,
  video_active: [
    {
      path: '',
      name: '',
    },
  ],
  package: [],
  camera: [],
  listCamera: {
    camera: [],
    code: '',
  },
};
const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_REPORT:
      return { ...state, reports: action.payload };
    case SET_DAY_REPORT:
      return {
        ...state,
        filter: {
          ...state.filter,
          day: action.payload,
        },
      };
    case SET_TIME_REPORT:
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
      return { ...state, isFullScreen: !state.isFullScreen };
    case VIDEO_ACTIVE:
      return { ...state, video_active: [action.payload] };
    case GET_LIST_SERVICE_PACKAGE:
      return { ...state, package: action.payload };
    case SET_AI_CODE:
      return {
        ...state,
        filter: {
          ...state.filter,
          ai_code: action.payload,
        },
      };
    case SET_AI_NAME:
      return {
        ...state,
        filter: {
          ...state.filter,
          name: action.payload,
        },
      };
    case SET_LIST_CAMERA:
      return {
        ...state,
        camera: action.payload,
      };
    case SET_LIST_CAMERA2:
      return {
        ...state,
        listCamera: action.payload,
      };
    default:
      return state;
  }
};
export default reportReducer;
