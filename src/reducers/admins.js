const initialState = {
  admins: [],
  loading: false,
  error: ""
};

export const FETCH_ADMINS = "FETCHING";
export const FETCH_ADMINS_SUCC = "FETCH_ADMINS_SUCC";
export const FETCH_ADMINS_FAILED = "FETCH_ADMINS_FAILED";

export const EDIT_ADMINS = "EDIT_ADMINS";
export const EDIT_ADMINS_SUCC = "EDIT_ADMINS_SUCC";
export const EDIT_ADMINS_FAILED = "EDIT_ADMINS_FAILED";

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
    case EDIT_ADMINS:
      return {
        ...state,
        loading: true
      };
    case EDIT_ADMINS_SUCC:
      return { ...state, loading: false, error: "" };
    case EDIT_ADMINS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
