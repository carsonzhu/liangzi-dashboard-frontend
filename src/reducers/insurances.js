const initialState = {
  insurances: [],
  loading: false,
  error: ""
};

export const FETCH_INSURANCES = "FETCHING";
export const FETCH_INSURANCES_SUCC = "FETCH_INSURANCES_SUCC";
export const FETCH_INSURANCES_FAILED = "FETCH_INSURANCES_FAILED";

export const EDIT_INSURANCE = "EDIT_INSURANCE";
export const EDIT_INSURANCE_SUCC = "EDIT_INSURANCE_SUCC";
export const EDIT_INSURANCE_FAILED = "EDIT_INSURANCE_FAILED";

export const DELETE_INSURANCE = "DELETE_INSURANCE";
export const DELETE_INSURANCE_SUCC = "DELETE_INSURANCE_SUCC";
export const DELETE_INSURANCE_FAILED = "DELETE_INSURANCE_FAILED";

export const CREATE_NEW_INSURANCE = "CREATE_NEW_INSURANCE";
export const CREATE_NEW_INSURANCE_SUCC = "CREATE_NEW_INSURANCE_SUCC";
export const CREATE_NEW_INSURANCE_FAILED = "CREATE_NEW_INSURANCE_FAILED";

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INSURANCES:
      return {
        ...state,
        loading: true
      };
    case FETCH_INSURANCES_SUCC: {
      let insurances = action.payload.insurances.reduce((acc, ins) => {
        if (ins.name.EN) {
          ins.name = ins.name.EN;
        }
        if (ins.rentalCompanyName.EN) {
          ins.rentalCompanyName = ins.rentalCompanyName.EN;
        }

        if (ins.description.EN) {
          ins.description = ins.description.EN;
        }

        if (acc.length === 0) {
          acc.push(ins);
          return [...acc];
        } else {
          return [...acc, ins];
        }
      }, []);
      return {
        ...state,
        insurances,
        loading: false,
        error: ""
      };
    }

    case FETCH_INSURANCES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case EDIT_INSURANCE:
      return {
        ...state,
        loading: true
      };
    case EDIT_INSURANCE_SUCC:
      return { ...state, loading: false, error: "" };
    case EDIT_INSURANCE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case DELETE_INSURANCE:
      return {
        ...state,
        loading: true
      };
    case DELETE_INSURANCE_SUCC:
      return { ...state, loading: false, error: "" };
    case DELETE_INSURANCE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case CREATE_NEW_INSURANCE:
      return {
        ...state,
        loading: true
      };
    case CREATE_NEW_INSURANCE_SUCC:
      return {
        ...state,
        insurances: [...state.insurances, action.payload.insurance],
        loading: false,
        error: ""
      };
    case CREATE_NEW_INSURANCE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
