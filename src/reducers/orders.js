const initialState = {
  orders: [],
  loading: false,
  error: ""
};

export const FETCH_ORDERS = "FETCH_ORDERS";
export const FETCH_ORDERS_SUCC = "FETCH_ORDERS_SUCC";
export const FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL";

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        loading: true
      };
    case FETCH_ORDERS_SUCC:
      return {
        ...state,
        orders: action.payload.orders,
        loading: false,
        error: ""
      };
    case FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
