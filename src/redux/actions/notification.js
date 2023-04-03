export const SET_COUNT_NOTIFICATION = "SET_COUNT_NOTIFICATION";
export const setCountNotification = (count) => {
  return {
    type: SET_COUNT_NOTIFICATION,
    payload: count,
  };
};