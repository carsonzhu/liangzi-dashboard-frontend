const initialState = {
  token: "",
  userType: "",
  loading: false,
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGGING_IN": {
      //To Remove
      if (action.payload.email === "admin@admin") {
        return {
          token: "abc123",
          userType: "superAdmin",
          loading: false,
          error: ""
        };
      } else if (action.payload.email === "rental@admin") {
        return {
          token: "abc123",
          userType: "normalAdmin",
          loading: false,
          error: ""
        };
      }

      return {
        ...state,
        loading: true
      };
    }
    case "LOGIN_SUCC":
      return {
        token: action.payload.token,
        userType: action.payload.userType,
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
