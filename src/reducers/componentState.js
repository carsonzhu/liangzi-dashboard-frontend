const initialState = {
  loginModal: false,
  carEditModal: false,
  carNewModal: false
};

export const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL";
export const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";
export const OPEN_CAR_EDIT_MODAL = "OPEN_CAR_EDIT_MODAL";
export const CLOSE_CAR_EDIT_MODAL = "CLOSE_CAR_EDIT_MODAL";
export const OPEN_CAR_CREATE_MODAL = "OPEN_CAR_CREATE_MODAL";
export const CLOSE_CAR_CREATE_MODAL = "CLOSE_CAR_CREATE_MODAL";

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
