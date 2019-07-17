const initialState = {
  vehicles: [],
  query: {},
  loading: false,
  error: ""
};

export const FETCH_VEHICLES = "FETCH_VEHICLES";
export const FETCH_VEHICLES_SUCC = "FETCH_VEHICLES_SUCC";
export const FETCH_VEHICLES_FAIL = "FETCH_VEHICLES_FAIL";

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VEHICLES:
      return {
        ...state,
        loading: true
      };
    case FETCH_VEHICLES_SUCC:
      return {
        ...state,
        vehicles: action.payload.vehicles,
        loading: false,
        error: ""
      };
    case FETCH_VEHICLES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
