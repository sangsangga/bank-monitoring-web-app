import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  performances: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PERFORMANCES":
      return { ...state, performances: action.payload };

    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
