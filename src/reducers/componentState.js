const initialState = {
  loginModal: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_MODAL":
      return {
        ...state,
        loginModal: true
      };

    case "CLOSE_LOGIN_MODAL":
      return {
        ...state,
        loginModal: false
      };
    default:
      return state;
  }
};
