const initialState = {
  token: "",
  loading: false,
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGGING_IN":
      return {
        ...state,
        loading: true
      };
    case "LOGIN_SUCC":
      return {
        token: action.payload.token,
        loading: false,
        error: ""
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};