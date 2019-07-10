const initialState = {
  admins: [],
  loading: false,
  error: ""
};

export const FETCHING = "FETCHING";
export const FETCH_ADMINS = "FETCH_ADMINS";
export const FETCH_ADMINS_FAILED = "FETCH_ADMINS_FAILED";

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        loading: true
      };
    case FETCH_ADMINS:
      return {
        ...state,
        admins: action.payload.admins,
        loading: false,
        error: ""
      };
    case FETCH_ADMINS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
