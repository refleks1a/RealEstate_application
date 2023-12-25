import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "react-dom"
import rootReducer from "./reducers"
import { applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"


const initialState = {};

const middleware = [reduxThunk];

const store = configureStore(
	rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
)

export default store;