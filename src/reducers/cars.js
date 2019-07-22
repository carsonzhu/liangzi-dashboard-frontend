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

export const CREATE_VEHICLE = "CREATE_VEHICLE";
export const CREATE_VEHICLE_SUCC = "CREATE_VEHICLE_SUCC";
export const CREATE_VEHICLE_FAIL = "CREATE_VEHICLE_FAIL";

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
        rentalCompanies: action.payload.rentalCompanies,
        loading: false,
        error: ""
      };
    case FETCH_VEHICLES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case CREATE_VEHICLE:
      return {
        ...state,
        loading: true
      };
    case CREATE_VEHICLE_SUCC:
      return {
        ...state,
        loading: false,
        error: ""
      };
    case CREATE_VEHICLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
