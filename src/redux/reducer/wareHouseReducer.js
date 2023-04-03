import { GET_LIST_WAREHOUSE } from "../actions/wareHouseAction";
const initialState = {
  wareHouse: [],
  filter: {
    province_code: '',
    district_code: '',
  },
};
const wareHouseReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_LIST_WAREHOUSE:
        return { ...state, wareHouse: action.payload };
      default:
        return state;
    }
  };
  export default wareHouseReducer;