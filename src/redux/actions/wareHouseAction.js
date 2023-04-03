export const GET_LIST_WAREHOUSE = "GET_LIST_WAREHOUSE"

export const getListWareHouse = (data) => {
    return {
      type: GET_LIST_WAREHOUSE,
      payload: data,
    };
  };