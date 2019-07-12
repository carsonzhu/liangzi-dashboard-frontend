const initialState = {
  admins: [],
  loading: false,
  error: ""
};

export const FETCH_ADMINS = "FETCHING";
export const FETCH_ADMINS_SUCC = "FETCH_ADMINS_SUCC";
export const FETCH_ADMINS_FAILED = "FETCH_ADMINS_FAILED";

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMINS:
      return {
        ...state,
        loading: true
      };
    case FETCH_ADMINS_SUCC:
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
