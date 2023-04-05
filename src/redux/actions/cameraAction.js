export const SET_NAME_CAMERA = "SET_NAME_CAMERA";
export const GET_LIST_LOCATION = "GET_LIST_LOCATION"
export const GET_PROVINCE = "GET_PROVINCE"
export const GET_FILTER = "GET_FILTER"
export const GET_DISTRICT = "GET_DISTRICT"
export const SET_PROVINCE_CODE = "SET_PROVINCE_CODE"
export const SET_DISTRICT_CODE = "SET_DISTRICT_CODE"
export const GET_PATH_STREAM = "GET_PATH_STREAM"
export const GET_INFO = "GET_INFO"
export const SET_STATUS = "SET_STATUS"
export const SET_WARE_HOUSE_CODE = "SET_WARE_HOUSE_CODE"
export const SET_IS_FULLSCREEN = "SET_IS_FULLSCREEN"
export const setNameCamera = (name) => {
  return {
    type: SET_NAME_CAMERA,
    payload: name,
  };
};
export const setFilter = ({ provinceCode, districtCode }) => {
  return {
    type: GET_FILTER,
    payload: { provinceCode, districtCode },
  };
};
export const getListLocation = (data) => {
  return {
    type: GET_LIST_LOCATION,
    payload: data
  }
}
export const getListProvince = (data) => {
  return {
    type: GET_PROVINCE,
    payload: data
  }
}
export const getListDistrict = (data) => {
  return {
    type: GET_DISTRICT,
    payload: data
  }
}
export const setProvinceCode = (data) => {
  return {
    type: SET_PROVINCE_CODE,
    payload: data
  }
}
export const setDistrictCode = (data) => {
  return {
    type: SET_DISTRICT_CODE,
    payload: data
  }
}
export const setStatus = (data) => {
  return {
    type: SET_STATUS,
    payload: data
  }
}
export const setIsFullScreen = (data) => {
  return {
    type: SET_IS_FULLSCREEN,
    payload: data
  }
}
export const getPathStream = (data) => {
  return {
    type: GET_PATH_STREAM,
    payload: data
  }
}
export const getInfoCamera = (data) => {
  return {
    type: GET_INFO,
    payload: data
  }
}
export const setWareHouseCode = (data) => {
  return {
    type: SET_WARE_HOUSE_CODE,
    payload: data
  }
}