import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Real_estate_API_v1/AuthAPISlice"
import propertyReducer from "../Real_estate_API_v1/PropertyAPISlice"


export const store = configureStore({
	reducer: {
		properties: propertyReducer,
		auth: authReducer,
	},
});