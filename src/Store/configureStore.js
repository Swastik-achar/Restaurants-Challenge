import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import restaurantsReducer from '../Reducer/restaurantsReducer'

const configureStore = () => {
  const store = createStore(
    combineReducers({
      restaurants: restaurantsReducer
    }),
    applyMiddleware(thunk)
  );
  return store;
};
export default configureStore;
