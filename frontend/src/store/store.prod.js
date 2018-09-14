import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import promise from "redux-promise";
import rootReducer from "../reducers";

const middlewares = [ReduxThunk, promise];
const enhancer = [applyMiddleware(...middlewares)];

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, ...enhancer);
}
