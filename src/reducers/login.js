const initialState = {
  token: "",
  userType: "",
  userId: "",
  loading: false,
  username: "",
  error: ""
};

export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_SUCC = "LOGIN_SUCC";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN: {
      return {
        ...state,
        loading: true
      };
    }

    case LOGIN_SUCC:
      return {
        token: action.payload.token,
        userType: action.payload.userType,
        userId: action.payload.userId,
        username: action.payload.username,
        loading: false,
        error: ""
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case LOGOUT: {
      return {
        ...state,
        token: "",
        userId: "",
        username: "",
        userType: ""
      };
    }
    default:
      return state;
  }
};
