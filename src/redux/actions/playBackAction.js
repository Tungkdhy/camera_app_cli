export const GET_LIST_PLAYBACK = "GET_LIST_PLAYBACK"
export const SET_DAY = "SET_DAY"
export const SET_TIME = "SET_TIME"
export const SET_FULL_SCREEN = "SET_FULL_SCREEN"

export const getListPlayBack = (data) => {
    return {
      type: GET_LIST_PLAYBACK,
      payload: data,
    };
  };
  export const setDay = (data) => {
    return {
      type: SET_DAY,
      payload: data,
    };
  };
  export const setTime = (data) => {
    return {
      type: SET_TIME,
      payload: data,
    };
  };
  export const setIsFullScreen = (data) => {
    return {
      type: SET_FULL_SCREEN,
      payload: data,
    };
  };