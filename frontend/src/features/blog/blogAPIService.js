import axios from "axios";


//get all blog post
const getPosts = async (data) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${data.token}`
		},
	};

	const response = await axios.get("/api/v1/blog/all/", config);
	return response.data;
};


//get blog post details
const getPostDetails = async (data) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${data.token}`
		},
	};

	const response = await axios.get("/api/v1/blog/details/" + data.id, config);
	return response.data;
};


const propertyAPIService = { getPosts, getPostDetails };

export default propertyAPIService;
