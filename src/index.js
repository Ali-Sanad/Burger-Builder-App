import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import App from "./App";
import burgerBuilderReducer from "./store/reducers/burgerBuilder.js";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/Auth";

const roorReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  roorReducer,
  composeEnhancers(applyMiddleware(thunk))
);


const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
