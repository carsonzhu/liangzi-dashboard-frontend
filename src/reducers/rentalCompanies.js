const initialState = {
  rentalCompanies: [],
  loading: false,
  error: ""
};

export const FETCH_RENTAL_COMPANIES = "FETCH_RENTAL_COMPANIES";
export const FETCH_RENTAL_COMPANIES_SUCC = "FETCH_RENTAL_COMPANIES_SUCC";
export const FETCH_RENTAL_COMPANIES_FAIL = "FETCH_RENTAL_COMPANIES_FAIL";

export const CREATE_RENTAL_COMPANIES = "CREATE_RENTAL_COMPANIES";
export const CREATE_RENTAL_COMPANIES_SUCC = "CREATE_RENTAL_COMPANIES_SUCC";
export const CREATE_RENTAL_COMPANIES_FAIL = "CREATE_RENTAL_COMPANIES_FAIL";

export const EDIT_RENTAL_COMPANIES = "EDIT_RENTAL_COMPANIES";
export const EDIT_RENTAL_COMPANIES_SUCC = "EDIT_RENTAL_COMPANIES_SUCC";
export const EDIT_RENTAL_COMPANIES_FAIL = "EDIT_RENTAL_COMPANIES_FAIL";

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RENTAL_COMPANIES:
      return {
        ...state,
        loading: true
      };
    case FETCH_RENTAL_COMPANIES_SUCC:
      return {
        ...state,
        rentalCompanies: action.payload.rentalCompanies,
        loading: false,
        error: ""
      };
    case FETCH_RENTAL_COMPANIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case CREATE_RENTAL_COMPANIES:
      return {
        ...state,
        loading: true
      };
    case CREATE_RENTAL_COMPANIES_SUCC:
      return {
        ...state,
        rentalCompanies: [
          ...state.rentalCompanies,
          action.payload.rentalCompany
        ],
        loading: false,
        error: ""
      };
    case CREATE_RENTAL_COMPANIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case EDIT_RENTAL_COMPANIES:
      return {
        ...state,
        loading: true
      };
    case EDIT_RENTAL_COMPANIES_SUCC:
      return {
        ...state,
        loading: false,
        error: ""
      };
    case EDIT_RENTAL_COMPANIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
