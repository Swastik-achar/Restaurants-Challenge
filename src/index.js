import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import configureStore from "./Store/configureStore";
import { startGetRestaurants } from "./Actions/restaurants";
import { Provider } from "react-redux";

const store = configureStore();
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(startGetRestaurants());
const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
