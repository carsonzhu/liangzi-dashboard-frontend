const initialState = {
  loginModal: false
};

export const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL";
export const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        loginModal: true
      };

    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        loginModal: false
      };
    default:
      return state;
  }
};
