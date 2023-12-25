import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PropertyAPIService from "./PropertyAPIService";


const initialState = {
	properties: [],
	property: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

// get all properties
export const getALLProperties = createAsyncThunk(
	"properties/getAll",
	async (_, thunkAPI) => {
		try {
			return await PropertyAPIService.getAllProperties();
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

export const propertySlice = createSlice({
	name: "property",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getALLProperties.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getALLProperties.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.properties = action.payload.results;
			})
			.addCase(getALLProperties.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = propertySlice.actions;
export default propertySlice.reducer;