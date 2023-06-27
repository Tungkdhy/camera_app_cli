import {
  SET_NAME_CAMERA,
  GET_LIST_LOCATION,
  GET_PROVINCE,
  GET_FILTER,
  GET_DISTRICT,
  SET_PROVINCE_CODE,
  SET_DISTRICT_CODE,
  GET_PATH_STREAM,
  GET_INFO,
  SET_STATUS,
  SET_WARE_HOUSE_CODE,
  SET_IS_FULLSCREEN,
  SET_FILTER_DISTRICT,
  SET_FILTER_PROVINCE,
  SET_RELOAD,
  SET_RECORD,
  REFRESH,
  CHECKBG,
  SET_SERVICE,
  SET_SCREEN,
} from '../actions/cameraAction';

const initialState = {
  name: '',
  camera: [],
  wareCode: '',
  province: [],
  district: [],
  filter: {
    camera_status: 'On',
   
    province_name: '',
    district_name: '',
    record_status: 1,
    isBG: false,
    province_code: 'All',
    district_code: 'All',
    service: '',
  },
  pathStream: [],
  camera_info: {},
  isFullScreen: false,
  filterLocate: {
    province: '',
    district: '',
  },
  reload: false,
  refresh: false,
  screen: 'Stream',
};

const useReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME_CAMERA:
      return { ...state, name: action.payload };
    case GET_LIST_LOCATION:
      return { ...state, camera: action.payload };
    case GET_PROVINCE:
      return { ...state, province: action.payload };
    case GET_FILTER:
      return { ...state, filter: action.payload };
    case GET_DISTRICT:
      return { ...state, district: action.payload };
    case SET_PROVINCE_CODE:
      return {
        ...state,
        filter: {
          ...state.filter,
          province_code: action.payload,
          // province_name: action.payload.name,
        },
      };
    case SET_DISTRICT_CODE:
      return {
        ...state,
        filter: {
          ...state.filter,
          district_code: action.payload,
          // district_name: action.payload.name,
        },
      };
    case SET_STATUS:
      return {
        ...state,
        filter: {
          ...state.filter,
          camera_status: action.payload,
        },
      };
    case GET_PATH_STREAM:
      return {
        ...state,
        pathStream: action.payload,
      };
    case GET_INFO:
      return {
        ...state,
        camera_info: action.payload,
      };
    case SET_WARE_HOUSE_CODE:
      return {
        ...state,
        wareCode: action.payload,
      };
    case SET_IS_FULLSCREEN:
      return {
        ...state,
        isFullScreen: action.payload,
      };
    case SET_FILTER_DISTRICT:
      return {
        ...state,
        filterLocate: {
          ...state.filterLocate,
          district: action.payload,
        },
      };
    case SET_FILTER_PROVINCE:
      return {
        ...state,
        filterLocate: {
          ...state.filterLocate,
          province: action.payload,
        },
      };

    case SET_RELOAD:
      return {
        ...state,
        reload: action.payload,
      };
    case SET_RECORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          record_status: action.payload,
        },
      };
    case REFRESH:
      return {
        ...state,
        refresh: action.payload,
      };
    case CHECKBG:
      return {
        ...state,
        filter: {
          ...state.filter,
          isBG: action.payload,
        },
      };
    case SET_SERVICE:
      return {
        ...state,
        filter: {
          ...state.filter,
          service: action.payload,
        },
      };
    case SET_SCREEN:
      return {
        ...state,
        screen: action.payload,
      };
    default:
      return state;
  }
};
export default useReducer;
