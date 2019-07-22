const initialState = {
  vehicles: [],
  rentalCompanies: [],
  query: {},
  loading: false,
  error: ""
};

export const FETCH_VEHICLES = "FETCH_VEHICLES";
export const FETCH_VEHICLES_SUCC = "FETCH_VEHICLES_SUCC";
export const FETCH_VEHICLES_FAIL = "FETCH_VEHICLES_FAIL";

export const ADD_VEHICLES = "ADD_VEHICLES";
export const ADD_VEHICLES_SUCC = "ADD_VEHICLES_SUCC";
export const ADD_VEHICLES_FAIL = "ADD_VEHICLES_FAIL";

export const UPDATE_VEHICLES = "UPDATE_VEHICLES";
export const UPDATE_VEHICLES_SUCC = "UPDATE_VEHICLES_SUCC";
export const UPDATE_VEHICLES_FAIL = "UPDATE_VEHICLES_FAIL";

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
    case ADD_VEHICLES:
      return {
        ...state,
        loading: true
      };
    case ADD_VEHICLES_SUCC:
      return {
        ...state,
        vehicles: [...state.vehicles, action.payload.vehicle],
        loading: false,
        error: ""
      };
    case ADD_VEHICLES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case UPDATE_VEHICLES:
      return {
        ...state,
        loading: true
      };
    case UPDATE_VEHICLES_SUCC:
      return {
        ...state,
        loading: false,
        error: ""
      };
    case UPDATE_VEHICLES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
