export const GET_LIST_REPORT = "GET_LIST_REPORT"
export const SET_DAY_REPORT = "SET_DAY_REPORT"
export const SET_TIME_REPORT = "SET_TIME_REPORT"
export const SET_TIME_END = "SET_TIME_END"
export const SET_FULL_SCREEN = "SET_FULL_SCREEN"
export const VIDEO_ACTIVE = "VIDEO_ACTIVE"

export const getListReport = (data) => {
    return {
      type: GET_LIST_REPORT,
      payload: data,
    };
  };
  export const setDayReport = (data) => {
    return {
      type: SET_DAY_REPORT,
      payload: data,
    };
  };
  export const setTimeReport = (data) => {
    return {
      type: SET_TIME_REPORT,
      payload: data,
    };
  };
  export const setTimeEnd = (data) => {
    return {
      type: SET_TIME_END,
      payload: data,
    };
  };
  export const setIsFullScreen = (data) => {
    return {
      type: SET_FULL_SCREEN,
      payload: data,
    };
  };
  export const videoActive = (data)=>{
    return {
      type:VIDEO_ACTIVE,
      payload:data
    }
  }