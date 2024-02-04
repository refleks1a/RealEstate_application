import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import blogAPIService from "./blogAPIService";


const initialState = {
	posts: [],
	post: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};


// Get all blog posts
export const getPosts = createAsyncThunk(
	"blog/getAll",
	async (data, thunkAPI) => {
		try {
			return await blogAPIService.getPosts(data);
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


// Get a blog post details
export const getPostDetails = createAsyncThunk(
	"blog/getPost",
	async (data, thunkAPI) => {
		try {
			return await blogAPIService.getPostDetails(data);
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


export const blogSlice = createSlice({
	name: "blog",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder

        
			.addCase(getPosts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.posts = action.payload.results;
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(getPostDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPostDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.post = action.payload;
			})
			.addCase(getPostDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


	},
});


export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
