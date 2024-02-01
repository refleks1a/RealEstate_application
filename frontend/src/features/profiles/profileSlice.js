import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import profileAPIService from "./profileAPIService";


const initialState = {
	profiles: [],
	profile: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};


// Get agents
export const getAgents = createAsyncThunk(
	"profile/getAgents",
	async (data, thunkAPI) => {
		try {
			return await profileAPIService.getAgents(data);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);


// Get user's profile
export const getProfile = createAsyncThunk(
	"profile/getProfile",
	async (data, thunkAPI) => {
		try {
			return await profileAPIService.getProfile(data);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);


export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder

        
			.addCase(getAgents.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAgents.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profiles = action.payload;
			})
			.addCase(getAgents.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(getProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload;
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


	},
});


export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
