const restaurantsInitialState = [];

const restaurantsReducer = (state = restaurantsInitialState, action) => {
  switch (action.type) {
    case "GET_RESTAURANTS": {
      return state.concat(action.payload);
    }
    default: {
      return [...state];
    }
  }
};

export default restaurantsReducer;
