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

export const CREATE_NEW_ADMINS = "CREATE_NEW_ADMINS";
export const CREATE_NEW_ADMINS_SUCC = "CREATE_NEW_ADMINS_SUCC";
export const CREATE_NEW_ADMINS_FAILED = "CREATE_NEW_ADMINS_FAILED";

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
    case CREATE_NEW_ADMINS:
      return {
        ...state,
        loading: true
      };
    case CREATE_NEW_ADMINS_SUCC:
      return {
        ...state,
        admins: [...state.admins, action.payload.admin],
        loading: false,
        error: ""
      };
    case CREATE_NEW_ADMINS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};
