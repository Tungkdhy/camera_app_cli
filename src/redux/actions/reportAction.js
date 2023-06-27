export const GET_LIST_REPORT = 'GET_LIST_REPORT';
export const SET_DAY_REPORT = 'SET_DAY_REPORT';
export const SET_TIME_REPORT = 'SET_TIME_REPORT';
export const SET_TIME_END = 'SET_TIME_END';
export const SET_FULL_SCREEN = 'SET_FULL_SCREEN';
export const VIDEO_ACTIVE = 'VIDEO_ACTIVE';
export const GET_LIST_SERVICE_PACKAGE = 'GET_LIST_SERVICE_PACKAGE';
export const SET_AI_CODE = 'SET_AI_CODE';
export const SET_AI_NAME = 'SET_AI_NAME';
export const SET_LIST_CAMERA = 'SET_LIST_CAMERA';

export const getListReport = data => {
  return {
    type: GET_LIST_REPORT,
    payload: data,
  };
};
export const setDayReport = data => {
  return {
    type: SET_DAY_REPORT,
    payload: data,
  };
};
export const setTimeReport = data => {
  return {
    type: SET_TIME_REPORT,
    payload: data,
  };
};
export const setNameAI = data => {
  return {
    type: SET_AI_NAME,
    payload: data,
  };
};
export const setTimeEnd = data => {
  return {
    type: SET_TIME_END,
    payload: data,
  };
};
export const setIsFullScreen = data => {
  return {
    type: SET_FULL_SCREEN,
    payload: data,
  };
};
export const videoActive = data => {
  return {
    type: VIDEO_ACTIVE,
    payload: data,
  };
};
export const servicePackage = data => {
  return {
    type: GET_LIST_SERVICE_PACKAGE,
    payload: data,
  };
};
export const setAiCode = data => {
  return {
    type: SET_AI_CODE,
    payload: data,
  };
};
export const setListCamera = data => {
  return {
    type: SET_LIST_CAMERA,
    payload: data,
  };
};
