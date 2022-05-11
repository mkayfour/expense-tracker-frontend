import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { authReducer } from "../../../auth/core/redux/reducer";
import { appReducer } from "../redux/app/reducer";

import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const reducers = combineReducers({ auth: authReducer, app: appReducer });

const composeEnhancers = composeWithDevTools({});

const initialState = {};

export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
