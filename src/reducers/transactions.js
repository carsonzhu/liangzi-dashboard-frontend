const initialState = {
  transactions: [],
  loading: false,
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "sample":
      return {
        ...state
      };
    default:
      return state;
  }
};