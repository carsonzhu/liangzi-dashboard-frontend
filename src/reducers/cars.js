const initialState = {
  cars: [],
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
