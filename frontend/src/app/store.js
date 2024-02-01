import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import propertyReducer from "../features/properties/propertySlice";
import profileReducer from "../features/profiles/profileSlice";

export const store = configureStore({
	reducer: {
		properties: propertyReducer,
		auth: authReducer,
		profile: profileReducer,
	},
});